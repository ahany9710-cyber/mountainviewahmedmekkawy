/** Production site URL — used for canonical links and shareable section anchors. */
export const SITE_URL = "https://www.mountainview-offers.com";

/** In-page section IDs (https://www.mountainview-offers.com/#units). */
export const PAGE_SECTIONS = {
  hero: "hero",
  highlights: "highlights",
  masterplan: "masterplan",
  neighborhoods: "neighborhoods",
  gallery: "gallery",
  units: "units",
  lifestyle: "lifestyle",
  lead: "lead",
  location: "location",
  faq: "faq",
  contact: "final",
} as const;

export type PageSection = keyof typeof PAGE_SECTIONS;

export function sectionHref(section: PageSection): string {
  return `#${PAGE_SECTIONS[section]}`;
}

export function sectionUrl(section: PageSection): string {
  return `${SITE_URL}${sectionHref(section)}`;
}
