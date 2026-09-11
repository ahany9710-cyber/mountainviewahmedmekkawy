import { NextResponse } from "next/server";
import { content } from "@/content/projects/mountain-view-1-1";

/**
 * Internal call redirect — hides phone digits from page HTML.
 */
export function GET() {
  const raw = content.phoneNumber ?? content.whatsappNumber;
  const n = raw.replace(/\D/g, "");
  if (!n) return NextResponse.json({ error: "Not configured" }, { status: 500 });
  return NextResponse.redirect(`tel:+${n}`, 302);
}
