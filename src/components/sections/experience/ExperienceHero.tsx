import { experience } from "@/content/experience";
import type { ExperienceContent } from "@/types/experience";

const content: ExperienceContent = experience;

export default function ExperienceHero() {
  return (
    <section className="experience-hero">
      <p className="experience-eyebrow"><span aria-hidden="true" />{content.eyebrow}</p>
      <h1 className="experience-title">{content.title}</h1>
    </section>
  );
}
