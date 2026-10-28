import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/content/categories";
import type { ArchitectureLayer, Project, ProjectImage } from "@/content/projects";
import ArchitectureExplorer from "./ArchitectureExplorer";
import styles from "./ProjectPage.module.css";

const production = process.env.NODE_ENV === "production";

function isPlaceholder(value?: string) {
  return Boolean(value?.trimStart().startsWith("[PLACEHOLDER]"));
}

function visible(value?: string) {
  return Boolean(value?.trim()) && (!production || !isPlaceholder(value));
}

function statusClass(status?: string) {
  const value = status?.toLowerCase() ?? "";
  if (["completed", "done", "live"].some((word) => value.includes(word))) return styles.pillStatusDone;
  if (["development", "progress", "early", "prototype", "planned"].some((word) => value.includes(word))) return styles.pillStatusPlanned;
  return "";
}

function GithubIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.98 1.69 2.57 1.2 3.2.92.1-.72.38-1.2.7-1.48-2.48-.28-5.1-1.24-5.1-5.53 0-1.22.44-2.22 1.14-3-.12-.28-.5-1.42.11-2.96 0 0 .93-.3 3.08 1.15a10.7 10.7 0 0 1 5.6 0c2.14-1.45 3.07-1.15 3.07-1.15.61 1.54.23 2.68.12 2.96.7.78 1.13 1.78 1.13 3 0 4.3-2.63 5.24-5.13 5.52.4.35.75 1.03.75 2.08v3.08c0 .3.2.65.77.54A11.2 11.2 0 0 0 12 .8Z" /></svg>;
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function ObjectiveIcon() {
  return <span className={styles.objectiveIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v3m10 7h-3" /></svg></span>;
}

export function makeLayers(project: Project): ArchitectureLayer[] {
  const cleanLayer = (layer: ArchitectureLayer): ArchitectureLayer => ({
    ...layer,
    text: visible(layer.text) ? layer.text : "",
    input: visible(layer.input) ? layer.input : undefined,
    output: visible(layer.output) ? layer.output : undefined,
    tech: layer.tech?.filter((item) => visible(item)),
    details: layer.details?.filter((item) => visible(item)),
  });
  if (project.architecture?.length) {
    return project.architecture
      .filter((layer) => visible(layer.layer) || visible(layer.text))
      .map(cleanLayer);
  }
  if (project.workflow?.length) {
    return project.workflow
      .filter((step) => visible(step.title) || visible(step.text))
      .map((step): ArchitectureLayer => ({ layer: step.title, text: step.text, planned: step.planned }));
  }
  return project.howItWorks
    .filter((step) => visible(step))
    .map((step): ArchitectureLayer => ({ layer: step, text: step }));
}

function ObjectiveCard({ project }: { project: Project }) {
  const objectives = (project.objectives ?? []).filter((item) => visible(item));
  const problem = visible(project.problem) ? project.problem : undefined;
  const problemText = problem && !isPlaceholder(problem) ? problem : undefined;
  if (!problemText && !objectives.length) return null;
  return <section className={styles.objectiveCard} aria-label="Objective"><ObjectiveIcon /><div><h2>Objective</h2>{problemText ? <div className={styles.objectiveProblem}><span className={styles.objectiveLabel}>Problem</span><p>{problemText}</p></div> : null}{objectives.length ? <ul className={styles.objectiveList}>{objectives.map((item, index) => <li key={`${index}-${item}`}><span aria-hidden="true">✓</span><span>{isPlaceholder(item) ? <span className={styles.placeholderBlock}><span className={styles.toFill}>TO FILL</span><br />{item}</span> : item}</span></li>)}</ul> : null}</div></section>;
}

function ImagePreview({ image }: { image: ProjectImage }) {
  return <div className={styles.heroImageFrame}>
    {image.concept ? <span className={styles.conceptTag}>Concept, not real data</span> : null}
    <Image src={image.src} alt={image.alt} fill sizes="(max-width: 1023px) 100vw, 48vw" loading="lazy" className={image.fit === "contain" ? styles.containImage : undefined} />
  </div>;
}

function Glance({ category, project }: { category: Category; project: Project }) {
  const items = [
    { label: "Domain", value: category.title },
    { label: "Role", value: project.role },
    { label: "Duration", value: project.duration },
    { label: "Status", value: project.status },
    { label: "Context", value: project.context },
  ].filter((item) => visible(item.value));
  if (!items.length) return null;
  return <dl className={styles.glance}>{items.map((item) => <div className={styles.glanceItem} key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>)}</dl>;
}

export default function ProjectHero({
  category,
  project,
  layers,
  fallbackImage,
}: {
  category: Category;
  project: Project;
  layers: ArchitectureLayer[];
  fallbackImage?: ProjectImage;
}) {
  const statusVisible = visible(project.status);
  const links = project.links.filter((link) => visible(link.label) && visible(link.href));
  return <>
    <div className={`${styles.hero} ${!layers.length && !fallbackImage ? styles.heroSingle : ""}`}>
      <div className={styles.heroCopy}>
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/projects">Projects</Link><span aria-hidden="true">›</span><Link href={`/projects/${category.slug}`}>{category.title}</Link>{visible(project.title) ? <><span aria-hidden="true">›</span><span aria-current="page">{project.title}</span></> : null}
        </nav>
        <div className={styles.pills}><span className={styles.pill}>{category.title}</span>{statusVisible ? <span className={`${styles.pill} ${statusClass(project.status)}`}>{project.status}</span> : null}{visible(project.context) ? <span className={styles.pill}>{project.context}</span> : null}</div>
        {visible(project.title) ? <h1 className={styles.projectTitle}>{project.title}</h1> : !production && isPlaceholder(project.title) ? <div className={`${styles.placeholderBlock} ${styles.projectPlaceholder}`}><span className={styles.toFill}>TO FILL</span><h1 className={styles.projectTitle}>{project.title}</h1></div> : null}
        {visible(project.oneLine) ? <p className={styles.oneLine}>{project.oneLine}</p> : !production && isPlaceholder(project.oneLine) ? <div className={styles.placeholderBlock}><span className={styles.toFill}>TO FILL</span><p className={styles.oneLine}>{project.oneLine}</p></div> : null}
        <ObjectiveCard project={project} />
        {links.length ? <div className={styles.linkButtons}>{links.map((link, index) => <a className={`${styles.linkButton} ${index === 0 ? styles.linkButtonPrimary : ""}`} href={link.href} target="_blank" rel="noopener noreferrer" key={`${link.href}-${link.label}`}>{link.href.includes("github.com") ? <GithubIcon /> : null}{link.label}{index === 0 ? <ArrowIcon /> : null}</a>)}</div> : null}
      </div>
      {layers.length ? <ArchitectureExplorer layers={layers} /> : fallbackImage ? <ImagePreview image={fallbackImage} /> : null}
    </div>
    <Glance category={category} project={project} />
  </>;
}
