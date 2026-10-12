import MediaCard from "@/components/ui/MediaCard";
import { categories } from "@/content/categories";
import { projectCardCopy, type Project } from "@/content/projects";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const categoryTitle = categories.find((category) => category.slug === project.category)?.title ?? project.category;

  return (
    <MediaCard
      href={`/projects/${project.category}/${project.slug}`}
      image={project.image}
      imageAlt={project.imageAlt ?? project.title}
      pill={categoryTitle}
      title={project.title}
      description={project.oneLine}
      actionLabel={projectCardCopy.projectAction}
    />
  );
}
