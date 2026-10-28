import Link from "next/link";
import { EmailIcon, InstagramIcon, LinkedInIcon } from "@/components/shared/Icons";
import { site } from "@/content/site";

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
          <EmailIcon />
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
            {link.icon === "linkedin" ? <LinkedInIcon /> : <InstagramIcon />}
          </Link>
        ))}
      </div>
    </div>
  );
}
