import type { Metadata } from "next";
import AboutIntro from "@/components/about/AboutIntro";
import FocusAreas from "@/components/about/FocusAreas";
import ProfileCard from "@/components/about/ProfileCard";
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
    <div className="about-profile-layout">
      <ProfileCard />
      <div className="about-content-column">
        <AboutIntro />
        <FocusAreas />
      </div>
    </div>
  );
}
