"use client";

import Image from "next/image";
import {
  Phone,
  MessageCircle,
  MapPin,
  Wallet,
  Clock,
  Tag,
  Home,
  Maximize,
  BedDouble,
  Download,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { buildProjectWhatsAppUrl, buildWhatsAppUrl } from "@/lib/utils";
import { telHref } from "@/lib/phone-display";
import { fadeInUp, noMotion } from "@/lib/motion";
import type { ProjectContent, ProjectPricingTable } from "@/types/project";

interface ProjectShowcaseSectionProps {
  project: ProjectContent;
  /** Position index used to alternate background. */
  index?: number;
}

function arabicYears(n: number): string {
  return new Intl.NumberFormat("ar-EG").format(n);
}

export function ProjectShowcaseSection({
  project,
  index = 0,
}: ProjectShowcaseSectionProps) {
  const reduce = useReducedMotion();
  const v = reduce ? noMotion : fadeInUp;

  const isCompact = project.showcaseLayout === "compact";

  const tel = telHref(project.phoneNumber ?? project.whatsappNumber);
  const waInquiry = project.whatsappInquiryMessage
    ? buildWhatsAppUrl(project.whatsappNumber, project.whatsappInquiryMessage)
    : buildProjectWhatsAppUrl(
        { whatsappNumber: project.whatsappNumber, projectName: project.projectName },
        "inquiry"
      );

  const cover = project.cover ?? project.heroImage;
  const isAlt = index % 2 === 1;

  const showUnits =
    !isCompact && project.units && project.units.length > 0;
  const showAmenities =
    !isCompact && project.amenities && project.amenities.length > 0;
  const showGallery =
    !isCompact && project.galleryImages && project.galleryImages.length > 0;

  return (
    <section
      id={project.slug}
      aria-label={project.projectName}
      className={
        isAlt
          ? "relative bg-gradient-to-b from-slate-50/70 via-white to-slate-50/40 border-y border-navy/8"
          : "relative bg-white"
      }
    >
      <div
        className={
          isCompact
            ? "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-11"
            : "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        }
      >
        {isCompact && index === 1 ? (
          <div className="mb-8 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted">
              مشاريع أخرى من ماونتن ڤيو
            </p>
            <div className="mx-auto mt-3 h-px w-full max-w-sm bg-navy/12" />
          </div>
        ) : null}

        {/* Header */}
        <motion.div
          initial={v.initial}
          whileInView={v.animate}
          viewport={v.viewport}
          className="flex flex-wrap items-center gap-2 mb-3"
        >
          <Badge variant="hotLight">
            <span className="flex items-center gap-1.5">
              <MapPin size={14} className="text-sky-700" aria-hidden />
              {project.city ?? project.developer}
            </span>
          </Badge>
          {project.offerBadge ? (
            <Badge variant="hotLight" className="border-amber-500/30">
              <span>{project.offerBadge}</span>
            </Badge>
          ) : null}
        </motion.div>

        <motion.h2
          initial={v.initial}
          whileInView={v.animate}
          viewport={v.viewport}
          className={
            isCompact
              ? "text-xl sm:text-2xl lg:text-3xl font-extrabold text-navy leading-tight"
              : "text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy leading-tight"
          }
        >
          {project.projectName}
        </motion.h2>
        <motion.p
          initial={v.initial}
          whileInView={v.animate}
          viewport={v.viewport}
          className={
            isCompact
              ? "mt-2 text-sm sm:text-base text-muted leading-relaxed max-w-3xl"
              : "mt-2 text-base sm:text-lg text-muted leading-relaxed max-w-3xl"
          }
        >
          {project.headline}
        </motion.p>

        {/* Cover image + KPI strip */}
        <div
          className={
            isCompact
              ? "mt-5 grid lg:grid-cols-5 gap-4 lg:gap-5"
              : "mt-7 grid lg:grid-cols-5 gap-5 lg:gap-7"
          }
        >
          <motion.div
            initial={v.initial}
            whileInView={v.animate}
            viewport={v.viewport}
            className={
              isCompact
                ? "lg:col-span-3 relative aspect-[16/9] max-h-[300px] lg:max-h-[340px] rounded-xl overflow-hidden border border-navy/10 shadow-sm bg-navy/5"
                : "lg:col-span-3 relative aspect-[16/10] rounded-xl overflow-hidden border border-navy/10 shadow-sm bg-navy/5"
            }
          >
            <Image
              src={cover}
              alt={project.projectName}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              quality={82}
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/55 to-transparent p-4">
              <p
                className={`text-white font-medium drop-shadow ${isCompact ? "text-xs sm:text-sm line-clamp-2" : "text-sm"}`}
              >
                {project.location}
              </p>
            </div>
          </motion.div>

          <motion.aside
            initial={v.initial}
            whileInView={v.animate}
            viewport={v.viewport}
            className="lg:col-span-2 grid grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3"
          >
            <KpiCard
              icon={<Tag size={18} aria-hidden />}
              label="السعر يبدأ من"
              value={project.startingPrice}
              compact={isCompact}
            />
            <KpiCard
              icon={<Wallet size={18} aria-hidden />}
              label="مقدم الحجز"
              value={project.downPayment}
              compact={isCompact}
            />
            <KpiCard
              icon={<Clock size={18} aria-hidden />}
              label="التقسيط"
              value={`حتى ${arabicYears(project.installmentYears)} سنوات`}
              compact={isCompact}
            />
          </motion.aside>
        </div>

        {/* Description */}
        {project.subheadline ? (
          <motion.p
            initial={v.initial}
            whileInView={v.animate}
            viewport={v.viewport}
            className={
              isCompact
                ? "mt-5 text-sm sm:text-base text-foreground/85 leading-relaxed max-w-3xl"
                : "mt-7 text-base sm:text-lg text-foreground/85 leading-relaxed max-w-3xl"
            }
          >
            {project.subheadline}
          </motion.p>
        ) : null}

        {project.pricingTable ? (
          <ProjectPricingTableBlock table={project.pricingTable} m={v} />
        ) : null}

        {/* Unit cards */}
        {showUnits ? (
          <div className={isCompact ? "mt-6" : "mt-8"}>
            <p className="section-label mb-3">تشكيلة الوحدات</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.units!.map((u) => (
                <motion.article
                  key={u.type + u.image}
                  initial={v.initial}
                  whileInView={v.animate}
                  viewport={v.viewport}
                  className="group relative overflow-hidden rounded-xl border border-navy/10 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[5/4] overflow-hidden bg-navy/5">
                    <Image
                      src={u.image}
                      alt={u.type}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="px-4 py-3.5">
                    <p className="font-bold text-navy text-base">{u.type}</p>
                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted">
                      {u.rooms ? (
                        <span className="inline-flex items-center gap-1">
                          <BedDouble size={14} aria-hidden /> {u.rooms}
                        </span>
                      ) : null}
                      {u.area ? (
                        <span className="inline-flex items-center gap-1">
                          <Maximize size={14} aria-hidden /> {u.area}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-sm font-semibold text-navy tabular-nums">
                      {u.price}
                    </p>
                    {u.payment ? (
                      <p className="mt-1 text-xs text-muted">{u.payment}</p>
                    ) : null}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ) : null}

        {showGallery ? (
          <div className="mt-10">
            <p className="section-label mb-3">المشروع بالصور</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
              {project.galleryImages!.map((src) => (
                <motion.div
                  key={src}
                  initial={v.initial}
                  whileInView={v.animate}
                  viewport={v.viewport}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden border border-navy/10 bg-navy/5 shadow-sm"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    quality={75}
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Amenities */}
        {showAmenities ? (
          <div className="mt-8">
            <p className="section-label mb-3">الخدمات والمرافق</p>
            <ul className="flex flex-wrap gap-2">
              {project.amenities!.map((a) => (
                <li
                  key={a}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/12 bg-white px-3 py-1.5 text-sm text-navy"
                >
                  <Home size={14} className="text-sky-700" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* CTAs */}
        <motion.div
          initial={v.initial}
          whileInView={v.animate}
          viewport={v.viewport}
          className={isCompact ? "mt-7 flex flex-wrap items-center gap-2" : "mt-9 flex flex-wrap items-center gap-3"}
        >
          <a
            href={tel}
            className="inline-flex"
            aria-label={`اتصل عن ${project.projectName}`}
          >
            <Button size={isCompact ? "md" : "lg"} className="gap-2">
              <Phone size={18} aria-hidden />
              اتصل عن {project.projectName}
            </Button>
          </a>
          <a
            href={waInquiry}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex"
            aria-label={`واتساب عن ${project.projectName}`}
          >
            <Button
              size={isCompact ? "md" : "lg"}
              className="gap-2 bg-[#25D366] text-white hover:bg-[#20bd5a] shadow-md"
            >
              <MessageCircle size={18} aria-hidden />
              واتساب
            </Button>
          </a>
          {project.brochureUrl ? (
            <a
              href={project.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              aria-label={`تحميل بروشور ${project.projectName} (PDF)`}
              className="inline-flex"
            >
              <Button
                variant="mv-outline"
                size={isCompact ? "md" : "lg"}
                className="gap-2 bg-white border-navy/25"
              >
                <Download size={18} aria-hidden />
                حمّل البروشور
              </Button>
            </a>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

function ProjectPricingTableBlock({
  table,
  m,
}: {
  table: ProjectPricingTable;
  m: typeof fadeInUp | typeof noMotion;
}) {
  return (
    <motion.div
      initial={m.initial}
      whileInView={m.animate}
      viewport={m.viewport}
      className="mt-8"
    >
      {table.title ? <p className="section-label mb-3">{table.title}</p> : null}
      <div className="overflow-x-auto rounded-xl border border-navy/15 shadow-sm bg-white">
        <table className="w-full min-w-[640px] text-sm text-right border-collapse">
          <thead>
            <tr className="bg-navy text-white">
              <th className="px-3 py-3 font-semibold border-b border-white/15">
                نوع الوحدة
              </th>
              <th className="px-3 py-3 font-semibold border-b border-white/15">
                التشكيلة
              </th>
              <th className="px-3 py-3 font-semibold border-b border-white/15 whitespace-nowrap">
                مساحة مبنية (م²)
              </th>
              <th className="px-3 py-3 font-semibold border-b border-white/15 whitespace-nowrap">
                سعر بداية (٦ سنوات)
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr
                key={`${r.unitType}-${r.configuration}-${i}`}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50/90"}
              >
                <td className="px-3 py-2.5 text-navy font-semibold align-top border-b border-navy/8">
                  {r.unitType}
                </td>
                <td className="px-3 py-2.5 text-foreground/90 align-top border-b border-navy/8">
                  {r.configuration}
                </td>
                <td className="px-3 py-2.5 tabular-nums text-muted align-top border-b border-navy/8 whitespace-nowrap">
                  {r.builtUpSqm}
                </td>
                <td className="px-3 py-2.5 text-navy font-bold tabular-nums align-top border-b border-navy/8 whitespace-nowrap">
                  {r.price6yr}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-navy px-4 py-3.5 text-white">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white/75 mb-1">
            خطة السداد
          </p>
          <p className="text-sm font-semibold leading-snug">{table.paymentPlanNote}</p>
        </div>
        <div className="rounded-xl bg-navy px-4 py-3.5 text-white">
          <p className="text-[0.65rem] font-bold uppercase tracking-wider text-white/75 mb-1">
            التسليم
          </p>
          <p className="text-sm font-semibold leading-snug">{table.deliveryNote}</p>
        </div>
      </div>
      {table.footnote ? (
        <p className="mt-4 text-xs sm:text-sm text-muted leading-relaxed">
          {table.footnote}
        </p>
      ) : null}
    </motion.div>
  );
}

function KpiCard({
  icon,
  label,
  value,
  compact = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={
        compact
          ? "rounded-lg border border-navy/10 bg-white p-2.5 sm:p-3 lg:p-3.5 text-center lg:text-right"
          : "rounded-lg border border-navy/10 bg-white p-3 lg:p-4 text-center lg:text-right"
      }
    >
      <div className="flex items-center justify-center lg:justify-start gap-1.5 text-sky-700 mb-1">
        {icon}
        <span
          className={
            compact
              ? "text-[0.6rem] lg:text-[0.65rem] uppercase tracking-wide text-muted font-semibold"
              : "text-[0.68rem] lg:text-xs uppercase tracking-wide text-muted font-semibold"
          }
        >
          {label}
        </span>
      </div>
      <p
        className={
          compact
            ? "font-bold text-navy text-xs sm:text-sm leading-tight"
            : "font-bold text-navy text-sm lg:text-base leading-tight"
        }
      >
        {value}
      </p>
    </div>
  );
}
