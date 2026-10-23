import Link from "next/link"
import { Zap, MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight text-white">Henmasi</span>
                <span className="text-xs text-gray-400 leading-tight">Trading Enterprise</span>
              </div>
            </Link>
            <p className="text-sm text-gray-400">
              Your trusted partner for industrial electrical supplies in Ghana. 
              Quality products, competitive prices, reliable service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                Home
              </Link>
              <Link href="/products" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                Products
              </Link>
              <Link href="/about" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-white hover:translate-x-1 transition-all">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Contact Us
            </h4>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Accra Central, Greater Accra, Ghana</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span>+233 20 123 4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span>info@henmasi.com</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
              Business Hours
            </h4>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>Mon - Fri: 8:00 AM - 6:00 PM</span>
              </div>
              <p>Saturday: 9:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <a
              href="https://wa.me/233201234567"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 transition-all hover:shadow-lg hover:scale-105"
            >
              <MessageCircle className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Henmasi Trading Enterprise. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Industrial Electrical Supplies - Accra, Ghana
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
