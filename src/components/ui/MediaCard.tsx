import Image from "next/image";
import Link from "next/link";

type MediaCardProps = {
  href: string;
  image?: string;
  imageAlt: string;
  pill: string;
  title: string;
  description: string;
  actionLabel: string;
};

export default function MediaCard({
  href,
  image,
  imageAlt,
  pill,
  title,
  description,
  actionLabel,
}: MediaCardProps) {
  return (
    <Link
      href={href}
      aria-label={`${actionLabel}: ${title}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(37,99,235,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-4 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative aspect-[16/10] w-full bg-[#e9eef6]">
        {image ? (
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#f1f5fa] to-[#e3ebf5]" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
          {pill}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="line-clamp-2 text-xl font-semibold leading-snug text-slate-950">
          {title}
        </h2>
        <p className="mt-3 line-clamp-3 text-base leading-relaxed text-slate-600">
          {description}
        </p>
        <span className="mt-auto flex items-center gap-2 pt-6 text-xs font-semibold tracking-[0.12em] text-blue-600">
          {actionLabel}
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
          >
            <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
