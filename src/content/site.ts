export const site = {
  name: "Morgan",
  logo: "morg",
  email: "hello@example.com",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/morgan/",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://www.instagram.com/morgan/",
      icon: "instagram",
    },
  ] as const,
  navigation: [
    { label: "Home", href: "/" },
    { label: "Works", href: "/works" },
    { label: "Services", href: "/services" },
    { label: "About me", href: "/about" },
  ],
  callToAction: {
    label: "LET'S TALK",
    href: "mailto:hello@example.com",
  },
};
