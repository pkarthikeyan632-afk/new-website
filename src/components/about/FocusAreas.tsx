import Link from "next/link";
import { siClaude, siEspressif, siN8n, siNodedotjs, siPython, siReact } from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { categories } from "@/content/categories";
import { about } from "@/content/about";

const iconByTool: Record<string, SimpleIcon> = {
  Python: siPython,
  "n8n": siN8n,
  "Claude API": siClaude,
  ESP32: siEspressif,
  React: siReact,
  "Node.js": siNodedotjs,
};

export default function FocusAreas() {
  return (
    <section className="about-focus-section">
      <p className="about-eyebrow"><span aria-hidden="true" />What I do</p>
      <div className="about-focus-grid">
        {categories.map((category) => (
          <article className="about-focus-card" key={category.slug}>
            <h2>{category.title}</h2>
            <p className="about-focus-summary">{category.summary}</p>
            <ul className="about-tool-list" aria-label={`${category.title} tools`}>
              {about.focusAreas[category.slug].map((tool) => {
                const icon = iconByTool[tool];
                return (
                  <li className="about-tool-chip" key={tool}>
                    {icon && (
                      <svg aria-hidden="true" viewBox="0 0 24 24" style={{ color: `#${icon.hex}` }}>
                        <path fill="currentColor" d={icon.path} />
                      </svg>
                    )}
                    <span>{tool}</span>
                  </li>
                );
              })}
            </ul>
            <Link className="about-focus-link" href={`/projects/${category.slug}`}>
              VIEW PROJECTS <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
