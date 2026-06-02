"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { CreekLeadForm } from "@/components/landings/CreekLeadForm";
import { CreekLeadPopup } from "@/components/landings/CreekLeadPopup";
import "./creekview.css";

/** Internal redirects — لا تُظهر أرقام المبيعات في `href`. انظر `app/r/creek-call`, `app/r/creek-wa`. */
const CALL_HREF = "/r/creek-call";
const creekWaPreset = (
  t: "inquiry" | "details" | "full_table" | "form_followup",
) => `/r/creek-wa?t=${t}`;
const creekWaMsg = (msg: string) => `/r/creek-wa?msg=${encodeURIComponent(msg)}`;

const HERO_IMAGES = [
  "/projects/creekview-new-cairo/heights.webp",
  "/projects/creekview-new-cairo/gallery-cliffside.webp",
  "/projects/creekview-new-cairo/islands.webp",
  "/projects/creekview-new-cairo/lighthouse.webp",
];

const NEIGHBORHOODS = [
  {
    name: "Heights",
    nameAr: "هايتس",
    img: "/projects/creekview-new-cairo/heights.webp",
    desc: "منطقة مرتفعة على الكريك بإطلالات مفتوحة، جلسات ومطاعم بإطلالة، وقرب من The Lighthouse والخدمات.",
  },
  {
    name: "Valleys",
    nameAr: "فالي",
    img: "/projects/creekview-new-cairo/valleys.webp",
    desc: "ممرات مشي وركض ودراجات، كباري مشاة، مناطق رياضية، وأنشطة مائية خفيفة على الكريك.",
  },
  {
    name: "Islands",
    nameAr: "آيلاندز",
    img: "/projects/creekview-new-cairo/islands.webp",
    desc: "جزر وسط المياه بإطلالات هادئة، شلالات طبيعية، جلسات خضراء، ومساحات للاسترخاء على الماء.",
  },
  {
    name: "The Lighthouse",
    nameAr: "اللايت هاوس",
    img: "/projects/creekview-new-cairo/lighthouse.webp",
    desc: "قلب اجتماعي وتجاري للمشروع، فيه محلات وكافيهات وخدمات يومية قريبة من السكان.",
  },
];

const UNITS = [
  { tag: "Millennial", type: "غرفة نوم واحدة", area: "٦٥ – ٨٠ م²", config: "١ مطبخ · ١ حمام · شرفة", price: "٥٫٤ مليون", priceFull: "٥٬٤٠٠٬٠٠٠ جنيه" },
  { tag: "Garden Millennial", type: "غرفة نوم + حديقة", area: "٦٥ م²", config: "+ حديقة خاصة", price: "٦٫٥ مليون", priceFull: "٦٬٥٠٠٬٠٠٠ جنيه" },
  { tag: "Millennial", type: "غرفتان", area: "١١٠ – ١٢٥ م²", config: "٢ حمام · ريسبشن", price: "٦٫٩ مليون", priceFull: "٦٬٩٠٠٬٠٠٠ جنيه" },
  { tag: "Garden Millennial", type: "غرفتان + حديقة", area: "١١٠ م²", config: "+ حديقة خاصة", price: "٧٫٥ مليون", priceFull: "٧٬٥٠٠٬٠٠٠ جنيه" },
  { tag: "Millennial", type: "٣ غرف", area: "١٤٠ – ١٥٥ م²", config: "٣ حمام · ماستر", price: "٨٫٦ مليون", priceFull: "٨٬٦٠٠٬٠٠٠ جنيه" },
  { tag: "Garden Millennial", type: "٣ غرف + حديقة", area: "١٤٠ – ١٥٥ م²", config: "+ حديقة خاصة", price: "٩٫٨ مليون", priceFull: "٩٬٨٠٠٬٠٠٠ جنيه" },
  { tag: "Skyvilla", type: "٣ غرف — سكاي ڤيلا", area: "١٦٠ – ١٦٥ م²", config: "تيراس واسع", price: "١١٫٥ مليون", priceFull: "١١٬٥٠٠٬٠٠٠ جنيه" },
  { tag: "I-villa Garden", type: "فيلا حديقة — ٣ غرف", area: "١٨٠ – ٢٠٥ م²", config: "حديقة كبيرة + مدخل خاص", price: "١٢٫٩ مليون", priceFull: "١٢٬٩٠٠٬٠٠٠ جنيه" },
];

const FAQS = [
  { q: "الأسعار المعروضة على أي أساس؟", a: "الأرقام في الجدول تمثّل سعر بداية على خطة سداد ٦ سنوات. ممكن مناقشة خيارات أطول (حتى ١٤ سنة) مع تعديل الجدولة مع مستشار المبيعات." },
  { q: "إمتى التسليم؟", a: "تسليم مبكر خلال ٢٫٥ سنة مع الالتزام بخطة السداد ٦ سنوات، حسب مادة الإطلاق الرسمية." },
  { q: "إيه أنواع الوحدات المتاحة؟", a: "Millennial و Garden Millennial و Skyvilla و I-villa Garden — بمساحات وعدد غرف مختلفة كما في الجدول. للتوفر الحالي تواصل مع المبيعات." },
  { q: "إزاي أحجز؟ والمقدم بيتدفع امتى؟", a: "بتتواصل مع فريق المبيعات بالاتصال أو واتساب، بنناقش الوحدة والخطة المناسبة، وبنبعتلك العرض الكتابي. المقدم والجدولة يتثبتوا حسب المشروع والمرحلة — رسمياً من ماونتن ڤيو." },
  { q: "ينفع أقسّط على بنك؟", a: "كثير من الوحدات بتتقسّط مع المطور مباشرة. لو محتاج تمويل عقاري نقدر نوضّحلك الخيارات مع البنوك الشريكة." },
  { q: "أقدر أزور الموقع قبل ما أقرر؟", a: "أيوه، بنرتّب لك معاينة مع مستشار مبيعات — ابعت واتساب أو سجّل في النموذج وهنرد بسرعة." },
];

const GALLERY = [
  { src: "/projects/creekview-new-cairo/gallery-creekfront-2.webp", label: "Creekside Living", caption: "عيشة على الواجهة المائية", cls: "g1" },
  { src: "/projects/creekview-new-cairo/gallery-cliffside.webp", label: "Cliffside Dining", caption: "إطلالات واسعة على الكريك", cls: "g2" },
  { src: "/projects/creekview-new-cairo/gallery-valley-trails.webp", label: "Valley Trails", caption: "ممرات وحركة على الكريك", cls: "g3" },
  { src: "/projects/creekview-new-cairo/gallery-islands-calm.webp", label: "Islands", caption: "هدوء الجزر المائية", cls: "g4" },
  { src: "/projects/creekview-new-cairo/gallery-yoga-decks.webp", label: "Yoga Decks", caption: "مساحات هادئة على الماء", cls: "g5" },
  { src: "/projects/creekview-new-cairo/creek-walks.webp", label: "Creek Walks", caption: "ممشى الكريك الرئيسي", cls: "g6" },
];

function PhoneIcon({ size = 14 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={size} height={size}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.088 5.972L0 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function CreekviewLanding() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroFading, setHeroFading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);

  const openLeadPopup = useCallback(() => setPopupOpen(true), []);
  const closeLeadPopup = useCallback(() => {
    setPopupOpen(false);
    try {
      sessionStorage.setItem("creekview-popup-dismissed", "1");
    } catch {
      // ignore
    }
  }, []);

  const handleLeadAnchor = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      openLeadPopup();
    },
    [openLeadPopup],
  );

  const switchHero = useCallback((i: number) => {
    setHeroFading(true);
    setTimeout(() => {
      setHeroIdx(i);
      setHeroFading(false);
    }, 350);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      switchHero((heroIdx + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroIdx, switchHero]);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("creekview-popup-dismissed")) return;
    } catch {
      // ignore
    }

    let triggered = false;
    const trigger = () => {
      if (triggered) return;
      triggered = true;
      setPopupOpen(true);
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };

    const timer = window.setTimeout(trigger, 20000);

    function onScroll() {
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - doc.clientHeight;
      if (maxScroll <= 0) return;
      const pct = window.scrollY / maxScroll;
      if (pct >= 0.8) trigger();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="cv-page">
      {/* UTILITY BAR */}
      <div className="utility">
        <div className="wrap">
          <div className="utility-left">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span className="utility-dot" />
              مستشار المبيعات متاح الآن للرد
            </span>
            <span>·</span>
            <span>إطلاق جديد · كريك ڤيو</span>
          </div>
          <div className="utility-right">
            <a href={CALL_HREF} aria-label="اتصل بماونتن ڤيو">
              <PhoneIcon size={13} />
              <span>اتصل بماونتن ڤيو</span>
            </a>
            <a href={creekWaPreset("inquiry")} aria-label="راسلنا على واتساب">
              <WhatsAppIcon size={13} />
              <span>راسلنا على واتساب</span>
            </a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="cv-header">
        <div className="wrap">
          <div className="brand">
            <div className="brand-mark brand-mark--mv">
              <Image
                src="/Mountain View Logo.webp"
                alt="Mountain View — ماونتن ڤيو"
                width={140}
                height={36}
                priority
                sizes="150px"
              />
            </div>
            <div className="brand-text">
              <span className="a">MOUNTAIN VIEW</span>
              <span className="b">Creekview</span>
            </div>
          </div>
          <nav className="header-cta">
            <a className="ph" href={CALL_HREF} aria-label="اتصل بنا">
              <PhoneIcon />
              <span className="t">اتصل الآن</span>
            </a>
            <a className="wa" href="#lead" onClick={handleLeadAnchor} aria-label="احجز مكانك على الماستر بلان">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={16} height={16} aria-hidden>
                <path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" />
                <path d="M14 2 v6 h6 M9 13 h6 M9 17 h6" />
              </svg>
              <span className="t">احجز مكانك على الماستر بلان</span>
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('${HERO_IMAGES[heroIdx]}')`,
            opacity: heroFading ? 0 : 1,
          }}
        />
        <div className="hero-grain" />
        <div className="wrap hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <span>إطلاق رسمي · يونيو ٢٠٢٦</span>
          </div>

          <div className="hero-mid">
            <div className="hero-eyebrow">
              <span className="l" />
              <span className="t">Mountain View · New Cairo</span>
            </div>
            <h1 className="hero-title">
              <span className="serif" style={{ fontStyle: "italic" }}>Creekview</span>
              <span className="row2">عيشة على الكريك في القاهرة الجديدة</span>
            </h1>
            <p className="hero-sub">
              كريك ڤيو مجتمع سكني من ماونتن ڤيو في قلب القاهرة الجديدة، مبني حول الكريك والمساحات الخضراء. مناطق متنوعة مثل Heights وValleys وIslands وThe Lighthouse، ووحدات من غرفة وحتى I-villa Garden، و
              <span className="hero-sub-hl">تسليم مبكر خلال ٢٫٥ سنة</span>
              {" "}على خطة ٦ سنوات.
            </p>

            <div className="hero-bottom">
              <div className="hero-ctas">
                <a className="btn btn-call" href={CALL_HREF}>
                  <PhoneIcon size={18} />
                  اتصل بنا الآن
                </a>
                <a className="btn btn-wa" href={creekWaPreset("details")}>
                  <WhatsAppIcon size={18} />
                  كلمنا واتساب
                </a>
                <a className="btn btn-form" href="#lead" onClick={handleLeadAnchor}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
                    <path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" />
                    <path d="M14 2 v6 h6" />
                    <path d="M9 13 h6 M9 17 h6" />
                  </svg>
                  احجز مكانك بشيك
                </a>
              </div>

              <div className="hero-meta">
                <div className="m">
                  <span className="k">Starting from</span>
                  <span className="v">٥٫٤ مليون جنيه</span>
                </div>
                <div className="m">
                  <span className="k">Down Payment</span>
                  <span className="v">حسب خطة السداد</span>
                </div>
                <div className="m">
                  <span className="k">Installments</span>
                  <span className="v">حتى ١٤ سنة</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail switcher */}
        <div className="hero-thumbs">
          {HERO_IMAGES.map((img, i) => (
            <div
              key={img}
              className={`hero-thumb ${i === heroIdx ? "active" : ""}`}
              style={{ backgroundImage: `url('${img}')` }}
              onClick={() => switchHero(i)}
            />
          ))}
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="trust">
        <div className="wrap">
          <div className="cell"><div className="num">+٢٠ سنة</div><div className="lbl">خبرة ماونتن ڤيو منذ ٢٠٠٥</div></div>
          <div className="cell"><div className="num">+١٧ ألف</div><div className="lbl">وحدة مسلّمة</div></div>
          <div className="cell"><div className="num">٢٤ مشروع</div><div className="lbl">في East Cairo والساحل</div></div>
          <div className="cell"><div className="num">٢١٩٤ فدان</div><div className="lbl">مجتمعات East Cairo</div></div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="s highlights">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">المشروع باختصار</div>
              <h2>أربع نقاط<br />تختصر كريك ڤيو</h2>
            </div>
            <p>إطلاق جديد من ماونتن ڤيو على الكريك: مناطق مختلفة داخل المشروع، مساحات خضراء وممرات، وخطط سداد مرنة.</p>
          </div>
          <div className="hl-grid">
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12 L12 3 L21 12 M5 10 V20 H19 V10" /></svg>
              </div>
              <div className="hl-label">التشكيلة</div>
              <div className="hl-value">من غرفة حتى فيلا حديقة</div>
              <div className="hl-note">Millennial · Apartment · Skyvilla · I-villa</div>
            </div>
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10 H22" /><circle cx="17" cy="15" r="1.4" fill="currentColor" /></svg>
              </div>
              <div className="hl-label">خطة السداد</div>
              <div className="hl-value">تقسيط حتى ١٤ سنة</div>
              <div className="hl-note">بداية الأسعار على خطة ٦ سنوات</div>
            </div>
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17 L9 11 L13 14 L21 6" /><path d="M14 6 H21 V13" /></svg>
              </div>
              <div className="hl-label">أسعار البداية</div>
              <div className="hl-value">من ٥٫٤ مليون جنيه</div>
              <div className="hl-note">سعر ١ غرفة Millennial — خطة ٦ سنوات</div>
            </div>
            <div className="hl-cell">
              <div className="hl-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 9 H21 M8 3 V7 M16 3 V7" /></svg>
              </div>
              <div className="hl-label">التسليم</div>
              <div className="hl-value">مبكر — ٢٫٥ سنة</div>
              <div className="hl-note">مع الالتزام بخطة ٦ سنوات</div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL */}
      <section className="s editorial">
        <div className="wrap">
          <div className="ed-grid">
            <div className="ed-img ed-img--map">
              <img src="/projects/creekview-new-cairo/masterplan-aerial.png" alt="Creekview masterplan" />
              <div className="ribbon">Masterplan</div>
            </div>
            <div className="ed-body">
              <div className="eyebrow-ar">ماستر بلان كريك ڤيو</div>
              <h3>مجتمع كامل<br />حول الكريك.</h3>
              <p style={{ color: "var(--cv-stone)", fontSize: 16, maxWidth: 520, lineHeight: 1.75 }}>
                كريك ڤيو متصمم حول فروع مائية وممرات خضراء، عشان أغلب التجربة اليومية تبقى مرتبطة بالمشي، الإطلالات، والخدمات القريبة. الفكرة مش مجرد عمارة منفصلة، لكنها مجتمع متكامل حوالين الماء والطبيعة.
              </p>
              <div className="ed-pillars">
                {[
                  { n: "01", h: "تصميم مستوحى من الكريك", p: "توزيع الوحدات والممرات معمول حول فروع المياه والمساحات المفتوحة لخلق إطلالات أهدى وتجربة يومية ألطف." },
                  { n: "02", h: "مناطق بطابع مختلف", p: "Heights وValleys وIslands يقدموا اختيارات مختلفة بين الإطلالات المرتفعة، الحركة على الممرات، والهدوء حول المياه." },
                  { n: "03", h: "The Lighthouse", p: "منطقة خدمات وتجارية داخل المشروع تضم كافيهات ومحلات وخدمات قريبة من السكان." },
                  { n: "04", h: "خدمات يومية مريحة", p: "إدارة وأمن وصيانة وخدمات منزلية عند الطلب لتسهيل الحياة اليومية داخل المجتمع." },
                ].map((pillar) => (
                  <div className="pillar" key={pillar.n}>
                    <span className="n">{pillar.n}</span>
                    <div>
                      <h4>{pillar.h}</h4>
                      <p>{pillar.p}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEIGHBORHOODS */}
      <section className="s neighborhoods">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">Experiences That Flow Naturally</div>
              <h2>Heights · Valleys<br />Islands · Lighthouse</h2>
            </div>
            <p>أربع مناطق داخل ماستر بلان واحد — كل منطقة لها طابع مختلف، وكلها متصلة بالكريك والممرات الخضراء.</p>
          </div>
          <div className="hood-grid">
            {NEIGHBORHOODS.map((hood) => (
              <div className="hood-card" key={hood.name}>
                <div className="hood-img">
                  <img src={hood.img} alt={hood.name} />
                </div>
                <div className="hood-body">
                  <div className="hood-name">
                    <span className="latin">{hood.name}</span>
                    <span className="ar">{hood.nameAr}</span>
                  </div>
                  <p>{hood.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="s gallery">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar" style={{ color: "var(--cv-gold)" }}>المعرض</div>
              <h2>لقطات من<br />داخل المجتمع.</h2>
            </div>
            <p>صور الإطلاق الرسمية. للتجوّل الكامل والمعاينة على الأرض، رتّب موعدك معنا.</p>
          </div>
          <div className="gal-grid">
            {GALLERY.map((g) => (
              <div className={`cell ${g.cls}`} key={g.src}>
                <img src={g.src} alt={g.label} />
                <div className="cap"><small>{g.label}</small>{g.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UNITS / PRICING */}
      <section className="s units" id="units">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">جدول الأسعار · خطة ٦ سنوات</div>
              <h2>المساحات<br />والأسعار.</h2>
            </div>
            <p>الأرقام التالية تمثّل سعر بداية على خطة سداد ٦ سنوات. يمكن مناقشة خيارات أطول حتى ١٤ سنة وتعديل الجدولة مع مستشار المبيعات.</p>
          </div>

          <div className="units-table">
            {UNITS.map((u, i) => (
              <div className="unit-row" key={i}>
                <div><span className="unit-tag">{u.tag}</span></div>
                <div className="unit-type">{u.type}<small>{u.config}</small></div>
                <div className="unit-meta"><small>المساحة المبنية</small>{u.area}</div>
                <div className="unit-meta"><small>خطة السداد</small>٦ سنوات · حتى ١٤</div>
                <div className="unit-price">{u.priceFull}<small>سعر بداية على خطة ٦ سنوات</small></div>
                <div className="unit-cta">
                  <button
                    type="button"
                    onClick={() => {
                      window.location.href = creekWaMsg(
                        `السلام عليكم، مهتم بـ ${u.tag} ${u.type} في كريك ڤيو`,
                      );
                    }}
                  >
                    <WhatsAppIcon size={13} />
                    السعر النهائي
                  </button>
                  <button className="primary" type="button" onClick={openLeadPopup}>
                    احجز
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="units-foot">
            <p>* الجدول والأسعار وفقاً لمادة الإطلاق الرسمية من ماونتن ڤيو. التوفر والمراحل تتغيّر — يُفضل تثبيت العرض مع المبيعات.</p>
            <a
              className="btn btn-wa"
              href={creekWaPreset("full_table")}
              style={{ background: "var(--cv-ink)", color: "var(--cv-cream)" }}
            >
              <WhatsAppIcon size={16} />
              استلام الجدول كامل عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* LIFESTYLE QUOTE */}
      <section className="lifestyle">
        <div className="bg" style={{ backgroundImage: "url('/projects/creekview-new-cairo/gallery-creekfront-2.webp')" }} />
        <div className="wrap">
          <div className="quote-mark">&ldquo;</div>
          <h2>يومك ماشي مع الكريك.</h2>
          <p>في كريك ڤيو، الحياة اليومية متقسمة بين ممشى على المياه، جلسات بإطلالة، أنشطة خفيفة، ومساحات هادئة للاسترخاء. مشروع معمول عشان الإطلالة والخدمات تبقى جزء من يومك.</p>
          <a className="btn btn-call" href="#lead" onClick={handleLeadAnchor}>احجز معاينة على الموقع</a>
        </div>
      </section>

      {/* LEAD FORM */}
      <section className="s lead" id="lead">
        <div className="wrap">
          <div className="lead-grid">
            <div className="lead-left">
              <div>
                <div className="eyebrow-ar">سجّل اهتمامك</div>
                <h2>سيب بياناتك،<br />ونبعتلك التفاصيل.</h2>
                <p>هنبعتلك جدول الأسعار، الماستر بلان، وخيارات السداد المتاحة. التواصل للاستفسار فقط وبدون أي التزام.</p>
              </div>
              <ul className="lead-perks">
                {[
                  "تفاصيل مكتوبة عن المشروع",
                  "جدول أسعار لكل نوع وحدة",
                  "خطط سداد مرنة تتلاءم مع ميزانيتك",
                  "تنسيق معاينة على أرض المشروع",
                ].map((perk) => (
                  <li key={perk}>
                    <span className="check">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width={12} height={12}><path d="M4 12 L10 18 L20 6" /></svg>
                    </span>
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lead-card">
              <CreekLeadForm source="creek-landing" formId="lf" />
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="s location">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">الموقع</div>
              <h2>قلب القاهرة الجديدة<br />وعلى مرمى البصر.</h2>
            </div>
            <p>في قلب New Cairo — على AUC Avenue وSouth 90 St، بسهولة وصول لأهم محاور التجمع والخدمات.</p>
          </div>
          <div className="loc-grid">
            <div className="loc-list">
              {[
                { nm: "MV Hyde Park", dst: "٣ دقائق" },
                { nm: "South 90 Road", dst: "٥ دقائق" },
                { nm: "Golden Square", dst: "١٠ دقائق" },
                { nm: "AUC & Westin Hotel", dst: "قريب" },
                { nm: "AUC Avenue · South 90 St", dst: "وصول مباشر" },
              ].map((loc) => (
                <div className="row" key={loc.nm}>
                  <span className="nm">{loc.nm}</span>
                  <span className="dst">{loc.dst}</span>
                </div>
              ))}
            </div>
            <div className="loc-map" aria-label="Map">
              <img src="/projects/creekview-new-cairo/location-map.webp" alt="Creekview location map" />
              <div className="marker">
                <div className="pulse" />
                <div className="pin" />
                <div className="pin-lbl">Creekview</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="s faq">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">أسئلة شائعة</div>
              <h2>إجابات سريعة<br />قبل المكالمة.</h2>
            </div>
            <p>لو في سؤال مش لاقي إجابته هنا، ابعتلنا واتساب وهنرد عليك خلال دقائق.</p>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={i}>
                <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <span className="ind">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}><path d="M12 5 V19 M5 12 H19" /></svg>
                  </span>
                </button>
                <div className="faq-a" style={{ maxHeight: openFaq === i ? 300 : 0 }}>
                  <div className="faq-a-inner">{f.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final" id="final">
        <div className="wrap">
          <div className="final-body">
            <h2><small>تحب تكلمنا إزاي؟</small>اختار الطريقة المناسبة<br />ونرد عليك بالتفاصيل.</h2>
          </div>
          <div className="final-actions">
            <a className="final-card" href={CALL_HREF}>
              <div className="ic"><PhoneIcon size={22} /></div>
              <div className="tx"><div className="a">CALL · مكالمة مباشرة</div><div className="b">اتصل بماونتن ڤيو</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
            <a className="final-card" href={creekWaPreset("inquiry")}>
              <div className="ic" style={{ background: "#25D366" }}><WhatsAppIcon size={22} /></div>
              <div className="tx"><div className="a">WHATSAPP · أسرع رد</div><div className="b">راسلنا على واتساب</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
            <a className="final-card" href="#lead" onClick={handleLeadAnchor}>
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" /><path d="M14 2 v6 h6" /></svg>
              </div>
              <div className="tx"><div className="a">FORM · استمارة سريعة</div><div className="b">٣٠ ثانية فقط</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
          </div>
        </div>
        <div className="deco-line" />
      </section>

      {/* FOOTER */}
      <footer className="cv-footer">
        <div className="wrap">
          <div>© ٢٠٢٦ ماونتن ڤيو · كريك ڤيو نيو كايرو</div>
          <div className="legal">الأسعار والمساحات استرشادية وقد تتغيّر — العرض الرسمي يُعتمد من المطوّر.</div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a className="float-wa" href={creekWaPreset("inquiry")} aria-label="WhatsApp">
        <WhatsAppIcon size={30} />
        <span className="tip">مستشار المبيعات متاح الآن</span>
      </a>

      {/* MOBILE STICKY CTA */}
      <nav className="sticky-mobile" aria-label="Mobile CTA">
        <div className="row">
          <a className="call" href={CALL_HREF}>
            <PhoneIcon size={20} />
            اتصل بنا
          </a>
          <a className="wa" href={creekWaPreset("inquiry")}>
            <WhatsAppIcon size={20} />
            واتساب
          </a>
          <a href="#lead" onClick={handleLeadAnchor}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={20} height={20}><path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" /><path d="M14 2 v6 h6" /></svg>
            استمارة
          </a>
        </div>
      </nav>

      <CreekLeadPopup open={popupOpen} onClose={closeLeadPopup} />
    </div>
  );
}
