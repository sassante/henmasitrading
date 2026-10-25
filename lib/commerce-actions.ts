'use server'

import { auth } from '@/lib/auth'
import { pool } from '@/lib/db'
import { headers } from 'next/headers'
import { revalidatePath } from 'next/cache'

export type CatalogProduct = {
  id: string
  name: string
  description: string
  category: string
  price: number
  sku: string
  imageUrl: string | null
  quantity: number
  reorderLevel: number
}

export type CheckoutItem = {
  id: string
  quantity: number
}

async function getSessionUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

async function requireAdmin() {
  const user = await getSessionUser()
  const admins = (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
  if (!user || !admins.includes(user.email.toLowerCase())) {
    throw new Error('Unauthorized')
  }
  return user
}

export async function listProducts(): Promise<CatalogProduct[]> {
  const result = await pool.query(`
    SELECT p.id, p.name, p.description, p.category, p.price::float8 AS price,
           p.sku, p.image_url AS "imageUrl",
           COALESCE(i.quantity, 0) AS quantity,
           COALESCE(i.reorder_level, 5) AS "reorderLevel"
    FROM public.products p
    LEFT JOIN public.inventory i ON i.product_id = p.id
    WHERE p.is_active = true
    ORDER BY p.created_at DESC
  `)
  return result.rows
}

export async function getAdminStats() {
  await requireAdmin()

  const [products, orders, customers, revenue, lowStock] = await Promise.all([
    pool.query(`SELECT COUNT(*)::int AS count FROM public.products WHERE is_active = true`),
    pool.query(`SELECT COUNT(*)::int AS count FROM public.orders`),
    pool.query(`SELECT COUNT(*)::int AS count FROM public.customers`),
    pool.query(`SELECT COALESCE(SUM(total_amount), 0)::float8 AS total FROM public.orders WHERE status <> 'cancelled'`),
    pool.query(`SELECT COUNT(*)::int AS count FROM public.inventory WHERE quantity <= reorder_level`),
  ])

  return {
    totalProducts: products.rows[0].count,
    totalOrders: orders.rows[0].count,
    totalCustomers: customers.rows[0].count,
    totalRevenue: revenue.rows[0].total,
    lowStock: lowStock.rows[0].count,
  }
}

export async function upsertProduct(input: {
  id?: string
  name: string
  description: string
  category: string
  price: number
  sku: string
  quantity: number
  reorderLevel?: number
  imageUrl?: string
}) {
   await requireAdmin()
  if (!input.name.trim() || !input.sku.trim() || input.price < 0 || input.quantity < 0) throw new Error('Invalid product data')
  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const product = await client.query(
      `INSERT INTO public.products (id, name, description, category, price, sku, image_url)
       VALUES (COALESCE($1, gen_random_uuid()::text), $2, $3, $4, $5, $6, $7)
       ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description,
       category = EXCLUDED.category, price = EXCLUDED.price, sku = EXCLUDED.sku,
       image_url = EXCLUDED.image_url, updated_at = now()
       RETURNING id`,
      [
        input.id ?? null,
        input.name.trim(),
        input.description.trim(),
        input.category.trim(),
        input.price,
        input.sku.trim(),
        input.imageUrl?.trim() || null,
      ],
    )
    await client.query(
      `INSERT INTO public.inventory (product_id, quantity, reorder_level)
       VALUES ($1, $2, $3)
       ON CONFLICT (product_id) DO UPDATE SET quantity = EXCLUDED.quantity, reorder_level = EXCLUDED.reorder_level, updated_at = now()`,
      [product.rows[0].id, input.quantity, input.reorderLevel ?? 5],
    )
    await client.query('COMMIT')
    revalidatePath('/admin/products')
    revalidatePath('/products')
    return product.rows[0].id
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}

export async function deleteProduct(productId: string) {
   await requireAdmin()
  await pool.query(`UPDATE public.products SET is_active = false, updated_at = now() WHERE id = $1`, [productId])
  revalidatePath('/admin/products')
  revalidatePath('/products')
}

export async function listAdminOrders() {
    await requireAdmin()
  const result = await pool.query(`
    SELECT o.id, o.status, o.payment_status AS "paymentStatus", o.total_amount::float8 AS "totalAmount",
           o.delivery_address AS "deliveryAddress", o.created_at AS "createdAt",
           c.full_name AS "customerName", c.phone
    FROM public.orders o
    LEFT JOIN public.customers c ON c.id = o.customer_id
    ORDER BY o.created_at DESC
  `)
  return result.rows
}

export async function updateOrderStatus(orderId: string, status: 'pending' | 'confirmed' | 'processing' | 'ready' | 'completed' | 'cancelled') {
  await requireAdmin()
  await pool.query(`UPDATE public.orders SET status = $1, updated_at = now() WHERE id = $2`, [status, orderId])
  revalidatePath('/admin/orders')
  revalidatePath('/admin/dashboard')
}

export async function listAdminCustomers() {
  await requireAdmin()
  const result = await pool.query(`
    SELECT c.id, c.full_name AS "fullName", c.email, c.phone, c.delivery_address AS "deliveryAddress",
           c.created_at AS "createdAt", COUNT(o.id)::int AS "orderCount",
           COALESCE(SUM(o.total_amount), 0)::float8 AS "totalSpent"
    FROM public.customers c
    LEFT JOIN public.orders o ON o.customer_id = c.id
    GROUP BY c.id
    ORDER BY c.created_at DESC
  `)
  return result.rows
}

export async function createWhatsAppOrder(input: {
  fullName: string
  phone: string
  address: string
  whatsappNumber: string
  items: CheckoutItem[]
}) {
  if (!input.fullName.trim() || !input.phone.trim() || !input.address.trim()) {
    throw new Error('Customer information is required')
  }
  if (!input.items.length) throw new Error('Your cart is empty')

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const ids = input.items.map((item) => item.id)
    const products = await client.query(
      `SELECT p.id, p.name, p.price::float8 AS price, COALESCE(i.quantity, 0)::int AS stock
       FROM public.products p
       LEFT JOIN public.inventory i ON i.product_id = p.id
       WHERE p.id = ANY($1::text[]) AND p.is_active = true
       FOR UPDATE OF p`,
      [ids],
    )

    if (products.rows.length !== ids.length) throw new Error('One or more products are unavailable')

    const productMap = new Map(products.rows.map((product) => [product.id, product]))
    let total = 0
    const orderItems = input.items.map((item) => {
      const product = productMap.get(item.id)
      if (!product || !Number.isInteger(item.quantity) || item.quantity <= 0) throw new Error('Invalid order quantity')
      if (item.quantity > product.stock) throw new Error(`${product.name} is out of stock`)
      const lineTotal = product.price * item.quantity
      total += lineTotal
      return { ...product, quantity: item.quantity, lineTotal }
    })

    const existingCustomer = await client.query(
      `SELECT id FROM public.customers WHERE phone = $1 LIMIT 1`,
      [input.phone.trim()],
    )
    const customer = existingCustomer.rows[0] ?? (await client.query(
      `INSERT INTO public.customers (full_name, phone, delivery_address)
       VALUES ($1, $2, $3) RETURNING id`,
      [input.fullName.trim(), input.phone.trim(), input.address.trim()],
    )).rows[0]

    await client.query(
      `UPDATE public.customers SET full_name = $1, delivery_address = $2, updated_at = now() WHERE id = $3`,
      [input.fullName.trim(), input.address.trim(), customer.id],
    )

    const order = await client.query(
      `INSERT INTO public.orders (customer_id, whatsapp_number, total_amount, delivery_address)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [customer.id, input.whatsappNumber, total, input.address.trim()],
    )

    for (const item of orderItems) {
      await client.query(
        `INSERT INTO public.order_items (order_id, product_id, product_name, unit_price, quantity, line_total)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [order.rows[0].id, item.id, item.name, item.price, item.quantity, item.lineTotal],
      )
      await client.query(
        `UPDATE public.inventory SET quantity = quantity - $1, updated_at = now() WHERE product_id = $2`,
        [item.quantity, item.id],
      )
    }

    await client.query('COMMIT')
    revalidatePath('/admin/dashboard')
    revalidatePath('/admin/orders')
    return { orderId: order.rows[0].id, total, items: orderItems }
  } catch (error) {
    await client.query('ROLLBACK')
    throw error
  } finally {
    client.release()
  }
}
