import { siClaude, siEspressif, siN8n, siNodedotjs, siPython, siReact } from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { about } from "@/content/about";
import type { AboutContent } from "@/types/about";

const content: AboutContent = about;

const iconBySlug: Record<string, SimpleIcon> = {
  python: siPython,
  react: siReact,
  nodedotjs: siNodedotjs,
  n8n: siN8n,
  claude: siClaude,
  espressif: siEspressif,
};

export default function Skills() {
  const repeatCount = 2;

  const renderPills = (copy: "primary" | "duplicate") =>
    Array.from({ length: repeatCount }, (_, repeatIndex) =>
      content.skills.items.map((item) => {
        const icon = iconBySlug[item.icon];
        const duplicate = copy === "duplicate" || repeatIndex > 0;

        return (
          <li
            key={`${copy}-${repeatIndex}-${item.name}`}
            className={`about-skill-tile${duplicate ? " about-skill-marquee-clone" : ""}`}
            tabIndex={duplicate ? -1 : 0}
            aria-hidden={duplicate || undefined}
          >
            {icon ? (
              <svg aria-hidden="true" viewBox="0 0 24 24" className="about-skill-icon" style={{ color: `#${icon.hex}` }}>
                <path fill="currentColor" d={icon.path} />
              </svg>
            ) : (
              <span aria-hidden="true" className="about-skill-fallback">{item.name.slice(0, 1)}</span>
            )}
            <span>{item.name}</span>
          </li>
        );
      }),
    ).flat();

  return (
    <section className="about-skills-section">
      <div className="about-skills-heading">
        <p className="about-eyebrow"><span aria-hidden="true" />{content.skills.eyebrow}</p>
        <h2>{content.skills.title}</h2>
      </div>
      <div className="about-skill-marquee">
        <div className="about-skill-marquee-track">
          <ul className="about-skill-marquee-copy">{renderPills("primary")}</ul>
          <ul className="about-skill-marquee-copy" aria-hidden="true" tabIndex={-1}>
            {renderPills("duplicate")}
          </ul>
        </div>
      </div>
    </section>
  );
}
