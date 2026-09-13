"use client"

import { Link } from "@/shop/lib/next-compat"
import { Heart, ArrowRight } from "lucide-react"
import { ProductCard } from "@/shop/components/product-card"
import { useWishlist } from "@/shop/lib/wishlist-context"
import { products } from "@/shop/lib/products"

export default function WishlistPage() {
  const { ids } = useWishlist()
  const items = products.filter((p) => ids.includes(p.id))

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <Heart className="size-8 text-muted-foreground" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Your wishlist is empty</h1>
        <p className="mt-2 text-muted-foreground">Tap the heart on any product to save it for later.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
        >
          Start shopping
          <ArrowRight className="size-4" />
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Your wishlist</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {items.length} saved {items.length === 1 ? "item" : "items"}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
