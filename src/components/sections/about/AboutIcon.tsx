import type { AboutIconName } from "@/types/about";

type AboutIconProps = {
  name: string;
  className?: string;
};

const paths: Record<AboutIconName, string> = {
  education: "M12 3 2.5 8 12 13l7-3.68V15h2V8L12 3Zm-6.5 8.42V16L12 20l6.5-4v-4.58L12 14.85l-6.5-3.43Z",
  role: "M8 3h8a2 2 0 0 1 2 2v2h3v14H3V7h3V5a2 2 0 0 1 2-2Zm0 4h8V5H8v2Zm-3 2v10h14V9H5Zm5 2h4v2h-4v-2Z",
  location: "M12 2a8 8 0 0 0-8 8c0 5.5 8 12 8 12s8-6.5 8-12a8 8 0 0 0-8-8Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z",
  focus: "M12 2 9.8 9.8 2 12l7.8 2.2L12 22l2.2-7.8L22 12l-7.8-2.2L12 2Zm0 6.3.8 2.9 2.9.8-2.9.8-.8 2.9-.8-2.9-2.9-.8 2.9-.8.8-2.9Z",
};

export default function AboutIcon({ name, className = "h-5 w-5" }: AboutIconProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={paths[name as AboutIconName] ?? paths.focus} />
    </svg>
  );
}
