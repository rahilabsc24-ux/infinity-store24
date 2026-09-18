import { createFileRoute } from "@tanstack/react-router";
import TermsPage from "@/shop/pages/terms";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Infinity" },
      { name: "description", content: "The terms that apply when you shop with Infinity." },
      { property: "og:title", content: "Terms of Service — Infinity" },
      { property: "og:description", content: "The terms that apply when you shop with Infinity." },
    ],
  }),
  component: TermsPage,
});
