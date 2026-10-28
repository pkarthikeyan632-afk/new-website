import type { ExperienceContent } from "@/types/experience";

export const experience: ExperienceContent = {
  eyebrow: "Experience",
  title: "Where I've worked and learned.",

  timeline: [
    {
      title: "TekWissen India",
      subtitle: "Bengaluru",
      role: "Junior Software Engineer",
      period: "Aug 2026 – Present",
      line: "Building enterprise software with cross-functional teams.",
      logo: "/logos/tekwissen.webp",
    },
    {
      title: "TekWissen India",
      subtitle: "Bengaluru",
      role: "Generative AI Research Intern",
      period: "Dec 2025 – May 2026",
      line: "Built REST APIs and AI workflow automation in Python.",
      logo: "/logos/tekwissen.webp",
    },
    {
      title: "VLOGS Innovation LLP",
      subtitle: "Chennai",
      role: "Embedded Systems Intern",
      period: "Jun 2025 – Jul 2025",
      line: "Hands-on embedded system design training.",
      logo: "/logos/vlogs.webp",
    },
    {
      title: "Syscom Automation",
      subtitle: "Chennai",
      role: "Automation / PLC & SCADA Intern",
      period: "May 2025 – Jun 2025",
      line: "PLC programming and SCADA monitoring.",
      logo: "/logos/syscom.webp",
    },
  ],

  education: {
    title: "S.A Engineering College",
    subtitle: "Anna University",
    role: "B.E. Electronics and Communication Engineering",
    period: "2022 – 2026",
    line: "CGPA 8.07",
    logo: "/logos/sa-engineering-college.webp",
  },

  images: [
    {
      entry: 1,
      src: "/images/tekwissen-intern.jpg",
      alt: "Group photo from the TekWissen intern image",
      caption: "TekWissen intern group photo",
    },
    {
      entry: 2,
      src: "/images/vlogg-certificate.jpg",
      alt: "VLOGS Innovation LLP internship training certificate",
      caption: "VLOGS internship certificate",
    },
    {
      entry: 4,
      src: "/images/experience-isac.webp",
      alt: "Presenting research at the ISAC NGN 2026 conference",
      caption: "Presenting at ISAC NGN 2026",
    },
  ],

  journey: {
    eyebrow: "My journey",
    title: "A journey driven by curiosity.",
    steps: [
      { year: "2022", title: "Started B.E. ECE", text: "S.A Engineering College." },
      { year: "2025", title: "Automation Trainee", text: "PLC and SCADA at Syscom Automation." },
      { year: "2025", title: "AI R&D Intern", text: "APIs and workflow automation at TekWissen." },
      { year: "2026", title: "Software Developer", text: "Converted to full time at TekWissen." },
    ],
  },
};
