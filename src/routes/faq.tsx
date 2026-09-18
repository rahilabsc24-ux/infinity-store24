import { createFileRoute } from "@tanstack/react-router";
import FaqPage from "@/shop/pages/faq";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Infinity" },
      { name: "description", content: "Answers about shipping, returns, sizing, payments, and orders at Infinity." },
      { property: "og:title", content: "FAQ — Infinity" },
      { property: "og:description", content: "Answers about shipping, returns, sizing, payments, and orders at Infinity." },
    ],
  }),
  component: FaqPage,
});
