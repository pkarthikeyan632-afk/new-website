import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BackLink from "@/components/projects/BackLink";
import CardGrid from "@/components/projects/CardGrid";
import PageHeading from "@/components/projects/PageHeading";
import { ProjectCard } from "@/components/projects/ProjectCards";
import { categories } from "@/content/categories";
import { projectCardCopy } from "@/content/projects";
import { getCategory, getProjectsByCategory } from "@/lib/projects";

type CategoryPageProps = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return categories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) return { title: "Projects", description: "Project category not found." };

  return { title: `${category.title} | Projects`, description: category.summary };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: slug } = await params;
  const category = getCategory(slug);

  if (!category) notFound();
  const projects = getProjectsByCategory(category.slug);

  return (
    <section className="project-index-content pb-12 md:pb-16">
        <BackLink href="/projects" label={projectCardCopy.allProjects} />
        <PageHeading title={category.title} intro={category.summary} variant="category" />
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
