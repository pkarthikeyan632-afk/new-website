export type CategorySlug = "software-engineering" | "ai-automation" | "embedded-iot";

export type Category = {
  slug: CategorySlug;
  title: string;
  summary: string;
  lottie: string;
  scale: number;
  image?: string;
  imageAlt?: string;
};

export const categoryNavigationCopy = {
  viewAllProjects: "View all projects",
};

export const categories: Category[] = [
  {
    slug: "ai-automation",
    title: "AI & Automation",
    summary: "An overview of AI and automation.",
    lottie: "/animations/ai-automation.lottie",
    scale: 1.5,
  },
  {
    slug: "embedded-iot",
    title: "Embedded & IoT",
    summary: "An overview of embedded systems and IoT.",
    lottie: "/animations/embedded-iot.lottie",
    scale: 1.5,
  },
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary: "An overview of software engineering.",
    lottie: "/animations/software-engineering.lottie",
    scale: 1,
  },
];
