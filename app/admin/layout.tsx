'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'

export default function AdminRouteGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, isPending } = useSession()
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isPending && !isLoginPage && !session?.user) {
      router.replace('/admin/login')
    }
  }, [isLoginPage, isPending, router, session?.user])

  if (isLoginPage) return children
  if (isPending || !session?.user) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking access…</div>
  }

  return children
}
