import Link from "next/link";
import { site } from "@/content/site";

type IconName = (typeof site.socialLinks)[number]["icon"] | "email";

function SocialIcon({ name }: { name: IconName }) {
  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.3 18H5.7V9.5h2.6V18ZM7 8.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18h-2.6V9.5h2.5v1.2h.1a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.1 1.8 3.1 4.1V18Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

export default function SocialLinks() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Link
        href={`mailto:${site.email}`}
        className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 shadow-sm"
      >
        {site.email}
      </Link>

      <div className="flex items-center gap-3">
        <Link
          href={`mailto:${site.email}`}
          aria-label={`Email ${site.name}`}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white"
        >
          <SocialIcon name="email" />
        </Link>
        {site.socialLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noreferrer"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-700 shadow-sm"
          >
            <SocialIcon name={link.icon} />
          </Link>
        ))}
      </div>
    </div>
  );
}
