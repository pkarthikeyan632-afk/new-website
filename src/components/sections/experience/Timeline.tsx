import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { CSSProperties } from "react";
import { experience } from "@/content/experience";
import type { ExperienceContent, ExperienceEntry, ExperienceImage } from "@/types/experience";
import tekwissenLogo from "@/content/tekwissen logo.png";
import syscomLogo from "@/content/syscom automation.jpg";
import collegeLogo from "@/content/s.a engineering logo.png";
import vlogsLogo from "@/content/vlog innovation.png";
import tekwissenInternPhoto from "@/content/tekwissen intern.jpg";
import vloggCertificate from "@/content/vlogg certificate.jpg";

const content: ExperienceContent = experience;
const availableLogos: Record<string, StaticImageData> = {
  "/logos/tekwissen.webp": tekwissenLogo,
  "/logos/vlogs.webp": vlogsLogo,
  "/logos/syscom.webp": syscomLogo,
  "/logos/sa-engineering-college.webp": collegeLogo,
};
const availableImages: Record<string, StaticImageData> = {
  "/images/tekwissen-intern.jpg": tekwissenInternPhoto,
  "/images/vlogg-certificate.jpg": vloggCertificate,
};

type PositionedEntry = { entry: ExperienceEntry; entryIndex: number };

function publicAssetExists(publicPath?: string) {
  if (!publicPath) return false;
  const relativePath = publicPath.replace(/^[/\\]+/, "");
  return existsSync(path.join(process.cwd(), "public", relativePath));
}

function initials(title: string) {
  return title
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

function imageForEntry(images: ExperienceImage[], entryIndex: number) {
  const image = images.find((item) => item.entry === entryIndex);
  if (!image || (!availableImages[image.src] && !publicAssetExists(image.src))) return undefined;
  return image;
}

function renderImage(image: ExperienceImage, entryIndex: number) {
  const source = availableImages[image.src] ?? image.src;
  const isCertificate = image.src === "/images/vlogg-certificate.jpg";

  return (
    <figure className="experience-entry-image" data-entry={entryIndex} data-kind={isCertificate ? "certificate" : "photo"} key={image.src}>
      <div
        className="experience-entry-image-enter"
        style={{ "--entry-index": entryIndex } as CSSProperties}
      >
        <div className="experience-entry-image-float">
          <div className="experience-entry-image-frame">
            <Image
              src={source}
              alt={image.alt}
              fill
              sizes="320px"
              loading="lazy"
            />
          </div>
          <figcaption>{image.caption}</figcaption>
        </div>
      </div>
    </figure>
  );
}

function renderEntry({ entry, entryIndex }: PositionedEntry) {
  const desktopIndex = content.timeline.length - entryIndex;
  const side = desktopIndex % 2 === 0 ? "above" : "below";
  const localLogo = entry.logo ? availableLogos[entry.logo] : undefined;
  const hasLogo = Boolean(localLogo || publicAssetExists(entry.logo));
  const image = imageForEntry(content.images, entryIndex);

  return (
    <li
      className="experience-entry"
      data-entry={entryIndex}
      data-side={side}
      data-newest={entryIndex === 0 ? "true" : "false"}
      style={{ "--entry-index": desktopIndex, "--mobile-order": entryIndex } as CSSProperties}
      key={`${entry.title}-${entry.role}`}
    >
      <span aria-hidden="true" className={`experience-dot${entryIndex === 0 ? " newest" : ""}`} />
      <div className="experience-logo-tile" aria-hidden="true">
        <div className="experience-logo-float">
          {hasLogo && entry.logo ? (
            <Image src={localLogo ?? entry.logo} alt="" width={208} height={208} sizes="104px" />
          ) : (
            <span>{initials(entry.title)}</span>
          )}
        </div>
      </div>
      <div className="experience-entry-group">
        {side === "above" && image ? renderImage(image, entryIndex) : null}
        <article className="experience-entry-content">
          <h2 className="experience-entry-heading">
            <strong>{entry.title}</strong>
            <span className="experience-entry-subtitle">{entry.subtitle}</span>
          </h2>
          <p className="experience-entry-role">{entry.role}</p>
          <p className="experience-period">{entry.period}</p>
          <p className="experience-entry-line">{entry.line}</p>
        </article>
        {side === "below" && image ? renderImage(image, entryIndex) : null}
      </div>
    </li>
  );
}

export default function Timeline() {
  const newestFirst: PositionedEntry[] = [
    ...content.timeline.map((entry, entryIndex) => ({ entry, entryIndex })),
    { entry: content.education, entryIndex: content.timeline.length },
  ];
  return (
    <section className="experience-timeline" aria-label={content.eyebrow}>
      <div aria-hidden="true" className="experience-line-track">
        <span className="experience-line-start" />
        <span className="experience-line-end" />
      </div>
      <ol className="experience-entry-list" aria-label="Experience timeline">
        {newestFirst.map((item) => renderEntry(item))}
      </ol>
    </section>
  );
}
