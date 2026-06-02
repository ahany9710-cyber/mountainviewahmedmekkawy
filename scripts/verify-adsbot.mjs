#!/usr/bin/env node

const SITE = process.env.SITE_URL ?? "https://www.mountainview-offers.com/";

const USER_AGENTS = [
  {
    name: "AdsBot-Google (desktop)",
    value: "AdsBot-Google (+http://www.google.com/adsbot.html)",
  },
  {
    name: "AdsBot-Google-Mobile",
    value:
      "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36 (compatible; AdsBot-Google-Mobile; +http://www.google.com/mobile/adsbot.html)",
  },
];

async function check(label, url, userAgent) {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "User-Agent": userAgent },
  });
  const body = await res.text();

  let ok = res.status === 200;
  if (label === "Homepage") {
    ok =
      ok &&
      (body.includes('class="hero"') || body.includes("cv-page")) &&
      (body.includes("Creekview") || body.includes("كريك"));
  } else if (label === "Robots") {
    ok = ok && body.includes("AdsBot-Google") && body.includes("Allow: /");
  } else if (label === "Sitemap") {
    ok = ok && body.includes("<urlset") && body.includes("mountainview-offers.com");
  }

  return { label, url, status: res.status, ok };
}

async function main() {
  const targets = [
    ["Homepage", SITE.replace(/\/?$/, "/")],
    ["Robots", new URL("/robots.txt", SITE).toString()],
    ["Sitemap", new URL("/sitemap.xml", SITE).toString()],
  ];

  let failed = 0;

  for (const [name, userAgent] of USER_AGENTS.map((ua) => [ua.name, ua.value])) {
    console.log(`\n${name}`);
    for (const [label, url] of targets) {
      const result = await check(label, url, userAgent);
      const mark = result.ok ? "PASS" : "FAIL";
      console.log(`  [${mark}] ${label}: HTTP ${result.status} — ${url}`);
      if (!result.ok) failed += 1;
    }
  }

  if (failed > 0) {
    console.error(`\n${failed} check(s) failed.`);
    process.exit(1);
  }

  console.log("\nAll AdsBot checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
