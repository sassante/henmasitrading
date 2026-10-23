import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WishlistItem {
  id: string
  name: string
  price: number
  category: string
}

interface WishlistStore {
  items: WishlistItem[]
  addItem: (item: WishlistItem) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id)
          if (existingItem) {
            return state
          }
          return { items: [...state.items, item] }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-store',
    }
  )
)
