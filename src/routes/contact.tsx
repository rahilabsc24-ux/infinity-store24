import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/shop/pages/contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Infinity — We're here to help" },
      { name: "description", content: "Questions about an order, sizing, or returns? Reach the Infinity team." },
      { property: "og:title", content: "Contact Infinity — We're here to help" },
      { property: "og:description", content: "Questions about an order, sizing, or returns? Reach the Infinity team." },
    ],
  }),
  component: ContactPage,
});
