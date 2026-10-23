'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Search, Mail, Phone, MapPin, ShoppingBag, TrendingUp } from 'lucide-react'
import { mockCustomers, Customer } from '@/lib/admin-data'
import { toast } from 'sonner'

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery) ||
    customer.location.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleContact = (phone: string, name: string) => {
    toast.info(`Would contact ${name} at ${phone}`)
  }

  const totalCustomerValue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgOrderValue = (totalCustomerValue / customers.reduce((sum, c) => sum + c.totalOrders, 0)).toFixed(2)

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage and view customer information</p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Customers</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{customers.length}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Badge className="bg-blue-600">📊</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">GH₵{totalCustomerValue.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <Badge className="bg-green-600">💰</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Avg Order Value</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">GH₵{avgOrderValue}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, phone, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Customers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <Card key={customer.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{customer.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {customer.id}
                      </Badge>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {customer.totalOrders} orders
                    </Badge>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-2 border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span className="font-mono">{customer.phone}</span>
                    </div>
                    {customer.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-700">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="truncate">{customer.email}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{customer.location}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 border-t border-gray-200 pt-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Total Spent</p>
                      <p className="font-bold text-gray-900">GH₵{customer.totalSpent.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Joined</p>
                      <p className="font-bold text-gray-900 text-sm">
                        {customer.joinDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <Button
                    onClick={() => handleContact(customer.phone, customer.name)}
                    className="w-full bg-yellow-500 text-gray-900 hover:bg-yellow-600 text-sm"
                  >
                    Contact via WhatsApp
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCustomers.length === 0 && (
          <Card className="border-0 shadow-sm">
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">No customers found matching your search</p>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  )
}
