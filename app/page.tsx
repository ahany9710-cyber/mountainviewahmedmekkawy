import type { Metadata } from "next";
import { CreekviewLanding } from "@/components/landings/CreekviewLanding";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: "كريك ڤيو — ماونتن ڤيو · القاهرة الجديدة" },
  description:
    "كريك ڤيو من ماونتن ڤيو: water living على الكريك في New Cairo. Heights · Valleys · Islands · The Lighthouse — تواصل مع مستشار المبيعات.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "كريك ڤيو — ماونتن ڤيو · القاهرة الجديدة",
    description:
      "Elevating the Creekfront Experience — Creekview New Cairo by Mountain View.",
    images: [{ url: "/projects/creekview-new-cairo/hero-creekfront.webp", width: 1200, height: 630 }],
  },
};

export default function HomePage() {
  return <CreekviewLanding />;
}
