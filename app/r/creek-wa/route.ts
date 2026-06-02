import { NextResponse } from "next/server";
import { content } from "@/content/projects/creekview-new-cairo";

/** Preset keys — CreekviewLanding + SiteCreekLanding hub. */
const PRESET: Record<string, string> = {
  inquiry: "السلام عليكم، مهتم بمشروع كريك ڤيو",
  details:
    "السلام عليكم، مهتم بمشروع كريك ڤيو وأرغب في التفاصيل والأسعار",
  full_table: "السلام عليكم، محتاج جدول كريك ڤيو الكامل",
  form_followup:
    "السلام عليكم، لسه بعتلكم استمارة كريك ڤيو — أرغب في التفاصيل بسرعة",
  hub_inquiry:
    "السلام عليكم، مهتم بكريك ڤيو نيو كايرو وأرغب في التفاصيل من المبيعات.",
  hub_hero:
    "السلام عليكم، مهتم بكريك ڤيو وأرغب أعرف التفاصيل والأسعار.",
  hub_final:
    "السلام عليكم، عايز أتكلم مع مستشار عن كريك ڤيو أو مشروع تاني من ماونتن ڤيو.",
  hub_lead_microbar:
    "السلام عليكم، مهتم بمشاريع ماونتن ڤيو وأرغب بالتواصل مع المبيعات.",
  hub_float:
    "السلام عليكم، مهتم بكريك ڤيو وأرغب في التفاصيل.",
  hub_sticky:
    "السلام عليكم، مهتم بكريك ڤيو أو مشاريع ماونتن ڤيو — عايز أكلم المبيعات.",
};

const MAX_MSG = 600;

/**
 * Internal WhatsApp entry for Creekview — avoids wa.me/ digits in page links.
 */
export function GET(request: Request) {
  const num = content.whatsappNumber.replace(/\D/g, "");
  if (!num) return NextResponse.json({ error: "Not configured" }, { status: 500 });

  const { searchParams } = new URL(request.url);
  const rawCustom = searchParams.get("msg");
  const t = searchParams.get("t") ?? "inquiry";

  let text = PRESET[t] ?? PRESET.inquiry;

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
