import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Category } from "@/lib/products"

export function CategoryCard({
  slug,
  label,
  blurb,
  image,
}: {
  slug: Category
  label: string
  blurb: string
  image: string
}) {
  return (
    <Link
      href={`/products?category=${slug}`}
      className="group relative flex h-56 items-end overflow-hidden rounded-2xl bg-muted"
    >
      <Image
        src={image || "/placeholder.svg"}
        alt={label}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand/90 via-brand/30 to-transparent" />
      <div className="relative p-5 text-brand-foreground">
        <h3 className="text-xl font-semibold">{label}</h3>
        <p className="mt-0.5 text-sm text-brand-foreground/80">{blurb}</p>
        <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-cta">
          Shop now
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
