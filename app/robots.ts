import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AdsBot ignores User-agent: * — explicit allow rules are required.
      // https://developers.google.com/crawling/docs/crawlers-fetchers/google-special-case-crawlers
      { userAgent: "AdsBot-Google", allow: "/" },
      { userAgent: "AdsBot-Google-Mobile", allow: "/" },
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
