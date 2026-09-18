import { createFileRoute } from "@tanstack/react-router";
import CheckoutPage from "@/shop/pages/checkout";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Infinity" },
      { name: "description", content: "Securely complete your Infinity order in a few quick steps." },
      { property: "og:title", content: "Checkout — Infinity" },
      { property: "og:description", content: "Securely complete your Infinity order in a few quick steps." },
    ],
  }),
  component: CheckoutPage,
});
