import Section from "../components/ui/Section";
import { skillGroups } from "../data/skills";

export default function Skills() {
  if (skillGroups.length === 0) return null;
  return <Section id="skills" title="Skills" />;
}