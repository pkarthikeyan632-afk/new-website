import type { Metadata } from "next";
import CardGrid from "@/components/sections/projects/CardGrid";
import CategoryCard from "@/components/ui/CategoryCard";
import { categories } from "@/content/categories";
import { projectsPageCopy } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: projectsPageCopy.intro,
};

export default function ProjectsPage() {
  return (
    <section className="project-index-content pb-12 md:pb-16">
        <h1 className="font-display text-4xl font-bold text-slate-950 sm:text-5xl">
          {projectsPageCopy.title}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          {projectsPageCopy.intro}
        </p>
        <CardGrid>
          {categories.map((category) => (
            <li key={category.slug} className="h-full">
              <CategoryCard category={category} />
            </li>
          ))}
        </CardGrid>
    </section>
  );
}
