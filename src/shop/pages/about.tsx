import { Image } from "@/shop/lib/next-compat"
import { Sparkles, Leaf, Users, Globe } from "lucide-react"

const values = [
  {
    icon: Sparkles,
    title: "Curated quality",
    desc: "Every product is chosen and tested by our team before it ever reaches the shelf.",
  },
  {
    icon: Leaf,
    title: "Responsible sourcing",
    desc: "We work with manufacturers who share our commitment to fair labor and lower-impact materials.",
  },
  {
    icon: Users,
    title: "Customer first",
    desc: "Free returns, real support, and a 30-day guarantee — because trust is earned, not assumed.",
  },
  {
    icon: Globe,
    title: "Built to last",
    desc: "We'd rather sell you one great cross-body bag than five that fall apart in a season.",
  },
]

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-brand text-brand-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center">
          <span className="inline-flex items-center rounded-full bg-brand-foreground/10 px-3 py-1 text-xs font-medium text-cta">
            Our story
          </span>
          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Style and tech shouldn&apos;t be complicated.
          </h1>
          <p className="mt-4 text-pretty text-brand-foreground/75 sm:text-lg">
            Infinity started with a simple idea: build the store we wished existed — one place for dresses that
            actually fit well, gadgets that actually work, and accessories that actually last.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/products/evening-gown.png"
              alt="Infinity curated collection"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">How we started</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Infinity launched as a small collection of favorite finds from a team that was tired of guessing
              whether a product photo told the truth. Today we carry three focused categories — dresses, gadgets,
              and accessories — because we'd rather do a few things exceptionally well than everything
              average.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Every item on Infinity goes through our own review process: real people, real wear-testing, and
              honest specs. If it doesn't earn its place, it doesn't make the cut.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h2 className="text-center text-2xl font-bold tracking-tight text-foreground">What we stand for</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-background p-5">
                <span className="flex size-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                  <v.icon className="size-5" />
                </span>
                <h3 className="mt-3 font-semibold text-foreground">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
