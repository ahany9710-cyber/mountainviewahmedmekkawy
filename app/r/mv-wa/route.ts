import { NextResponse } from "next/server";
import { content } from "@/content/projects/mountain-view-1-1";

const PRESET: Record<string, string> = {
  inquiry:
    "السلام عليكم، تواصل مع Flair Agency بخصوص ماونتن ڤيو ١.١ — أرغب في التفاصيل والأسعار (حسب التوفر).",
  details:
    "السلام عليكم، Flair Agency — مهتم بماونتن ڤيو ١.١ وأرغب في جدول الأسعار وخطط السداد الاسترشادية.",
  full_table:
    "السلام عليكم، محتاج جدول وحدات وأسعار ماونتن ڤيو ١.١ عبر Flair Agency.",
  form_followup:
    "السلام عليكم، لسه بعت استمارة لـ Flair Agency عن ماونتن ڤيو ١.١ — أرغب في المتابعة.",
  millennial:
    "السلام عليكم، مهتم بوحدة Millennial في ماونتن ڤيو ١.١ عبر Flair Agency.",
  ivilla:
    "السلام عليكم، مهتم بـ I-Villa Sky Garden في ماونتن ڤيو ١.١ عبر Flair Agency.",
  townhouse:
    "السلام عليكم، مهتم بـ Town House في ماونتن ڤيو ١.١ عبر Flair Agency.",
  villa:
    "السلام عليكم، مهتم بـ Luxury Villa في ماونتن ڤيو ١.١ عبر Flair Agency.",
  crown:
    "السلام عليكم، مهتم بـ Crown Palace في ماونتن ڤيو ١.١ عبر Flair Agency.",
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
