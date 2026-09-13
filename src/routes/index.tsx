import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Link } from "@/shop/lib/next-compat";
import { Hero } from "@/shop/components/hero";
import { CategoryCard } from "@/shop/components/category-card";
import { ProductCard } from "@/shop/components/product-card";
import { categories, products, getByCategory } from "@/shop/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Infinity — Dresses, Gadgets & Accessories" },
      {
        name: "description",
        content:
          "Shop Infinity for effortless dresses, smart gadgets, and standout accessories. Fast checkout, curated quality, endless style.",
      },
    ],
  }),
  component: HomePage,
});

const categoryImages: Record<string, string> = {
  dresses: "/products/evening-gown.png",
  gadgets: "/products/smart-watch.png",
  accessories: "/products/crossbody-bag.png",
};

const perks = [
  { icon: Truck, title: "Free shipping", desc: "On orders over $50" },
  { icon: RefreshCw, title: "30-day returns", desc: "Hassle-free refunds" },
  { icon: ShieldCheck, title: "Secure checkout", desc: "Your data is protected" },
];

function HomePage() {
  const bestsellers = products.filter((p) => p.badge === "Bestseller");

  return (
    <main>
      <Hero />

      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-3">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-foreground">
                <perk.icon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">{perk.title}</p>
                <p className="text-xs text-muted-foreground">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Shop by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {categories.map((c) => (
            <CategoryCard
              key={c.slug}
              slug={c.slug}
              label={c.label}
              blurb={c.blurb}
              image={categoryImages[c.slug] ?? "/placeholder.svg"}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Bestsellers</h2>
          <Link
            href="/products"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {categories.map((c) => (
        <section key={c.slug} className="mx-auto max-w-7xl px-4 py-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">{c.label}</h2>
              <p className="text-sm text-muted-foreground">{c.blurb}</p>
            </div>
            <Link
              href={`/products?category=${c.slug}`}
              className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:underline"
            >
              View all
              <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {getByCategory(c.slug)
              .slice(0, 4)
              .map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        </section>
      ))}
    </main>
  );
}
