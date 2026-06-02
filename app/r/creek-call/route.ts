import { NextResponse } from "next/server";
import { content } from "@/content/projects/creekview-new-cairo";

/**
 * Internal link for Creekview CTAs — redirects to sales line without exposing digits in <a href>.
 */
export function GET() {
  const raw = content.phoneNumber ?? content.whatsappNumber;
  const n = raw.replace(/\D/g, "");
  if (!n) return NextResponse.json({ error: "Not configured" }, { status: 500 });
  return NextResponse.redirect(`tel:+${n}`, 302);
}
