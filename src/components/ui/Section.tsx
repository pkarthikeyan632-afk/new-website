import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title: string;
  linkLabel?: string;
  linkHref?: string;
  className?: string;
  children?: ReactNode;
};

export default function Section({
  id,
  title,
  linkLabel,
  linkHref,
  className = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="section-head">
        <h2>{title}</h2>
        {linkLabel && linkHref && <a href={linkHref}>{linkLabel} →</a>}
      </div>
      {children}
    </section>
  );
}