export type AboutQuoteSpot = "top-left" | "top-right" | "left-low" | "right-low";
export type AboutQuote = { text: string; spot: AboutQuoteSpot };

export const about = {
  eyebrow: "About me",
  headline: "Turning ideas into working systems.",
  highlight: "working systems.",
  intro:
    "I'm a software developer at TekWissen, working at the intersection of software engineering, AI, and automation. I build practical solutions that connect applications, APIs, and intelligent systems to solve real-world problems.",
  resumeHref: "/resume.pdf", // leave "" to hide the button until the file exists
  photo: "/images/about-portrait-suit.webp", // if the file is missing, an empty photo space shows

  quotes: [
    { text: "Ideas matter when you build them.", spot: "top-left" },
    { text: "Understand the problem. Build the solution.", spot: "top-right" },
    { text: "Good engineering connects the pieces.", spot: "left-low" },
    { text: "Learn by building. Improve by iterating.", spot: "right-low" },
  ] satisfies AboutQuote[],

  info: [
    { icon: "education", label: "Education", title: "B.E. Electronics & Communication Engineering ", detail: "S.A Engineering College. 2026" },
    { icon: "role", label: "Current role", title: "Jr. Software Engineer", detail: "TekWissen, full time" },
    { icon: "location", label: "Location", title: "Bengaluru, India", detail: "" },
    { icon: "focus", label: "Focus", title: "Software · AI & Automation · Embedded Systems", detail: "Building practical, connected systems" },
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

  skills: {
    eyebrow: "Skills and tools",
    title: "Technologies I work with.",
    items: [
      { name: "Python", icon: "python" },
      { name: "React", icon: "react" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "n8n", icon: "n8n" },
      { name: "Claude API", icon: "claude" },
      { name: "ESP32", icon: "espressif" },
    ],
  },

};
