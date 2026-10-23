'use client'

import { useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react'
import { mockProducts, Product } from '@/lib/admin-data'
import { toast } from 'sonner'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [products, setProducts] = useState<Product[]>(mockProducts)

  const categories = Array.from(new Set(products.map((p) => p.category)))

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id))
    setDeleteId(null)
    toast.success('Product deleted successfully')
  }

  const handleAddProduct = () => {
    toast.info('Add product modal would open here')
  }

  const handleEdit = (id: string) => {
    toast.info('Edit product modal would open for product ' + id)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by product name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === null ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className={selectedCategory === null ? 'bg-yellow-500 text-gray-900' : ''}
                >
                  All Categories
                </Button>
                {categories.map((cat) => (
                  <Button
                    key={cat}
                    variant={selectedCategory === cat ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(cat)}
                    className={selectedCategory === cat ? 'bg-yellow-500 text-gray-900' : ''}
                  >
                    {cat}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Product List ({filteredProducts.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Product</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">SKU</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Price</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Stock</th>
                    <th className="px-4 py-3 text-center font-semibold text-gray-900">Status</th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product) => {
                    const isLowStock = product.stock <= product.minStock
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.description}</p>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline">{product.category}</Badge>
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">
                          {product.sku}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          GH₵{product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`font-semibold ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}
                          >
                            {product.stock}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {isLowStock ? (
                            <div className="flex items-center justify-center gap-1 text-orange-600">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-xs">Low Stock</span>
                            </div>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">In Stock</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(product.id)}
                            >
                              <Edit2 className="h-4 w-4 text-blue-600" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(product.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No products found matching your filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Delete Confirmation */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Product</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this product? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  )
}
