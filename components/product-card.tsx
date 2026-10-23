"use client"

import { Zap, ShoppingCart, Check, Heart, Eye } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCartStore, type Product } from "@/lib/store"
import { useWishlistStore } from "@/lib/wishlist-store"
import { AddToCartNotification } from "@/components/add-to-cart-notification"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [added, setAdded] = useState(false)
  const isWishlisted = wishlistItems.some(item => item.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    setNotificationOpen(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  return (
    <>
      <AddToCartNotification
        productName={product.name}
        isOpen={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      />
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
      <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-all">
        {/* Image Section */}
        <div className="aspect-square bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-6xl text-primary/20 group-hover:text-primary/30 transition-colors">
            {product.name.charAt(0)}
          </div>

          {/* Wishlist Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleWishlist}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full ${
              isWishlisted
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-red-500 hover:bg-white'
            } transition-colors backdrop-blur-sm`}
          >
            <Heart className="h-5 w-5" fill={isWishlisted ? 'currentColor' : 'none'} />
          </motion.button>

          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-3 z-10"
          >
            <span className="text-xs font-medium bg-primary text-primary-foreground px-2 py-1 rounded-full">
              {product.category}
            </span>
          </motion.div>
        </div>

        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between mb-4">
            <p className="text-lg font-bold text-primary">
              GH₵ {product.price.toFixed(2)}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
              >
                <Eye className="mr-2 h-4 w-4" />
                View
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button 
                onClick={handleAddToCart} 
                size="sm" 
                className="w-full"
                variant={added ? "secondary" : "default"}
              >
                {added ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Added
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
      </motion.div>
    </>
  )
}
