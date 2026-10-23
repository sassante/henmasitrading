'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: string
  label: string
  delay?: number
}

export function AnimatedCounter({ value, label, delay = 0 }: AnimatedCounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })
  const [displayValue, setDisplayValue] = useState('0')

  // Extract numeric value from string (e.g., "10+" -> 10, "5000+" -> 5000)
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
  const suffix = value.replace(/[0-9]/g, '')

  useEffect(() => {
    if (!isInView) return

    let animationFrameId: number
    let currentValue = 0
    const increment = numericValue / 50 // Divide into 50 steps for smooth animation
    const duration = 2000 // 2 seconds

    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      currentValue = Math.floor(numericValue * progress)
      setDisplayValue(currentValue.toLocaleString())

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setDisplayValue(numericValue.toLocaleString())
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [isInView, numericValue])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
        {displayValue}{suffix}
      </div>
      <p className="text-muted-foreground text-sm lg:text-base">{label}</p>
    </motion.div>
  )
}
