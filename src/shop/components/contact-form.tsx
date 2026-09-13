"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/shop/components/ui/button"

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    window.setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 700)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center rounded-xl border border-border bg-card p-10 text-center">
        <CheckCircle2 className="size-10 text-brand" />
        <h2 className="mt-4 text-xl font-bold text-foreground">Message sent</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Thanks for reaching out — our support team will follow up by email shortly.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
            Name
          </label>
          <input
            id="name"
            required
            placeholder="Jane Doe"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            placeholder="you@example.com"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-foreground">
            Topic
          </label>
          <select
            id="topic"
            defaultValue="order"
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="order">Order status</option>
            <option value="returns">Returns &amp; exchanges</option>
            <option value="product">Product question</option>
            <option value="other">Something else</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
            Message
          </label>
          <textarea
            id="message"
            required
            rows={5}
            placeholder="How can we help?"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="mt-5 h-11 w-full bg-cta text-sm font-semibold text-cta-foreground hover:bg-cta/90 sm:w-auto sm:px-8"
      >
        {loading ? "Sending..." : "Send message"}
      </Button>
      <p className="mt-2 text-xs text-muted-foreground">This is a demo form — no message is actually sent.</p>
    </form>
  )
}
