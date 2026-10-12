import { about } from "@/content/about";
import type { AboutContent } from "@/types/about";

const content: AboutContent = about;

export default function Journey() {
  return (
    <section className="about-journey-section">
      <div className="about-journey-heading">
        <p className="about-eyebrow"><span aria-hidden="true" />{content.journey.eyebrow}</p>
        <h2>{content.journey.title}</h2>
      </div>
      <ol className="about-horizontal-timeline">
        {content.journey.steps.map((step, index) => (
          <li key={`${step.year}-${step.title}`} className="about-timeline-step">
            <span aria-hidden="true" className={`about-timeline-dot${index === content.journey.steps.length - 1 ? " latest" : ""}`} />
            <p className="about-timeline-year">{step.year}</p>
            <h3>{step.title}</h3>
            <p className="about-timeline-copy">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
