"use client"

import { useState } from "react"
import { Image } from "@/shop/lib/next-compat"
import { Link } from "@/shop/lib/next-compat"
import { useRouter } from "@/shop/lib/next-compat"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, X } from "lucide-react"
import { Button } from "@/shop/components/ui/button"
import { useCart } from "@/shop/lib/cart-context"
import { useToast } from "@/shop/lib/toast-context"
import { formatPrice } from "@/shop/lib/products"

const PROMO_CODES: Record<string, number> = {
  INFINITY10: 0.1,
  WELCOME15: 0.15,
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, totalItems } = useCart()
  const router = useRouter()
  const { showToast } = useToast()
  const [promoInput, setPromoInput] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null)

  const discount = appliedPromo ? subtotal * appliedPromo.discount : 0
  const discountedSubtotal = subtotal - discount
  const shipping = discountedSubtotal >= 50 || discountedSubtotal === 0 ? 0 : 6.99
  const tax = discountedSubtotal * 0.08
  const total = discountedSubtotal + shipping + tax

  function handleApplyPromo(e: React.FormEvent) {
    e.preventDefault()
    const code = promoInput.trim().toUpperCase()
    if (!code) return
    const discountRate = PROMO_CODES[code]
    if (discountRate) {
      setAppliedPromo({ code, discount: discountRate })
      showToast({ title: "Promo code applied", description: `${Math.round(discountRate * 100)}% off your order`, variant: "success" })
    } else {
      showToast({ title: "Invalid promo code", description: `"${code}" isn't valid or has expired.`, variant: "info" })
    }
    setPromoInput("")
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-secondary">
          <ShoppingBag className="size-8 text-muted-foreground" />
        </span>
        <h1 className="mt-6 text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Browse our collections and find something you love.</p>
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
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Shopping cart</h1>
      <p className="mt-1 text-sm text-muted-foreground">{totalItems} items</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <ul className="lg:col-span-2 divide-y divide-border rounded-xl border border-border">
          {items.map((item) => (
            <li key={item.id} className="flex gap-4 p-4">
              <Link
                href={`/products/${item.id}`}
                className="relative size-24 shrink-0 overflow-hidden rounded-lg bg-muted"
              >
                <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-2">
                  <Link href={`/products/${item.id}`} className="font-medium text-foreground hover:underline">
                    {item.name}
                  </Link>
                  <span className="font-semibold text-foreground">{formatPrice(item.price * item.quantity)}</span>
                </div>
                <span className="text-sm text-muted-foreground">{formatPrice(item.price)} each</span>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="flex size-8 items-center justify-center hover:bg-muted"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="w-9 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="flex size-8 items-center justify-center hover:bg-muted"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Order summary</h2>

          <form onSubmit={handleApplyPromo} className="mt-4 flex gap-2">
            <label htmlFor="promo" className="sr-only">
              Promo code
            </label>
            <div className="relative flex-1">
              <Tag className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                id="promo"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                placeholder="Promo code"
                className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <Button type="submit" variant="outline" className="h-10 border-border px-4 text-sm font-medium">
              Apply
            </Button>
          </form>
          {appliedPromo && (
            <div className="mt-2 flex items-center justify-between rounded-lg bg-brand/10 px-3 py-1.5 text-xs font-medium text-brand">
              <span>Code {appliedPromo.code} applied</span>
              <button type="button" onClick={() => setAppliedPromo(null)} aria-label="Remove promo code">
                <X className="size-3.5" />
              </button>
            </div>
          )}

          <dl className="mt-4 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium text-foreground">{formatPrice(subtotal)}</dd>
            </div>
            {appliedPromo && (
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Discount ({Math.round(appliedPromo.discount * 100)}%)</dt>
                <dd className="font-medium text-brand">−{formatPrice(discount)}</dd>
              </div>
            )}
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="font-medium text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Estimated tax</dt>
              <dd className="font-medium text-foreground">{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-bold text-foreground">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button
            onClick={() => router.push("/checkout")}
            className="mt-6 h-11 w-full bg-cta text-sm font-semibold text-cta-foreground hover:bg-cta/90"
          >
            Proceed to checkout
          </Button>
          <Link
            href="/products"
            className="mt-3 block text-center text-sm text-muted-foreground hover:text-foreground"
          >
            Continue shopping
          </Link>
        </aside>
      </div>
    </main>
  )
}
