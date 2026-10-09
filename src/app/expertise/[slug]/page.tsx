import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ExpertiseHero from "@/components/sections/expertise/ExpertiseHero";
import { expertise } from "@/content/expertise";

type ExpertisePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return expertise.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ExpertisePageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = expertise.find((item) => item.slug === slug);

  if (!entry) {
    return { title: "Expertise not found", description: "Expertise page not found." };
  }

  return { title: entry.title, description: entry.summary };
}

export default async function ExpertisePage({ params }: ExpertisePageProps) {
  const { slug } = await params;
  const entry = expertise.find((item) => item.slug === slug);

  if (!entry) notFound();

  return <ExpertiseHero entry={entry} />;
}
