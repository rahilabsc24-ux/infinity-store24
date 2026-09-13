import type { Metadata } from "next"
import { FaqAccordion } from "@/shop/components/faq-accordion"

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about shipping, returns, sizing, and orders at Infinity.",
}

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Standard orders ship within 1–2 business days and arrive in 3–7 business days depending on your location. You'll get a tracking link by email as soon as your order leaves our warehouse.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer 30-day free returns on unworn, unused items in their original packaging. Start a return from your order confirmation email or contact our support team and we'll send you a prepaid label.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently we ship within the United States and Canada. We're working on expanding to more regions — sign up for our newsletter to be the first to know when that changes.",
  },
  {
    question: "How do I know what size to order?",
    answer:
      "Every dress listing includes a size guide with measurements. If you're between sizes, we generally recommend sizing up for a more relaxed fit — our support team is also happy to help you decide.",
  },
  {
    question: "Are your gadgets covered by a warranty?",
    answer:
      "Yes — all electronics come with a 1-year manufacturer warranty covering defects in materials and workmanship. Reach out to support with your order number if you run into any issues.",
  },
  {
    question: "Can I change or cancel my order after placing it?",
    answer:
      "We start preparing orders quickly, but if you contact us within an hour of placing your order we can usually make changes or cancel it before it ships.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept Visa, Mastercard, American Express, PayPal, and Apple Pay at checkout.",
  },
]

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Frequently asked questions</h1>
      <p className="mt-2 text-muted-foreground">
        Can&apos;t find what you&apos;re looking for?{" "}
        <a href="/contact" className="font-medium text-brand hover:underline">
          Contact our support team
        </a>
        .
      </p>
      <div className="mt-8">
        <FaqAccordion items={faqs} />
      </div>
    </main>
  )
}
