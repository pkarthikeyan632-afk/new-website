import type { Project } from "../types";

export const projects: Project[] = [
  {
    id: "vision-bot",
    title: "Vision Bot",
    flow: "See → Detect → Separate",
    tech: ["Python", "OpenCV"],
  },
  {
    id: "flowguard",
    title: "FlowGuard",
    flow: "Monitor → Understand → Recover",
    tech: ["React", "Node.js", "n8n"],
  },
  {
    id: "fire-robot",
    title: "Fire-Fighting Robot",
    flow: "Detect → Navigate → Extinguish",
    tech: ["Arduino", "C/C++"],
  },
];