'use client'

import { Target, Eye, Award, Users, Building2, ShieldCheck } from "lucide-react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { AnimatedCounter } from "@/components/animated-counter"
import { staggerContainerVariants, itemVariants } from "@/lib/animations"

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "5000+", label: "Products Available" },
  { value: "2000+", label: "Happy Customers" },
  { value: "24/7", label: "Support Available" },
]

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "Every product we sell meets international safety standards and comes with manufacturer warranty.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Our success is built on lasting relationships with contractors, engineers, and businesses.",
  },
  {
    icon: Building2,
    title: "Industry Expertise",
    description: "Our team brings decades of combined experience in industrial electrical systems.",
  },
  {
    icon: Award,
    title: "Trusted Brands",
    description: "We partner with leading manufacturers to bring you reliable, proven products.",
  },
]

const faqItems = [
  {
    question: "What payment methods do you accept?",
    answer: "We accept Mobile Money (MTN, Vodafone, AirtelTigo), bank transfers, and cash on delivery for local orders. For large orders, we can arrange customized payment terms."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes! We offer competitive bulk pricing for orders above GH₵5,000. Contact our sales team for a customized quote."
  },
  {
    question: "What is your delivery timeframe?",
    answer: "We offer same-day delivery within Accra and next-day delivery to other regions of Ghana. Shipping costs vary based on location."
  },
  {
    question: "Are your products genuine?",
    answer: "Absolutely. All products are sourced directly from authorized distributors and manufacturers. We provide warranty certificates with every purchase."
  },
  {
    question: "Can I return products?",
    answer: "We have a 7-day return policy for unopened, defective products. Items must be in original condition with packaging."
  },
  {
    question: "Do you provide technical support?",
    answer: "Yes, our technical team can assist with product selection, installation guidance, and troubleshooting. Contact us via WhatsApp or phone."
  },
]

export default function AboutPage() {
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
              About Henmasi Trading Enterprise
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg text-gray-200 leading-relaxed"
            >
              For over a decade, we&apos;ve been Ghana&apos;s trusted source for industrial electrical supplies. 
              Based in the heart of Accra Central, we serve contractors, engineers, and businesses 
              across the nation with quality products and exceptional service.
            </motion.p>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-16 -mt-8 bg-background relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-lg border bg-card p-6 hover:shadow-lg transition-all"
              >
                <AnimatedCounter
                  value={stat.value}
                  label={stat.label}
                  delay={index * 0.1}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid gap-12 lg:grid-cols-2"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Mission */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To empower Ghana&apos;s businesses with high-quality, affordable industrial electrical solutions 
                that drive productivity, safety, and growth. We&apos;re committed to being more than just a supplier—
                we&apos;re your trusted technical partner.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To be West Africa&apos;s leading electrical supplies distributor, recognized for excellence, 
                innovation, and customer satisfaction. We envision a future where every business has access 
                to premium electrical equipment at fair prices.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold">Our Core Values</h2>
          </motion.div>

          <motion.div
            className="grid gap-8 sm:grid-cols-2"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value) => {
              const IconComponent = value.icon
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="flex flex-col gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 flex-shrink-0">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-12 text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Frequently Asked Questions</h2>
            <p className="text-muted-foreground text-lg">Find answers to common questions about our products and services</p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid gap-3 lg:grid-cols-2">
              {faqItems.map((item, index) => (
                <motion.div
                  key={item.question}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="h-full hover:shadow-md transition-all">
                    <Accordion type="single" collapsible>
                      <AccordionItem value={item.question} className="border-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:text-primary">
                          <span className="text-left text-sm font-semibold text-foreground">
                            {item.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4 pt-0 text-muted-foreground text-sm leading-relaxed">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
