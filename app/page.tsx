'use client'

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Zap, Shield, Truck, Headphones, Timer, ToggleLeft, Gauge, Lightbulb, Box, CircuitBoard, Eye, Heart } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { products } from "@/lib/products"
import { fadeInVariants, slideInVariants, staggerContainerVariants, itemVariants, useScrollAnimation } from "@/lib/animations"

const categories = [
  {
    name: "Timers & Relays",
    description: "Digital and mechanical timing solutions",
    icon: Timer,
    href: "/products?category=Timers",
  },
  {
    name: "Contactors",
    description: "AC contactors for motor control",
    icon: ToggleLeft,
    href: "/products?category=Contactors",
  },
  {
    name: "Panel Lights",
    description: "Manual and digital indicators",
    icon: Lightbulb,
    href: "/products?category=Panel%20Lights",
  },
  {
    name: "Trunking",
    description: "Cable management solutions",
    icon: Box,
    href: "/products?category=Trunking",
  },
  {
    name: "Circuit Breakers",
    description: "MCBs, MCCBs, and protection devices",
    icon: CircuitBoard,
    href: "/products?category=Circuit%20Breakers",
  },
  {
    name: "Relays",
    description: "Solid state and thermal relays",
    icon: Gauge,
    href: "/products?category=Relays",
  },
]

const features = [
  {
    icon: Shield,
    title: "Quality Guaranteed",
    description: "All products meet international safety standards and come with warranty",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery within Accra, nationwide shipping available",
  },
  {
    icon: Headphones,
    title: "Expert Support",
    description: "Technical assistance from our experienced electrical engineers",
  },
  {
    icon: Zap,
    title: "Competitive Prices",
    description: "Best prices for industrial-grade electrical equipment in Ghana",
  },
]

const featuredProducts = products.slice(0, 4)

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-bg.jpg"
            alt="Industrial electronics workshop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/95 via-secondary/80 to-secondary/40" />
        </div>

        {/* Animated Elements */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl" />
        </motion.div>
        
        <div className="container relative z-10 mx-auto px-4 py-20 lg:py-28">
          <motion.div
            className="max-w-2xl"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary w-fit border border-primary/30"
            >
              <Zap className="h-4 w-4" />
              Industrial Electronics Supplier
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl text-balance mt-4"
            >
              Powering Ghana&apos;s Industries
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-200 max-w-lg leading-relaxed mt-4"
            >
              Your trusted partner for quality industrial electronics. Timers, relays, contactors, panel lights, trunking and more for commercial and industrial projects.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 pt-2 mt-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/products">
                    Browse Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                  <Link href="/contact">
                    Contact Us
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">Product Categories</h2>
            <p className="text-muted-foreground max-w-2xl">Explore our comprehensive range of industrial electronics and electrical supplies</p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {categories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <motion.div
                  key={category.href}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={category.href}>
                    <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
                      <CardContent className="p-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">Best Sellers</h2>
            <p className="text-muted-foreground max-w-2xl">Most popular products trusted by businesses across Ghana</p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                    <div className="absolute inset-0 flex items-center justify-center text-6xl text-primary/20 group-hover:text-primary/40 transition-colors">
                      {product.name.charAt(0)}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-red-500 backdrop-blur-sm transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="h-5 w-5" />
                    </motion.button>
                  </div>

                  <CardContent className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{product.category}</p>
                    <p className="font-bold text-lg text-primary mb-4">GH₵{product.price.toFixed(2)}</p>

                    <div className="flex gap-2">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link href={`/products/${product.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1"
                      >
                        <Button size="sm" className="w-full bg-primary hover:bg-primary/90">
                          Add to Cart
                        </Button>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Button asChild size="lg" variant="outline">
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">Why Choose Henmasi?</h2>
            <p className="text-muted-foreground max-w-2xl">Leading provider of quality electrical solutions</p>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-start"
                >
                  <motion.div
                    className="p-3 rounded-lg bg-primary/10 mb-4"
                    whileHover={{ backgroundColor: 'rgb(255, 193, 7, 0.2)', scale: 1.1 }}
                  >
                    <IconComponent className="h-6 w-6 text-primary" />
                  </motion.div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-secondary/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-300 rounded-full translate-y-1/2 translate-x-1/2" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Power Your Business?</h2>
            <p className="text-lg text-gray-200 mb-6">Contact our team for bulk orders, customized solutions, and competitive pricing</p>

            <div className="flex flex-wrap gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/contact">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <a href="https://wa.me/233201234567" target="_blank" rel="noopener noreferrer">
                    WhatsApp Us
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
