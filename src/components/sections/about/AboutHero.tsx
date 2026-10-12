import { existsSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import AboutIcon from "@/components/sections/about/AboutIcon";
import { about } from "@/content/about";
import { site } from "@/content/site";
import type { AboutContent } from "@/types/about";

const content: AboutContent = about;
const photoPath = "/images/Media (1).jpg";
const hasPhoto = existsSync(join(process.cwd(), "public", photoPath.replace(/^\//, "")));

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M5 2.5h7l3 3V18H5V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2.5v3h3m-7 4h5m-5 3h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export default function AboutHero() {
  const highlightIndex = content.headline.indexOf(content.highlight);
  const beforeHighlight = highlightIndex >= 0 ? content.headline.slice(0, highlightIndex) : content.headline;
  const afterHighlight = highlightIndex >= 0 ? content.headline.slice(highlightIndex + content.highlight.length) : "";
  const contactExists = existsSync(join(process.cwd(), "src", "app", "contact", "page.tsx"));

  return (
    <section className="about-hero-grid min-h-0">
      <div className="about-hero-copy">
        <p className="about-eyebrow"><span aria-hidden="true" />{content.eyebrow}</p>
        <h1 className="about-headline">
          {beforeHighlight}<span className="text-blue-600">{content.highlight}</span>{afterHighlight}
        </h1>
        <p className="about-intro">{content.intro}</p>
        <div className="about-actions">
          <Link href={contactExists ? "/contact" : `mailto:${site.email}`} className="about-primary-button">
            LET&apos;S TALK <ArrowIcon />
          </Link>
          {content.resumeHref !== "" && (
            <a href={content.resumeHref} className="about-resume-button">
              <FileIcon /> DOWNLOAD RESUME
            </a>
          )}
        </div>
      </div>

      <div className="about-photo-space">
        <div aria-hidden="true" className="about-photo-orb" />
        {hasPhoto && (
          <Image
            src={photoPath}
            alt={site.name}
            fill
            priority
            sizes="(min-width: 1280px) 24vw, 90vw"
            className="z-10 object-cover object-[center_42%]"
          />
        )}
        <div className="about-chip"><span aria-hidden="true" />{content.chip}</div>
      </div>

      <div className="about-info-panel">
        {content.info.map((item, index) => (
          <article key={item.label} className={`about-info-row${index === content.info.length - 1 ? " last" : ""}`}>
            <span className="about-info-icon"><AboutIcon name={item.icon} /></span>
            <div className="min-w-0">
              <p className="about-info-label">{item.label}</p>
              <h2 className="about-info-title">{item.title}</h2>
              {item.detail !== "" && <p className="about-info-detail">{item.detail}</p>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
