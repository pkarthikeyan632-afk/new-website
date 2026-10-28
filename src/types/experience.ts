export type ExperienceContent = {
  eyebrow: string;
  title: string;
  timeline: ExperienceEntry[];
  education: ExperienceEntry;
  images: ExperienceImage[];
  journey?: ExperienceJourney;
};

export type ExperienceJourney = {
  eyebrow: string;
  title: string;
  steps: { year: string; title: string; text: string }[];
};

export type ExperienceEntry = {
  title: string;
  subtitle: string;
  role: string;
  period: string;
  line: string;
  logo?: string;
};

export type ExperienceImage = {
  entry: number;
  src: string;
  alt: string;
  caption: string;
};
