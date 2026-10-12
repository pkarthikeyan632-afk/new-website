import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetails from "@/components/sections/projects/ProjectDetails";
import { categories } from "@/content/categories";
import { getProject, projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return projects.map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) return { title: "Project not found", description: "Project not found." };

  const project = getProject(category.slug, slug);
  if (!project) return { title: "Project not found", description: "Project not found." };

  return {
    title: `${project.title} | ${category.title}`,
    description: project.oneLine,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { category: categorySlug, slug } = await params;
  const category = categories.find((item) => item.slug === categorySlug);
  if (!category) notFound();

  const project = getProject(category.slug, slug);
  if (!project) notFound();

  return <ProjectDetails category={category} project={project} />;
}
