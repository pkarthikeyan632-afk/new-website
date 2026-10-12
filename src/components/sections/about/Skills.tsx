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
  return (
    <section className="about-bottom-card about-skills-card">
      <p className="about-eyebrow"><span aria-hidden="true" />{content.skills.eyebrow}</p>
      <h2>{content.skills.title}</h2>
      <ul className="about-skill-grid">
        {content.skills.items.map((item) => {
          const icon = iconBySlug[item.icon];

          return (
            <li key={item.name} className="about-skill-tile">
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
        })}
      </ul>
    </section>
  );
}
