import { about } from "@/content/about";

export default function AboutIntro() {
  const highlightIndex = about.headline.indexOf(about.highlight);
  const beforeHighlight = highlightIndex >= 0 ? about.headline.slice(0, highlightIndex) : about.headline;
  const afterHighlight = highlightIndex >= 0 ? about.headline.slice(highlightIndex + about.highlight.length) : "";

  return (
    <section className="about-intro-section">
      <p className="about-eyebrow"><span aria-hidden="true" />{about.eyebrow}</p>
      <h1 className="about-headline">
        {beforeHighlight}<span>{about.highlight}</span>{afterHighlight}
      </h1>
      <p className="about-intro-copy">{about.intro}</p>
    </section>
  );
}
