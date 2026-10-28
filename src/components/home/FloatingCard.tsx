import LottiePlayer from "@/components/shared/LottiePlayer";
import Link from "next/link";

type CardProps = {
  href: string;
  title: string;
  animation: string;
  scale?: number;
  floatDuration: string;
  floatDelay: string;
};

export default function FloatingCard({ href, title, animation, scale = 1, floatDuration, floatDelay }: CardProps) {
  const objectClassName = "float relative z-10 aspect-square w-full max-w-[96px] object-contain md:h-[240px] md:w-[270px] lg:h-full lg:w-full lg:max-w-none";
  const objectStyle = {
    animationDuration: floatDuration,
    animationDelay: floatDelay,
  };

  return (
    <Link
      href={href}
      aria-label={`Open ${title}`}
      className="group pointer-events-auto block w-full min-w-0 cursor-pointer rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4 motion-reduce:transition-none md:w-auto"
    >
      <article className="flex w-full min-w-0 flex-col items-center gap-3 md:w-auto">
        <div className="relative flex h-26 w-full items-center justify-center md:h-[180px] md:w-[200px] lg:h-[var(--right-object-size)] lg:w-[var(--right-object-size)]">
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-1/2 h-3 w-18 -translate-x-1/2 rounded-[50%] bg-slate-500/15 blur-sm md:bottom-3 md:h-3 md:w-24 md:blur-md"
          />
          <div className="relative z-10 h-full w-full transition-transform duration-200 group-hover:scale-105 motion-reduce:group-hover:scale-100 motion-reduce:transition-none">
            <LottiePlayer
              src={animation}
              className={objectClassName}
              scale={scale}
              style={objectStyle}
            />
          </div>
        </div>
        <p className="home-card-label max-w-full rounded-full bg-white px-1.5 py-1 text-center font-medium leading-tight text-slate-700 transition-shadow group-hover:shadow-[0_6px_18px_rgba(37,99,235,0.18)] motion-reduce:transition-none md:px-3 md:py-1.5 md:leading-[1.25rem] lg:max-w-none lg:whitespace-nowrap">
          {title}
        </p>
      </article>
    </Link>
  );
}
