import { categories, type CategorySlug } from "@/content/categories";
import { projects, type Project } from "@/content/projects";

export function getCategory(slug: string) {
  return categories.find((category) => category.slug === slug);
}

export function getProject(category: CategorySlug, slug: string): Project | undefined {
  return projects.find((project) => project.category === category && project.slug === slug);
}

export function getProjectsByCategory(category: CategorySlug): Project[] {
  return projects.filter((project) => project.category === category);
}