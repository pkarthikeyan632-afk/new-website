import type { Metadata } from "next";
import CardGrid from "@/components/projects/CardGrid";
import PageHeading from "@/components/projects/PageHeading";
import { CategoryCard } from "@/components/projects/ProjectCards";
import { categories } from "@/content/categories";
import { site } from "@/content/site";

const projectsPageCopy = {
  title: "Projects",
  intro: "Browse work by category.",
};

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: projectsPageCopy.intro,
};

export default function ProjectsPage() {
  return (
    <section className="project-index-content pb-12 md:pb-16">
        <PageHeading title={projectsPageCopy.title} intro={projectsPageCopy.intro} />
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
