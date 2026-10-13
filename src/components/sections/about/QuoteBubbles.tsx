"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { AboutQuote } from "@/content/about";

type QuoteBubblesProps = { quotes: AboutQuote[] };

const ROTATION_INTERVAL_MS = 4000;
const EXIT_DURATION_MS = 150;
type QuoteSpot = "top-left" | "top-right" | "bottom-right" | "bottom-left";
type QuotePosition = {
  edge: "left" | "right";
  x: string;
  y: string;
  height: number;
  tail: string;
  origin: string;
};

const SPOT_SEQUENCE: QuoteSpot[] = ["top-left", "top-right", "bottom-right", "bottom-left"];

// Positions are percentages of the photo box; adjust these anchors to move each bubble.
const SPOT_POSITIONS: Record<QuoteSpot, QuotePosition> = {
  "top-left": { edge: "right", x: "18%", y: "18%", height: 70, tail: "tail-right", origin: "right bottom" },
  "top-right": { edge: "left", x: "70%", y: "12%", height: 70, tail: "tail-left", origin: "left bottom" },
  "bottom-right": { edge: "left", x: "78%", y: "140.8%", height: 70, tail: "tail-top-left", origin: "left top" },
  "bottom-left": { edge: "right", x: "24%", y: "131%", height: 104, tail: "tail-top-right", origin: "right top" },
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
        style={{
          ...(spot.edge === "right" ? { right: `calc(100% - ${spot.x})` } : { left: spot.x }),
          top: `calc(var(--quote-y, ${spot.y}) - ${spot.height / 2}px)`,
          height: spot.height,
          transformOrigin: spot.origin,
        } as CSSProperties}
        data-spot={spotName}
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
