import { NextResponse } from "next/server";
import {
  HACIENDA,
  WHATSAPP_DEFAULT_MSG,
} from "@/content/projects/hacienda-ras-el-hekma";

/** Preset keys for Hacienda landing CTAs */
const PRESET: Record<string, string> = {
  ...HACIENDA.whatsappPresets,
  inquiry: WHATSAPP_DEFAULT_MSG,
};

const MAX_MSG = 600;

/**
 * Internal WhatsApp entry for Hacienda — avoids wa.me digits in page links.
 */
export function GET(request: Request) {
  const num = HACIENDA.WHATSAPP_NUMBER.replace(/\D/g, "");
  if (!num || num.includes("X")) {
    return NextResponse.json({ error: "WhatsApp not configured" }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const rawCustom = searchParams.get("msg");
  const t = searchParams.get("t") ?? "default";

  let text = PRESET[t] ?? PRESET.default ?? WHATSAPP_DEFAULT_MSG;

  if (rawCustom) {
    try {
      const decoded = decodeURIComponent(rawCustom);
      if (decoded.length > 0 && decoded.length <= MAX_MSG) text = decoded;
    } catch {
      // keep preset text
    }
  }

  const url = `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  return NextResponse.redirect(url, 302);
}
