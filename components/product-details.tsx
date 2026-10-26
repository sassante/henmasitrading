'use client'

import { useCartStore } from '@/lib/store'
import { useWishlistStore } from '@/lib/wishlist-store'
import { useCatalog } from '@/lib/use-catalog'
import { ArrowLeft, ShoppingCart, Heart, Minus, Plus, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { useState } from 'react'
import { staggerContainerVariants, itemVariants } from '@/lib/animations'

export function ProductDetails({ productId }: { productId: string }) {
  const { products, loading } = useCatalog()
  const product = products.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()
  const isWishlisted = wishlistItems.some((item) => item.id === productId)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">
        Loading product…
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <p className="text-muted-foreground mb-6">It may have been removed or is no longer available.</p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    // addItem adds one at a time, so repeat it for the chosen quantity
    for (let i = 0; i < quantity; i++) addItem(product)
    toast.success(`Added ${quantity} × ${product.name} to cart`)
    setQuantity(1)
  }

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(productId)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist')
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: product.name, url })
      } else {
        await navigator.clipboard.writeText(url)
        toast.success('Link copied')
      }
    } catch {
      // The person closed the share sheet; nothing to do
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col"
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
          <Link href="/products" className="flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:grid-cols-2 mb-16"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Product image */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center bg-muted rounded-lg h-96 relative group overflow-hidden"
          >
            {product.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={product.image} alt={product.name} className="h-full w-full object-contain" />
            ) : (
              <div className="text-9xl text-primary/20 group-hover:text-primary/30 transition-colors">
                {product.name.charAt(0)}
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlist}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`absolute top-4 right-4 p-3 rounded-full ${
                isWishlisted ? 'bg-red-500 text-white' : 'bg-white/80 text-red-500 hover:bg-white'
              } transition-colors backdrop-blur-sm`}
            >
              <Heart className="h-6 w-6" fill={isWishlisted ? 'currentColor' : 'none'} />
            </motion.button>
          </motion.div>

          {/* Product info */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center gap-6">
            <div>
              {product.category && (
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                  {product.category}
                </span>
              )}
              <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-primary">GH₵{product.price.toFixed(2)}</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description ||
                  `High-quality ${product.category.toLowerCase()} designed for industrial applications.`}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">Specifications</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Industrial Grade Quality</li>
                <li>• International Safety Standards</li>
                <li>• 1 Year Warranty</li>
                <li>• Bulk Discounts Available</li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2 border rounded-lg p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1 hover:bg-muted rounded"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 font-semibold min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1 hover:bg-muted rounded"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                  <Button size="lg" className="w-full bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
                <Button size="lg" variant="outline" className="px-6" onClick={handleShare} aria-label="Share">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Need bulk pricing?</span> Contact us on WhatsApp or call for
                special quotes on large orders.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((related) => (
                <motion.div key={related.id} whileHover={{ y: -5 }}>
                  <Link href={`/products/${related.id}`}>
                    <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
                      <div className="h-40 bg-muted flex items-center justify-center text-5xl text-primary/20">
                        {related.name.charAt(0)}
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2 line-clamp-2">{related.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{related.category}</p>
                        <p className="font-bold text-primary">GH₵{related.price.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
