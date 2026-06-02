import type { Metadata } from "next";
import { Suspense } from "react";
import { Cairo } from "next/font/google";
import Script from "next/script";
import { ClarityRouteListener } from "@/components/ClarityRouteListener";
import "./globals.css";

const GOOGLE_ADS_ID = "AW-18066287198";

/** Microsoft Clarity project ID */
const CLARITY_PROJECT_ID = "wu1ulzvsll";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "هاسيندا راس الحكمة — بالم هيلز · الساحل الشمالي",
    template: "%s | بالم هيلز",
  },
  description:
    "إطلاق هاسيندا راس الحكمة من بالم هيلز على كيلو ٢٣٨ راس الحكمة: شاطئ ٤.٨ كم، خليجين طبيعيين، وحدات بفيو بحري. تواصل واتساب أو اتصل بنا.",
  metadataBase: new URL("https://mountainview.realestates.properties"),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    images: [{ url: "/hacienda/brochure/hero-render.webp", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="beforeInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
        {children}
        <Suspense fallback={null}>
          <ClarityRouteListener />
        </Suspense>
      </body>
    </html>
  );
}
