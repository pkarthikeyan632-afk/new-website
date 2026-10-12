import Link from "next/link";
import { about } from "@/content/about";
import { site } from "@/content/site";
import type { AboutContent } from "@/types/about";

const content: AboutContent = about;

export default function ClosingBand() {
  return (
    <section className="about-closing-bar">
      <p>{content.closing.text}</p>
      <Link href={`mailto:${site.email}`} className="about-primary-button">
        LET&apos;S TALK
        <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
          <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  );
}
