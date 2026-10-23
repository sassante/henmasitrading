'use client'

import { ReactNode } from 'react'
import { useAdminStore } from '@/lib/admin-store'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'

export function AdminLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAdminStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/admin/login')
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 lg:ml-64">
        <div className="p-4 lg:p-8">{children}</div>
      </main>
    </div>
  )
}
