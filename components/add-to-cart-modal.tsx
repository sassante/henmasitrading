'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, ChevronRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface AddToCartModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
  quantity: number
}

export function AddToCartModal({ isOpen, onClose, productName, quantity }: AddToCartModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-background rounded-xl shadow-2xl overflow-hidden border border-border">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute right-4 top-4 p-1.5 hover:bg-muted rounded-lg transition-colors z-10"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                {/* Success Icon */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
                  className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                >
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </motion.div>

                {/* Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-xl font-bold mb-2">Item Added!</h3>
                  <p className="text-muted-foreground mb-1">
                    <span className="font-semibold text-foreground">{quantity}x {productName}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">has been added to your cart</p>
                </motion.div>

                {/* Progress Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4, duration: 3 }}
                  onAnimationComplete={onClose}
                  className="h-1 bg-primary mt-6 origin-left"
                />
              </div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-3 p-6 pt-0"
              >
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="flex-1"
                >
                  Continue Shopping
                </Button>
                <Button
                  asChild
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Link href="/checkout" onClick={onClose}>
                    Go to Cart
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
