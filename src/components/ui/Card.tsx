import Image from "next/image";
import LottiePlayer from "@/components/ui/LottiePlayer";

type CardProps = {
  title: string;
  image: string;
  animation?: string;
};

export default function Card({ title, image, animation }: CardProps) {
  const objectClassName = "float relative z-10 aspect-square w-full max-w-[96px] object-contain md:h-[240px] md:w-[270px]";
  const objectStyle = {
    animationDuration:
      title === "AI Systems"
        ? "4.8s"
        : title === "Automation"
          ? "5.6s"
          : "4.3s",
    animationDelay:
      title === "AI Systems"
        ? "0s"
        : title === "Automation"
          ? "-1.4s"
          : "-2.1s",
  };

  return (
    <article className="flex w-full min-w-0 flex-col items-center gap-1 md:w-auto md:gap-3">
      <div className="relative flex h-26 w-full items-center justify-center md:h-[180px] md:w-[200px]">
        <div
          aria-hidden="true"
          className="absolute bottom-2 left-1/2 h-3 w-18 -translate-x-1/2 rounded-[50%] bg-slate-500/15 blur-sm md:bottom-3 md:h-3 md:w-24 md:blur-md"
        />
        {animation ? (
          <LottiePlayer
            src={animation}
            fallback={image}
            className={objectClassName}
            style={objectStyle}
          />
        ) : (
          <Image
            src={image}
            alt=""
            width={900}
            height={1200}
            className={objectClassName}
            style={objectStyle}
          />
        )}
      </div>
      <p className="max-w-full rounded-full bg-white px-1.5 py-1 text-center text-[10px] font-medium leading-tight text-slate-700 shadow-sm md:px-3 md:py-1.5 md:text-sm md:leading-[1.25rem]">
        {title}
      </p>
    </article>
  );
}
