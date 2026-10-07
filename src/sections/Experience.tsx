import Section from "../components/ui/Section";
import { experience } from "../data/experience";

export default function Experience() {
  if (experience.length === 0) return null;
  return <Section id="experience" title="Experience Journey" />;
}