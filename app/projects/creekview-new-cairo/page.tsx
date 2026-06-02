import type { Metadata } from "next";
import { CreekviewLanding } from "./CreekviewLanding";

export const metadata: Metadata = {
  title: { absolute: "كريك ڤيو — ماونتن ڤيو · القاهرة الجديدة" },
  description:
    "إطلاق كريك ڤيو من ماونتن ڤيو في القاهرة الجديدة: واجهة مائية، جدول أسعار خطة ٦ سنوات، وتقسيط حتى ١٤ سنة. تواصل معنا الآن.",
  openGraph: {
    title: "كريك ڤيو — ماونتن ڤيو · القاهرة الجديدة",
    description:
      "كريك ڤيو نيو كايرو: أسعار بداية، تقسيط حتى ١٤ سنة، وتسليم مبكر.",
    images: [{ url: "/projects/creekview-new-cairo/cover.png", width: 1200, height: 630 }],
  },
};

export default function Page() {
  return <CreekviewLanding />;
}
