/** E.164-ish stored whatsapp/call numbers → tel: and readable display. */

export function digitsOnlyPhone(s: string): string {
  return s.replace(/\D/g, "");
}

export function telHref(phone: string): string {
  const d = digitsOnlyPhone(phone);
  if (!d) return "#";
  // Egyptian short codes (e.g. Palm Hills 19743) — no country prefix
  if (d.length <= 5) return `tel:${d}`;
  return `tel:+${d}`;
}
