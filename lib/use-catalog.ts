'use client'

import { useEffect, useState } from 'react'
import { listProducts } from '@/lib/commerce-actions'
import { useCartStore, type Product } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlist-store'

// Loads the live product list from the database in the shape the store pages expect.
export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let active = true

    listProducts()
      .then((rows) => {
        if (!active) return

        const mapped: Product[] = rows.map((row) => ({
          id: row.id,
          name: row.name,
          price: row.price,
          description: row.description ?? '',
          category: row.category ?? '',
          image: row.imageUrl ?? '',
        }))
        setProducts(mapped)

        // Remove cart and wishlist entries for products that no longer exist
        // (for example, the old sample products with ids like "1" and "2").
        const liveIds = new Set(mapped.map((p) => p.id))
        const cart = useCartStore.getState()
        cart.items.filter((i) => !liveIds.has(i.id)).forEach((i) => cart.removeItem(i.id))
        const wishlist = useWishlistStore.getState()
        wishlist.items.filter((i) => !liveIds.has(i.id)).forEach((i) => wishlist.removeItem(i.id))
      })
      .catch(() => {
        if (active) setError(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return { products, loading, error }
}
