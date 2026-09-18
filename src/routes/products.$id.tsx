import { createFileRoute, notFound } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck, Truck, PackageCheck } from "lucide-react";
import { Image, Link } from "@/shop/lib/next-compat";
import { StarRating } from "@/shop/components/star-rating";
import { ProductBuyBox } from "@/shop/components/product-buy-box";
import { ProductCard } from "@/shop/components/product-card";
import { ReviewsSection } from "@/shop/components/reviews-section";
import { getProduct, getByCategory, formatPrice, categories } from "@/shop/lib/products";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Product not found — Infinity" }, { name: "robots", content: "noindex" }] };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Infinity` },
        { name: "description", content: product.description },
        { property: "og:title", content: `${product.name} — Infinity` },
        { property: "og:description", content: product.description },
      ],
    };
  },
  component: ProductDetailPage,
});

function stockLabel(productId: string): string {
  let hash = 0;
  for (let i = 0; i < productId.length; i++) hash = (hash * 31 + productId.charCodeAt(i)) % 97;
  return hash % 11 === 0 ? "Only a few left" : "In stock";
}

function ProductDetailPage() {
  const { product } = Route.useLoaderData();
  const categoryLabel = categories.find((c) => c.slug === product.category)?.label ?? product.category;
  const related = getByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="size-4" />
        <Link href={`/products?category=${product.category}`} className="hover:text-foreground">
          {categoryLabel}
        </Link>
        <ChevronRight className="size-4" />
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
              {product.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium uppercase tracking-wide text-muted-foreground">{categoryLabel}</span>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">{product.name}</h1>
          <div className="mt-2">
            <StarRating rating={product.rating} reviews={product.reviews} />
          </div>
          <p className="mt-4 text-3xl font-bold text-foreground">{formatPrice(product.price)}</p>
          <p className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-brand/10 px-2.5 py-1 text-xs font-medium text-brand">
            <PackageCheck className="size-3.5" />
            {stockLabel(product.id)}
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">{product.description}</p>

          <div className="mt-6 border-t border-border pt-6">
            <ProductBuyBox product={product} />
          </div>

          <div className="mt-6 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
            <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <Truck className="mt-0.5 size-4 shrink-0 text-brand" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-start gap-2.5 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand" />
              30-day hassle-free returns
            </div>
          </div>
        </div>
      </div>

      <ReviewsSection productId={product.id} rating={product.rating} reviewCount={product.reviews} />

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
