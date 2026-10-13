"use client";

import { useEffect, useRef, useState } from "react";
import type { AboutQuote, AboutQuoteSpot } from "@/content/about";

type QuoteBubblesProps = { quotes: AboutQuote[] };

const ROTATION_INTERVAL_MS = 4000;
const EXIT_DURATION_MS = 150;
const SPOT_SEQUENCE: AboutQuoteSpot[] = ["top-left", "top-right", "right-low", "left-low"];

// Percent positions are relative to the About hero; adjust them here to tune each spot.
const SPOT_POSITIONS: Record<AboutQuoteSpot, { top: string; left: string; tail: string; origin: string }> = {
  "top-left": { top: "0%", left: "0%", tail: "tail-right", origin: "right bottom" },
  "top-right": { top: "0%", left: "75%", tail: "tail-left", origin: "left bottom" },
  "right-low": { top: "86%", left: "75%", tail: "tail-top-left", origin: "left top" },
  "left-low": { top: "86%", left: "0%", tail: "tail-top-right", origin: "right top" },
};

export default function QuoteBubbles({ quotes }: QuoteBubblesProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");
  const pauseReasons = useRef({ pointer: false, focus: false });
  const paused = useRef(false);
  const transitionTimer = useRef<number | null>(null);
  const animationFrame = useRef<number | null>(null);
  const quote = quotes[index] ?? quotes[0];
  const spotName = SPOT_SEQUENCE[index % SPOT_SEQUENCE.length];
  const spot = SPOT_POSITIONS[spotName];

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = motionPreference.matches;

    const clearPendingChange = () => {
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
      transitionTimer.current = null;
      animationFrame.current = null;
    };

    const interval = window.setInterval(() => {
      if (reducedMotion || document.visibilityState !== "visible" || paused.current || quotes.length < 2) return;

      setPhase("exiting");
      transitionTimer.current = window.setTimeout(() => {
        transitionTimer.current = null;
        if (reducedMotion || document.visibilityState !== "visible" || paused.current) {
          setPhase("visible");
          return;
        }

        setIndex((current) => (current + 1) % quotes.length);
        setPhase("entering");
        animationFrame.current = window.requestAnimationFrame(() => {
          animationFrame.current = null;
          setPhase("visible");
        });
      }, EXIT_DURATION_MS);
    }, ROTATION_INTERVAL_MS);

    const handleMotionChange = () => {
      reducedMotion = motionPreference.matches;
      if (reducedMotion) {
        clearPendingChange();
        setIndex(0);
        setPhase("visible");
      }
    };
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        clearPendingChange();
        setPhase("visible");
      }
    };

    motionPreference.addEventListener("change", handleMotionChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      window.clearInterval(interval);
      clearPendingChange();
      motionPreference.removeEventListener("change", handleMotionChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [quotes]);

  const setPauseReason = (reason: "pointer" | "focus", active: boolean) => {
    pauseReasons.current[reason] = active;
    paused.current = pauseReasons.current.pointer || pauseReasons.current.focus;
    if (paused.current) {
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
      if (animationFrame.current !== null) window.cancelAnimationFrame(animationFrame.current);
      transitionTimer.current = null;
      animationFrame.current = null;
      setPhase("visible");
    }
  };

  if (!quote) return null;

  return (
    <div className="about-quote-layer">
      <div
        className={`about-quote-bubble ${spot.tail}`}
        style={{ top: spot.top, left: spot.left, transformOrigin: spot.origin }}
        data-phase={phase}
        tabIndex={0}
        aria-live="off"
        onPointerEnter={() => setPauseReason("pointer", true)}
        onPointerLeave={() => setPauseReason("pointer", false)}
        onFocus={() => setPauseReason("focus", true)}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPauseReason("focus", false);
        }}
      >
        <span className="about-quote-mark" aria-hidden="true">“</span>
        <span className="about-quote-text">{quote.text}</span>
      </div>
    </div>
  );
}
