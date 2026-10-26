'use client'

import { useState, useMemo, Suspense } from "react"
import { Search, Grid, Filter } from "lucide-react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { useCatalog } from "@/lib/use-catalog"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { staggerContainerVariants, itemVariants } from "@/lib/animations"

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get("category") || "All"
  const { products, loading, error } = useCatalog()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        product.name.toLowerCase().includes(q) || product.description.toLowerCase().includes(q)
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [products, searchQuery, selectedCategory])

  const categoryList = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))],
    [products],
  )

  return (
    <div className="flex flex-col">
      {/* Header */}
      <motion.section
        className="relative py-12 bg-gradient-to-br from-secondary/40 via-secondary/20 to-background overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-80 h-80 bg-yellow-300/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary w-fit border border-primary/30 mb-4">
              <Grid className="h-4 w-4" />
              Product Catalog
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-3">Explore Our Products</h1>
            <p className="text-muted-foreground text-lg">
              Premium industrial electronics and electrical supplies for businesses across Ghana
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="mb-12 flex flex-col gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50 border-muted-foreground/20"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categoryList.map((category) => (
              <motion.div key={category} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary text-primary-foreground" : ""}
                >
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>

          {!loading && (
            <div className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
            </div>
          )}
        </motion.div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground">Loading products…</div>
        ) : error ? (
          <div className="text-center py-16">
            <h3 className="text-lg font-semibold mb-2">We couldn&apos;t load the products</h3>
            <p className="text-muted-foreground">Refresh the page, or message us on WhatsApp to order.</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <Link href={`/products/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <Filter className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">
              {products.length === 0
                ? "Products are coming soon. Check back shortly."
                : "Try adjusting your search or filters"}
            </p>
            {products.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                }}
              >
                Reset filters
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">Loading products...</div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  )
}
