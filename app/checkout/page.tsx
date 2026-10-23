"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, MessageCircle, ShoppingBag, Smartphone, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/store"
import { toast } from "sonner"
import { createWhatsAppOrder } from "@/lib/commerce-actions"

const whatsappLines = [
  {
    id: "line1",
    name: "Sales Line 1",
    number: "233201234567",
    description: "Main sales & inquiries",
  },
  {
    id: "line2",
    name: "Sales Line 2",
    number: "233209876543",
    description: "Bulk orders & contractors",
  },
]

const momoDetails = {
  provider: "MTN Mobile Money",
  number: "0201234567",
  accountName: "Henmasi Trading Enterprise",
}

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false)
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore()
  const [selectedLine, setSelectedLine] = useState(whatsappLines[0].id)
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const generateWhatsAppMessage = () => {
    const selectedWhatsApp = whatsappLines.find((line) => line.id === selectedLine)
    if (!selectedWhatsApp) return ""

    const orderItems = items
      .map((item) => `- ${item.name} x${item.quantity} @ GH₵${item.price.toFixed(2)} = GH₵${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    const message = `
*NEW ORDER - Henmasi Trading Enterprise*
━━━━━━━━━━━━━━━━━━━━━━

*Customer Information:*
Name: ${customerInfo.fullName}
Phone: ${customerInfo.phone}
Delivery Address: ${customerInfo.address}

*Order Details:*
${orderItems}

━━━━━━━━━━━━━━━━━━━━━━
*Total Amount: GH₵${getTotal().toFixed(2)}*

*Payment Method:* MTN Mobile Money
*MoMo Number:* ${momoDetails.number}
*Account Name:* ${momoDetails.accountName}

Please confirm my order and I will proceed with MoMo payment.
    `.trim()

    return encodeURIComponent(message)
  }

  const handleWhatsAppOrder = async () => {
    if (!customerInfo.fullName || !customerInfo.phone || !customerInfo.address) {
      toast.error("Please fill in all customer information")
      return
    }

    if (items.length === 0) {
      toast.error("Your cart is empty")
      return
    }

    const selectedWhatsApp = whatsappLines.find((line) => line.id === selectedLine)
    if (!selectedWhatsApp) return

    const message = generateWhatsAppMessage()
    const whatsappUrl = `https://wa.me/${selectedWhatsApp.number}?text=${message}`

    try {
      await createWhatsAppOrder({
        fullName: customerInfo.fullName,
        phone: customerInfo.phone,
        address: customerInfo.address,
        whatsappNumber: selectedWhatsApp.number,
        items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
      })
      toast.success("Order saved. Opening WhatsApp to complete your order...")
      window.open(whatsappUrl, "_blank")
      clearCart()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save your order")
    }
  }

  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Your cart is empty</h1>
          <p className="mt-2 text-muted-foreground">
            Add some products to your cart to proceed with checkout.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      {/* Back Link */}
      <Link
        href="/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Customer Info & Payment */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-primary" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={customerInfo.fullName}
                  onChange={handleInfoChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={handleInfoChange}
                  placeholder="+233 XX XXX XXXX"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address/Location *</Label>
                <Input
                  id="address"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInfoChange}
                  placeholder="Enter your delivery address or location"
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Mobile Money Payment Instructions */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                Mobile Money Payment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg bg-background p-4 border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-black">
                    MTN
                  </div>
                  <div>
                    <p className="font-semibold">{momoDetails.provider}</p>
                    <p className="text-sm text-muted-foreground">Send payment after placing order</p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MoMo Number:</span>
                    <span className="font-semibold font-mono">{momoDetails.number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Account Name:</span>
                    <span className="font-semibold">{momoDetails.accountName}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-medium text-foreground">Payment Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Place your order via WhatsApp below</li>
                    <li>Wait for order confirmation from our team</li>
                    <li>Send payment to the MoMo number above</li>
                    <li>Share payment confirmation screenshot on WhatsApp</li>
                    <li>Your order will be processed and delivered</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp Contact Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-green-600" />
                Select WhatsApp Line
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedLine} onValueChange={setSelectedLine}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {whatsappLines.map((line) => (
                    <label
                      key={line.id}
                      htmlFor={line.id}
                      className={`flex cursor-pointer items-start gap-4 rounded-xl border p-4 transition-colors ${
                        selectedLine === line.id
                          ? "border-green-500 bg-green-50"
                          : "hover:border-green-200 hover:bg-green-50/50"
                      }`}
                    >
                      <RadioGroupItem value={line.id} id={line.id} className="mt-1" />
                      <div className="flex-1">
                        <p className="font-semibold">{line.name}</p>
                        <p className="text-sm text-muted-foreground">{line.description}</p>
                        <p className="text-sm font-mono text-green-600 mt-1">+{line.number}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Summary */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-primary font-semibold">
                        GH₵ {item.price.toFixed(2)}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive ml-auto"
                          onClick={() => {
                            removeItem(item.id)
                            toast.success("Item removed from cart")
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>GH₵ {getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-green-600">To be confirmed</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-primary">GH₵ {getTotal().toFixed(2)}</span>
                </div>
              </div>

              <Separator />

              {/* Order via WhatsApp Button */}
              <Button
                onClick={handleWhatsAppOrder}
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Order via WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You&apos;ll be redirected to WhatsApp to complete your order.
                Payment via MTN MoMo after order confirmation.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
