import type { Metadata } from "next";
import { MV11Landing } from "@/components/landings/MV11Landing";
import { SITE_URL } from "@/lib/site-url";

export const metadata: Metadata = {
  title: {
    absolute: "ماونتن ڤيو ١.١ | Flair Agency — بروكر بشراكة مع ماونتن ڤيو",
  },
  description:
    "Flair Agency (وكيل تسويق عقاري) يعرض وحدات Mountain View 1.1 أمام النائب العام. لسنا المطوّر — أسعار استرشادية من 14.5 مليون حسب التوفر. العرض الرسمي من ماونتن ڤيو.",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    url: SITE_URL,
    siteName: "Flair Agency",
    title: "ماونتن ڤيو ١.١ | Flair Agency — بروكر تسويق عقاري",
    description:
      "Marketing offer by Flair Agency (broker partner). Not the developer. Indicative pricing for Mountain View 1.1 units — official offer from Mountain View.",
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
