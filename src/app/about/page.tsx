import type { Metadata } from "next";
import AboutHero from "@/components/sections/about/AboutHero";
import Journey from "@/components/sections/about/Journey";
import Skills from "@/components/sections/about/Skills";
import { about } from "@/content/about";
import { site } from "@/content/site";

export function generateMetadata(): Metadata {
  return {
    title: `${about.headline} | ${site.name}`,
    description: about.intro,
  };
}

export default function AboutPage() {
  return (
    <div className="about-one-screen">
      <AboutHero />
      <Journey />
      <Skills />
    </div>
  );
}
