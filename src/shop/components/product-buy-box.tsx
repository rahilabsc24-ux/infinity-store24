"use client"

import { useState } from "react"
import { useRouter } from "@/shop/lib/next-compat"
import { Minus, Plus, Check } from "lucide-react"
import { Button } from "@/shop/components/ui/button"
import { AddToCartButton } from "@/shop/components/add-to-cart-button"
import { WishlistButton } from "@/shop/components/wishlist-button"
import { useCart } from "@/shop/lib/cart-context"
import type { Product } from "@/shop/lib/products"

export function ProductBuyBox({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const router = useRouter()

  function handleBuyNow() {
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, quantity)
    router.push("/checkout")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-foreground">Quantity</span>
        <div className="flex items-center rounded-lg border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="flex size-9 items-center justify-center text-foreground transition-colors hover:bg-muted disabled:opacity-40"
            disabled={quantity >= 10}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <AddToCartButton product={product} quantity={quantity} className="flex-1" />
        <Button
          onClick={handleBuyNow}
          className="h-11 flex-1 bg-brand px-6 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
        >
          Buy now
        </Button>
        <WishlistButton product={product} variant="inline" />
      </div>

      <ul className="mt-2 space-y-1.5">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
            <Check className="size-4 text-brand" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
