import type { Metadata } from "next"
import { Mail, MessageCircle, MapPin, Clock } from "lucide-react"
import { ContactForm } from "@/shop/components/contact-form"

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Infinity team about orders, returns, or general questions.",
}

const channels = [
  { icon: Mail, title: "Email", detail: "support@infinitystore.example", note: "We reply within one business day" },
  { icon: MessageCircle, title: "Live chat", detail: "Available in-app", note: "Mon–Fri, 9am–6pm ET" },
  { icon: MapPin, title: "Headquarters", detail: "148 Market Street, Suite 400", note: "San Francisco, CA 94103" },
  { icon: Clock, title: "Support hours", detail: "Mon–Fri, 9am–6pm ET", note: "Closed on major holidays" },
]

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Get in touch</h1>
        <p className="mt-2 text-muted-foreground">
          Questions about an order, a product, or anything else? Send us a note and we&apos;ll get back to you
          quickly.
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          {channels.map((c) => (
            <div key={c.title} className="flex gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
                <c.icon className="size-5" />
              </span>
              <div>
                <p className="font-semibold text-foreground">{c.title}</p>
                <p className="text-sm text-foreground/90">{c.detail}</p>
                <p className="text-xs text-muted-foreground">{c.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </main>
  )
}
