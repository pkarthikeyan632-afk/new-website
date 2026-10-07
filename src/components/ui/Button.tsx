import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "outline";
  children: ReactNode;
};

export default function Button({ href, variant = "primary", children }: ButtonProps) {
  if (!href) return null; // no link = no button
  const external = href.startsWith("http");
  return (
    <a
      className={`btn btn-${variant}`}
      href={href}
      {...(external && { target: "_blank", rel: "noreferrer" })}
    >
      {children}
    </a>
  );
}