"use client"

import { useMemo, useState } from "react"
import { BadgeCheck, ThumbsUp, Star } from "lucide-react"
import { Button } from "@/shop/components/ui/button"
import { useToast } from "@/shop/lib/toast-context"
import { getReviews, type Review } from "@/shop/lib/reviews"

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          onClick={() => onChange(n)}
          className="p-0.5"
        >
          <Star className={n <= value ? "size-6 fill-cta text-cta" : "size-6 text-muted-foreground/40"} />
        </button>
      ))}
    </div>
  )
}

function RatingBar({ stars, percent }: { stars: number; percent: number }) {
  return (
    <div className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className="w-3 text-right">{stars}</span>
      <Star className="size-3 fill-cta text-cta" />
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-cta" style={{ width: `${percent}%` }} />
      </div>
      <span className="w-8 text-right">{Math.round(percent)}%</span>
    </div>
  )
}

export function ReviewsSection({
  productId,
  rating,
  reviewCount,
}: {
  productId: string
  rating: number
  reviewCount: number
}) {
  const seeded = useMemo(() => getReviews(productId, rating), [productId, rating])
  const [reviews, setReviews] = useState<Review[]>(seeded)
  const [showForm, setShowForm] = useState(false)
  const [draftRating, setDraftRating] = useState(5)
  const [draftTitle, setDraftTitle] = useState("")
  const [draftBody, setDraftBody] = useState("")
  const { showToast } = useToast()

  const distribution = useMemo(() => {
    const counts = [0, 0, 0, 0, 0]
    for (const r of reviews) counts[Math.min(4, Math.max(0, Math.round(r.rating) - 1))]++
    const totalCount = reviews.length || 1
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      percent: (counts[stars - 1] / totalCount) * 100,
    }))
  }, [reviews])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!draftTitle.trim() || !draftBody.trim()) return
    const newReview: Review = {
      id: `${productId}-new-${Date.now()}`,
      author: "You",
      rating: draftRating,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      title: draftTitle.trim(),
      body: draftBody.trim(),
      verified: false,
      helpful: 0,
    }
    setReviews((prev) => [newReview, ...prev])
    setDraftTitle("")
    setDraftBody("")
    setDraftRating(5)
    setShowForm(false)
    showToast({ title: "Review submitted", description: "Thanks for sharing your feedback!", variant: "success" })
  }

  return (
    <section className="mt-16 border-t border-border pt-10">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">Customer reviews</h2>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-bold text-foreground">{rating.toFixed(1)}</span>
            <div>
              <div className="flex items-center gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < Math.round(rating) ? "size-4 fill-cta text-cta" : "size-4 fill-muted text-muted-foreground/40"}
                  />
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Based on {reviewCount.toLocaleString()} ratings</p>
            </div>
          </div>
          <div className="mt-4 max-w-xs space-y-1.5">
            {distribution.map((d) => (
              <RatingBar key={d.stars} stars={d.stars} percent={d.percent} />
            ))}
          </div>
        </div>

        <Button
          onClick={() => setShowForm((s) => !s)}
          variant="outline"
          className="h-10 border-border px-5 text-sm font-semibold"
        >
          {showForm ? "Cancel" : "Write a review"}
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-6 rounded-xl border border-border bg-card p-5">
          <div>
            <span className="mb-1.5 block text-sm font-medium text-foreground">Your rating</span>
            <StarPicker value={draftRating} onChange={setDraftRating} />
          </div>
          <div className="mt-4">
            <label htmlFor="review-title" className="mb-1.5 block text-sm font-medium text-foreground">
              Review title
            </label>
            <input
              id="review-title"
              value={draftTitle}
              onChange={(e) => setDraftTitle(e.target.value)}
              placeholder="Sum up your experience"
              required
              className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="review-body" className="mb-1.5 block text-sm font-medium text-foreground">
              Your review
            </label>
            <textarea
              id="review-body"
              value={draftBody}
              onChange={(e) => setDraftBody(e.target.value)}
              placeholder="What did you like or dislike?"
              required
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Button type="submit" className="mt-4 h-10 bg-cta px-6 text-sm font-semibold text-cta-foreground hover:bg-cta/90">
            Submit review
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">
            This is a demo store — reviews are stored locally in your browser and aren&apos;t published anywhere.
          </p>
        </form>
      )}

      <ul className="mt-8 divide-y divide-border">
        {reviews.map((review) => (
          <li key={review.id} className="py-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={i < review.rating ? "size-3.5 fill-cta text-cta" : "size-3.5 fill-muted text-muted-foreground/40"}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{review.date}</span>
            </div>
            <h3 className="mt-2 font-semibold text-foreground">{review.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{review.body}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{review.author}</span>
              {review.verified && (
                <span className="inline-flex items-center gap-1 text-brand">
                  <BadgeCheck className="size-3.5" />
                  Verified purchase
                </span>
              )}
              <span className="ml-auto inline-flex items-center gap-1">
                <ThumbsUp className="size-3.5" />
                Helpful ({review.helpful})
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
