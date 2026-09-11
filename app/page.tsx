import type { Metadata } from "next";
import { MV11Landing } from "@/components/landings/MV11Landing";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: { absolute: "ماونتن ڤيو ١.١ — وحدات جاهزة للتسليم · Signature Living" },
  description:
    "ماونتن ڤيو ١.١ أمام النائب العام: وحدات متشطبة بالكامل وجاهزة للتسليم. أسعار من 14.5 مليون — Millennial · I-Villa · Town House · Villa · Crown Palace.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    title: "ماونتن ڤيو ١.١ — وحدات جاهزة للتسليم · Signature Living",
    description:
      "Ready-to-move, fully finished units in Mountain View 1.1 — Signature Living, New Cairo.",
    images: [
      {
        url: "/projects/mountain-view-1-1/photo-facades.webp",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomePage() {
  return <MV11Landing />;
}
