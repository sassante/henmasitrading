"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, Zap, CheckCircle, Headphones, Award } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { staggerContainerVariants, itemVariants } from "@/lib/animations"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Accra Central", "Greater Accra, Ghana"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+233 55 771 3914", "+233 24 040 1653"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@henmasi.com", "sales@henmasi.com"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: ["Mon-Fri: 7:00 AM - 6:00 PM", "Sat: 8:00 AM - 5:00 PM"],
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <div className="flex flex-col">
      {/* Dynamic Hero Section */}
      <motion.section
        className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-secondary via-secondary/90 to-secondary/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{ y: [0, 40, 0] }}
            transition={{ duration: 7, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-96 h-96 bg-yellow-300/10 rounded-full blur-3xl"
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <motion.div
            className="max-w-3xl"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Get in Touch
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-gray-200 leading-relaxed"
            >
              Have questions about our products or need a quote? We&apos;re here to help. 
              Reach out to us through any of the channels below.
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="mt-6"
            >
              <Button
                asChild
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <a
                  href="https://wa.me/233557713914"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Info Cards */}
      <section className="py-16 -mt-8 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {contactInfo.map((info) => {
              const IconComponent = info.icon
              return (
                <motion.div
                  key={info.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full hover:shadow-lg hover:border-primary transition-all">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-3">{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail} className="text-sm text-muted-foreground mb-1">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {/* Left: Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="mb-12">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-primary w-fit border border-primary/30 mb-4">
                  <Zap className="h-4 w-4" />
                  Send us a Message
                </div>
                <h2 className="text-3xl font-bold mb-3">Get a Quick Response</h2>
                <p className="text-muted-foreground">
                  Fill out the form and our team will get back to you within 24 hours.
                </p>
              </div>

              <motion.form
                onSubmit={handleSubmit}
                className="bg-background rounded-lg border p-8 space-y-6"
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {/* Name and Email Row */}
                <motion.div
                  variants={itemVariants}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="henmasitradin@gmail.com"
                    />
                  </div>
                </motion.div>

                {/* Phone and Subject Row */}
                <motion.div
                  variants={itemVariants}
                  className="grid sm:grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help?"
                    />
                  </div>
                </motion.div>

                {/* Message */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-2"
                >
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>

            {/* Right: Support Cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              {/* Response Time */}
              <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-primary/5 to-primary/10">
                <CardContent className="p-6 flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-lg bg-primary/20"
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Zap className="h-6 w-6 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-2">Quick Response</h3>
                    <p className="text-sm text-muted-foreground">We typically respond within 1-2 hours during business hours</p>
                  </div>
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                <CardContent className="p-6 flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-lg bg-blue-500/20"
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Clock className="h-6 w-6 text-blue-600" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-2">Support Hours</h3>
                    <p className="text-sm text-muted-foreground">Mon-Fri: 7:00 AM - 6:00 PM<br />Sat: 8:00 AM - 5:00 PM</p>
                  </div>
                </CardContent>
              </Card>

              {/* Expert Help */}
              <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-green-500/5 to-green-500/10">
                <CardContent className="p-6 flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-lg bg-green-500/20"
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Headphones className="h-6 w-6 text-green-600" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-2">Expert Support</h3>
                    <p className="text-sm text-muted-foreground">Our team has decades of combined electrical industry experience</p>
                  </div>
                </CardContent>
              </Card>

              {/* Guaranteed Quality */}
              <Card className="border-0 shadow-md hover:shadow-lg transition-all bg-gradient-to-br from-amber-500/5 to-amber-500/10">
                <CardContent className="p-6 flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-lg bg-amber-500/20"
                    whileHover={{ rotate: 12 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Award className="h-6 w-6 text-amber-600" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-2">Quality Guarantee</h3>
                    <p className="text-sm text-muted-foreground">All products backed by manufacturer warranty and our promise</p>
                  </div>
                </CardContent>
              </Card>

              {/* WhatsApp CTA */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  <a
                    href="https://wa.me/233557713914"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Chat on WhatsApp Instead
                  </a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden border h-96 bg-muted"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7471788436523!2d-0.20753!3d5.55602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9a1e8e7e7e7e7%3A0x0!2sAccra%20Central!5e0!3m2!1sen!2sgh!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
