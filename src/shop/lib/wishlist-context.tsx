"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

type WishlistContextValue = {
  ids: string[]
  isWishlisted: (id: string) => boolean
  toggle: (id: string) => boolean // returns true if item is now wishlisted
  remove: (id: string) => void
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

const STORAGE_KEY = "infinity-wishlist"

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setIds(JSON.parse(raw))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // ignore quota errors
    }
  }, [ids, hydrated])

  const value = useMemo<WishlistContextValue>(() => {
    const isWishlisted = (id: string) => ids.includes(id)

    const toggle = (id: string) => {
      const nowWishlisted = !ids.includes(id)
      setIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]))
      return nowWishlisted
    }

    const remove = (id: string) => setIds((prev) => prev.filter((i) => i !== id))

    return { ids, isWishlisted, toggle, remove, count: ids.length }
  }, [ids])

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider")
  return ctx
}
