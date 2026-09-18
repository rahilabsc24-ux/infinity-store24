import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/shop/pages/about";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Infinity — Our story" },
      { name: "description", content: "How Infinity curates dresses, gadgets, and accessories worth keeping." },
      { property: "og:title", content: "About Infinity — Our story" },
      { property: "og:description", content: "How Infinity curates dresses, gadgets, and accessories worth keeping." },
    ],
  }),
  component: AboutPage,
});
