export type NavItem = { label: string; href: string };

export type ProjectStatus = "idea" | "in-progress" | "working";

export type Project = {
  id: string;
  title: string;
  subtitle?: string;
  flow: string;
  tech: string[];
  status?: ProjectStatus;
  summary?: string;
  image?: string;
  github?: string;
  demo?: string;
};

export type ExperienceItem = {
  role: string;
  company: string;
  dates: string;
  points: string[];
};

export type SkillGroup = { group: string; items: string[] };

export type Profile = {
  name: string;
  initials: string;
  headline: string;
  intro: string;
  location: string;
  photo?: string;
  email?: string;
  github?: string;
  linkedin?: string;
  resume?: string;
};

export type About = {
  paragraphs: string[];
  education?: { degree: string; college: string; years: string };
};

export type Learning = { title: string; tagline: string; image?: string };