import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return <div className="mx-auto w-full max-w-[90rem] px-[clamp(24px,4vw,64px)]">{children}</div>;
}
