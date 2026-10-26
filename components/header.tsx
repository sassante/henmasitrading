"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, ShoppingCart, X, MessageCircle, Zap } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/store"
import { authClient, useSession } from "@/lib/auth-client"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const items = useCartStore((state) => state.items)
  const { data: session } = useSession()
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="text-base font-bold">Henmasi Trading</span>
              <span className="text-xs text-muted-foreground">Enterprise</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link
                  href={link.href}
                  className="text-sm font-medium px-3 py-2 transition-all hover:text-primary rounded-md hover:bg-primary/5"
                >
                  {link.label}
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-1 left-3 right-3 h-0.5 bg-primary origin-left"
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Side Actions - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white"
                size="sm"
              >
                <a
                  href="https://wa.me/233557713914"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
            </motion.div>

            {session?.user ? (
               <Button variant="outline" size="sm" onClick={() => authClient.signOut().then(() => window.location.reload())}>
                  Sign out
               </Button>
            ) : (
               <Button variant="outline" size="sm" asChild>
                  <Link href="/auth">Sign In</Link>
               </Button>
            )}

            {/* Cart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
            >
              <Button variant="outline" size="icon" asChild className="relative">
                <Link href="/checkout">
                  <ShoppingCart className="h-5 w-5" />
                  {mounted && itemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                    >
                      <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {itemCount}
                      </Badge>
                    </motion.div>
                  )}
                  <span className="sr-only">View cart</span>
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Side Actions - Mobile */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Cart - Mobile */}
            <Button variant="outline" size="icon" asChild className="relative">
              <Link href="/checkout">
                <ShoppingCart className="h-5 w-5" />
                {mounted && itemCount > 0 && (
                  <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">View cart</span>
              </Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0 flex flex-col">
                <div className="flex-1 flex flex-col">
                  {/* Mobile Menu Header */}
                  <div className="border-b px-6 py-4">
                    <h2 className="text-lg font-semibold">Menu</h2>
                  </div>

                  {/* Mobile Navigation Links */}
                  <nav className="flex-1 px-6 py-4 space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block w-full text-left text-base font-medium py-3 px-3 rounded-lg transition-all hover:bg-primary/10 hover:text-primary active:bg-primary/20"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
            {session?.user ? (
               <Button variant="outline" size="sm" onClick={() => authClient.signOut().then(() => window.location.reload())}>
                  Sign out
               </Button>
            ) : (
               <Button variant="outline" size="sm" asChild>
                  <Link href="/auth">Sign In</Link>
               </Button>
            )}

                  {/* Mobile Menu Footer */}
                  <div className="border-t px-6 py-4 space-y-3">
                    <Button
                      asChild
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      size="sm"
                    >
                      <a
                        href="https://wa.me/233557713914"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Chat on WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
