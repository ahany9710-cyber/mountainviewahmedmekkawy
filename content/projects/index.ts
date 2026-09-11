import type { ProjectContent } from "@/types/project";
import { content as mountainView11 } from "./mountain-view-1-1";

const REGISTRY: Record<string, ProjectContent> = {
  [mountainView11.slug]: mountainView11,
};

/** Ordered list used by the multi-project landing page (top → bottom). */
export const ALL_PROJECTS: ProjectContent[] = [mountainView11];

export function getProjectBySlug(slug: string): ProjectContent | null {
  return REGISTRY[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(REGISTRY);
}
