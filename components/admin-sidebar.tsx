'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAdminStore } from '@/lib/admin-store'
import { useState } from 'react'

const sidebarItems = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    href: '/admin/products',
    icon: Package,
  },
  {
    label: 'Orders',
    href: '/admin/orders',
    icon: ShoppingCart,
  },
  {
    label: 'Customers',
    href: '/admin/customers',
    icon: Users,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAdminStore()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push('/admin/login')
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="border-yellow-500 text-yellow-600 hover:bg-yellow-50"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-gray-900 text-white transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <Link href="/admin/dashboard" className="mb-8 flex items-center gap-2">
            <div className="w-8 h-8 bg-yellow-500 rounded flex items-center justify-center">
              <span className="text-gray-900 font-bold text-sm">HT</span>
            </div>
            <span className="font-bold text-lg">Henmasi Admin</span>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-yellow-500 text-gray-900 font-medium'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
