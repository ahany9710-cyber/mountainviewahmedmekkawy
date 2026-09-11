import { NextResponse } from "next/server";
import { content } from "@/content/projects/mountain-view-1-1";

const PRESET: Record<string, string> = {
  inquiry:
    "السلام عليكم، مهتم بماونتن ڤيو ١.١ وأرغب في التفاصيل والأسعار للوحدات الجاهزة للتسليم.",
  details:
    "السلام عليكم، مهتم بماونتن ڤيو ١.١ وأرغب في جدول الأسعار وخطط السداد.",
  full_table:
    "السلام عليكم، محتاج جدول وحدات وأسعار ماونتن ڤيو ١.١ الكامل.",
  form_followup:
    "السلام عليكم، لسه بعتلكم استمارة ماونتن ڤيو ١.١ — أرغب في التفاصيل بسرعة.",
  millennial:
    "السلام عليكم، مهتم بوحدة Millennial في ماونتن ڤيو ١.١.",
  ivilla:
    "السلام عليكم، مهتم بـ I-Villa Sky Garden في ماونتن ڤيو ١.١.",
  townhouse:
    "السلام عليكم، مهتم بـ Town House في ماونتن ڤيو ١.١.",
  villa:
    "السلام عليكم، مهتم بـ Luxury Villa في ماونتن ڤيو ١.١.",
  crown:
    "السلام عليكم، مهتم بـ Crown Palace في ماونتن ڤيو ١.١.",
};

const MAX_MSG = 600;

/**
 * Internal WhatsApp entry for Mountain View 1.1.
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
