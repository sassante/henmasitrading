'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Zap, Mail, Lock, User, Phone, MapPin } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { authClient } from '@/lib/auth-client'

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match')
          return
        }

        const { data, error } = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: formData.fullName,
        })

        if (error) {
          toast.error(error.message || 'Unable to create your account')
          return
        }

        toast.success(`Welcome to Henmasi Trading, ${data.user.name}`)
        router.push('/')
        router.refresh()
      } else {
        const { data, error } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        })

        if (error) {
          toast.error('Invalid email or password')
          return
        }

        toast.success(`Welcome back, ${data.user.name}`)
        router.push('/')
        router.refresh()
      }
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none text-left">
              <span className="text-lg font-bold">Henmasi</span>
              <span className="text-xs text-muted-foreground">Trading Enterprise</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mt-6 mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-muted-foreground">
            {isSignUp
              ? 'Join Henmasi Trading and start shopping'
              : 'Sign in to your account to continue'}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex gap-2 p-1 bg-muted rounded-lg mb-4">
              <Button
                variant={!isSignUp ? 'default' : 'ghost'}
                size="sm"
                className="flex-1"
                onClick={() => setIsSignUp(false)}
              >
                Sign In
              </Button>
              <Button
                variant={isSignUp ? 'default' : 'ghost'}
                size="sm"
                className="flex-1"
                onClick={() => setIsSignUp(true)}
              >
                Sign Up
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Sign Up Fields */}
              {isSignUp && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="fullName" className="text-sm font-medium">
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="pl-10"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="+233 XX XXX XXXX"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="address" className="text-sm font-medium">
                      Delivery Address
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        name="address"
                        type="text"
                        placeholder="Your delivery address"
                        value={formData.address}
                        onChange={handleChange}
                        className="pl-10"
                        required={isSignUp}
                      />
                    </div>
                  </motion.div>
                </>
              )}

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isSignUp ? 0.25 : 0.1 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isSignUp ? 0.3 : 0.15 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10"
                    required
                  />
                </div>
                {isSignUp && (
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 6 characters
                  </p>
                )}
              </motion.div>

              {/* Confirm Password Field (Sign Up Only) */}
              {isSignUp && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pl-10"
                      required={isSignUp}
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isSignUp ? 0.4 : 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                >
                  {isLoading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </motion.div>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-muted" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">or continue with</span>
              </div>
            </div>

            {/* Guest Checkout */}
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={() => {
                toast.success('Continuing as guest...')
              }}
            >
              Continue as Guest
            </Button>

            {/* WhatsApp Contact */}
            <Button
              asChild
              variant="outline"
              className="w-full border-green-600 text-green-600 hover:bg-green-50"
            >
              <a
                href="https://wa.me/233201234567"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Help on WhatsApp
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          {!isSignUp && (
            <>
              Don&apos;t have an account?{' '}
              <button
                onClick={() => setIsSignUp(true)}
                className="text-primary font-medium hover:underline"
              >
                Sign up here
              </button>
            </>
          )}
          {isSignUp && (
            <>
              Already have an account?{' '}
              <button
                onClick={() => setIsSignUp(false)}
                className="text-primary font-medium hover:underline"
              >
                Sign in here
              </button>
            </>
          )}
        </p>

        {/* Back to Home */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          <Link href="/" className="text-primary font-medium hover:underline">
            ← Back to Home
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
