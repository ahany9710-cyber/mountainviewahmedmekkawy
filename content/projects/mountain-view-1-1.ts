import type { ProjectContent } from "@/types/project";

/**
 * Mountain View 1.1 — Signature Living · New Cairo (أمام النائب العام).
 * Ready-to-move units, fully finished.
 */
export const content: ProjectContent = {
  slug: "mountain-view-1-1",
  projectName: "ماونتن ڤيو ١.١",
  showcaseLayout: "feature",
  developer: "ماونتن ڤيو",
  city: "القاهرة الجديدة",
  location:
    "أمام مبنى النائب العام في التجمع الخامس — قلب القاهرة الجديدة، بسهولة وصول لأهم المحاور والخدمات.",
  headline: "Mountain View 1.1 · Signature Living",
  subheadline:
    "وحدات متشطبة بالكامل وجاهزة للتسليم في واحد من أرقى مشروعات ماونتن ڤيو — امتداد لإرث Mountain View 1.",
  description:
    "ماونتن ڤيو ١.١ يقدّم فرصة استلام فوري داخل مجتمع Signature Living حصري في القاهرة الجديدة. يبني على إرث ماونتن ڤيو ١ بمجتمع مصمم حول الخصوصية والانتماء وتجربة المعيشة المميزة لماونتن ڤيو — على مساحة ١٢٧ فدان وأكثر من ١٧٠٠ وحدة.",
  cover: "/projects/mountain-view-1-1/photo-facades.webp",
  galleryImages: [
    "/projects/mountain-view-1-1/photo-streetscape.webp",
    "/projects/mountain-view-1-1/mv1-aerial-01.webp",
    "/projects/mountain-view-1-1/mv1-villas-02.webp",
    "/projects/mountain-view-1-1/mv1-street-01.webp",
    "/projects/mountain-view-1-1/mv1-park-02.webp",
    "/projects/mountain-view-1-1/mv1-homes-01.webp",
    "/projects/mountain-view-1-1/photo-entrance.webp",
    "/projects/mountain-view-1-1/mv1-landscape.webp",
  ],
  units: [
    {
      type: "Millennial",
      image: "/projects/mountain-view-1-1/mv1-homes-01.webp",
      rooms: "3 غرف",
      area: "140 م²",
      price: "من 14.5 مليون",
      payment: "10% + 5% · حتى 8 سنوات",
    },
    {
      type: "I-Villa Sky Garden",
      image: "/projects/mountain-view-1-1/mv1-homes-02.webp",
      rooms: "3 غرف",
      area: "235–255 م²",
      price: "من 23.5 مليون",
      payment: "10% + 5% · حتى 8 سنوات",
    },
    {
      type: "Town House",
      image: "/projects/mountain-view-1-1/mv1-villas-01.webp",
      rooms: "3 غرف",
      area: "210 م²",
      price: "من 38 مليون",
      payment: "Ready to Move · 20% + 5% حتى 7 سنوات",
    },
    {
      type: "Luxury Villa",
      image: "/projects/mountain-view-1-1/mv1-villas-02.webp",
      rooms: "3–4 غرف",
      area: "255–350 م²",
      price: "من 55 مليون",
      payment: "Ready to Move · 20% + 5% حتى 7 سنوات",
    },
    {
      type: "Crown Palace",
      image: "/projects/mountain-view-1-1/mv1-aerial-02.webp",
      rooms: "4 غرف",
      area: "670 م²",
      price: "من 200 مليون",
      payment: "Limited Edition · Special Finishing Package",
    },
  ],
  pricingTable: {
    title: "الوحدات والأسعار",
    paymentPlanNote: "10% + 5% وتقسيط حتى 8 سنوات · الفيلات 20% + 5% حتى 7 سنوات",
    deliveryNote: "وحدات متشطبة بالكامل · Ready to Move",
    footnote:
      "* الأسعار استرشادية وفق عرض الإطلاق الحالي — التوفر والمراحل تتغيّر. العرض الرسمي يُعتمد من ماونتن ڤيو.",
    rows: [
      {
        unitType: "Millennial",
        configuration: "3 غرف",
        builtUpSqm: "140 م²",
        price6yr: "من 14.5 مليون",
      },
      {
        unitType: "I-Villa Sky Garden",
        configuration: "3 غرف",
        builtUpSqm: "235–255 م²",
        price6yr: "من 23.5 مليون",
      },
      {
        unitType: "Town House",
        configuration: "3 غرف · Ready to Move",
        builtUpSqm: "210 م²",
        price6yr: "من 38 مليون",
      },
      {
        unitType: "Luxury Villa",
        configuration: "3–4 غرف · Ready to Move",
        builtUpSqm: "255–350 م²",
        price6yr: "من 55 مليون",
      },
      {
        unitType: "Crown Palace",
        configuration: "4 غرف · Limited Edition",
        builtUpSqm: "670 م²",
        price6yr: "من 200 مليون",
      },
    ],
  },
  amenities: [
    "Signature Living — مجتمع حصري",
    "وحدات متشطبة بالكامل",
    "جاهزة للتسليم الفوري",
    "١٢٧ فدان في قلب القاهرة الجديدة",
    "أمام مبنى النائب العام",
    "The Park · The Villas",
  ],
  heroImage: "/projects/mountain-view-1-1/hero-signature.webp",
  startingPrice: "من 14.5 مليون جنيه",
  downPayment: "10% + 5% (الوحدات) · 20% + 5% (الفيلات)",
  installmentYears: 8,
  deliveryDate: "Ready to Move — تسليم فوري",
  propertyTypes: [
    "Millennial",
    "I-Villa Sky Garden",
    "Town House",
    "Luxury Villa",
    "Crown Palace",
  ],
  highlights: [
    {
      icon: "home",
      label: "التشطيب",
      value: "متشطبة بالكامل",
    },
    {
      icon: "calendar",
      label: "التسليم",
      value: "جاهزة للتسليم",
    },
    {
      icon: "chart",
      label: "المساحة",
      value: "١٢٧ فدان",
    },
    {
      icon: "wallet",
      label: "الموقع",
      value: "أمام النائب العام",
    },
  ],
  whyPoints: [
    {
      title: "Signature Living",
      description:
        "امتداد لإرث ماونتن ڤيو ١ — مجتمع حصري مصمم حول الخصوصية والانتماء وتجربة المعيشة المميزة.",
    },
    {
      title: "استلام فوري",
      description:
        "وحدات متشطبة بالكامل وجاهزة للسكن — بدون انتظار سنوات التسليم.",
    },
    {
      title: "أنظمة سداد مميزة",
      description:
        "10% + 5% وتقسيط حتى 8 سنوات للوحدات، والفيلات 20% + 5% حتى 7 سنوات.",
    },
    {
      title: "موقع استراتيجي",
      description:
        "أمام مبنى النائب العام في التجمع الخامس — قلب القاهرة الجديدة.",
    },
  ],
  nearbyPlaces: [
    { name: "مبنى النائب العام", distance: "أمام المشروع" },
    { name: "التجمع الخامس", distance: "قلب المنطقة" },
    { name: "محاور القاهرة الجديدة", distance: "وصول مباشر" },
    { name: "Mountain View 1", distance: "امتداد للمجتمع" },
  ],
  faqs: [
    {
      question: "الوحدات جاهزة للتسليم فعلاً؟",
      answer:
        "نعم — جزء كبير من الوحدات Ready to Move ومتشطب بالكامل. التوفر الحالي يتأكد مع مستشار المبيعات.",
    },
    {
      question: "إيه أنظمة السداد المتاحة؟",
      answer:
        "للوحدات: 10% + 5% وتقسيط حتى 8 سنوات. للفيلات: 20% + 5% حتى 7 سنوات. Crown Palace لها خطة خاصة + باقة تشطيب.",
    },
    {
      question: "إيه أنواع الوحدات المتاحة؟",
      answer:
        "Millennial، I-Villa Sky Garden، Town House، Luxury Villa، وCrown Palace (Limited Edition) — بمساحات وأسعار كما في الجدول.",
    },
    {
      question: "فين المشروع بالظبط؟",
      answer:
        "ماونتن ڤيو ١.١ في التجمع الخامس أمام مبنى النائب العام — امتداد لمجتمع ماونتن ڤيو ١ على ١٢٧ فدان.",
    },
  ],
  seoTitle: "ماونتن ڤيو ١.١ | Flair Agency — بروكر بشراكة مع ماونتن ڤيو",
  seoDescription:
    "عرض تسويقي من Flair Agency (بروكر) لوحدات ماونتن ڤيو ١.١. لسنا المطوّر — أسعار استرشادية من 14.5 مليون حسب التوفر. العرض الرسمي من ماونتن ڤيو.",
  ogImage: "/projects/mountain-view-1-1/photo-facades.webp",
  phoneNumber: "201038666566",
  whatsappNumber: "201038666566",
  whatsappInquiryMessage:
    "السلام عليكم، مهتم بماونتن ڤيو ١.١ وأرغب في التفاصيل والأسعار للوحدات الجاهزة للتسليم.",
  ctaText: "سجّل اهتمامك عبر Flair Agency",
  leadFormCtaText: "ابعتلي التفاصيل من Flair Agency",
  offerBadge: "Ready to Move حسب التوفر · عرض Flair Agency",
};
