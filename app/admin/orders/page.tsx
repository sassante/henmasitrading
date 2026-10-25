'use client'

import { useCallback, useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, CheckCircle, XCircle, Truck, Package, ClipboardCheck } from 'lucide-react'
import { toast } from 'sonner'
import { listAdminOrders, updateOrderStatus } from '@/lib/commerce-actions'

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'ready' | 'completed' | 'cancelled'

type AdminOrder = {
  id: string
  status: OrderStatus
  paymentStatus: string
  totalAmount: number
  deliveryAddress: string | null
  createdAt: string | Date
  customerName: string | null
  phone: string | null
}

const statuses: OrderStatus[] = ['pending', 'confirmed', 'processing', 'ready', 'completed', 'cancelled']

const statusLabel = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

const statusVariant = (status: string) => {
  switch (status) {
    case 'pending':
      return 'destructive'
    case 'completed':
    case 'confirmed':
      return 'secondary'
    case 'cancelled':
      return 'outline'
    default:
      return 'default'
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setOrders((await listAdminOrders()) as AdminOrder[])
    } catch {
      toast.error('Could not load orders')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filteredOrders = selectedStatus ? orders.filter((o) => o.status === selectedStatus) : orders

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)))
      toast.success(`Order marked ${newStatus}`)
    } catch {
      toast.error('Could not update the order')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-1">Track WhatsApp orders and update their status</p>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedStatus === null ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedStatus(null)}
                className={selectedStatus === null ? 'bg-yellow-500 text-gray-900' : ''}
              >
                All orders ({orders.length})
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
                    {statusLabel(status)} ({count})
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Order</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Customer</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Delivery address</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Amount</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Date</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-mono text-xs text-gray-900">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{order.customerName ?? 'Unknown'}</p>
                        <p className="text-xs text-gray-500">{order.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{order.deliveryAddress}</td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        GH₵{Number(order.totalAmount).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <Badge variant={statusVariant(order.status) as any}>
                          {statusLabel(order.status)}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Change status</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
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
                              Mark processing
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'ready')}
                              disabled={order.status === 'ready'}
                            >
                              <Package className="h-4 w-4 mr-2" />
                              Mark ready
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'completed')}
                              disabled={order.status === 'completed'}
                            >
                              <ClipboardCheck className="h-4 w-4 mr-2" />
                              Mark completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleStatusChange(order.id, 'cancelled')}
                              disabled={order.status === 'cancelled'}
                              className="text-red-600"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Cancel order
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {loading && <p className="text-center py-8 text-gray-500">Loading orders…</p>}
            {!loading && filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {orders.length === 0
                    ? 'No orders yet. They appear here when customers check out.'
                    : 'No orders with this status'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
