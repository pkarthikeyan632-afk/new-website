"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type PlayerComponent = (typeof import("@lottiefiles/dotlottie-react"))["DotLottieReact"];

type LottiePlayerProps = {
  src: string;
  fallback: string;
  className: string;
  style?: React.CSSProperties;
};

export default function LottiePlayer({ src, fallback, className, style }: LottiePlayerProps) {
  const [Player, setPlayer] = useState<PlayerComponent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    let cancelled = false;
    import("@lottiefiles/dotlottie-react")
      .then(({ DotLottieReact }) => {
        if (!cancelled) setPlayer(() => DotLottieReact);
      })
      .catch(() => {
        if (!cancelled) setHasFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion]);

  const showFallback = prefersReducedMotion || !isReady || hasFailed;

  return (
    <div className={className} style={style} aria-hidden="true">
      <Image
        src={fallback}
        alt=""
        width={900}
        height={1200}
        className={`absolute inset-0 h-full w-full object-contain transition-opacity ${showFallback ? "opacity-100" : "opacity-0"}`}
      />
      {Player && !prefersReducedMotion && !hasFailed && (
        <Player
          src={src}
          loop
          autoplay
          className="absolute inset-0 h-full w-full bg-transparent"
          dotLottieRefCallback={(player) => {
            if (!player) return;
            player.addEventListener("load", () => setIsReady(true));
            player.addEventListener("loadError", () => setHasFailed(true));
            player.addEventListener("renderError", () => setHasFailed(true));
          }}
        />
      )}
    </div>
  );
}
