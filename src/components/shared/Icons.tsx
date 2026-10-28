import type { AboutInfoIconName } from "@/content/about";

export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function FileIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path d="M5 2.5h7l3 3V18H5V2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M12 2.5v3h3m-7 4h5m-5 3h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={className}>
      <path d="m3.5 6 4.5 4 4.5-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmailIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m5 7 7 5.5L19 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2ZM8.3 18H5.7V9.5h2.6V18ZM7 8.3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM18.3 18h-2.6v-4.1c0-1 0-2.2-1.4-2.2s-1.6 1-1.6 2.1V18h-2.6V9.5h2.5v1.2h.1a2.8 2.8 0 0 1 2.5-1.4c2.7 0 3.1 1.8 3.1 4.1V18Z" />
    </svg>
  );
}

export function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.56 1.2 3.18.92.1-.71.38-1.2.69-1.48-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.22 1.14-3-.12-.28-.5-1.42.11-2.96 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.56 0c2.12-1.44 3.04-1.14 3.04-1.14.61 1.54.23 2.68.12 2.96.7.78 1.13 1.78 1.13 3.01 0 4.3-2.62 5.24-5.11 5.52.4.35.74 1.03.74 2.08V22c0 .29.2.64.76.53A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.5" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

const aboutInfoPaths: Record<AboutInfoIconName, string> = {
  education: "M12 3 2.5 8 12 13l7-3.68V15h2V8L12 3Zm-6.5 8.42V16L12 20l6.5-4v-4.58L12 14.85l-6.5-3.43Z",
  role: "M8 3h8a2 2 0 0 1 2 2v2h3v14H3V7h3V5a2 2 0 0 1 2-2Zm0 4h8V5H8v2Zm-3 2v10h14V9H5Zm5 2h4v2h-4v-2Z",
  location: "M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z",
};

export function AboutInfoIcon({ name, className = "h-5 w-5" }: { name: AboutInfoIconName; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={aboutInfoPaths[name]} />
    </svg>
  );
}
