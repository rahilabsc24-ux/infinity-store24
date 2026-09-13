import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand text-brand-foreground">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full bg-brand-foreground/10 px-3 py-1 text-xs font-medium text-cta">
            New season, endless style
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Everything you love, to infinity.
          </h1>
          <p className="mt-4 text-pretty text-base text-brand-foreground/75 sm:text-lg">
            Discover curated dresses, smart gadgets, and standout accessories — quality picks at prices that make
            sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className={cn(
                buttonVariants(),
                "h-12 bg-cta px-7 text-sm font-semibold text-cta-foreground hover:bg-cta/90",
              )}
            >
              Shop all products
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/products?category=dresses"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-12 border-brand-foreground/30 bg-transparent px-7 text-sm font-semibold text-brand-foreground hover:bg-brand-foreground/10 hover:text-brand-foreground",
              )}
            >
              Explore dresses
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-brand-foreground/5">
            <Image
              src="/products/floral-maxi-dress.png"
              alt="Floral maxi dress"
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="mt-8 grid gap-4">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-foreground/5">
              <Image
                src="/products/headphones.png"
                alt="Wireless headphones"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-foreground/5">
              <Image
                src="/products/crossbody-bag.png"
                alt="Leather crossbody bag"
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
