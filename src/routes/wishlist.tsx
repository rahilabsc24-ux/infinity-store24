import { createFileRoute } from "@tanstack/react-router";
import WishlistPage from "@/shop/pages/wishlist";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — Infinity" },
      { name: "description", content: "Everything you've saved for later at Infinity." },
      { property: "og:title", content: "Wishlist — Infinity" },
      { property: "og:description", content: "Everything you've saved for later at Infinity." },
    ],
  }),
  component: WishlistPage,
});
