export type ExpertiseEntry = {
  slug: string;
  title: string;
  summary: string;
  projects: string[];
};

export const expertise: ExpertiseEntry[] = [
  {
    slug: "software-engineering",
    title: "Software Engineering",
    summary: "An overview of software engineering.",
    projects: [],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    summary: "An overview of AI and automation.",
    projects: [],
  },
  {
    slug: "embedded-iot",
    title: "Embedded & IoT",
    summary: "An overview of embedded systems and IoT.",
    projects: [],
  },
];
