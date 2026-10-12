import type { ReactNode } from "react";

type CardGridProps = {
  children: ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
};

export default function CardGrid({ children, emptyMessage, isEmpty = false }: CardGridProps) {
  if (isEmpty) {
    return <p className="mt-8 text-base text-slate-600">{emptyMessage}</p>;
  }

  return (
    <ul className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </ul>
  );
}
