import type {
  CodeSample,
  DataModelTable,
  Project,
  ProjectSequence,
  ProjectTool,
  WorkflowStep,
} from "@/content/projects";
import type { CSSProperties, ReactNode } from "react";
import ProjectGallery, { type AvailableProjectImage } from "./ProjectGallery";
import styles from "./ProjectPage.module.css";

const production = process.env.NODE_ENV === "production";

function isPlaceholder(value: string) {
  return value.trimStart().startsWith("[PLACEHOLDER]");
}

function usable(value?: string) {
  return Boolean(value?.trim()) && (!production || !isPlaceholder(value ?? ""));
}

function GuardedText({ value, className }: { value: string; className?: string }) {
  if (!usable(value)) return null;
  return isPlaceholder(value) ? (
    <div className={`${styles.placeholderBlock} ${className ?? ""}`}><span className={styles.toFill}>TO FILL</span><p>{value}</p></div>
  ) : <p className={className}>{value}</p>;
}

function GuardedInline({ value }: { value?: string }) {
  if (!value || !usable(value)) return null;
  return isPlaceholder(value) ? <span className={styles.placeholderBlock}><span className={styles.toFill}>TO FILL</span> {value}</span> : value;
}

function GuardedList({ values, ordered = false }: { values: string[]; ordered?: boolean }) {
  const items = values.filter((value) => usable(value));
  if (!items.length) return null;
  const List = ordered ? "ol" : "ul";
  return (
    <List className={styles.numberedList}>
      {items.map((value, index) => (
        <li key={`${index}-${value}`}>
          {isPlaceholder(value) ? <div className={styles.placeholderBlock}><span className={styles.toFill}>TO FILL</span><p>{value}</p></div> : value}
        </li>
      ))}
    </List>
  );
}

function SectionIcon({ type }: { type: string }) {
  const paths: Record<string, string> = {
    solution: "M12 3v3m0 12v3M3 12h3m12 0h3M5.64 5.64l2.12 2.12m8.48 8.48 2.12 2.12m0-12.72-2.12 2.12m-8.48 8.48-2.12 2.12M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
    output: "M4 5h16v14H4zM4 15l4-4 4 4 3-3 5 5M9 9h.01",
    flow: "M5 5h4v4H5zM15 15h4v4h-4zM7 9v3a2 2 0 0 0 2 2h6m-2-3 3 3-3 3",
    learned: "M12 3v18m-7-7 7 7 7-7",
    status: "m5 12 4 4L19 6",
    stack: "M4 7h16M4 12h16M4 17h16",
    details: "m7 10 5 5 5-5",
  };
  return <span className={styles.sectionIcon} aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={paths[type] ?? paths.solution} /></svg></span>;
}

function ProjectSection({ title, icon, children }: { title: string; icon: string; children: ReactNode }) {
  return <section className={styles.projectSection}><div className={styles.sectionHeading}><SectionIcon type={icon} /><h2>{title}</h2></div>{children}</section>;
}

function hasUsable(values?: string[]) {
  return Boolean(values?.some((value) => usable(value)));
}

function leadAndRest(value: string) {
  const match = value.match(/^[\s\S]*?[.!?](?=\s|$)/);
  if (!match || match[0].length === value.length) return { lead: value, rest: "" };
  return { lead: match[0], rest: value.slice(match[0].length).trimStart() };
}

function SolutionSection({ project }: { project: Project }) {
  const solution = usable(project.solution) ? project.solution : undefined;
  const overview = usable(project.overview) ? project.overview : undefined;
  const text = solution ?? overview;
  const showSteps = !project.workflow && hasUsable(project.howItWorks);
  const result = usable(project.result) && !isPlaceholder(project.result) ? project.result : undefined;
  if (!text && !showSteps && !result) return null;

  const pieces = text && !isPlaceholder(text) ? leadAndRest(text) : null;
  return (
    <ProjectSection title="Solution" icon="solution">
      {text ? pieces ? <div className={styles.sectionContent}><p className={styles.leadSentence}>{pieces.lead}</p>{pieces.rest ? <p>{pieces.rest}</p> : null}</div> : <GuardedText value={text} className={styles.sectionContent} /> : null}
      {showSteps ? <><h3 className={styles.sectionSubheading}>How it works</h3><GuardedList values={project.howItWorks} ordered /></> : null}
      {result ? <p className={styles.resultLine}><span aria-hidden="true">✓</span><strong>Result</strong><span>{result}</span></p> : null}
    </ProjectSection>
  );
}

function OutputSection({ images }: { images: AvailableProjectImage[] }) {
  if (!images.length) return null;
  return <ProjectSection title="Output" icon="output"><ProjectGallery images={images} /></ProjectSection>;
}

function SequenceDiagram({ sequence }: { sequence: ProjectSequence }) {
  const actors = sequence.actors.filter((actor) => usable(actor));
  const messages = sequence.messages.filter((message) => usable(message.text) && usable(message.from) && usable(message.to));
  if (!actors.length || !messages.length) return null;
  const width = Math.max(actors.length * 120, 600);
  const height = 68 + messages.length * 48;
  const centers = new Map(actors.map((actor, index) => [actor, 60 + index * 120]));
  return (
    <div className={styles.sequenceCard} data-actors={actors.length}>
      <h3>Data flow</h3>
      <svg className={styles.sequenceDiagram} viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Sequence diagram">
        <defs><marker id="sequence-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0 8 4 0 8Z" fill="#475569" /></marker></defs>
        {actors.map((actor, index) => {
          const x = 10 + index * 120;
          const cx = centers.get(actor) ?? x + 60;
          return <g key={`${actor}-${index}`}><rect className={styles.actorBox} x={x} y="8" width="100" height="34" rx="10" /><text x={cx} y="30" textAnchor="middle">{actor}</text><line x1={cx} y1="42" x2={cx} y2={height - 8} stroke="#cbd5e1" strokeDasharray="4 5" /></g>;
        })}
        {messages.map((message, index) => {
          const y = 60 + index * 48;
          const from = centers.get(message.from) ?? 80;
          const to = centers.get(message.to) ?? width - 80;
          return <g key={`${index}-${message.text}`}>
            <line className={message.planned ? styles.plannedMessage : styles.messageLine} x1={from} y1={y} x2={to} y2={y} markerEnd="url(#sequence-arrow)" />
            <text x={width / 2} y={y - 7} textAnchor="middle">{message.text}{message.planned ? " (planned)" : ""}</text>
          </g>;
        })}
      </svg>
      <ol className={styles.sequenceList}>{messages.map((message, index) => <li key={`${index}-${message.text}`} data-planned={message.planned}>{message.text}{message.planned ? " (planned)" : ""}</li>)}</ol>
    </div>
  );
}

function WorkflowSection({ steps, sequence }: { steps: WorkflowStep[]; sequence?: ProjectSequence }) {
  const visible = steps.filter((step) => usable(step.title) || usable(step.text));
  const sequenceHasContent = sequence && sequence.actors.some((actor) => usable(actor)) && sequence.messages.some((message) => usable(message.text));
  if (!visible.length && !sequenceHasContent) return null;
  return (
    <ProjectSection title="Flow chart" icon="flow">
      {visible.length ? <div className={styles.workflow}>{visible.map((step, index) => <article className={`${styles.workflowStep} ${step.planned ? styles.workflowStepPlanned : ""}`} key={`${index}-${step.title}`}>
        <span className={styles.workflowNumber}>{index + 1}</span>
        <div>{usable(step.title) ? <h3><GuardedInline value={step.title} /></h3> : null}{usable(step.text) ? <GuardedText value={step.text} className={styles.sectionContent} /> : null}{step.planned ? <span className={styles.plannedTag}>Planned</span> : null}</div>
      </article>)}</div> : null}
      {sequenceHasContent ? <SequenceDiagram sequence={sequence} /> : null}
    </ProjectSection>
  );
}

function LearnedSection({ project }: { project: Project }) {
  const learned = usable(project.learned) ? project.learned : undefined;
  const challenges = (project.challenges ?? []).filter((challenge) => usable(challenge));
  if (!learned && !challenges.length) return null;
  return <ProjectSection title="What I learned" icon="learned">{learned ? <GuardedText value={learned} className={styles.sectionContent} /> : null}{challenges.length ? <><h3 className={styles.sectionSubheading}>Challenges</h3><GuardedList values={challenges} /></> : null}</ProjectSection>;
}

function StatusSection({ project }: { project: Project }) {
  const statusItems = (project.statusItems ?? []).filter((item) => usable(item.label));
  const limitations = (project.limitations ?? []).filter((item) => usable(item));
  const nextSteps = (project.nextSteps ?? []).filter((item) => usable(item));
  if (!statusItems.length && !limitations.length && !nextSteps.length) return null;
  const done = statusItems.filter((item) => item.status === "done").length;
  const categories = [
    { title: "Current status", items: statusItems, status: true },
    { title: "Limitations", items: limitations, status: false },
    { title: "Next steps", items: nextSteps, status: false },
  ].filter((category) => category.items.length > 0);
  return <ProjectSection title="Status, limitations and next steps" icon="status"><div className={styles.statusGrid}>
    {categories.map((category) => <article className={styles.statusCard} key={category.title}><h3>{category.title}</h3><ul>{category.items.map((item, index) => {
      const text = typeof item === "string" ? item : item.label;
      const isDone = typeof item !== "string" && item.status === "done";
      return <li className={styles.statusLine} key={`${index}-${text}`}>{category.status ? (isDone ? <span className={styles.doneIcon} aria-label="Done">✓</span> : <span className={styles.progressDot} aria-label="In progress" />) : null}{isPlaceholder(text) ? <span className={styles.placeholderBlock}><span className={styles.toFill}>TO FILL</span><br />{text}</span> : text}</li>;
    })}</ul>{category.title === "Current status" ? <><p className={styles.milestoneText}>{done} of {statusItems.length} milestones done</p><div className={styles.progressTrack} role="progressbar" aria-valuenow={done} aria-valuemin={0} aria-valuemax={statusItems.length}><div className={styles.progressFill} style={{ "--progress": `${statusItems.length ? (done / statusItems.length) * 100 : 0}%` } as CSSProperties} /></div></> : null}</article>)}
  </div></ProjectSection>;
}

function normalizeTools(project: Project): ProjectTool[] {
  if (project.tools?.length) return project.tools.map((tool) => typeof tool === "string" ? { name: tool } : tool);
  return project.stack.map(({ name }) => ({ name }));
}

function toolTone(group?: string) {
  const value = group?.toLowerCase() ?? "";
  if (value.includes("frontend")) return styles.toolFrontend;
  if (value.includes("backend")) return styles.toolBackend;
  if (value.includes("ai") || value.includes("llm")) return styles.toolAi;
  if (value.includes("data") || value.includes("database")) return styles.toolData;
  if (value.includes("automation") || value.includes("alert")) return styles.toolAutomation;
  return styles.toolOther;
}

function TechStackSection({ project }: { project: Project }) {
  const tools = normalizeTools(project).filter((tool) => usable(tool.name));
  if (!tools.length) return null;
  const approximateWidth = tools.reduce((total, tool) => total + Math.max(100, tool.name.length * 10 + 64), 0) + tools.length * 12;
  const repeats = tools.length < 4 ? 1 : Math.max(1, Math.ceil(1440 / approximateWidth));
  const expanded = Array.from({ length: repeats }, () => tools).flat();
  const staticRow = tools.length < 4;
  const pills = expanded.map((tool, index) => <span className={`${styles.toolPill} ${toolTone(tool.group)} ${isPlaceholder(tool.name) ? styles.placeholderTool : ""}`} key={`${index}-${tool.name}`}>{isPlaceholder(tool.name) ? <span className={styles.toFill}>TO FILL</span> : null}{tool.name}</span>);
  return <ProjectSection title="Tech stack" icon="stack">{staticRow ? <div className={styles.staticTools}>{pills}</div> : <div className={styles.techMarquee} tabIndex={0} aria-label="Technologies used"><div className={styles.marqueeTrack} style={{ "--marquee-duration": "30s" } as CSSProperties}><div className={styles.marqueeCopy}>{pills}</div><div className={styles.marqueeCopy} aria-hidden="true" tabIndex={-1}>{pills}</div></div></div>}</ProjectSection>;
}

function MoreDetails({ project }: { project: Project }) {
  const tables: DataModelTable[] = project.dataModel ?? [];
  const codes: CodeSample[] = project.code ?? [];
  const traces = project.dataTrace ?? [];
  const docs = project.documentation ?? [];
  const visibleTables = tables.filter((table) => usable(table.name) || table.fields.some((field) => usable(field.name)));
  const visibleCodes = codes.filter((sample) => usable(sample.path) || usable(sample.code));
  const visibleTraces = traces.filter((trace) => usable(trace));
  const visibleDocs = docs.filter((link) => usable(link.label) && usable(link.href));
  if (!visibleTables.length && !visibleCodes.length && !visibleTraces.length && !visibleDocs.length) return null;
  return <details className={styles.moreDetails}><summary>More details</summary><div className={styles.moreDetailsContent}>
    {visibleTables.map((table) => <section className={styles.detailSection} key={table.name}><h3><GuardedInline value={table.name} /></h3><div className={styles.dataTableWrap}><table className={styles.dataTable}><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody>{table.fields.filter((field) => usable(field.name) || usable(field.type) || usable(field.description)).map((field, index) => <tr key={`${field.name}-${index}`}><td><GuardedInline value={field.name} /></td><td><GuardedInline value={field.type} /></td><td><GuardedInline value={field.description} /></td></tr>)}</tbody></table></div></section>)}
    {visibleCodes.map((sample, index) => <section className={styles.detailSection} key={`${sample.path}-${index}`}><h3>Code</h3><div className={styles.codeSample}><p className={styles.codePath}><GuardedInline value={sample.path} /></p>{usable(sample.code) ? isPlaceholder(sample.code) ? <div className={styles.placeholderBlock}><span className={styles.toFill}>TO FILL</span><pre><code>{sample.code}</code></pre></div> : <pre><code>{sample.code}</code></pre> : null}</div></section>)}
    {visibleTraces.length ? <section className={styles.detailSection}><h3>Data trace</h3><GuardedList values={visibleTraces} /></section> : null}
    {visibleDocs.length ? <section className={styles.detailSection}><h3>Documentation</h3><div className={styles.documentationGrid}>{visibleDocs.map((link) => <a className={styles.documentationLink} href={link.href} target="_blank" rel="noopener noreferrer" key={`${link.href}-${link.label}`}>{link.label}</a>)}</div></section> : null}
  </div></details>;
}

export default function ProjectSections({ project, images }: { project: Project; images: AvailableProjectImage[] }) {
  const workflow = project.workflow ?? [];
  const showFlowSteps = workflow.length > 0;
  return <>
    <SolutionSection project={project} />
    <OutputSection images={images} />
    {showFlowSteps || project.sequence ? <WorkflowSection steps={workflow} sequence={project.sequence} /> : null}
    <LearnedSection project={project} />
    <StatusSection project={project} />
    <TechStackSection project={project} />
    <MoreDetails project={project} />
  </>;
}
