"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Infinity as InfinityIcon, Menu, Search, ShoppingCart, X, Heart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useWishlist } from "@/lib/wishlist-context"
import { categories } from "@/lib/products"

export function SiteHeader() {
  const { totalItems } = useCart()
  const { count: wishlistCount } = useWishlist()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") ?? "")
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    router.push(trimmed ? `/products?q=${encodeURIComponent(trimmed)}` : "/products")
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 bg-brand text-brand-foreground">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:gap-6">
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((o) => !o)}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-brand-foreground/10 lg:hidden"
        >
          {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2">
          <InfinityIcon className="size-7 text-cta" />
          <span className="text-xl font-bold tracking-tight">Infinity</span>
        </Link>

        <form onSubmit={handleSearch} className="relative hidden flex-1 sm:block">
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dresses, gadgets, accessories..."
            className="h-10 w-full rounded-full border border-transparent bg-brand-foreground px-4 pr-11 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-cta"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1 top-1 flex size-8 items-center justify-center rounded-full bg-cta text-cta-foreground transition-colors hover:bg-cta/90"
          >
            <Search className="size-4" />
          </button>
        </form>

        <nav className="ml-auto flex items-center gap-4 sm:ml-0">
          <div className="hidden items-center gap-4 lg:flex">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                className="text-sm font-medium text-brand-foreground/80 transition-colors hover:text-cta"
              >
                {c.label}
              </Link>
            ))}
          </div>
          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="relative hidden items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium transition-colors hover:text-cta sm:flex"
          >
            <span className="relative">
              <Heart className="size-6" />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-cta px-1 text-xs font-bold text-cta-foreground">
                  {wishlistCount}
                </span>
              )}
            </span>
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center gap-2 rounded-full px-2 py-1.5 text-sm font-medium transition-colors hover:text-cta"
          >
            <span className="relative">
              <ShoppingCart className="size-6" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-cta px-1 text-xs font-bold text-cta-foreground">
                  {totalItems}
                </span>
              )}
            </span>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </nav>
      </div>

      <div className="border-t border-brand-foreground/10 sm:hidden">
        <form onSubmit={handleSearch} className="relative px-4 py-2">
          <label htmlFor="site-search-mobile" className="sr-only">
            Search products
          </label>
          <input
            id="site-search-mobile"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="h-10 w-full rounded-full border border-transparent bg-brand-foreground px-4 pr-11 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-cta"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-5 top-2.5 flex size-8 items-center justify-center rounded-full bg-cta text-cta-foreground"
          >
            <Search className="size-4" />
          </button>
        </form>
      </div>

      {menuOpen && (
        <div className="border-t border-brand-foreground/10 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-brand-foreground/90 hover:bg-brand-foreground/10"
            >
              All products
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/products?category=${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-2 py-2 text-sm font-medium text-brand-foreground/90 hover:bg-brand-foreground/10"
              >
                {c.label}
              </Link>
            ))}
            <Link
              href="/wishlist"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg px-2 py-2 text-sm font-medium text-brand-foreground/90 hover:bg-brand-foreground/10"
            >
              Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ""}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
