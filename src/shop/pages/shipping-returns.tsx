import type { Metadata } from "next"
import { Truck, RefreshCw, PackageCheck, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "Details on Infinity's shipping timelines, costs, and our 30-day return policy.",
}

export default function ShippingReturnsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Shipping &amp; returns</h1>
      <p className="mt-2 text-muted-foreground">Everything you need to know about getting your order and sending it back if it's not right.</p>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <Truck className="size-5 text-brand" />
          Shipping
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Orders over $50 ship free. Orders under $50 have a flat shipping rate of $6.99. All orders are
            processed within 1–2 business days.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Standard shipping: 3–7 business days</li>
            <li>Expedited shipping: 2–3 business days (available at checkout for an added fee)</li>
            <li>Currently available to addresses in the United States and Canada</li>
          </ul>
          <p>You'll receive a tracking number by email as soon as your package ships.</p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <RefreshCw className="size-5 text-brand" />
          Returns
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            We want you to love what you ordered. If something isn't right, you can return unworn, unused items
            in their original packaging within 30 days of delivery for a full refund.
          </p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>Start a return from your confirmation email or by contacting support</li>
            <li>We'll email you a prepaid return shipping label</li>
            <li>Refunds are issued to your original payment method within 5–7 business days of receipt</li>
            <li>Final-sale and clearance items are not eligible for return</li>
          </ul>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <PackageCheck className="size-5 text-brand" />
          Exchanges
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Need a different size or color? The fastest way is to return your original item for a refund and place
          a new order — that way your replacement ships right away instead of waiting on a swap.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-foreground">
          <Clock className="size-5 text-brand" />
          Damaged or missing items
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          If your order arrives damaged or something is missing, contact us within 7 days of delivery with your
          order number and a photo, and we'll make it right with a replacement or refund.
        </p>
      </section>
    </main>
  )
}
