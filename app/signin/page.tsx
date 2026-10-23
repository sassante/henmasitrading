'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, LogIn } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Signed in successfully!')
      setFormData({ email: '', password: '', rememberMe: false })
    } catch (error) {
      toast.error('Sign in failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ y: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative flex flex-col flex-1 items-center justify-center px-4 py-12">
        <motion.div
          className="w-full max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-lg font-bold">Henmasi</span>
                <span className="text-xs text-muted-foreground">Trading Enterprise</span>
              </div>
            </Link>

            <h1 className="text-3xl lg:text-4xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your account to continue</p>
          </motion.div>

          {/* Sign In Card */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-background/80 backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Email Field */}
                <motion.div className="space-y-2" variants={itemVariants}>
                  <Label htmlFor="email" className="text-sm font-semibold">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="pl-10 h-11"
                      disabled={isLoading}
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div className="space-y-2" variants={itemVariants}>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-semibold">
                      Password
                    </Label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-11"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3.5 text-muted-foreground hover:text-foreground transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Remember Me */}
                <motion.div
                  className="flex items-center space-x-2"
                  variants={itemVariants}
                >
                  <Checkbox
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) =>
                      setFormData(prev => ({
                        ...prev,
                        rememberMe: checked === true,
                      }))
                    }
                    disabled={isLoading}
                  />
                  <Label
                    htmlFor="rememberMe"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me
                  </Label>
                </motion.div>

                {/* Sign In Button */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin mr-2">
                          <Zap className="h-4 w-4" />
                        </div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <LogIn className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>

              {/* Divider */}
              <div className="px-8 pt-2 pb-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-background text-muted-foreground">or</span>
                  </div>
                </div>
              </div>

              {/* No Account Link */}
              <div className="px-8 pb-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    className="font-semibold text-primary hover:underline"
                  >
                    Create one
                  </Link>
                </p>
              </div>
            </Card>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className="text-center mt-8"
            variants={itemVariants}
          >
            <p className="text-xs text-muted-foreground mb-4">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="text-xs"
              >
                <Link href="/contact">
                  Email Support
                </Link>
              </Button>
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white text-xs"
                size="sm"
              >
                <a
                  href="https://wa.me/233201234567"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
