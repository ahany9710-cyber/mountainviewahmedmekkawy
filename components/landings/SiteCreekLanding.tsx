"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LeadForm } from "@/components/sections/LeadForm";
import { ALL_PROJECTS } from "@/content/projects";
import { SITE } from "@/content/site";
import { trackClick } from "@/lib/analytics";
import { trackMetaContact } from "@/lib/meta-contact";
import type { ProjectContent } from "@/types/project";
import "@/app/projects/creekview-new-cairo/creekview.css";

const CALL_HREF = "/r/creek-call";
const wa = (t: string) => `/r/creek-wa?t=${encodeURIComponent(t)}`;
const waMsg = (msg: string) =>
  `/r/creek-wa?msg=${encodeURIComponent(msg)}`;

const SLUG_SITE = "site";

function arabicYears(n: number): string {
  return new Intl.NumberFormat("ar-EG").format(n);
}

function buildHubHeroImages(projects: ProjectContent[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const p of projects) {
    const img = p.cover ?? p.heroImage;
    if (img && !seen.has(img)) {
      seen.add(img);
      out.push(img);
    }
  }
  if (out.length === 0 && SITE.hero.image) out.push(SITE.hero.image);
  return out;
}

function buildHubGallery(
  projects: ProjectContent[],
): { src: string; label: string; caption: string; cls: string }[] {
  const clsNames = ["g1", "g2", "g3", "g4", "g5", "g6"];
  const cells: { src: string; label: string; caption: string; cls: string }[] =
    [];
  let idx = 0;
  for (const p of projects) {
    const imgs =
      p.galleryImages && p.galleryImages.length > 0
        ? p.galleryImages.slice(0, 2)
        : ([p.cover ?? p.heroImage].filter(Boolean) as string[]);
    for (const src of imgs) {
      cells.push({
        src,
        label: p.projectName.split("—")[0]?.trim() ?? p.projectName,
        caption: p.city ?? "",
        cls: clsNames[idx % 6],
      });
      idx++;
      if (cells.length >= 6) return cells;
    }
  }
  return cells;
}

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

export function SiteCreekLanding() {
  const creek = useMemo(
    () => ALL_PROJECTS.find((p) => p.slug === "creekview-new-cairo"),
    [],
  );
  const heroImages = useMemo(() => buildHubHeroImages(ALL_PROJECTS), []);
  const galleryItems = useMemo(() => {
    const built = buildHubGallery(ALL_PROJECTS);
    if (built.length > 0) return built;
    const clsNames = ["g1", "g2", "g3", "g4", "g5", "g6"];
    return heroImages.slice(0, 6).map((src, i) => ({
      src,
      label: SITE.developer,
      caption: "",
      cls: clsNames[i % 6],
    }));
  }, [heroImages]);
  const hubHighlights = creek?.highlights.slice(0, 4) ?? [];

  const [heroIdx, setHeroIdx] = useState(0);
  const [heroFading, setHeroFading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const switchHero = useCallback((i: number) => {
    setHeroFading(true);
    setTimeout(() => {
      setHeroIdx(i);
      setHeroFading(false);
    }, 350);
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(() => {
      switchHero((heroIdx + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroIdx, heroImages.length, switchHero]);

  const trackPhone = () => {
    trackClick(SLUG_SITE, "header_phone");
    trackMetaContact(SLUG_SITE, "phone_header");
  };
  const trackWa = () => {
    trackClick(SLUG_SITE, "header_whatsapp");
    trackMetaContact(SLUG_SITE, "whatsapp_header");
  };

  const whyPillars = SITE.whyPoints.slice(0, 4);

  return (
    <div className="cv-page cv-page--hub">
      <div className="utility">
        <div className="wrap">
          <div className="utility-left">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <span className="utility-dot" />
              مستشار المبيعات متاح الآن للرد
            </span>
            <span>·</span>
            <span>كريك ڤيو، أليڤا، جراند فاليز</span>
          </div>
          <div className="utility-right">
            <a
              href={CALL_HREF}
              aria-label="اتصل بماونتن ڤيو"
              onClick={trackPhone}
            >
              <PhoneIcon size={13} />
              <span>اتصل بماونتن ڤيو</span>
            </a>
            <a
              href={wa("hub_inquiry")}
              aria-label="راسلنا على واتساب"
              onClick={trackWa}
            >
              <WhatsAppIcon size={13} />
              <span>راسلنا على واتساب</span>
            </a>
          </div>
        </div>
      </div>

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
              <span className="b">مشاريع مختارة</span>
            </div>
          </div>
          <nav className="header-cta">
            <a className="ph" href={CALL_HREF} aria-label="اتصل بنا" onClick={trackPhone}>
              <PhoneIcon />
              <span className="t">{SITE.hero.primaryCta}</span>
            </a>
            <a className="wa" href={wa("hub_inquiry")} aria-label="واتساب" onClick={trackWa}>
              <WhatsAppIcon />
              <span className="t">{SITE.hero.secondaryCta}</span>
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage: `url('${heroImages[heroIdx]}')`,
            opacity: heroFading ? 0 : 1,
          }}
        />
        <div className="hero-grain" />
        <div className="wrap hero-inner">
          <div className="hero-badge">
            <span className="dot" />
            <span>{SITE.hero.eyebrow}</span>
          </div>

          <div className="hero-mid">
            <div className="hero-eyebrow">
              <span className="l" />
              <span className="t">Mountain View · Egypt</span>
            </div>
            <h1 className="hero-title">
              <span className="serif" style={{ fontStyle: "italic" }}>
                {SITE.hero.headline.split("—")[0]?.trim() ?? SITE.hero.headline}
              </span>
              <span className="row2">
                {SITE.hero.headline.includes("—")
                  ? SITE.hero.headline.split("—").slice(1).join("—").trim()
                  : SITE.hero.subheadline.slice(0, 80)}
              </span>
            </h1>
            <p className="hero-sub">{SITE.hero.subheadline}</p>

            <div className="hero-bottom">
              <div className="hero-ctas">
                <a className="btn btn-call" href={CALL_HREF} onClick={trackPhone}>
                  <PhoneIcon size={18} />
                  {SITE.hero.primaryCta}
                </a>
                <a className="btn btn-wa" href={wa("hub_hero")} onClick={trackWa}>
                  <WhatsAppIcon size={18} />
                  {SITE.hero.secondaryCta}
                </a>
                <a className="btn btn-form" href="#lead">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={18} height={18}>
                    <path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" />
                    <path d="M14 2 v6 h6" />
                    <path d="M9 13 h6 M9 17 h6" />
                  </svg>
                  احجز مكانك بشيك
                </a>
              </div>

              {creek ? (
                <div className="hero-meta">
                  <div className="m">
                    <span className="k">كريك ڤيو · يبدأ من</span>
                    <span className="v">{creek.startingPrice}</span>
                  </div>
                  <div className="m">
                    <span className="k">مقدم الحجز</span>
                    <span className="v">{creek.downPayment}</span>
                  </div>
                  <div className="m">
                    <span className="k">التقسيط</span>
                    <span className="v">حتى {arabicYears(creek.installmentYears)} سنة</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {heroImages.length > 1 ? (
          <div className="hero-thumbs">
            {heroImages.map((img, i) => (
              <div
                key={img}
                className={`hero-thumb ${i === heroIdx ? "active" : ""}`}
                style={{ backgroundImage: `url('${img}')` }}
                onClick={() => switchHero(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") switchHero(i);
                }}
                aria-label={`صورة ${i + 1}`}
              />
            ))}
          </div>
        ) : null}

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="line" />
        </div>
      </section>

      <section className="trust">
        <div className="wrap">
          {SITE.trustFacts.map((f) => (
            <div className="cell" key={f.label}>
              <div className="num">{f.value}</div>
              <div className="lbl">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="s highlights">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">لماذا تبدأ من هنا</div>
              <h2>
                كريك ڤيو في المقدمة
                <br />
                ومشاريع أخرى للمقارنة
              </h2>
            </div>
            <p>
              الصفحة الرئيسية تركّز على إطلاق كريك ڤيو في القاهرة الجديدة، مع إمكانية استكشاف أليڤا وجراند فاليز في نفس التجربة البصرية.
            </p>
          </div>
          <div className="hl-grid">
            {hubHighlights.map((h) => (
              <div className="hl-cell" key={h.label}>
                <div className="hl-ico">
                  {h.icon === "home" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 12 L12 3 L21 12 M5 10 V20 H19 V10" /></svg>
                  ) : h.icon === "wallet" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="2" y="6" width="20" height="14" rx="2" /><path d="M2 10 H22" /><circle cx="17" cy="15" r="1.4" fill="currentColor" /></svg>
                  ) : h.icon === "chart" ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 17 L9 11 L13 14 L21 6" /><path d="M14 6 H21 V13" /></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="1.5" /><path d="M3 9 H21 M8 3 V7 M16 3 V7" /></svg>
                  )}
                </div>
                <div className="hl-label">{h.label}</div>
                <div className="hl-value">{h.value}</div>
                <div className="hl-note">{creek?.projectName ?? "كريك ڤيو"}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s editorial">
        <div className="wrap">
          <div className="ed-grid">
            <div className="ed-img">
              <img
                src="/projects/creekview-new-cairo/creek-03.jpeg"
                alt="كريك ڤيو"
              />
              <div className="ribbon">Mountain View</div>
            </div>
            <div className="ed-body">
              <div className="eyebrow-ar">لماذا ماونتن ڤيو</div>
              <h3>
                ثلاثة مشاريع
                <br />
                نفس معايير التنفيذ.
              </h3>
              <p style={{ color: "var(--cv-stone)", fontSize: 16, maxWidth: 520, lineHeight: 1.75 }}>
                {SITE.whyPoints[0]?.description ?? SITE.hero.subheadline}
              </p>
              <div className="ed-pillars">
                {whyPillars.map((pillar, i) => (
                  <div className="pillar" key={pillar.title}>
                    <span className="n">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h4>{pillar.title}</h4>
                      <p>{pillar.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="s gallery">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar" style={{ color: "var(--cv-gold)" }}>المعرض</div>
              <h2>
                لقطات من
                <br />
                المشاريع.
              </h2>
            </div>
            <p>صور من مواد الإطلاع — التفاصيل الكاملة داخل صفحة كل مشروع.</p>
          </div>
          <div className="gal-grid">
            {galleryItems.map((g) => (
              <div className={`cell ${g.cls}`} key={`${g.src}-${g.label}`}>
                <img src={g.src} alt={g.label} />
                <div className="cap">
                  <small>{g.label}</small>
                  {g.caption}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="s units" id="compare">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">قارن المشاريع</div>
              <h2>
                أيهم
                <br />
                يناسبك؟
              </h2>
            </div>
            <p>بيانات استرشادية من صفحات المشاريع — للتثبيت الرسمي تواصل مع المبيعات.</p>
          </div>

          <div className="units-table">
            {ALL_PROJECTS.map((p) => {
              const isLaunch = p.slug === "creekview-new-cairo";
              return (
                <div className="unit-row" key={p.slug}>
                  <div>
                    {isLaunch ? (
                      <span className="unit-tag" style={{ background: "var(--cv-gold)", color: "var(--cv-ink)" }}>
                        إطلاق جديد
                      </span>
                    ) : (
                      <span className="unit-tag">{p.developer}</span>
                    )}
                  </div>
                  <div className="unit-type">
                    {p.projectName}
                    <small>{p.city ?? p.location.split(/[—.]/)[0]}</small>
                  </div>
                  <div className="unit-meta">
                    <small>يبدأ من</small>
                    {p.startingPrice}
                  </div>
                  <div className="unit-meta">
                    <small>المقدم</small>
                    {p.downPayment}
                  </div>
                  <div className="unit-price">
                    حتى {arabicYears(p.installmentYears)} سنة
                    <small>{p.propertyTypes.slice(0, 2).join(" · ")}</small>
                  </div>
                  <div className="unit-cta">
                    <a
                      className="btn btn-wa"
                      href={waMsg(
                        `السلام عليكم، مهتم بـ ${p.projectName} وأرغب في التفاصيل.`,
                      )}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        padding: "8px 12px",
                        fontSize: 13,
                        borderRadius: 6,
                        textDecoration: "none",
                        background: "#25D366",
                        color: "#08231a",
                        fontWeight: 600,
                      }}
                    >
                      <WhatsAppIcon size={13} />
                      واتساب
                    </a>
                    <button
                      type="button"
                      className="primary"
                      onClick={() => {
                        if (p.slug === "creekview-new-cairo") {
                          window.location.assign("/projects/creekview-new-cairo");
                        } else {
                          window.location.href = waMsg(
                            `السلام عليكم، أرغب في تفاصيل ومعلومات عن مشروع ${p.projectName}.`,
                          );
                        }
                      }}
                    >
                      {p.slug === "creekview-new-cairo" ? "صفحة كريك ڤيو" : "التفاصيل"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="units-foot">
            <p>* للمقارنة التفصيلية افتح صفحة كل مشروع أو سجّل في الاستمارة.</p>
            <Link className="btn btn-call" href="/projects/creekview-new-cairo" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8 }}>
              جدول أسعار كريك ڤيو الكامل
            </Link>
          </div>
        </div>
      </section>

      <section className="lifestyle">
        <div
          className="bg"
          style={{
            backgroundImage: `url('${creek?.cover ?? "/projects/creekview-new-cairo/creek-04.jpeg"}')`,
          }}
        />
        <div className="wrap">
          <div className="quote-mark">&ldquo;</div>
          <h2>مشروع واحد يستحق التركيز — والباقي للخيار.</h2>
          <p>
            ابدأ بكريك ڤيو للإطلاق الجديد على الواجهة المائية، وقارن بسهولة مع أليڤا وجراند فاليز قبل ما تثبت قرارك.
          </p>
          <a className="btn btn-call" href="#lead">
            سجّل ونتواصل معاك
          </a>
        </div>
      </section>

      <section className="s lead" id="lead">
        <div className="wrap">
          <div className="lead-grid">
            <div className="lead-left">
              <div>
                <div className="eyebrow-ar">سجّل اهتمامك</div>
                <h2>
                  اترك لنا بياناتك،
                  <br />
                  وهنرد في دقايق.
                </h2>
                <p>
                  فريق المبيعات يقدر يوجّهك لكريك ڤيو أو أي مشروع ماونتن ڤيو يناسب ميزانيتك — بدون التزام.
                </p>
              </div>
              <ul className="lead-perks">
                {[
                  "رد سريع من مستشار مبيعات",
                  "كريك ڤيو، أليڤا، جراند فاليز في نفس الطلب",
                  "تنسيق معاينة عند الحاجة",
                  "عرض رسمي من المطوّر عند الاستمرار",
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

            <div className="lead-card" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="hero-ctas" style={{ marginBottom: 0 }}>
                <a className="btn btn-call" href={CALL_HREF} onClick={trackPhone} style={{ flex: 1, justifyContent: "center" }}>
                  <PhoneIcon size={16} />
                  اتصل الآن
                </a>
                <a className="btn btn-wa" href={wa("hub_lead_microbar")} onClick={trackWa} style={{ flex: 1, justifyContent: "center" }}>
                  <WhatsAppIcon size={16} />
                  واتساب
                </a>
              </div>
              <p style={{ color: "var(--cv-stone)", fontSize: 14, textAlign: "center", margin: 0 }}>
                أو املأ البيانات التالية
              </p>
              <LeadForm
                projects={ALL_PROJECTS}
                source="hub"
                submitLabel="ابعت استفساري"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="s location">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">المواقع</div>
              <h2>
                القاهرة الجديدة
                <br />
                والعاصمة والمستقبل سيتي.
              </h2>
            </div>
            <p>مشاريعنا تغطي مناطق مختلفة — الاستشارة توضح الأنسب ل خطتك.</p>
          </div>
          <div className="loc-grid">
            <div className="loc-list">
              {[
                { nm: "كريك ڤيو — القاهرة الجديدة", dst: "واجهة مائية" },
                { nm: "أليڤا — المستقبل سيتي", dst: "مقدم ١٠٠ ألف" },
                { nm: "جراند فاليز — العاصمة الإدارية", dst: "فلل واسعة" },
                { nm: "مطار القاهرة", dst: "≈ ٢٥ دقيقة" },
                { nm: "فريق مبيعات ماونتن ڤيو", dst: "رد فوري" },
              ].map((loc) => (
                <div className="row" key={loc.nm}>
                  <span className="nm">{loc.nm}</span>
                  <span className="dst">{loc.dst}</span>
                </div>
              ))}
            </div>
            <div className="loc-map" aria-label="Map">
              <svg viewBox="0 0 600 450" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="hub-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="600" height="450" fill="url(#hub-grid)" />
                <path d="M 0 220 Q 200 200 600 250" stroke="rgba(184,153,104,.55)" strokeWidth="2" fill="none" />
                <path d="M 0 280 Q 180 240 350 280 T 600 290" stroke="rgba(120,180,210,.4)" strokeWidth="6" fill="none" strokeLinecap="round" />
                <text x="60" y="200" fill="rgba(255,255,255,.4)" fontFamily="Inter" fontSize="11" letterSpacing="2">EGYPT</text>
                <text x="400" y="380" fill="rgba(255,255,255,.4)" fontFamily="Inter" fontSize="11" letterSpacing="2">NAC</text>
              </svg>
              <div className="marker">
                <div className="pulse" />
                <div className="pin" />
                <div className="pin-lbl">MV</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="s faq">
        <div className="wrap">
          <div className="s-head">
            <div>
              <div className="eyebrow-ar">أسئلة شائعة</div>
              <h2>
                إجابات سريعة
                <br />
                قبل المكالمة.
              </h2>
            </div>
            <p>لو محتاج توضيح إضافي، راسلنا على واتساب.</p>
          </div>
          <div className="faq-list">
            {SITE.faqs.map((f, i) => (
              <div className={`faq-item ${openFaq === i ? "open" : ""}`} key={f.question}>
                <button className="faq-q" type="button" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.question}</span>
                  <span className="ind">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={14} height={14}><path d="M12 5 V19 M5 12 H19" /></svg>
                  </span>
                </button>
                <div className="faq-a" style={{ maxHeight: openFaq === i ? 520 : 0 }}>
                  <div className="faq-a-inner">{f.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="final" id="final">
        <div className="wrap">
          <div className="final-body">
            <h2>
              <small>تحب تكلمنا إزاي؟</small>
              اختار طريقتك
              <br />
              وفريق المبيعات هيرد عليك.
            </h2>
          </div>
          <div className="final-actions">
            <a className="final-card" href={CALL_HREF} onClick={trackPhone}>
              <div className="ic"><PhoneIcon size={22} /></div>
              <div className="tx"><div className="a">CALL · مكالمة مباشرة</div><div className="b">اتصل بماونتن ڤيو</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
            <a className="final-card" href={wa("hub_final")} onClick={trackWa}>
              <div className="ic" style={{ background: "#25D366" }}><WhatsAppIcon size={22} /></div>
              <div className="tx"><div className="a">WHATSAPP · أسرع رد</div><div className="b">راسلنا على واتساب</div></div>
              <div className="arr"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={22} height={22}><path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18" /></svg></div>
            </a>
            <a className="final-card" href="#lead">
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

      <footer className="cv-footer">
        <div className="wrap">
          <div>© ٢٠٢٦ {SITE.developer} — كريك ڤيو، أليڤا، جراند فاليز</div>
          <div className="legal">الأسعار والمساحات استرشادية وقد تتغيّر — العرض الرسمي يُعتمد من المطوّر.</div>
        </div>
      </footer>

      <a className="float-wa" href={wa("hub_float")} aria-label="WhatsApp" onClick={trackWa}>
        <WhatsAppIcon size={30} />
        <span className="tip">مستشار المبيعات متاح الآن</span>
      </a>

      <nav className="sticky-mobile" aria-label="Mobile CTA">
        <div className="row">
          <a className="call" href={CALL_HREF} onClick={trackPhone}>
            <PhoneIcon size={20} />
            اتصل بنا
          </a>
          <a className="wa" href={wa("hub_sticky")} onClick={trackWa}>
            <WhatsAppIcon size={20} />
            واتساب
          </a>
          <a href="#lead">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width={20} height={20}><path d="M14 2 H6 a2 2 0 0 0-2 2 v16 a2 2 0 0 0 2 2 h12 a2 2 0 0 0 2-2 V8 z" /><path d="M14 2 v6 h6" /></svg>
            استمارة
          </a>
        </div>
      </nav>
    </div>
  );
}
