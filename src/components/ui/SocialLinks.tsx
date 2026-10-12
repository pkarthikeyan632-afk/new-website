import Link from "next/link";
import { site } from "@/content/site";

type IconName = (typeof site.socialLinks)[number]["icon"] | "email" | "github";

type SocialLinksProps = {
  variant?: "default" | "compact";
};

function SocialIcon({ name }: { name: IconName }) {
  if (name === "email") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-6 w-6">
        <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.3 18H5.7V9.5h2.6V18ZM7 8.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18h-2.6V9.5h2.5v1.2h.1a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.1 1.8 3.1 4.1V18Z" />
      </svg>
    );
  }

  if (name === "github") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
        <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.18.92.1-.71.38-1.2.69-1.48-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.14-3-.12-.28-.5-1.42.11-2.96 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.7.78 1.13 1.78 1.13 3.01 0 4.3-2.62 5.24-5.11 5.52.4.35.74 1.03.74 2.08V22c0 .29.2.64.76.53A11.1 11.1 0 0 0 12 .9Z" />
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

export default function SocialLinks({ variant = "default" }: SocialLinksProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2.5">
        <Link
          href={`mailto:${site.email}`}
          aria-label={site.email}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm ring-1 ring-slate-100 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 motion-reduce:transition-none"
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm ring-1 ring-slate-100 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 motion-reduce:transition-none"
          >
            <SocialIcon name={link.icon} />
          </Link>
        ))}
      </div>
    );
  }

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
