"use client"

import { useState } from "react"
import { Image } from "@/shop/lib/next-compat"
import { Link } from "@/shop/lib/next-compat"
import { CheckCircle2, Lock, ArrowRight } from "lucide-react"
import { Button } from "@/shop/components/ui/button"
import { useCart } from "@/shop/lib/cart-context"
import { formatPrice } from "@/shop/lib/products"

function Field({
  id,
  label,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={id}
        className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        {...props}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const [placed, setPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOrderId(`INF-${Math.floor(100000 + Math.random() * 900000)}`)
    setPlaced(true)
    clear()
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (placed) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full bg-brand/10">
          <CheckCircle2 className="size-9 text-brand" />
        </span>
        <h1 className="mt-6 text-3xl font-bold text-foreground">Order confirmed</h1>
        <p className="mt-2 text-muted-foreground">
          Thanks for shopping with Infinity. Your order <span className="font-semibold text-foreground">{orderId}</span>{" "}
          has been placed and a confirmation is on its way.
        </p>
        <Link
          href="/products"
          className="mt-8 inline-flex h-11 items-center gap-2 rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
        >
          Continue shopping
          <ArrowRight className="size-4" />
        </Link>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some items before heading to checkout.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex h-11 items-center rounded-lg bg-brand px-6 text-sm font-semibold text-brand-foreground hover:bg-brand/90"
        >
          Browse products
        </Link>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Checkout</h1>

      <div className="mt-4 flex items-start gap-2 rounded-lg border border-cta/40 bg-cta/10 p-3 text-sm text-foreground">
        <Lock className="mt-0.5 size-4 shrink-0" />
        <p>
          This is a demo checkout — no real payment is processed. Connect Stripe to accept live payments.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Contact & shipping</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field id="email" label="Email" type="email" placeholder="you@example.com" required className="sm:col-span-2" />
              <Field id="firstName" label="First name" placeholder="Jane" required />
              <Field id="lastName" label="Last name" placeholder="Doe" required />
              <Field id="address" label="Address" placeholder="123 Main St" required className="sm:col-span-2" />
              <Field id="city" label="City" placeholder="New York" required />
              <Field id="zip" label="ZIP / Postal code" placeholder="10001" required />
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">Payment</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                id="card"
                label="Card number"
                placeholder="4242 4242 4242 4242"
                inputMode="numeric"
                required
                className="sm:col-span-2"
              />
              <Field id="expiry" label="Expiry" placeholder="MM / YY" required />
              <Field id="cvc" label="CVC" placeholder="123" inputMode="numeric" required />
            </div>
          </section>
        </div>

        <aside className="h-fit rounded-xl border border-border bg-card p-6">
          <h2 className="text-lg font-semibold text-foreground">Your order</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-3">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill sizes="56px" className="object-cover" />
                  <span className="absolute -right-1.5 -top-1.5 flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-xs font-bold text-brand-foreground">
                    {item.quantity}
                  </span>
                </div>
                <span className="line-clamp-2 flex-1 text-sm text-foreground">{item.name}</span>
                <span className="text-sm font-medium text-foreground">{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="text-foreground">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Shipping</dt>
              <dd className="text-foreground">{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Tax</dt>
              <dd className="text-foreground">{formatPrice(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base">
              <dt className="font-semibold text-foreground">Total</dt>
              <dd className="font-bold text-foreground">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button
            type="submit"
            className="mt-6 h-11 w-full bg-cta text-sm font-semibold text-cta-foreground hover:bg-cta/90"
          >
            Place order · {formatPrice(total)}
          </Button>
        </aside>
      </form>
    </main>
  )
}
