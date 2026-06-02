import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "كريك ڤيو — ماونتن ڤيو · القاهرة الجديدة",
    template: "%s | ماونتن ڤيو",
  },
  description:
    "كريك ڤيو من ماونتن ڤيو: مجتمع سكني على الكريك في القاهرة الجديدة. Heights · Valleys · Islands · The Lighthouse.",
  metadataBase: new URL("https://mountainview.realestates.properties"),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    images: [
      {
        url: "/projects/creekview-new-cairo/hero-creekfront.webp",
        width: 1200,
        height: 630,
      },
    ],
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
        {children}
      </body>
    </html>
  );
}
