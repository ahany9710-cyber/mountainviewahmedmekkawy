import type { Metadata } from "next";
import { Poppins, Almarai } from "next/font/google";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const almarai = Almarai({
  variable: "--font-almarai",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ماونتن ڤيو ١.١ — وحدات جاهزة للتسليم · Signature Living",
    template: "%s | ماونتن ڤيو",
  },
  description:
    "ماونتن ڤيو ١.١ أمام النائب العام: وحدات متشطبة بالكامل وجاهزة للتسليم. أسعار من 14.5 مليون — Millennial · I-Villa · Town House · Villa · Crown Palace.",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ar_EG",
    images: [
      {
        url: "/projects/mountain-view-1-1/photo-facades.webp",
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
    <html lang="ar" dir="rtl" className={`${poppins.variable} ${almarai.variable}`}>
      <body className="antialiased min-h-screen bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
