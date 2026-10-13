import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-gutter)]">{children}</div>;
}
