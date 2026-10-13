import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CardGrid from "@/components/sections/projects/CardGrid";
import ProjectCard from "@/components/ui/ProjectCard";
import { categories } from "@/content/categories";
import { getProjectsByCategory, projectCardCopy } from "@/content/projects";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) return { title: "Projects", description: "Project category not found." };

  return { title: `${category.title} | Projects`, description: category.summary };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = categories.find((item) => item.slug === slug);

  if (!category) notFound();
  const projects = getProjectsByCategory(category.slug);

  return (
    <section className="project-index-content pb-12 md:pb-16">
        <Link
          href="/projects"
          className="mb-8 inline-block rounded-md text-sm font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-4"
        >
          {projectCardCopy.allProjects}
        </Link>
        <h1 className="font-display text-4xl font-bold text-slate-950 sm:text-5xl">{category.title}</h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-600">{category.summary}</p>
        <CardGrid isEmpty={projects.length === 0} emptyMessage={projectCardCopy.projectsComingSoon}>
          {projects.map((project) => (
            <li key={project.slug} className="h-full">
              <ProjectCard project={project} />
            </li>
          ))}
        </CardGrid>
    </section>
  );
}
