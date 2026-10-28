import Link from "next/link";

type BackLinkProps = {
  href: string;
  label: string;
};

export default function BackLink({ href, label }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="mb-8 inline-block rounded-md text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
    >
      {label}
    </Link>
  );
}
