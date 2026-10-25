'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, AlertTriangle, Package, ShoppingCart, TrendingUp, Users } from 'lucide-react'
import { toast } from 'sonner'
import { listAdminOrders, listProducts } from '@/lib/commerce-actions'
import type { CatalogProduct } from '@/lib/commerce-actions'

type RecentOrder = {
  id: string
  status: string
  totalAmount: number
  createdAt: string | Date
  customerName: string | null
}

const statusLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export default function AdminDashboard() {
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([listAdminOrders(), listProducts()])
      .then(([ord, prod]) => {
        setOrders(ord as RecentOrder[])
        setProducts(prod)
      })
      .catch(() => toast.error('Could not load the dashboard'))
      .finally(() => setLoading(false))
  }, [])

  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const lowStockProducts = products.filter((p) => p.quantity <= p.reorderLevel)
  const recentOrders = orders.slice(0, 5)
  const totalRevenue = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0)

  const stats = [
    {
      label: 'Total products',
      value: products.length,
      icon: Package,
      tint: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Total orders',
      value: orders.length,
      icon: ShoppingCart,
      tint: 'bg-green-100 text-green-600',
    },
    {
      label: 'Total revenue',
      value: `GH₵${totalRevenue.toFixed(2)}`,
      icon: TrendingUp,
      tint: 'bg-yellow-100 text-yellow-600',
    },
    {
      label: 'Pending orders',
      value: pendingOrders,
      icon: AlertTriangle,
      tint: 'bg-orange-100 text-orange-600',
    },
    {
      label: 'Total customers',
      value: '—',
      icon: Users,
      tint: 'bg-purple-100 text-purple-600',
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            {loading ? 'Loading your numbers…' : "Here's how your store is doing."}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.tint}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {lowStockProducts.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg">Low stock</CardTitle>
                </div>
                <Badge variant="destructive">{lowStockProducts.length} items</Badge>
              </div>
              <CardDescription>Products at or below their reorder level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between text-sm p-2 bg-white rounded border border-orange-100"
                  >
                    <span className="font-medium text-gray-900">{product.name}</span>
                    <span className="text-orange-600 font-semibold">
                      {product.quantity} left (reorder at {product.reorderLevel})
                    </span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4" size="sm">
                <Link href="/admin/products">Manage products</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent orders</CardTitle>
                <CardDescription>Latest orders from your store</CardDescription>
              </div>
              <Button asChild variant="ghost" size="sm">
                <Link href="/admin/orders">
                  View all
                  <ArrowUpRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Order</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{order.customerName ?? 'Unknown'}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        GH₵{Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            order.status === 'completed'
                              ? 'secondary'
                              : order.status === 'pending'
                                ? 'destructive'
                                : 'default'
                          }
                        >
                          {statusLabel(order.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {!loading && recentOrders.length === 0 && (
              <p className="text-center py-8 text-gray-500">
                No orders yet. They appear here when customers check out.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
