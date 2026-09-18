import { createFileRoute } from "@tanstack/react-router";
import CartPage from "@/shop/pages/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Infinity" },
      { name: "description", content: "Review the items in your Infinity shopping cart and check out." },
      { property: "og:title", content: "Your cart — Infinity" },
      { property: "og:description", content: "Review the items in your Infinity shopping cart and check out." },
    ],
  }),
  component: CartPage,
});
