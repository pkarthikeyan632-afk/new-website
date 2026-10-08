import { home } from "@/content/home";

type CardProps = {
  title: string;
  image: string;
};

export default function Card({ title }: CardProps) {
  const iconName = home.cards.find((card) => card.title === title)?.iconName;

  return (
    <article className="flex flex-col items-center gap-3">
      <div
        className="float flex h-20 w-20 items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_10px_30px_rgba(15,23,42,0.12)]"
        style={{
          animationDuration:
            iconName === "Brain" ? "4.8s" : iconName === "Workflow" ? "5.6s" : "4.3s",
          animationDelay:
            iconName === "Brain" ? "0s" : iconName === "Workflow" ? "-1.4s" : "-2.1s",
        }}
      >
        {iconName === "Brain" ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 18V5a3 3 0 0 0-5.6-1.5A4 4 0 0 0 4 10a4 4 0 0 0 2 7.5A3 3 0 0 0 12 18Z" />
            <path d="M12 18V5a3 3 0 0 1 5.6-1.5A4 4 0 0 1 20 10a4 4 0 0 1-2 7.5A3 3 0 0 1 12 18Z" />
            <path d="M8 8a2 2 0 0 1 2 2m-4 3a2 2 0 0 1 2 2m8-7a2 2 0 0 0-2 2m4 3a2 2 0 0 0-2 2" />
          </svg>
        ) : iconName === "Workflow" ? (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="6" height="6" rx="1.5" />
            <rect x="15" y="15" width="6" height="6" rx="1.5" />
            <circle cx="18" cy="6" r="3" />
            <path d="M9 6h3a3 3 0 0 1 3 3v3a3 3 0 0 0 3 3M6 9v3a3 3 0 0 0 3 3h6" />
          </svg>
        ) : (
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 17-5-5 5-5m8 10 5-5-5-5m-3 12 2-14" />
          </svg>
        )}
      </div>
      <p className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
        {title}
      </p>
    </article>
  );
}
