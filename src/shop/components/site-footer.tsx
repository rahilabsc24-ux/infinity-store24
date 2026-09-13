"use client"

import { useState } from "react"
import Link from "next/link"
import { Infinity as InfinityIcon, ShieldCheck, Truck, RefreshCw, Lock, ArrowRight } from "lucide-react"
import { useToast } from "@/lib/toast-context"
import { categories } from "@/lib/products"

function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const { showToast } = useToast()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
    setEmail("")
    showToast({ title: "You're subscribed!", description: "Look out for deals in your inbox.", variant: "success" })
  }

  if (submitted) {
    return (
      <p className="mt-3 flex items-center gap-2 text-sm text-brand-foreground/80">
        <ShieldCheck className="size-4 text-cta" />
        Thanks for subscribing — check your inbox to confirm.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 flex max-w-sm gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-11 flex-1 rounded-lg border border-brand-foreground/20 bg-brand-foreground/5 px-3 text-sm text-brand-foreground outline-none placeholder:text-brand-foreground/50 focus:ring-2 focus:ring-cta"
      />
      <button
        type="submit"
        aria-label="Subscribe"
        className="flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-cta px-4 text-sm font-semibold text-cta-foreground transition-colors hover:bg-cta/90"
      >
        Subscribe
        <ArrowRight className="size-4" />
      </button>
    </form>
  )
}

const perks = [
  { icon: Truck, label: "Free shipping over $50" },
  { icon: RefreshCw, label: "30-day easy returns" },
  { icon: Lock, label: "Secure checkout" },
  { icon: ShieldCheck, label: "Buyer protection" },
]

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-brand text-brand-foreground">
      <div className="border-b border-brand-foreground/10">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.label} className="flex items-center gap-2.5 text-sm text-brand-foreground/80">
              <perk.icon className="size-4 shrink-0 text-cta" />
              {perk.label}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Link href="/" className="flex items-center gap-2">
            <InfinityIcon className="size-6 text-cta" />
            <span className="text-xl font-bold tracking-tight">Infinity</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-brand-foreground/70">
            Endless style, smart tech, and standout accessories — all in one place.
          </p>
          <h4 className="mt-6 text-sm font-semibold">Get 10% off your first order</h4>
          <p className="mt-1 text-sm text-brand-foreground/70">Sign up for restock alerts and exclusive deals.</p>
          <NewsletterForm />
          <div className="mt-6 flex items-center gap-4 text-sm font-medium text-brand-foreground/70">
            <a href="#" className="hover:text-cta">
              Instagram
            </a>
            <a href="#" className="hover:text-cta">
              Twitter
            </a>
            <a href="#" className="hover:text-cta">
              Facebook
            </a>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-foreground/70">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/products?category=${c.slug}`} className="hover:text-cta">
                  {c.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/products" className="hover:text-cta">
                All products
              </Link>
            </li>
            <li>
              <Link href="/wishlist" className="hover:text-cta">
                Wishlist
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-foreground/70">
            <li>
              <Link href="/contact" className="hover:text-cta">
                Contact us
              </Link>
            </li>
            <li>
              <Link href="/shipping-returns" className="hover:text-cta">
                Shipping &amp; returns
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-cta">
                Order tracking
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-cta">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-brand-foreground/70">
            <li>
              <Link href="/about" className="hover:text-cta">
                About Infinity
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-cta">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-cta">
                Terms of service
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-foreground/10 py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-brand-foreground/60">
            © {new Date().getFullYear()} Infinity. All rights reserved.
          </p>
          <p className="text-xs text-brand-foreground/60">Visa · Mastercard · Amex · PayPal · Apple Pay accepted</p>
        </div>
      </div>
    </footer>
  )
}
