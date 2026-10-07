import Section from "../components/ui/Section";
import Tag from "../components/ui/Tag";
import { projects } from "../data/projects";

export default function FeaturedWork() {
  return (
    <Section id="work" title="Featured Work">
      {projects.map((p) => (
        <div key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.flow}</p>
          {p.tech.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      ))}
    </Section>
  );
}