import type { Metadata } from "next";
import PageFrame from "@/components/layout/PageFrame";
import AboutHero from "@/components/sections/about/AboutHero";
import ClosingBand from "@/components/sections/about/ClosingBand";
import Drives from "@/components/sections/about/Drives";
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
    <PageFrame>
      <div className="about-one-screen">
        <AboutHero />
        <Journey />
        <div className="about-bottom-grid">
          <Drives />
          <Skills />
        </div>
        <ClosingBand />
      </div>
    </PageFrame>
  );
}
