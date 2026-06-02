import type { ProjectContent } from "@/types/project";
import { content as creekviewNewCairo } from "./creekview-new-cairo";

const REGISTRY: Record<string, ProjectContent> = {
  [creekviewNewCairo.slug]: creekviewNewCairo,
};

/** Ordered list used by the multi-project landing page (top → bottom). */
export const ALL_PROJECTS: ProjectContent[] = [creekviewNewCairo];

export function getProjectBySlug(slug: string): ProjectContent | null {
  return REGISTRY[slug] ?? null;
}

export function getAllProjectSlugs(): string[] {
  return Object.keys(REGISTRY);
}
