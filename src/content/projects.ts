import type { CategorySlug } from "@/content/categories";

export type Project = {
  slug: string;
  category: CategorySlug;
  title: string;
  oneLine: string;
  problem: string;
  solution: string;
  howItWorks: string[];
  stack: { name: string; why: string }[];
  result: string;
  learned: string;
  role: string;
  duration: string;
  links: { label: string; href: string }[];
  image?: string;
  imageAlt?: string;
};

export const projectCardCopy = {
  categoryPill: "CATEGORY",
  projectAction: "READ MORE",
  categoryAction: "VIEW PROJECTS",
  projectsComingSoon: "Projects coming soon",
  allProjects: "All projects",
};

export const projectsPageCopy = {
  title: "Projects",
  intro: "Browse work by category.",
};

export const projects: Project[] = [
  {
    slug: "software-engineering-placeholder",
    category: "software-engineering",
    title: "[PLACEHOLDER] Software engineering project",
    oneLine: "[PLACEHOLDER] Summary to be replaced with verified project details.",
    problem: "[PLACEHOLDER] Describe the problem after confirming the project facts.",
    solution: "[PLACEHOLDER] Describe the solution after confirming the project facts.",
    howItWorks: ["[PLACEHOLDER] Add a verified step describing how the project works."],
    stack: [
      {
        name: "[PLACEHOLDER] Technology",
        why: "[PLACEHOLDER] Explain why this technology was used after confirmation.",
      },
    ],
    result: "[PLACEHOLDER] Add a verified project result.",
    learned: "[PLACEHOLDER] Add a verified learning or takeaway.",
    role: "[PLACEHOLDER] Add the confirmed project role.",
    duration: "[PLACEHOLDER] Add the confirmed project duration.",
    links: [],
  },
  {
    slug: "ai-automation-placeholder",
    category: "ai-automation",
    title: "[PLACEHOLDER] AI and automation project",
    oneLine: "[PLACEHOLDER] Summary to be replaced with verified project details.",
    problem: "[PLACEHOLDER] Describe the problem after confirming the project facts.",
    solution: "[PLACEHOLDER] Describe the solution after confirming the project facts.",
    howItWorks: ["[PLACEHOLDER] Add a verified step describing how the project works."],
    stack: [
      {
        name: "[PLACEHOLDER] Technology",
        why: "[PLACEHOLDER] Explain why this technology was used after confirmation.",
      },
    ],
    result: "[PLACEHOLDER] Add a verified project result.",
    learned: "[PLACEHOLDER] Add a verified learning or takeaway.",
    role: "[PLACEHOLDER] Add the confirmed project role.",
    duration: "[PLACEHOLDER] Add the confirmed project duration.",
    links: [],
  },
  {
    slug: "embedded-iot-placeholder",
    category: "embedded-iot",
    title: "[PLACEHOLDER] Embedded and IoT project",
    oneLine: "[PLACEHOLDER] Summary to be replaced with verified project details.",
    problem: "[PLACEHOLDER] Describe the problem after confirming the project facts.",
    solution: "[PLACEHOLDER] Describe the solution after confirming the project facts.",
    howItWorks: ["[PLACEHOLDER] Add a verified step describing how the project works."],
    stack: [
      {
        name: "[PLACEHOLDER] Technology",
        why: "[PLACEHOLDER] Explain why this technology was used after confirmation.",
      },
    ],
    result: "[PLACEHOLDER] Add a verified project result.",
    learned: "[PLACEHOLDER] Add a verified learning or takeaway.",
    role: "[PLACEHOLDER] Add the confirmed project role.",
    duration: "[PLACEHOLDER] Add the confirmed project duration.",
    links: [],
  },
];

export function getProjectsByCategory(category: Project["category"]): Project[] {
  return projects.filter((project) => project.category === category);
}

export function getProject(category: Project["category"], slug: string): Project | undefined {
  return projects.find((project) => project.category === category && project.slug === slug);
}
