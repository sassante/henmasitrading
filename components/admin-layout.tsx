'use client'

import { ReactNode } from 'react'
import { AdminSidebar } from '@/components/admin-sidebar'
import { useSession } from '@/lib/auth-client'

export function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession()

  // app/admin/layout.tsx already redirects people who aren't signed in,
  // so this only waits for the session to load.
  if (isPending || !session?.user) {
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