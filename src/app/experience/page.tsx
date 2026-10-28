import type { Metadata } from "next";
import ExperienceHero from "@/components/sections/experience/ExperienceHero";
import Timeline from "@/components/sections/experience/Timeline";
import { experience } from "@/content/experience";
import type { ExperienceContent } from "@/types/experience";

const content: ExperienceContent = experience;

export function generateMetadata(): Metadata {
  return {
    title: content.title,
    description: content.timeline[0].line,
  };
}

export default function ExperiencePage() {
  return (
    <div className="experience-page">
      <ExperienceHero />
      <Timeline />
    </div>
  );
}
