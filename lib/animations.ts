'use client'

import { motion } from 'framer-motion'

// Animation variants for reuse
export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

export const slideInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
}

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

// Hover effects
export const hoverScale = {
  whileHover: { scale: 1.05 },
  transition: { duration: 0.2 },
}

export const hoverLift = {
  whileHover: { y: -5 },
  transition: { duration: 0.2 },
}

export const hoverGlow = {
  whileHover: { boxShadow: '0 10px 30px rgba(255, 193, 7, 0.2)' },
}

// Scroll animations
export const useScrollAnimation = () => {
  return {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.3 },
  }
}
