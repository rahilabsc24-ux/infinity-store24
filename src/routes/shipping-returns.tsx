import { createFileRoute } from "@tanstack/react-router";
import ShippingReturnsPage from "@/shop/pages/shipping-returns";

export const Route = createFileRoute("/shipping-returns")({
  head: () => ({
    meta: [
      { title: "Shipping & Returns — Infinity" },
      { name: "description", content: "Delivery times, shipping costs, and the 30-day Infinity returns process." },
      { property: "og:title", content: "Shipping & Returns — Infinity" },
      { property: "og:description", content: "Delivery times, shipping costs, and the 30-day Infinity returns process." },
    ],
  }),
  component: ShippingReturnsPage,
});
