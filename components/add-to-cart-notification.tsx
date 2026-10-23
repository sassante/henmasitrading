'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, ArrowRight, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface AddToCartNotificationProps {
  productName: string
  isOpen: boolean
  onClose: () => void
}

export function AddToCartNotification({
  productName,
  isOpen,
  onClose,
}: AddToCartNotificationProps) {
  useEffect(() => {
    if (!isOpen) return

    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 100, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-6 right-6 z-50 max-w-sm"
    >
      <div className="bg-white dark:bg-slate-950 rounded-lg shadow-2xl border border-gray-200 dark:border-slate-800 overflow-hidden">
        {/* Top accent bar */}
        <div className="h-1 bg-gradient-to-r from-primary to-green-500" />

        {/* Content */}
        <div className="p-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="p-3 rounded-full bg-green-100 dark:bg-green-950">
              <ShoppingCart className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Added to cart</h3>
              <p className="text-sm text-muted-foreground">{productName}</p>
            </div>
          </motion.div>

          {/* Buttons */}
          <div className="flex gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1"
            >
              <Button
                asChild
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/checkout" onClick={onClose}>
                  Go to Cart
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <X className="h-4 w-4" />
            </motion.button>
          </div>

          {/* Progress bar */}
          <motion.div
            className="h-1 bg-primary mt-4 rounded-full"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 5, ease: 'linear' }}
            style={{ originX: 0 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
