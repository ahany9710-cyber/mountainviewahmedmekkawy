/* =========================================================
   HACIENDA — Landing page interactions
   ========================================================= */

// ----- Config (edit these in production) -----
const CONFIG = {
  WHATSAPP_NUMBER: "201222200310",
  LEAD_ENDPOINT: "https://formspree.io/f/xdajdyzd",
  PHONE: "201222200310",
  TEL_HREF: "tel:+201222200310",
  POPUP_SCROLL_THRESHOLD: 0.7,
  POPUP_DELAY_MS: 12000,
  WA_PRESETS: {
    default: "مهتم بـ هاسيندا راس الحكمة،ياريت أعرف التفاصيل والأسعار",
    unit_villa: "مهتم بـ هاسيندا راس الحكمة — فيلا فائقة الفخامة. ياريت أعرف التفاصيل والأسعار.",
    unit_chalet: "مهتم بـ هاسيندا راس الحكمة — شاليه. ياريت أعرف التفاصيل والأسعار.",
    unit_twin: "مهتم بـ هاسيندا راس الحكمة — توين هاوس. ياريت أعرف التفاصيل والأسعار.",
    unit_apartment: "مهتم بـ هاسيندا راس الحكمة — ستوديو. ياريت أعرف التفاصيل والأسعار.",
    unit_branded: "مهتم بـ هاسيندا راس الحكمة — Branded Residences. ياريت أعرف التفاصيل والأسعار.",
    form_followup: "مهتم بـ هاسيندا راس الحكمة، لسه بعت استمارة — ياريت التفاصيل والأسعار.",
  },
};

const EG_PHONE = /^01[0125][0-9]{8}$/;
const POPUP_STORAGE_KEY = "hh_lead_popup_seen";
const LEAD_SUBMITTED_KEY = "hh_lead_submitted";

// ----- WhatsApp helpers -----
function waUrl(presetKey) {
  const msg = CONFIG.WA_PRESETS[presetKey] || CONFIG.WA_PRESETS.default;
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function trackCta(id) {
  console.log("[cta]", id);
}

function trackFormLead(source) {
  console.log("[lead]", source);
}

function markLeadSubmitted() {
  try {
    sessionStorage.setItem(LEAD_SUBMITTED_KEY, "1");
  } catch (_) {}
}

function hydrateCallLabels() {
  const label = "اتصل بنا";
  document.querySelectorAll("[data-tel] .call-label, .sticky-mobile a.call .call-label").forEach((el) => {
    el.textContent = label;
  });
  document.querySelectorAll(".sticky-mobile a.call, [data-tel].btn-call").forEach((el) => {
    el.setAttribute("aria-label", label);
    for (const node of [...el.childNodes]) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.remove();
    }
  });
}

// ----- Lead form (main + popup) -----
function setupLeadForm({ formId, successId, source, ctaId, onSuccess }) {
  const form = document.getElementById(formId);
  if (!form) return;

  const successPanel = document.getElementById(successId);
  const prefix = formId === "popup-lead-form" ? "pf" : "f";
  const errPrefix = formId === "popup-lead-form" ? "err-pf" : "err";

  const fields = {
    name: form.querySelector(`#${prefix}-name`),
    phone: form.querySelector(`#${prefix}-phone`),
    altPhone: form.querySelector(`#${prefix}-alt-phone`),
    unitType: form.querySelector(`#${prefix}-unit`),
  };
  const errs = {
    name: form.querySelector(`#${errPrefix}-name`),
    phone: form.querySelector(`#${errPrefix}-phone`),
    altPhone: form.querySelector(`#${errPrefix}-alt-phone`),
    form: form.querySelector(`#${errPrefix}-form`) || form.querySelector("#err-form"),
  };
  const submitBtn = form.querySelector(".form-submit");

  function clearErrors() {
    Object.values(errs).forEach((e) => e && (e.textContent = ""));
  }

  function validate() {
    clearErrors();
    let ok = true;
    const name = fields.name.value.trim();
    const phone = fields.phone.value.trim().replace(/\s/g, "");
    const alt = fields.altPhone.value.trim().replace(/\s/g, "");

    if (!name) { errs.name.textContent = "الاسم مطلوب"; ok = false; }
    if (!phone) { errs.phone.textContent = "رقم الموبايل مطلوب"; ok = false; }
    else if (!EG_PHONE.test(phone)) {
      errs.phone.textContent = "رقم موبايل مصري صحيح مطلوب (مثال: 01012345678)";
      ok = false;
    }
    if (alt && !EG_PHONE.test(alt)) {
      errs.altPhone.textContent = "رقم بديل غير صحيح (اختياري)";
      ok = false;
    }
    return ok;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) return;

    submitBtn.disabled = true;
    const labelEl = submitBtn.querySelector(".label");
    const originalLabel = labelEl.textContent;
    labelEl.textContent = "جاري الإرسال…";

    const payload = {
      name: fields.name.value.trim(),
      phone: fields.phone.value.trim().replace(/\s/g, ""),
      unit_type: fields.unitType.value,
      project: "هاسيندا راس الحكمة",
      source,
    };
    const alt = fields.altPhone.value.trim().replace(/\s/g, "");
    if (alt) payload.alt_phone = alt;

    try {
      const res = await fetch(CONFIG.LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Bad response");

      trackFormLead(source);
      trackCta(ctaId);
      markLeadSubmitted();

      form.hidden = true;
      successPanel.hidden = false;
      successPanel.style.display = "flex";

      onSuccess?.();
    } catch (err) {
      errs.form.innerHTML = `
        <p>تعذر الإرسال — يمكنك التواصل مباشرة على واتساب.</p>
        <a class="btn btn-wa btn-block" href="${waUrl("form_followup")}" data-cta="whatsapp_form_error">
          <svg class="icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.088 5.972L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          <span>تواصل على واتساب</span>
        </a>`;
    } finally {
      submitBtn.disabled = false;
      labelEl.textContent = originalLabel;
    }
  });
}

// ----- Lead popup -----
function setupLeadPopup() {
  const popup = document.getElementById("lead-popup");
  if (!popup) return;

  let opened = false;

  function shouldSkipPopup() {
    try {
      if (sessionStorage.getItem(LEAD_SUBMITTED_KEY) === "1") return true;
      if (sessionStorage.getItem(POPUP_STORAGE_KEY) === "1") return true;
    } catch (_) {}
    return false;
  }

  function openPopup(trigger) {
    if (opened || shouldSkipPopup()) return;
    opened = true;
    try { sessionStorage.setItem(POPUP_STORAGE_KEY, "1"); } catch (_) {}

    popup.hidden = false;
    popup.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => popup.classList.add("is-open"));
    document.body.classList.add("lead-popup-open");
    trackCta(`popup_open_${trigger}`);

    const firstInput = popup.querySelector("input");
    setTimeout(() => firstInput?.focus(), 350);
  }

  function closePopup() {
    popup.classList.remove("is-open");
    popup.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lead-popup-open");
    trackCta("popup_close");
    setTimeout(() => { popup.hidden = true; }, 350);
  }

  popup.querySelectorAll("[data-popup-close]").forEach((el) => {
    el.addEventListener("click", closePopup);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("is-open")) closePopup();
  });

  function getScrollDepth() {
    const doc = document.documentElement;
    const scrollTop = window.scrollY || doc.scrollTop;
    const scrollHeight = doc.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return 1;
    return scrollTop / scrollHeight;
  }

  function onScrollCheck() {
    if (getScrollDepth() >= CONFIG.POPUP_SCROLL_THRESHOLD) {
      openPopup("scroll");
      window.removeEventListener("scroll", onScrollCheck, { passive: true });
    }
  }

  if (!shouldSkipPopup()) {
    window.addEventListener("scroll", onScrollCheck, { passive: true });
    onScrollCheck();

    setTimeout(() => openPopup("timer"), CONFIG.POPUP_DELAY_MS);
  }

  return { closePopup };
}

// ----- Boot -----
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tel]").forEach((el) => {
    el.setAttribute("href", CONFIG.TEL_HREF);
  });
  hydrateCallLabels();

  document.querySelectorAll("[data-wa]").forEach((el) => {
    const preset = el.dataset.wa || "default";
    el.setAttribute("href", waUrl(preset));
    const cta = el.dataset.cta;
    el.addEventListener("click", () => cta && trackCta(cta));
  });

  document.querySelectorAll("[data-cta-call]").forEach((el) => {
    el.addEventListener("click", () => trackCta(el.dataset.ctaCall));
  });

  document.querySelectorAll("[data-cta]").forEach((el) => {
    if (el.dataset.wa || el.dataset.ctaCall) return;
    el.addEventListener("click", () => trackCta(el.dataset.cta));
  });

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });
  document.querySelectorAll(".fade-in").forEach((el) => io.observe(el));

  setupLeadForm({
    formId: "lead-form",
    successId: "lead-success",
    source: "hacienda_home",
    ctaId: "form_submit",
  });

  const popupApi = setupLeadPopup();
  setupLeadForm({
    formId: "popup-lead-form",
    successId: "popup-lead-success",
    source: "hacienda_popup",
    ctaId: "form_submit_popup",
    onSuccess: () => {
      setTimeout(() => popupApi?.closePopup?.(), 2800);
    },
  });
});

// Smooth scroll on hash links
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  if (!id) return;
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  const top = target.getBoundingClientRect().top + window.scrollY - 60;
  window.scrollTo({ top, behavior: "smooth" });
});
