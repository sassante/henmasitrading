'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AdminUser {
  email: string
  name: string
}

interface AdminStore {
  user: AdminUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

export const useAdminStore = create<AdminStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email: string, password: string) => {
        // Simple demo authentication
        if (email === 'admin@henmasi.com' && password === 'admin123') {
          set({
            user: { email, name: 'Admin' },
            isAuthenticated: true,
          })
          return true
        }
        return false
      },
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'admin-store',
    }
  )
)
