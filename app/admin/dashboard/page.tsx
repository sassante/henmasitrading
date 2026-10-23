'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, AlertTriangle, Package, ShoppingCart, TrendingUp, Eye } from 'lucide-react'
import { mockOrders, mockProducts, mockCustomers } from '@/lib/admin-data'
import Link from 'next/link'

export default function AdminDashboard() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending && !session?.user) router.replace('/admin/login')
  }, [isPending, router, session?.user])

  if (isPending || !session?.user) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking access…</div>
  }

  // Calculate statistics
  const totalProducts = mockProducts.length
  const totalOrders = mockOrders.length
  const totalRevenue = mockOrders
    .filter((o) => o.status !== 'cancelled')
    .reduce((sum, order) => sum + order.totalAmount, 0)
  const pendingOrders = mockOrders.filter((o) => o.status === 'pending').length
  const lowStockProducts = mockProducts.filter((p) => p.stock <= p.minStock)
  const totalCustomers = mockCustomers.length

  // Recent orders (last 5)
  const recentOrders = mockOrders.slice(0, 5)

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here&apos;s your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Products */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Products</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalProducts}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Orders */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalOrders}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <ShoppingCart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">GH₵{totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Pending Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{pendingOrders}</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Customers */}
          <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Customers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{totalCustomers}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Eye className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Low Stock Alert */}
        {lowStockProducts.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <CardTitle className="text-lg">Low Stock Alert</CardTitle>
                </div>
                <Badge variant="destructive">{lowStockProducts.length} items</Badge>
              </div>
              <CardDescription>Products below minimum stock levels</CardDescription>
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
                      {product.stock}/{product.minStock}
                    </span>
                  </div>
                ))}
              </div>
              <Button asChild variant="outline" className="w-full mt-4" size="sm">
                <Link href="/admin/products">View all products</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Recent Orders */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
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
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Order ID</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Amount</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-900">{order.id}</td>
                      <td className="px-4 py-3 text-gray-700">{order.customerName}</td>
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        GH₵{order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            order.status === 'delivered'
                              ? 'secondary'
                              : order.status === 'pending'
                                ? 'destructive'
                                : 'default'
                          }
                        >
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
