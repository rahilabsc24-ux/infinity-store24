export type Review = {
  id: string
  author: string
  rating: number
  date: string
  title: string
  body: string
  verified: boolean
  helpful: number
}

const authors = [
  "Jamie L.",
  "Priya R.",
  "Marcus T.",
  "Chloe W.",
  "Daniel K.",
  "Sofia M.",
  "Ben H.",
  "Amara O.",
]

const templates = [
  { title: "Exceeded expectations", body: "Great quality for the price and it arrived faster than I expected. Would buy again." },
  { title: "Exactly as described", body: "Matches the photos and description closely. No surprises, which is exactly what I want." },
  { title: "My new favorite", body: "I've already recommended this to two friends. The attention to detail really shows." },
  { title: "Good, with a minor caveat", body: "Overall happy with it, though sizing/fit ran slightly different than I expected. Still worth it." },
  { title: "Solid everyday pick", body: "Been using this for a few weeks now and it's holding up well to daily use." },
  { title: "Worth every penny", body: "Was on the fence about the price but after using it I completely understand why." },
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

/** Deterministic pseudo-reviews so each product shows consistent sample feedback. */
export function getReviews(productId: string, rating: number, count = 5): Review[] {
  const seed = hashString(productId)
  const reviews: Review[] = []
  const total = Math.min(count, templates.length)

  for (let i = 0; i < total; i++) {
    const t = templates[(seed + i) % templates.length]
    const author = authors[(seed + i * 3) % authors.length]
    const daysAgo = ((seed + i * 17) % 120) + 3
    const date = new Date(Date.now() - daysAgo * 86400000)
    const starOffset = i === total - 1 ? -1 : 0
    reviews.push({
      id: `${productId}-review-${i}`,
      author,
      rating: Math.max(3, Math.min(5, Math.round(rating) + starOffset)),
      date: date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      title: t.title,
      body: t.body,
      verified: (seed + i) % 4 !== 0,
      helpful: ((seed + i * 7) % 40) + 2,
    })
  }

  return reviews
}
