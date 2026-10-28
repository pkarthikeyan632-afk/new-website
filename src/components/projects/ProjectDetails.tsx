import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import ProjectHero, { makeLayers } from "@/components/projects/ProjectHero";
import ProjectSections from "@/components/projects/ProjectSections";
import type { AvailableProjectImage } from "@/components/projects/ProjectGallery";
import { projects, type Project, type ProjectImage } from "@/content/projects";
import { site } from "@/content/site";
import type { Category } from "@/content/categories";
import styles from "./ProjectPage.module.css";

type ProjectDetailsProps = { category: Category; project: Project };
const production = process.env.NODE_ENV === "production";

function projectAssetExists(src: string) {
  const relative = src.replace(/^[/\\]+/, "");
  return existsSync(path.join(process.cwd(), "public", relative));
}

function galleryForProject(project: Project): ProjectImage[] {
  if (project.gallery?.length) return project.gallery.slice(0, 3);
  if (project.image) return [{ src: project.image, alt: project.imageAlt ?? project.title, caption: "" }];
  return [];
}

function ProjectFooter({ category, project }: ProjectDetailsProps) {
  const sameCategory = projects.filter((item) => item.category === category.slug);
  const index = sameCategory.findIndex((item) => item.slug === project.slug);
  const previous = sameCategory.length > 1 ? sameCategory[(index - 1 + sameCategory.length) % sameCategory.length] : undefined;
  const next = sameCategory.length > 1 ? sameCategory[(index + 1) % sameCategory.length] : undefined;
  return <footer className={styles.projectFooter}>
    <div>
      <div className={styles.projectNeighbors}>{previous ? <Link className={styles.footerLink} href={`/projects/${category.slug}/${previous.slug}`}>← Previous project</Link> : null}{next ? <Link className={styles.footerLink} href={`/projects/${category.slug}/${next.slug}`}>Next project →</Link> : null}</div>
      <Link className={styles.footerLink} href={`/projects/${category.slug}`}>Back to {category.title}</Link>
    </div>
    <a className={styles.contactButton} href={site.contactHref}>LET&apos;S TALK</a>
  </footer>;
}

export default function ProjectDetails({ category, project }: ProjectDetailsProps) {
  const images: AvailableProjectImage[] = galleryForProject(project).map((image, index) => ({ image, exists: projectAssetExists(image.src), number: index + 1 }));
  const outputImages = production ? images.filter((image) => image.exists) : images;
  const heroLayers = makeLayers(project);
  const fallbackImage = images.find((image) => image.exists)?.image;
  return <div className={styles.projectPage}>
    <ProjectHero category={category} project={project} layers={heroLayers} fallbackImage={fallbackImage} />
    <ProjectSections project={project} images={outputImages} />
    <ProjectFooter category={category} project={project} />
  </div>;
}
