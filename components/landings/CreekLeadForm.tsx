"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { content as creekProject } from "@/content/projects/creekview-new-cairo";
import { FORMSPREE_LEAD_ENDPOINT } from "@/lib/formspree";
import { isValidEgyptPhone, normalizePhone } from "@/lib/validation";

interface CreekLeadFormProps {
  source: string;
  formId?: string;
  className?: string;
  onSuccess?: () => void;
  showHeading?: boolean;
}

export function CreekLeadForm({
  source,
  formId = "lf",
  className,
  onSuccess,
  showHeading = true,
}: CreekLeadFormProps) {
  const router = useRouter();
  const [budget, setBudget] = useState<string | null>(null);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<{ phone?: string; form?: string }>(
    {},
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const phone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const unitType = (form.elements.namedItem("type") as HTMLSelectElement).value;
    const errors: { phone?: string } = {};

    if (!phone.trim()) errors.phone = "رقم الموبايل مطلوب";
    else if (!isValidEgyptPhone(phone)) {
      errors.phone =
        "رقم هاتف صحيح مطلوب (مصر، السعودية، البحرين، الإمارات، قطر)";
    }

    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setFormSubmitting(true);
    setFormErrors({});

    const payload: Record<string, string> = {
      phone: normalizePhone(phone) || phone.trim(),
      project_slug: creekProject.slug,
      project_name: creekProject.projectName,
      source,
      approximate_budget: budget ?? "",
      _subject: `استفسار ماونتن ڤيو — ${name || "عميل"} — ${creekProject.projectName}`,
    };
    if (name) payload.name = name;
    if (unitType) payload.unit_interest = unitType;

    try {
      const res = await fetch(FORMSPREE_LEAD_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        errors?: Record<string, string>;
      };

      if (!res.ok) {
        const msg =
          (typeof data.error === "string" && data.error) ||
          Object.values(data.errors ?? {})[0] ||
          "تعذر إرسال النموذج. حاول مرة أخرى.";
        setFormErrors({ form: msg });
        return;
      }

      onSuccess?.();
      router.push("/thank-you");
    } catch {
      setFormErrors({
        form: "حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجدداً.",
      });
    } finally {
      setFormSubmitting(false);
    }
  }

  return (
    <>
      {showHeading ? (
        <>
          <h3>طلب التفاصيل</h3>
          <div className="sub">٣٠ ثانية فقط — استمارة قصيرة</div>
        </>
      ) : null}
      <form
        onSubmit={handleSubmit}
        autoComplete="on"
        className={className}
        noValidate
      >
        <div className="row2c">
          <div className="field">
            <label htmlFor={`${formId}-name`}>
              الاسم <span className="opt">(اختياري)</span>
            </label>
            <input
              id={`${formId}-name`}
              name="name"
              type="text"
              placeholder="اسمك بالكامل"
              disabled={formSubmitting}
            />
          </div>
          <div className="field">
            <label htmlFor={`${formId}-phone`}>رقم الموبايل *</label>
            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              placeholder="01XXXXXXXXX"
              inputMode="numeric"
              required
              disabled={formSubmitting}
            />
            <div className="err">{formErrors.phone || ""}</div>
          </div>
        </div>
        <div className="field">
          <label htmlFor={`${formId}-type`}>
            نوع الوحدة المطلوبة <span className="opt">(اختياري)</span>
          </label>
          <select id={`${formId}-type`} name="type" defaultValue="" disabled={formSubmitting}>
            <option value="">— مش محدد —</option>
            <option>Millennial — غرفة نوم</option>
            <option>Garden Millennial — غرفة نوم</option>
            <option>Millennial — غرفتين</option>
            <option>Garden Millennial — غرفتين</option>
            <option>Millennial — ٣ غرف</option>
            <option>Garden Millennial — ٣ غرف</option>
            <option>Skyvilla — ٣ غرف</option>
            <option>I-villa Garden — ٣ غرف</option>
            <option>غير متأكد بعد — محتاج استشارة</option>
          </select>
        </div>
        <div className="field">
          <label>
            الميزانية التقريبية <span className="opt">(اختياري)</span>
          </label>
          <div className="budget-chips">
            {["٥–٧ مليون", "٧–٩ مليون", "٩–١٢ مليون", "١٢ مليون+", "أحتاج استشارة"].map(
              (b) => (
                <div
                  key={b}
                  className={`chip ${budget === b ? "active" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => !formSubmitting && setBudget(b)}
                  onKeyDown={(ev) => {
                    if ((ev.key === "Enter" || ev.key === " ") && !formSubmitting)
                      setBudget(b);
                  }}
                >
                  {b}
                </div>
              ),
            )}
          </div>
        </div>
        {formErrors.form ? (
          <p style={{ color: "#c41e3a", fontSize: 14, margin: "0 0 8px" }}>
            {formErrors.form}
          </p>
        ) : null}
        <button className="btn-submit" type="submit" disabled={formSubmitting}>
          <span>{formSubmitting ? "جاري الإرسال…" : "ابعتلي تفاصيل كريك ڤيو"}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
            <path d="M5 12 H19 M19 12 L13 6 M19 12 L13 18" />
          </svg>
        </button>
        <div className="fineprint">
          بإرسال النموذج أنت توافق على تواصل فريق المبيعات معك — لن نشارك بياناتك مع أي طرف ثالث.
        </div>
      </form>
    </>
  );
}
