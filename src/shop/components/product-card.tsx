import Image from "next/image"
import Link from "next/link"
import { StarRating } from "@/components/star-rating"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { WishlistButton } from "@/components/wishlist-button"
import { formatPrice, type Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-muted"
      >
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-xs font-semibold text-brand-foreground">
            {product.badge}
          </span>
        )}
        <WishlistButton product={product} className="absolute right-3 top-3 z-10" />
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/products/${product.id}`} className="flex-1">
          <h3 className="line-clamp-1 font-medium text-foreground">{product.name}</h3>
          <p className="mt-0.5 line-clamp-1 text-sm text-muted-foreground">{product.tagline}</p>
        </Link>
        <StarRating rating={product.rating} reviews={product.reviews} />
        <div className="mt-1 flex items-center justify-between gap-2">
          <span className="text-lg font-semibold text-foreground">{formatPrice(product.price)}</span>
          <AddToCartButton product={product} size="sm" />
        </div>
      </div>
    </div>
  )
}
