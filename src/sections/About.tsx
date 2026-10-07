import Section from "../components/ui/Section";
import { about } from "../data/about";

export default function About() {
  if (about.paragraphs.length === 0) return null;
  return <Section id="about" title="About Me" className="card" />;
}