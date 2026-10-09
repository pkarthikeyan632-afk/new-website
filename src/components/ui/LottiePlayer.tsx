"use client";

import type { DotLottie } from "@lottiefiles/dotlottie-react";
import { useCallback, useEffect, useRef, useState } from "react";

type PlayerComponent = (typeof import("@lottiefiles/dotlottie-react"))["DotLottieReact"];

type LottiePlayerProps = {
  src: string;
  className: string;
  scale?: number;
  style?: React.CSSProperties;
};

export default function LottiePlayer({ src, className, scale = 1, style }: LottiePlayerProps) {
  const [Player, setPlayer] = useState<PlayerComponent | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const playerRef = useRef<DotLottie | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const loadedRef = useRef(false);
  const failedRef = useRef(false);

  const reportFailure = useCallback((error: unknown) => {
    if (failedRef.current) return;

    failedRef.current = true;
    if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);

    const message =
      error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Unknown Lottie error";

    console.warn(`Lottie animation failed at ${src}: ${message}`);
    setHasFailed(true);
  }, [src]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(preference.matches);

    updatePreference();
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    let cancelled = false;

    timeoutRef.current = window.setTimeout(() => {
      if (!loadedRef.current && !failedRef.current) {
        reportFailure(new Error("Timed out waiting 15 seconds for the animation to load"));
      }
    }, 15_000);

    import("@lottiefiles/dotlottie-react")
      .then(({ DotLottieReact }) => {
        if (!cancelled) setPlayer(() => DotLottieReact);
      })
      .catch(reportFailure);

    return () => {
      cancelled = true;
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [reportFailure]);

  useEffect(() => {
    if (!isReady || !playerRef.current) return;

    if (prefersReducedMotion) {
      playerRef.current.pause();
      playerRef.current.setFrame(0);
    } else {
      playerRef.current.play();
    }
  }, [isReady, prefersReducedMotion]);

  return (
    <div
      className={`${className} transition-opacity duration-300 ${isReady && !hasFailed ? "opacity-100" : "opacity-0"}`}
      style={{ ...style, aspectRatio: "1 / 1", backgroundColor: "transparent", overflow: "visible" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 overflow-visible"
        style={{ transform: `scale(${scale})`, transformOrigin: "center" }}
      >
        {Player && !hasFailed && (
          <Player
            src={src}
            loop
            autoplay={false}
            className="h-full w-full bg-transparent"
            dotLottieRefCallback={(player) => {
              if (!player) return;

              playerRef.current = player;
              player.addEventListener("load", () => {
                loadedRef.current = true;
                if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
                setIsReady(true);
              });
              player.addEventListener("loadError", (event) => reportFailure(event.error));
              player.addEventListener("renderError", (event) => reportFailure(event.error));
            }}
          />
        )}
      </div>
    </div>
  );
}
