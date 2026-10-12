import AboutIcon from "@/components/sections/about/AboutIcon";
import { about } from "@/content/about";
import type { AboutContent } from "@/types/about";

const content: AboutContent = about;

export default function Drives() {
  return (
    <section className="about-bottom-card about-drives-card">
      <p className="about-eyebrow"><span aria-hidden="true" />{content.drives.eyebrow}</p>
      <h2>{content.drives.title}</h2>
      <ul className="about-drive-list">
        {content.drives.items.map((item) => (
          <li key={item.icon}>
            <span className="about-drive-icon"><AboutIcon name={item.icon} /></span>
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
