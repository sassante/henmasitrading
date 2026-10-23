'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from '@/lib/auth-client'

export default function AdminEntryPage() {
  const router = useRouter()
  const { data: session, isPending } = useSession()

  useEffect(() => {
    if (!isPending) {
      router.replace(session?.user ? '/admin/dashboard' : '/admin/login')
    }
  }, [isPending, router, session?.user])

  return <div className="min-h-screen grid place-items-center text-muted-foreground">Checking access…</div>
}
