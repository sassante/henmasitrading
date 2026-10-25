'use client'

import { useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Mail, Phone, MapPin, TrendingUp, Users, Wallet } from 'lucide-react'
import { toast } from 'sonner'
import { listAdminCustomers } from '@/lib/commerce-actions'

type AdminCustomer = {
  id: string
  fullName: string
  email: string | null
  phone: string | null
  deliveryAddress: string | null
  createdAt: string | Date
  orderCount: number
  totalSpent: number
}

// Turns 0201234567 or +233 20 123 4567 into 233201234567 for wa.me links
function toWhatsAppNumber(phone: string) {
  const digits = phone.replace(/\D/g, '')
  if (digits.startsWith('233')) return digits
  if (digits.startsWith('0')) return `233${digits.slice(1)}`
  return digits
}

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [customers, setCustomers] = useState<AdminCustomer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    listAdminCustomers()
      .then((rows) => setCustomers(rows as AdminCustomer[]))
      .catch(() => toast.error('Could not load customers'))
      .finally(() => setLoading(false))
  }, [])

  const q = searchQuery.toLowerCase()
  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(q) ||
      (c.phone ?? '').includes(searchQuery) ||
      (c.deliveryAddress ?? '').toLowerCase().includes(q),
  )

  const totalRevenue = customers.reduce((sum, c) => sum + Number(c.totalSpent), 0)
  const totalOrders = customers.reduce((sum, c) => sum + Number(c.orderCount), 0)
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">People who have placed orders with you</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total customers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{customers.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">GH₵{totalRevenue.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Wallet className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Average order value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">GH₵{avgOrderValue}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, phone, or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-gray-900 text-lg">{customer.fullName}</h3>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {customer.orderCount} {customer.orderCount === 1 ? 'order' : 'orders'}
                    </Badge>
                  </div>

                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    {customer.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="font-mono">{customer.phone}</span>
                      </div>
                    )}
                    {customer.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    )}
                    {customer.deliveryAddress && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span>{customer.deliveryAddress}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total spent</p>
                      <p className="font-bold text-gray-900">GH₵{Number(customer.totalSpent).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Joined</p>
                      <p className="font-bold text-gray-900 text-sm">
                        {new Date(customer.createdAt).toLocaleDateString('en-GB', {
                          month: 'short',
                          year: 'numeric',
                        })}
                      </p>
                    </div>
                  </div>

                  {customer.phone && (
                    <Button
                      asChild
                      className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 text-sm"
                    >
                      <a
                        href={`https://wa.me/${toWhatsAppNumber(customer.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Message on WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {loading && <p className="text-center py-8 text-gray-500">Loading customers…</p>}
        {!loading && filteredCustomers.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                {customers.length === 0
                  ? 'No customers yet. They appear here after their first order.'
                  : 'No customers match your search'}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
