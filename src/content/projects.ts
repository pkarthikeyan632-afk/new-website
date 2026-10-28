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
  context?: string;
  overview?: string;
  objectives?: string[];
  status?: string;
  architecture?: ArchitectureLayer[];
  workflow?: WorkflowStep[];
  sequence?: ProjectSequence;
  gallery?: ProjectImage[];
  challenges?: string[];
  statusItems?: ProjectStatusItem[];
  limitations?: string[];
  nextSteps?: string[];
  tools?: (string | ProjectTool)[];
  dataModel?: DataModelTable[];
  code?: CodeSample[];
  dataTrace?: string[];
  documentation?: ProjectLink[];
};

export type ArchitectureLayer = {
  id?: string;
  layer: string;
  text: string;
  tech?: string[];
  status?: "built" | "planned";
  planned?: boolean;
  input?: string;
  output?: string;
  details?: string[];
  kind?: "source" | "backend" | "ai" | "data" | "frontend" | "hardware" | "other";
};

export type WorkflowStep = { title: string; text: string; planned?: boolean };
export type ProjectSequence = {
  actors: string[];
  messages: { from: string; to: string; text: string; planned?: boolean }[];
};
export type ProjectImage = {
  src: string;
  alt: string;
  caption: string;
  concept?: boolean;
  fit?: "cover" | "contain";
};
export type ProjectStatusItem = { label: string; status: "done" | "in-progress" };
export type ProjectTool = { name: string; group?: string };
export type DataModelTable = { name: string; fields: { name: string; type: string; description?: string }[] };
export type CodeSample = { path: string; code: string };
export type ProjectLink = { label: string; href: string };

export const projectsPageCopy = {
  title: "Projects",
  intro: "Browse work by category.",
};

export const projectCardCopy = {
  categoryPill: "CATEGORY",
  projectAction: "READ MORE",
  categoryAction: "VIEW PROJECTS",
  projectsComingSoon: "Projects coming soon",
  allProjects: "All projects",
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
