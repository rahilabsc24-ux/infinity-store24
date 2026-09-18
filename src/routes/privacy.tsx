import { createFileRoute } from "@tanstack/react-router";
import PrivacyPage from "@/shop/pages/privacy";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Infinity" },
      { name: "description", content: "How Infinity collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Infinity" },
      { property: "og:description", content: "How Infinity collects, uses, and protects your personal information." },
    ],
  }),
  component: PrivacyPage,
});
