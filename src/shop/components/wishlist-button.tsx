"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/shop/lib/wishlist-context"
import { useToast } from "@/shop/lib/toast-context"
import { cn } from "@/shop/lib/utils"
import type { Product } from "@/shop/lib/products"

export function WishlistButton({
  product,
  variant = "overlay",
  className,
}: {
  product: Pick<Product, "id" | "name">
  variant?: "overlay" | "inline"
  className?: string
}) {
  const { isWishlisted, toggle } = useWishlist()
  const { showToast } = useToast()
  const active = isWishlisted(product.id)

  function handleClick(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    const nowWishlisted = toggle(product.id)
    showToast({
      title: nowWishlisted ? "Added to wishlist" : "Removed from wishlist",
      ...(nowWishlisted
        ? { description: product.name, action: { label: "View wishlist", href: "/wishlist" } }
        : {}),
      variant: "wishlist",
    })
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
      className={cn(
        variant === "overlay"
          ? "flex size-9 items-center justify-center rounded-full bg-background/90 shadow-sm backdrop-blur transition-transform hover:scale-105"
          : "flex size-11 items-center justify-center rounded-lg border border-border transition-colors hover:bg-muted",
        className,
      )}
    >
      <Heart className={cn("size-4", active ? "fill-destructive text-destructive" : "text-foreground")} />
    </button>
  )
}
