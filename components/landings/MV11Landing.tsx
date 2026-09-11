"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { MVLeadForm } from "@/components/landings/MVLeadForm";
import { MVLeadPopup } from "@/components/landings/MVLeadPopup";
import { sectionHref } from "@/lib/site-url";
import "./mv11.css";

const CALL_HREF = "/r/mv-call";
const mvWaPreset = (
  t: "inquiry" | "details" | "full_table" | "form_followup" | "millennial" | "ivilla" | "townhouse" | "villa" | "crown",
) => `/r/mv-wa?t=${t}`;

const HERO_IMAGES = [
  "/projects/mountain-view-1-1/photo-facades.webp",
  "/projects/mountain-view-1-1/mv1-aerial-02.webp",
  "/projects/mountain-view-1-1/mv1-street-01.webp",
  "/projects/mountain-view-1-1/mv1-villas-02.webp",
];

type UnitCard = {
  name: string;
  area: string;
  rooms: string;
  price: string;
  img: string;
  ready?: boolean;
  limited?: boolean;
  wa: "millennial" | "ivilla" | "townhouse" | "villa" | "crown";
};

const UNITS: UnitCard[] = [
  {
    name: "Millennial",
    area: "140 م²",
    rooms: "3 غرف",
    price: "من 14.5 مليون",
    img: "/projects/mountain-view-1-1/mv1-homes-01.webp",
    wa: "millennial",
  },
  {
    name: "I-Villa Sky Garden",
    area: "235–255 م²",
    rooms: "3 غرف",
    price: "من 23.5 مليون",
    img: "/projects/mountain-view-1-1/mv1-homes-02.webp",
    wa: "ivilla",
  },
  {
    name: "Town House",
    area: "210 م²",
    rooms: "3 غرف",
    price: "من 38 مليون",
    img: "/projects/mountain-view-1-1/mv1-villas-01.webp",
    ready: true,
    wa: "townhouse",
  },
  {
    name: "Luxury Villa",
    area: "255–350 م²",
    rooms: "3–4 غرف",
    price: "من 55 مليون",
    img: "/projects/mountain-view-1-1/mv1-villas-02.webp",
    ready: true,
    wa: "villa",
  },
  {
    name: "Crown Palace",
    area: "670 م²",
    rooms: "4 غرف",
    price: "من 200 مليون",
    img: "/projects/mountain-view-1-1/mv1-aerial-02.webp",
    limited: true,
    wa: "crown",
  },
];

const GALLERY = [
  { src: "/projects/mountain-view-1-1/photo-streetscape.webp", alt: "واجهات ماونتن ڤيو ١.١" },
  { src: "/projects/mountain-view-1-1/mv1-aerial-01.webp", alt: "منظر جوي للمجتمع" },
  { src: "/projects/mountain-view-1-1/mv1-park-02.webp", alt: "مساحات خضراء" },
  { src: "/projects/mountain-view-1-1/mv1-street-01.webp", alt: "شوارع المشروع" },
  { src: "/projects/mountain-view-1-1/mv1-villas-02.webp", alt: "فيلات Signature" },
  { src: "/projects/mountain-view-1-1/mv1-homes-01.webp", alt: "وحدات سكنية" },
];

const FAQS = [
  {
    q: "الوحدات جاهزة للتسليم فعلاً؟",
    a: "نعم — جزء كبير من الوحدات Ready to Move ومتشطب بالكامل. التوفر الحالي يتأكد مع مستشار المبيعات.",
  },
  {
    q: "إيه أنظمة السداد المتاحة؟",
    a: "للوحدات: 10% + 5% وتقسيط حتى 8 سنوات. للفيلات: 20% + 5% حتى 7 سنوات. Crown Palace لها خطة خاصة + باقة تشطيب.",
  },
  {
    q: "إيه أنواع الوحدات المتاحة؟",
    a: "Millennial، I-Villa Sky Garden، Town House، Luxury Villa، وCrown Palace (Limited Edition) — بمساحات وأسعار كما في الجدول.",
  },
  {
    q: "فين المشروع بالظبط؟",
    a: "ماونتن ڤيو ١.١ في التجمع الخامس أمام مبنى النائب العام — امتداد لمجتمع ماونتن ڤيو ١ على ١٢٧ فدان.",
  },
];

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.088 5.972L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function MV11Landing() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroFading, setHeroFading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const openLeadPopup = useCallback(() => setPopupOpen(true), []);
  const closeLeadPopup = useCallback(() => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem("mv11-popup-dismissed", "1");
    } catch {
      /* ignore */
    }
  }, []);

  const switchHero = useCallback((next: number) => {
    setHeroFading(true);
    setTimeout(() => {
      setHeroIdx(next);
      setHeroFading(false);
    }, 350);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      switchHero((heroIdx + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(id);
  }, [heroIdx, switchHero]);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem("mv11-popup-dismissed") === "1";
    } catch {
      /* ignore */
    }
    if (dismissed) return;

    let opened = false;
    const openOnce = () => {
      if (opened) return;
      opened = true;
      setPopupOpen(true);
    };

    const timer = setTimeout(openOnce, 20000);
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0 && scrollTop / docHeight >= 0.8) openOnce();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="mv-page">
      {/* Utility */}
      <div className="utility">
        <div className="wrap">
          <div className="utility-left">
            <span className="utility-dot" aria-hidden />
            <span>مستشار المبيعات متاح الآن · إطلاق ماونتن ڤيو ١.١</span>
          </div>
          <div className="utility-links">
            <a href={CALL_HREF}>اتصل بماونتن ڤيو</a>
            <a href={mvWaPreset("inquiry")}>راسلنا على واتساب</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="mv-header">
        <div className="wrap">
          <div className="brand">
            <Image
              src="/Mountain View Logo.webp"
              alt="Mountain View"
              width={140}
              height={40}
              priority
            />
            <div className="brand-text">
              <strong>MOUNTAIN VIEW</strong>
              <span>1.1 · Signature Living</span>
            </div>
          </div>
          <div className="header-actions">
            <a className="btn btn-ghost" href={sectionHref("units")}>
              الوحدات والأسعار
            </a>
            <a className="btn btn-call" href={CALL_HREF} aria-label="اتصل الآن">
              <PhoneIcon size={16} />
              اتصل الآن
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero" id="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url(${HERO_IMAGES[heroIdx]})`,
            opacity: heroFading ? 0.4 : 1,
          }}
        />
        <div className="hero-overlay" />
        <div className="hero-inner wrap">
          <div className="hero-badge">
            <span className="ready">READY TO MOVE</span>
            <span>Signature Living · يونيو ٢٠٢٦</span>
          </div>
          <h1>
            <span className="latin">Mountain View 1.1</span>
            وحدات متشطبة بالكامل وجاهزة للتسليم
          </h1>
          <p className="hero-sub">
            في واحد من أرقى مشروعات ماونتن ڤيو أمام النائب العام.
            أسعار تبدأ من <strong>14.5 مليون</strong> — أنظمة سداد مميزة.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-call" href={CALL_HREF}>
              <PhoneIcon />
              اتصل بنا الآن
            </a>
            <a className="btn btn-wa" href={mvWaPreset("details")}>
              <WhatsAppIcon />
              كلمنا واتساب
            </a>
            <a className="btn btn-outline" href={sectionHref("lead")}>
              احجز معاينة
            </a>
          </div>
          <div className="hero-meta">
            <div className="meta-item">
              <strong className="latin">14.5M+</strong>
              <span>سعر البداية</span>
            </div>
            <div className="meta-item">
              <strong>متشطبة</strong>
              <span>بالكامل</span>
            </div>
            <div className="meta-item">
              <strong className="latin">8 yrs</strong>
              <span>تقسيط حتى</span>
            </div>
            <div className="meta-item">
              <strong>١٢٧</strong>
              <span>فدان</span>
            </div>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="facts" id="facts">
        <div className="wrap facts-grid">
          <div className="fact-cell">
            <strong>متشطبة</strong>
            <span>بالكامل</span>
          </div>
          <div className="fact-cell">
            <strong className="latin">Ready to Move</strong>
            <span>جاهزة للتسليم</span>
          </div>
          <div className="fact-cell">
            <strong>١٢٧ فدان</strong>
            <span>في قلب القاهرة الجديدة</span>
          </div>
          <div className="fact-cell">
            <strong>أمام النائب العام</strong>
            <span>التجمع الخامس</span>
          </div>
        </div>
      </section>

      {/* Units */}
      <section className="s units" id="units">
        <div className="wrap">
          <div className="s-head">
            <div className="eyebrow">Units &amp; Pricing</div>
            <h2>الوحدات والأسعار</h2>
            <p>
              تشكيلة من Millennial حتى Crown Palace — كلها متشطبة بالكامل،
              وبعضها Ready to Move فوراً.
            </p>
          </div>
          <div className="unit-cards">
            {UNITS.map((u) => (
              <article
                key={u.name}
                className={`unit-card${u.limited ? " crown" : ""}`}
              >
                <div className="unit-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.img} alt={u.name} loading="lazy" />
                  <div className="unit-badges">
                    <span className="unit-badge finished">متشطبة</span>
                    {u.ready ? <span className="unit-badge ready">Ready to Move</span> : null}
                    {u.limited ? <span className="unit-badge limited">Limited Edition</span> : null}
                  </div>
                </div>
                <div className="unit-body">
                  <h3>{u.name}</h3>
                  <div className="unit-specs">
                    <span>{u.area}</span>
                    <span>·</span>
                    <span>{u.rooms}</span>
                  </div>
                  <div className="unit-price">
                    {u.price}
                    {u.limited ? (
                      <small>Special Finishing Package &amp; Payment Plan</small>
                    ) : null}
                  </div>
                  <div className="unit-cta">
                    <button
                      type="button"
                      className="btn btn-call"
                      onClick={openLeadPopup}
                    >
                      احجز استشارة
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="units-footnote">
            * الأسعار استرشادية وفق عرض الإطلاق الحالي — التوفر والمراحل تتغيّر.
            العرض الرسمي يُعتمد من ماونتن ڤيو.
          </p>
        </div>
      </section>

      {/* Payment */}
      <section className="s payment" id="payment">
        <div className="wrap">
          <div className="s-head">
            <div className="eyebrow">Payment Plans</div>
            <h2>أنظمة سداد مميزة</h2>
            <p>خطط مرنة تناسب الوحدات والفيلات — مع استلام فوري لوحدات Ready to Move.</p>
          </div>
          <div className="pay-grid">
            <div className="pay-card">
              <div className="pay-label">Units</div>
              <h3>Millennial · I-Villa</h3>
              <div className="pay-plan latin">10% + 5%</div>
              <p>مقدم ١٠٪ + ٥٪ — وتقسيط حتى ٨ سنوات.</p>
            </div>
            <div className="pay-card villas">
              <div className="pay-label">Villas</div>
              <h3>Town House · Luxury Villa</h3>
              <div className="pay-plan latin">20% + 5%</div>
              <p>مقدم ٢٠٪ + ٥٪ — وتقسيط حتى ٧ سنوات. وحدات Ready to Move.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="gallery" id="gallery">
        <div className="wrap">
          <div className="s-head">
            <div className="eyebrow">Gallery</div>
            <h2>لقطات من المجتمع</h2>
            <p>صور واقعية من ماونتن ڤيو ١ وماونتن ڤيو ١.١ — Signature Living.</p>
          </div>
          <div className="gallery-grid">
            {GALLERY.map((g) => (
              <div className="g-item" key={g.src}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.src} alt={g.alt} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="s location" id="location">
        <div className="wrap loc-grid">
          <div>
            <div className="eyebrow">Location</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "var(--mv-navy-deep)", margin: "10px 0 12px", lineHeight: 1.2 }}>
              أمام النائب العام
            </h2>
            <p style={{ color: "var(--mv-slate)", fontSize: 16, lineHeight: 1.7, margin: 0, opacity: 0.85 }}>
              ماونتن ڤيو ١.١ في التجمع الخامس — امتداد لمجتمع ماونتن ڤيو ١ على ١٢٧ فدان،
              بقرب أهم محاور القاهرة الجديدة.
            </p>
            <ul className="loc-list">
              {[
                { name: "مبنى النائب العام", distance: "أمام المشروع" },
                { name: "التجمع الخامس", distance: "قلب المنطقة" },
                { name: "محاور القاهرة الجديدة", distance: "وصول مباشر" },
                { name: "Mountain View 1", distance: "امتداد للمجتمع" },
              ].map((p) => (
                <li className="row" key={p.name}>
                  <strong>{p.name}</strong>
                  <span>{p.distance}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="loc-map">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/projects/mountain-view-1-1/banner-location.webp"
              alt="موقع ماونتن ڤيو ١.١"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Lead */}
      <section className="s lead" id="lead">
        <div className="wrap lead-grid">
          <div className="lead-left">
            <div className="eyebrow">Get Details</div>
            <h2>سيب بياناتك، ونبعتلك التفاصيل</h2>
            <p>
              هنبعتلك جدول الوحدات والأسعار وخطط السداد المتاحة.
              التواصل للاستفسار فقط وبدون أي التزام.
            </p>
            <ul className="lead-perks">
              {[
                "جدول أسعار لكل نوع وحدة",
                "خطط سداد مرنة تناسب ميزانيتك",
                "تنسيق معاينة على أرض المشروع",
                "وحدات Ready to Move متاحة الآن",
              ].map((t) => (
                <li key={t}>
                  <span className="check"><CheckIcon /></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lead-card">
            <MVLeadForm source="mv11-lead" formId="lf" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="s faq" id="faq">
        <div className="wrap">
          <div className="s-head">
            <div className="eyebrow">FAQ</div>
            <h2>أسئلة شائعة</h2>
            <p>لو في سؤال مش لاقي إجابته هنا، ابعتلنا واتساب وهنرد عليك خلال دقائق.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div key={f.q} className={`faq-item${openFaq === i ? " open" : ""}`}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{f.q}</span>
                  <svg className="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={20} height={20}>
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className="ans">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final */}
      <section className="final" id="final">
        <div className="wrap">
          <h2>
            <small>Mountain View 1.1</small>
            تحب تكلمنا إزاي؟
          </h2>
          <p>اختار الطريقة المناسبة ونرد عليك بتفاصيل الوحدات والأسعار.</p>
          <div className="final-cards">
            <a className="final-card" href={CALL_HREF}>
              <PhoneIcon size={22} />
              <strong>CALL</strong>
              <span>اتصل بماونتن ڤيو</span>
            </a>
            <a className="final-card" href={mvWaPreset("inquiry")}>
              <WhatsAppIcon size={22} />
              <strong>WHATSAPP</strong>
              <span>راسلنا على واتساب</span>
            </a>
            <a className="final-card" href={sectionHref("lead")}>
              <strong>FORM</strong>
              <span>استمارة سريعة</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mv-footer">
        <div className="wrap">
          <p>© ٢٠٢٦ ماونتن ڤيو · ١.١ Signature Living · القاهرة الجديدة</p>
          <p>الأسعار والمساحات استرشادية وقد تتغيّر — العرض الرسمي يُعتمد من المطوّر.</p>
        </div>
      </footer>

      {/* Floating WA */}
      <a className="float-wa" href={mvWaPreset("inquiry")} aria-label="واتساب">
        <WhatsAppIcon size={28} />
      </a>

      {/* Sticky mobile */}
      <nav className="sticky-mobile" aria-label="تواصل سريع">
        <div className="row">
          <a className="call" href={CALL_HREF}>
            <PhoneIcon size={16} />
            اتصل
          </a>
          <a className="wa" href={mvWaPreset("inquiry")}>
            <WhatsAppIcon size={16} />
            واتساب
          </a>
          <a className="form" href={sectionHref("lead")}>
            استمارة
          </a>
        </div>
      </nav>

      <MVLeadPopup open={popupOpen} onClose={closeLeadPopup} />
    </div>
  );
}
