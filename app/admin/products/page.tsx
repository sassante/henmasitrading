'use client'

import { useCallback, useEffect, useState } from 'react'
import { AdminLayout } from '@/components/admin-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Plus, Search, Edit2, Trash2, AlertCircle } from 'lucide-react'
import { toast } from 'sonner'
import { listProducts, upsertProduct, deleteProduct } from '@/lib/commerce-actions'
import type { CatalogProduct } from '@/lib/commerce-actions'

type FormState = {
  id?: string
  name: string
  description: string
  category: string
  price: string
  sku: string
  quantity: string
  reorderLevel: string
  imageUrl: string
}

const emptyForm: FormState = {
  name: '',
  description: '',
  category: '',
  price: '',
  sku: '',
  quantity: '0',
  reorderLevel: '5',
  imageUrl: '',
}

export default function ProductsPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [form, setForm] = useState<FormState>(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    try {
      setProducts(await listProducts())
    } catch {
      toast.error('Could not load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))

  const filteredProducts = products.filter((product) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(q) || product.sku.toLowerCase().includes(q)
    const matchesCategory = !selectedCategory || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const openAdd = () => {
    setForm(emptyForm)
    setFormOpen(true)
  }

  const openEdit = (product: CatalogProduct) => {
    setForm({
      id: product.id,
      name: product.name,
      description: product.description ?? '',
      category: product.category ?? '',
      price: String(product.price),
      sku: product.sku,
      quantity: String(product.quantity),
      reorderLevel: String(product.reorderLevel),
      imageUrl: product.imageUrl ?? '',
    })
    setFormOpen(true)
  }

  const setField = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSave = async () => {
    const price = Number(form.price)
    const quantity = Number(form.quantity)
    const reorderLevel = Number(form.reorderLevel)

    if (!form.name.trim()) return toast.error('Enter a product name')
    if (!form.sku.trim()) return toast.error('Enter a SKU')
    if (!Number.isFinite(price) || price < 0) return toast.error('Enter a valid price')
    if (!Number.isInteger(quantity) || quantity < 0) return toast.error('Stock must be a whole number')
    if (!Number.isInteger(reorderLevel) || reorderLevel < 0)
      return toast.error('Reorder level must be a whole number')

    setSaving(true)
    try {
      await upsertProduct({
        id: form.id,
        name: form.name,
        description: form.description,
        category: form.category,
        price,
        sku: form.sku,
        quantity,
        reorderLevel,
      })
      toast.success(form.id ? 'Product updated' : 'Product added')
      setFormOpen(false)
      await load()
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      toast.error(
        message.includes('products_sku_key')
          ? 'That SKU is already used by another product'
          : 'Could not save the product',
      )
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      toast.success('Product removed')
      setDeleteId(null)
      await load()
    } catch {
      toast.error('Could not remove the product')
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory</p>
          </div>
          <Button onClick={openAdd} className="bg-yellow-500 text-gray-900 hover:bg-yellow-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by product name or SKU..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-gray-200"
                />
              </div>
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
                    const isLowStock = product.quantity <= product.reorderLevel
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.description}</p>
                        </td>
                        <td className="px-4 py-3">
                          {product.category && <Badge variant="outline">{product.category}</Badge>}
                        </td>
                        <td className="px-4 py-3 font-mono text-xs text-gray-600">{product.sku}</td>
                        <td className="px-4 py-3 text-right font-semibold text-gray-900">
                          GH₵{product.price.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`font-semibold ${isLowStock ? 'text-orange-600' : 'text-green-600'}`}
                          >
                            {product.quantity}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          {product.quantity === 0 ? (
                            <Badge variant="destructive">Out of stock</Badge>
                          ) : isLowStock ? (
                            <div className="flex items-center justify-center gap-1 text-orange-600">
                              <AlertCircle className="h-4 w-4" />
                              <span className="text-xs">Low stock</span>
                            </div>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">In stock</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={() => openEdit(product)}>
                              <Edit2 className="h-4 w-4 text-blue-600" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setDeleteId(product.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {loading && <p className="text-center py-8 text-gray-500">Loading products…</p>}
            {!loading && filteredProducts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {products.length === 0
                    ? 'No products yet. Click Add Product to create your first one.'
                    : 'No products match your filters'}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add / edit product */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{form.id ? 'Edit product' : 'Add product'}</DialogTitle>
              <DialogDescription>
                {form.id ? 'Update the details and save.' : 'Fill in the details to list a new product.'}
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Name</label>
                <Input value={form.name} onChange={(e) => setField('name', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <Input
                    list="category-options"
                    value={form.category}
                    onChange={(e) => setField('category', e.target.value)}
                  />
                  <datalist id="category-options">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">SKU</label>
                  <Input value={form.sku} onChange={(e) => setField('sku', e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Price (GH₵)</label>
                  <Input
                    type="number"
                    min="0"
                    step="0.01"
                    value={form.price}
                    onChange={(e) => setField('price', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Stock</label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={form.quantity}
                    onChange={(e) => setField('quantity', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Reorder at</label>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={form.reorderLevel}
                    onChange={(e) => setField('reorderLevel', e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Image link (optional)</label>
                <Input
                  placeholder="https://..."
                  value={form.imageUrl}
                  onChange={(e) => setField('imageUrl', e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)} disabled={saving}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-600"
              >
                {saving ? 'Saving…' : form.id ? 'Save changes' : 'Add product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete confirmation */}
        <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove product</AlertDialogTitle>
              <AlertDialogDescription>
                This hides the product from your store. Past orders keep their record of it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex gap-3">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteId && handleDelete(deleteId)}
                className="bg-red-600 hover:bg-red-700"
              >
                Remove
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  )
}
