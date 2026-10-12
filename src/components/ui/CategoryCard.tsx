import MediaCard from "@/components/ui/MediaCard";
import { projectCardCopy } from "@/content/projects";
import type { Category } from "@/content/categories";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <MediaCard
      href={`/projects/${category.slug}`}
      image={category.image}
      imageAlt={category.imageAlt ?? category.title}
      pill={projectCardCopy.categoryPill}
      title={category.title}
      description={category.summary}
      actionLabel={projectCardCopy.categoryAction}
    />
  );
}
