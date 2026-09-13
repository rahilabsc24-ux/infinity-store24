"use client"

import { Link } from "@/shop/lib/next-compat"
import { useRouter, useSearchParams } from "@/shop/lib/next-compat"
import { cn } from "@/shop/lib/utils"
import { categories, type Category } from "@/shop/lib/products"

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
]

export function ProductFilters({
  activeCategory,
  activeSort,
}: {
  activeCategory?: Category
  activeSort: string
}) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function buildHref(category?: Category) {
    const params = new URLSearchParams(searchParams.toString())
    if (category) params.set("category", category)
    else params.delete("category")
    const qs = params.toString()
    return qs ? `/products?${qs}` : "/products"
  }

  function handleSort(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", e.target.value)
    router.push(`/products?${params.toString()}`)
  }

  const pill = "rounded-full px-4 py-1.5 text-sm font-medium transition-colors"

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        <Link
          href={buildHref(undefined)}
          className={cn(
            pill,
            !activeCategory ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground hover:bg-muted",
          )}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={buildHref(c.slug)}
            className={cn(
              pill,
              activeCategory === c.slug
                ? "bg-brand text-brand-foreground"
                : "bg-secondary text-foreground hover:bg-muted",
            )}
          >
            {c.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <label htmlFor="sort" className="text-sm text-muted-foreground">
          Sort
        </label>
        <select
          id="sort"
          value={activeSort}
          onChange={handleSort}
          className="h-9 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
