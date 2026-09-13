import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "@/shop/components/product-card";
import { ProductFilters } from "@/shop/components/product-filters";
import { products, categories, type Category, type Product } from "@/shop/lib/products";

const validCategories = new Set<string>(categories.map((c) => c.slug));

type ProductSearch = { category?: string | undefined; q?: string | undefined; sort?: string | undefined };

export const Route = createFileRoute("/products")({
  validateSearch: (search: Record<string, unknown>): ProductSearch => ({
    category: typeof search["category"] === "string" ? (search["category"] as string) : undefined,
    q: typeof search["q"] === "string" ? (search["q"] as string) : undefined,
    sort: typeof search["sort"] === "string" ? (search["sort"] as string) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "All products — Infinity" },
      {
        name: "description",
        content: "Browse all Infinity dresses, gadgets, and accessories.",
      },
    ],
  }),
  component: ProductsPage,
});

function sortProducts(list: Product[], sort: string): Product[] {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    default:
      return copy.sort((a, b) => (a.badge === "Bestseller" ? -1 : 0) - (b.badge === "Bestseller" ? -1 : 0));
  }
}

function ProductsPage() {
  const params = Route.useSearch();
  const activeCategory =
    params.category && validCategories.has(params.category) ? (params.category as Category) : undefined;
  const query = params.q?.trim().toLowerCase() ?? "";
  const sort = params.sort ?? "featured";

  let results = products;
  if (activeCategory) results = results.filter((p) => p.category === activeCategory);
  if (query) {
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.tagline.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query),
    );
  }
  results = sortProducts(results, sort);

  const heading = activeCategory
    ? categories.find((c) => c.slug === activeCategory)?.label
    : query
      ? `Results for "${params.q}"`
      : "All products";

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{heading}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {results.length} {results.length === 1 ? "item" : "items"}
        </p>
      </div>

      <ProductFilters activeCategory={activeCategory} activeSort={sort} />

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-foreground">No products found</p>
          <p className="mt-1 text-sm text-muted-foreground">Try a different search or browse all categories.</p>
        </div>
      )}
    </main>
  );
}
