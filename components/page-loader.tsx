'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoading) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-secondary to-secondary/80"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity },
          }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-primary"
        >
          <Zap className="h-10 w-10 text-secondary" />
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <p className="text-lg font-semibold text-primary">Henmasi Trading</p>
          <p className="text-sm text-muted-foreground">Loading premium electronics...</p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 200 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="h-1 bg-primary rounded-full"
        />
      </div>
    </motion.div>
  )
}
