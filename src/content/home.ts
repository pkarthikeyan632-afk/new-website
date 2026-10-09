export const home = {
  intro: "Hello, I'm",
  bio: "I build software systems that combine AI, automation, and engineering to solve real‑world problems.",
  // change the scale until the visible objects look the same size
  cards: [
    {
      title: "AI & Automation",
      href: "/expertise/ai-automation",
      animation: "/animations/ai-automation.lottie",
      scale: 1.5,
      position: { key: "ai", top: "5%", left: "10%" },
    },
    {
      title: "Embedded & IoT",
      href: "/expertise/embedded-iot",
      animation: "/animations/embedded-iot.lottie",
      scale: 1.5,
      position: { key: "embedded", top: "42%", left: "55%" },
    },
    {
      title: "Software Engineering",
      href: "/expertise/software-engineering",
      animation: "/animations/software-engineering.lottie",
      scale: 1,
      position: { key: "software", top: "72%", left: "10%" },
    },
  ],
};
