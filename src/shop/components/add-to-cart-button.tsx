"use client"

import { useState } from "react"
import { Check, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useToast } from "@/lib/toast-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/products"

export function AddToCartButton({
  product,
  quantity = 1,
  className,
  size = "lg",
}: {
  product: Product
  quantity?: number
  className?: string
  size?: "sm" | "lg"
}) {
  const { addItem } = useCart()
  const { showToast } = useToast()
  const [added, setAdded] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    addItem({ id: product.id, name: product.name, price: product.price, image: product.image }, quantity)
    setAdded(true)
    showToast({
      title: "Added to cart",
      description: quantity > 1 ? `${quantity} × ${product.name}` : product.name,
      variant: "success",
      action: { label: "View cart", href: "/cart" },
    })
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <Button
      onClick={handleAdd}
      className={cn(
        "bg-cta text-cta-foreground hover:bg-cta/90 font-semibold",
        size === "lg" ? "h-11 px-6 text-sm" : "h-9 px-4",
        className,
      )}
    >
      {added ? (
        <>
          <Check className="size-4" />
          Added
        </>
      ) : (
        <>
          <ShoppingCart className="size-4" />
          Add to cart
        </>
      )}
    </Button>
  )
}
