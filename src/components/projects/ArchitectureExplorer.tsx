"use client";

import { useEffect, useState, type KeyboardEvent } from "react";
import type { ArchitectureLayer } from "@/content/projects";
import styles from "./ProjectPage.module.css";

type ArchitectureExplorerProps = { layers: ArchitectureLayer[] };

const palette = ["source", "backend", "ai", "data", "frontend", "hardware", "other"] as const;

function layerKind(layer: ArchitectureLayer, index: number) {
  return layer.kind ?? palette[index % palette.length];
}

function isPlanned(layer: ArchitectureLayer) {
  return layer.planned || layer.status === "planned";
}

function isPlaceholder(value?: string) {
  return Boolean(value?.trimStart().startsWith("[PLACEHOLDER]"));
}

export default function ArchitectureExplorer({ layers }: ArchitectureExplorerProps) {
  const [selected, setSelected] = useState(0);
  const [running, setRunning] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const isPlaying = running && !hovered && !focused;

  useEffect(() => {
    if (!running || hovered || focused || layers.length < 2) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || document.hidden) return;

    const timer = window.setInterval(() => {
      if (!document.hidden) setSelected((current) => (current + 1) % layers.length);
    }, 1600);

    return () => {
      window.clearInterval(timer);
    };
  }, [focused, hovered, layers.length, running]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) setRunning(false);
  }, []);

  function selectLayer(index: number) {
    setSelected(index);
    setRunning(false);
  }

  function moveSelection(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    const next = (index + direction + layers.length) % layers.length;
    selectLayer(next);
    document.getElementById(`architecture-node-${next}`)?.focus();
  }

  return (
    <section
      className={styles.architectureCard}
      aria-label="Architecture"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <header className={styles.architectureHeader}>
        <div>
          <h2>Architecture</h2>
          <span>Click a part</span>
        </div>
        <button
          className={styles.playButton}
          type="button"
          onClick={() => setRunning((value) => !value)}
          aria-label={running ? "Pause architecture animation" : "Play architecture animation"}
        >
          {running ? "Pause" : "Play"}
        </button>
      </header>

      <div className={styles.architectureNodes}>
        {layers.map((layer, index) => {
          const kind = layerKind(layer, index);
          const planned = isPlanned(layer);
          const placeholder = isPlaceholder(layer.layer) || isPlaceholder(layer.text);
          const isActive = selected === index;
          return (
            <div className={styles.architectureNodeGroup} key={layer.id ?? `${layer.layer}-${index}`}>
              <button
                id={`architecture-node-${index}`}
                type="button"
                className={`${styles.architectureNode} ${styles[`kind_${kind}`]} ${planned ? styles.plannedNode : ""} ${placeholder ? styles.placeholderNode : ""} ${isActive ? styles.activeNode : ""}`}
                aria-pressed={isActive}
                onClick={() => selectLayer(index)}
                onKeyDown={(event) => moveSelection(event, index)}
              >
                <span className={styles.nodeText}>
                  {isPlaceholder(layer.layer) ? <span className={styles.toFill}>TO FILL</span> : null}
                  <strong>{layer.layer}</strong>
                  {layer.tech?.length ? <span>{layer.tech.join(" · ")}</span> : null}
                </span>
                <span className={styles.nodeStatus}>{planned ? "Planned" : "Built"}</span>
              </button>
              {index < layers.length - 1 ? (
                <div
                  aria-hidden="true"
                  className={`${styles.architectureConnector} ${isPlanned(layers[index + 1]) ? styles.plannedConnector : ""} ${selected === index && isPlaying ? styles.activeConnector : ""}`}
                >
                  <span />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className={styles.detailPanels} aria-live="polite">
        {layers.map((layer, index) => {
          const kind = layerKind(layer, index);
          const planned = isPlanned(layer);
          const placeholder = isPlaceholder(layer.text) || layer.details?.some((item) => isPlaceholder(item));
          return (
            <article
              key={`detail-${layer.id ?? `${layer.layer}-${index}`}`}
              className={`${styles.detailPanel} ${styles[`kind_${kind}`]} ${selected === index ? styles.visiblePanel : ""}`}
              aria-hidden={selected !== index}
            >
              <div className={styles.detailPanelHeading}>
                <h3>{layer.layer}</h3>
                <span className={`${styles.statusTag} ${planned ? styles.plannedTag : styles.builtTag}`}>{planned ? "Planned" : "Built"}</span>
                {placeholder ? <span className={styles.toFill}>TO FILL</span> : null}
              </div>
              <p>{layer.text}</p>
              {layer.input || layer.output ? (
                <div className={styles.ioChips}>
                  {layer.input ? <span><b>Input</b><code>{layer.input}</code></span> : null}
                  {layer.output ? <span><b>Output</b><code>{layer.output}</code></span> : null}
                </div>
              ) : null}
              {layer.tech?.length ? <div className={styles.detailTech}>{layer.tech.map((technology) => <span key={technology}>{technology}</span>)}</div> : null}
              {layer.details?.length ? <ul>{layer.details.map((detail, detailIndex) => <li key={`${detailIndex}-${detail}`}>{detail}</li>)}</ul> : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
