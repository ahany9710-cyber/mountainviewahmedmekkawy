import type { NextConfig } from "next";
import path from "path";

function buildCspDirectives(): string {
  // Microsoft Clarity: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-csp
  const clarityScript = "https://www.clarity.ms https://scripts.clarity.ms";
  const clarityConnect =
    "https://*.clarity.ms https://c.bing.com https://www.clarity.ms";
  // Google Ads / gtag (same layout as Clarity)
  const googleAnalytics =
    "https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.googleadservices.com";
  const googleConnect =
    "https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://googleads.g.doubleclick.net";

  const parts = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' 'unsafe-eval' ${clarityScript} ${googleAnalytics}`,
    // Dev: allow Turbopack / HMR WebSockets (same host, different scheme)
    `connect-src 'self' https://formspree.io ${clarityConnect} ${googleConnect}${
      process.env.NODE_ENV !== "production" ? " ws: wss:" : ""
    }`,
    "img-src 'self' data: blob: https: https://c.clarity.ms",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "media-src 'self' blob:",
    "frame-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ];
  // Never use on http://localhost — browser upgrades subresources to https and the tab can stay blank.
  if (process.env.NODE_ENV === "production") {
    parts.push("upgrade-insecure-requests");
  }
  return parts.join("; ");
}

const nextConfig: NextConfig = {
  // Pin Turbopack/Next workspace root to this project folder.
  // The parent dir name contains a space ("palm hills hacienda"), which
  // can confuse auto-detection and cause CSS imports (e.g. `tailwindcss`)
  // to be resolved from the wrong directory.
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  outputFileTracingRoot: path.resolve(process.cwd()),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    qualities: [75, 82],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [{ source: "/aliva", destination: "/", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: buildCspDirectives(),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
