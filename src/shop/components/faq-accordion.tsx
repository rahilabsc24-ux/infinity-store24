"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/shop/lib/utils"

export type FaqItem = { question: string; answer: string }

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium text-foreground">{item.question}</span>
              <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
            </button>
            {open && <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>}
          </div>
        )
      })}
    </div>
  )
}
