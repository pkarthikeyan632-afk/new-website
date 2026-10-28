import type { CategorySlug } from "@/content/categories";

export type AboutInfoIconName = "education" | "role" | "location";

export const about = {
  eyebrow: "About me",
  headline: "Turning ideas into working systems.",
  highlight: "working systems.",
  intro:
    "I'm a software developer at TekWissen, working at the intersection of software engineering, AI, and automation. I build practical solutions that connect applications, APIs, and intelligent systems to solve real-world problems.",
  resumeHref: "/resume.pdf",
  photo: "/images/about-portrait-suit.webp",
  info: [
    { icon: "education", label: "Education", title: "B.E. Electronics & Communication Engineering", detail: "S.A Engineering College. 2026" },
    { icon: "role", label: "Current role", title: "Jr. Software Engineer", detail: "TekWissen, full time" },
    { icon: "location", label: "Location", title: "Bengaluru, India", detail: "" },
  ] satisfies { icon: AboutInfoIconName; label: string; title: string; detail: string }[],
  focusAreas: {
    "ai-automation": ["Python", "n8n", "Claude API"],
    "embedded-iot": ["ESP32"],
    "software-engineering": ["React", "Node.js"],
  } satisfies Record<CategorySlug, string[]>,
};
