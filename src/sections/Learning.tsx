import Section from "../components/ui/Section";
import type { Learning as LearningItem } from "../types";

type LearningProps = {
  learning?: LearningItem;
};

export default function Learning({ learning: learningData }: LearningProps) {
  if (!learningData?.title && !learningData?.tagline) return null;

  return (
    <Section id="learning" title={learningData.title || "Learning"}>
      {learningData.tagline && <p>{learningData.tagline}</p>}
    </Section>
  );
}