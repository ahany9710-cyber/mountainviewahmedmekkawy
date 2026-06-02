"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FORMSPREE_LEAD_ENDPOINT } from "@/lib/formspree";
import { isValidEgyptPhone, normalizePhone } from "@/lib/validation";
import type { ProjectContent } from "@/types/project";

const ANY_PROJECT = "غير محدد — أرشدوني";

interface LeadFormProps {
  projects: ProjectContent[];
  defaultProjectSlug?: string;
  submitLabel?: string;
  source?: string;
  onSuccess?: () => void;
  compact?: boolean;
  /** Matches Creekview `.lead-card` field styles — use inside `.cv-lead-popup-root` or `.cv-page`. */
  appearance?: "default" | "creek";
}

export function LeadForm({
  projects,
  defaultProjectSlug,
  submitLabel = "سجّل اهتمامك",
  source = "section",
  onSuccess,
  compact = false,
  appearance = "default",
}: LeadFormProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [chosenProject, setChosenProject] = useState<string>(
    defaultProjectSlug ?? ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!phone.trim()) next.phone = "رقم الهاتف مطلوب";
    else if (!isValidEgyptPhone(phone)) {
      next.phone =
        "رقم هاتف صحيح مطلوب (مصر، السعودية، البحرين، الإمارات، قطر)";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});

    const project = projects.find((p) => p.slug === chosenProject);
    const projectLabel = project ? project.projectName : ANY_PROJECT;

    const payload: Record<string, string> = {
      phone: normalizePhone(phone) || phone.trim(),
      project_slug: chosenProject || "any",
      project_name: projectLabel,
      source,
      _subject: `استفسار ماونتن ڤيو — ${name.trim() || "عميل"} — ${projectLabel}`,
    };
    if (name.trim()) payload.name = name.trim();

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
        setErrors({ form: msg });
        return;
      }

      onSuccess?.();
      router.push("/thank-you");
    } catch {
      setErrors({ form: "حدث خطأ في الاتصال. تحقق من الإنترنت وحاول مجدداً." });
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls = compact ? "py-2" : "py-2.5";
  const labelCls = "block text-sm font-semibold text-navy mb-1";
  const fieldGap = compact ? "space-y-3" : "space-y-4";
  const formId = source ? `lead-form-${source}` : "lead-form";

  if (appearance === "creek") {
    return (
      <form
        onSubmit={handleSubmit}
        className="cv-popup-lead-form"
        noValidate
      >
        <div className="row2c">
          <div className="field">
            <label htmlFor={`${formId}-phone`}>رقم الهاتف *</label>
            <input
              id={`${formId}-phone`}
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="مثال: 01012345678"
              autoComplete="tel"
              disabled={submitting}
            />
            <div className="err">{errors.phone ?? ""}</div>
          </div>
          <div className="field">
            <label htmlFor={`${formId}-name`}>
              الاسم <span style={{ opacity: 0.75 }}>(اختياري)</span>
            </label>
            <input
              id={`${formId}-name`}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="الاسم"
              autoComplete="name"
              disabled={submitting}
            />
            <div className="err" />
          </div>
        </div>

        <div className="field" style={{ marginBottom: 8 }}>
          <label>
            المشروع المهتم به{" "}
            <span style={{ opacity: 0.75 }}>(اختياري)</span>
          </label>
          <div className="budget-chips">
            <button
              type="button"
              className={chosenProject === "" ? "chip active" : "chip"}
              aria-pressed={chosenProject === ""}
              disabled={submitting}
              onClick={() => setChosenProject("")}
            >
              {ANY_PROJECT}
            </button>
            {projects.map((p) => (
              <button
                key={p.slug}
                type="button"
                className={
                  chosenProject === p.slug ? "chip active" : "chip"
                }
                aria-pressed={chosenProject === p.slug}
                disabled={submitting}
                onClick={() => setChosenProject(p.slug)}
              >
                {p.projectName}
              </button>
            ))}
          </div>
        </div>

        {errors.form ? (
          <p
            style={{
              color: "#c0392b",
              fontSize: 13,
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            {errors.form}
          </p>
        ) : null}

        <button
          type="submit"
          className="btn-submit"
          disabled={submitting}
        >
          <Send size={18} aria-hidden />
          {submitting ? "جاري الإرسال…" : submitLabel}
        </button>
        <div className="fineprint">
          معلوماتك تُستخدم فقط للتواصل بخصوص استفسارك. بدون رسائل سبام.
        </div>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-xl border border-navy/10 bg-white ${
        compact ? "p-4" : "p-5 sm:p-6"
      } ${fieldGap} shadow-sm`}
      noValidate
    >
      <div>
        <label htmlFor={`${formId}-phone`} className={labelCls}>
          رقم الهاتف *
        </label>
        <Input
          id={`${formId}-phone`}
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="مثال: 01012345678"
          autoComplete="tel"
          disabled={submitting}
          error={errors.phone}
          className={inputCls}
        />
      </div>
      <div>
        <label htmlFor={`${formId}-name`} className={labelCls}>
          الاسم <span className="text-muted font-normal">(اختياري)</span>
        </label>
        <Input
          id={`${formId}-name`}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="الاسم"
          autoComplete="name"
          disabled={submitting}
          className={inputCls}
        />
      </div>
      <div>
        <p className="block text-sm font-semibold text-navy mb-2">
          المشروع المهتم به{" "}
          <span className="text-muted font-normal">(اختياري)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          <ProjectChip
            label={ANY_PROJECT}
            active={chosenProject === ""}
            onClick={() => setChosenProject("")}
            disabled={submitting}
          />
          {projects.map((p) => (
            <ProjectChip
              key={p.slug}
              label={p.projectName}
              active={chosenProject === p.slug}
              onClick={() => setChosenProject(p.slug)}
              disabled={submitting}
            />
          ))}
        </div>
      </div>

      {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}

      <Button
        type="submit"
        size={compact ? "md" : "lg"}
        className="w-full gap-2"
        disabled={submitting}
      >
        <Send size={18} aria-hidden />
        {submitting ? "جاري الإرسال…" : submitLabel}
      </Button>
      <p className="text-xs text-muted text-center">
        معلوماتك تُستخدم فقط للتواصل بخصوص استفسارك. بدون رسائل سبام.
      </p>
    </form>
  );
}

function ProjectChip({
  label,
  active,
  onClick,
  disabled,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={
        active
          ? "rounded-full px-4 py-2 text-sm font-semibold bg-navy text-white border border-navy"
          : "rounded-full px-4 py-2 text-sm font-medium bg-white text-navy border border-navy/20 hover:border-navy/40"
      }
    >
      {label}
    </button>
  );
}
