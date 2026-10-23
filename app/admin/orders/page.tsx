'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Eye, CheckCircle, XCircle, Truck } from 'lucide-react'
import { mockOrders, Order } from '@/lib/admin-data'
import { toast } from 'sonner'

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const statuses = ['pending', 'confirmed', 'processing', 'delivered', 'cancelled']

  const filteredOrders = selectedStatus
    ? orders.filter((o) => o.status === selectedStatus)
    : orders

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(
      orders.map((o) =>
        o.id === orderId ? { ...o, status: newStatus as Order['status'] } : o
      )
    )
    toast.success(`Order status updated to ${newStatus}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'destructive'
      case 'confirmed':
        return 'secondary'
      case 'processing':
        return 'default'
      case 'delivered':
        return 'secondary'
      case 'cancelled':
        return 'outline'
      default:
        return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return '⏳'
      case 'confirmed':
        return '✓'
      case 'processing':
        return '⚙️'
      case 'delivered':
        return '✅'
      case 'cancelled':
        return '✕'
      default:
        return '•'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Manage customer orders and track shipments</p>
        </div>

        {/* Status Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(null)}
                className={selectedStatus === null ? 'bg-yellow-500 text-gray-900' : ''}
              >
                All Orders
              </Button>
              {statuses.map((status) => {
                const count = orders.filter((o) => o.status === status).length
                return (
                  <Button
                    key={status}
                    variant={selectedStatus === status ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedStatus(status)}
                    className={selectedStatus === status ? 'bg-yellow-500 text-gray-900' : ''}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)} ({count})
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Order ID</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Location</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Amount</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-900">{order.id}</p>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-gray-900">{order.customerName}</p>
                          <p className="text-xs text-gray-500">{order.customerPhone}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{order.deliveryLocation}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        GH₵{order.totalAmount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={getStatusColor(order.status) as any}>
                          <span className="mr-1">{getStatusIcon(order.status)}</span>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => toast.info('View order details')}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'confirmed')}
                              disabled={order.status === 'confirmed'}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Confirm
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'processing')}
                              disabled={order.status === 'processing'}
                            >
                              <Truck className="h-4 w-4 mr-2" />
                              Mark Processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'delivered')}
                              disabled={order.status === 'delivered'}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark Delivered
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel Order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No orders found with selected filters</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
