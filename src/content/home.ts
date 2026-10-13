import { categories, type CategorySlug } from "@/content/categories";

const cardPositions: Record<CategorySlug, { key: string; top: string; left: string }> = {
  "ai-automation": { key: "ai", top: "5%", left: "10%" },
  "embedded-iot": { key: "embedded", top: "42%", left: "55%" },
  "software-engineering": { key: "software", top: "72%", left: "10%" },
};

export const home = {
  intro: "Hello, I'm",
  bio: "Software Developer building practical applications with AI, software engineering, and automation.",
  cards: categories.map((category) => ({
    ...category,
    href: `/projects/${category.slug}`,
    position: cardPositions[category.slug],
  })),
};
