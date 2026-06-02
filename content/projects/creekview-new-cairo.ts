import type { ProjectContent } from "@/types/project";

/**
 * كريك ڤيو — القاهرة الجديدة (ماونتن ڤيو).
 */
export const content: ProjectContent = {
  slug: "creekview-new-cairo",
  projectName: "كريك ڤيو — القاهرة الجديدة",
  showcaseLayout: "feature",
  developer: "ماونتن ڤيو",
  city: "القاهرة الجديدة",
  location:
    "في قلب القاهرة الجديدة — على AUC Avenue وSouth 90 St، بسهولة وصول لـ MV Hyde Park (٣ دقائق) وSouth 90 Road (٥ دقائق) وGolden Square (١٠ دقائق).",
  headline: "كريك ڤيو — Elevating the Creekfront Experience",
  subheadline:
    "مجتمع سكني من ماونتن ڤيو حول الكريك: Heights · Valleys · Islands · The Lighthouse — أسعار بداية على خطة ٦ سنوات، تقسيط حتى ١٤ سنة، وتسليم مبكر.",
  description:
    "ممرات خضراء وفروع مائية تخلق إحساس بالانفتاح والهدوء. كريك ڤيو مُصمَّم حول الكريك والطبيعة، مع وحدات متنوعة من Millennial وApartment حتى Skyvilla وI-villa Garden.",
  cover: "/projects/creekview-new-cairo/cover.webp",
  galleryImages: [
    "/projects/creekview-new-cairo/gallery-creekfront-2.webp",
    "/projects/creekview-new-cairo/gallery-cliffside.webp",
    "/projects/creekview-new-cairo/gallery-valley-trails.webp",
    "/projects/creekview-new-cairo/gallery-islands-calm.webp",
    "/projects/creekview-new-cairo/gallery-yoga-decks.webp",
    "/projects/creekview-new-cairo/creek-walks.webp",
    "/projects/creekview-new-cairo/heights.webp",
    "/projects/creekview-new-cairo/valleys.webp",
    "/projects/creekview-new-cairo/islands.webp",
    "/projects/creekview-new-cairo/lighthouse.webp",
  ],
  pricingTable: {
    title: "جدول الأسعار — سعر بداية خطة ٦ سنوات",
    paymentPlanNote: "تقسيط مرن حتى ١٤ سنة",
    deliveryNote: "تسليم مبكر خلال ٢٫٥ سنة مع خطة سداد ٦ سنوات",
    footnote:
      "* أول قسط نصف سنوي ويُستحق بعد ٣ أشهر من الجدولة المعتمدة.",
    rows: [
      {
        unitType: "Millennial",
        configuration: "غرفة نوم واحدة",
        builtUpSqm: "٦٥ – ٨٠ م²",
        price6yr: "٥٬٤٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "Garden Millennial",
        configuration: "غرفة نوم واحدة",
        builtUpSqm: "٦٥ م²",
        price6yr: "٦٬٥٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "Millennial",
        configuration: "غرفتان",
        builtUpSqm: "١١٠ – ١٢٥ م²",
        price6yr: "٦٬٩٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "Garden Millennial",
        configuration: "غرفتان",
        builtUpSqm: "١١٠ م²",
        price6yr: "٧٬٥٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "Millennial",
        configuration: "٣ غرف",
        builtUpSqm: "١٤٠ – ١٥٥ م²",
        price6yr: "٨٬٦٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "Garden Millennial",
        configuration: "٣ غرف",
        builtUpSqm: "١٤٠ – ١٥٥ م²",
        price6yr: "٩٬٨٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "Skyvilla",
        configuration: "٣ غرف",
        builtUpSqm: "١٦٠ – ١٦٥ م²",
        price6yr: "١١٬٥٠٠٬٠٠٠ جنيه",
      },
      {
        unitType: "I-villa Garden",
        configuration: "٣ غرف",
        builtUpSqm: "١٨٠ – ٢٠٥ م²",
        price6yr: "١٢٬٩٠٠٬٠٠٠ جنيه",
      },
    ],
  },
  amenities: [
    "Heights · Valleys · Islands · The Lighthouse",
    "ممرات مشاة وركض ودراجات على الكريك",
    "إطلالات مباشرة على الكريك وجلسات بإطلالة",
    "أنشطة مائية خفيفة ومساحات هادئة على الماء",
    "خدمات يومية عند الطلب: أمن، صيانة، وخدمات منزلية",
    "نظام خدمات ذكي ومتكامل",
  ],
  heroImage: "/projects/creekview-new-cairo/hero-creekfront.webp",
  startingPrice: "من ٥٫٤ مليون جنيه (خطة ٦ سنوات)",
  downPayment: "حسب خطة السداد — يُحدّد مع المبيعات",
  installmentYears: 14,
  deliveryDate: "تسليم مبكر ٢٫٥ سنة مع خطة ٦ سنوات",
  propertyTypes: [
    "Millennial",
    "Garden Millennial",
    "Apartment",
    "Skyvilla",
    "I-villa Garden",
  ],
  highlights: [
    {
      icon: "home",
      label: "التشكيلة",
      value: "من غرفة حتى فيلا حديقة",
    },
    {
      icon: "wallet",
      label: "خطة السداد",
      value: "تقسيط حتى ١٤ سنة",
    },
    {
      icon: "chart",
      label: "أسعار البداية",
      value: "مع خطة ٦ سنوات",
    },
    {
      icon: "calendar",
      label: "التسليم",
      value: "تسليم مبكر ٢٫٥ سنة",
    },
  ],
  whyPoints: [
    {
      title: "Elevating the Creekfront Experience",
      description:
        "ممرات وفروع مائية تخلق انفتاحاً وهدوءاً، مع تصميم يستفيد من الإطلالات على الكريك.",
    },
    {
      title: "أربع تجارب — Heights · Valleys · Islands · Lighthouse",
      description:
        "من الإطلالات المرتفعة والجلسات على الكريك، إلى الممرات والجزر الهادئة وThe Lighthouse كقلب تجاري واجتماعي.",
    },
    {
      title: "مرونة في السداد",
      description:
        "خطة بداية ٦ سنوات للأسعار المعروضة، مع إمكانية تقسيط حتى ١٤ سنة — التفاصيل مع مستشار المبيعات.",
    },
    {
      title: "ماونتن ڤيو — خبرة طويلة في المجتمعات السكنية",
      description:
        "منذ ٢٠٠٥، أكثر من ١٧ ألف وحدة مسلّمة و٢٤ مشروعاً — بنفس اهتمام ماونتن ڤيو بالتصميم والتفاصيل في مشروعاتها السابقة.",
    },
  ],
  nearbyPlaces: [
    { name: "MV Hyde Park", distance: "٣ دقائق" },
    { name: "South 90 Road", distance: "٥ دقائق" },
    { name: "Golden Square", distance: "١٠ دقائق" },
    { name: "AUC & Westin Hotel", distance: "قريب" },
    { name: "AUC Avenue · South 90 St", distance: "وصول مباشر" },
  ],
  faqs: [
    {
      question: "الأسعار المعروضة على أي أساس؟",
      answer:
        "الأرقام في الجدول تمثّل سعر بداية على خطة سداد ٦ سنوات. يمكن مناقشة خيارات أطول (حتى ١٤ سنة) مع تعديل الجدولة مع المبيعات.",
    },
    {
      question: "إمتى التسليم المبكر؟",
      answer:
        "حسب مادة الإطلاق: تسليم مبكر خلال ٢٫٥ سنة مع الالتزام بخطة السداد ٦ سنوات — يُثبَّت في العرض الرسمي.",
    },
    {
      question: "إيه أنواع الوحدات المتاحة؟",
      answer:
        "Millennial وGarden Millennial وSkyvilla وI-villa Garden بمساحات وغرف مختلفة كما في الجدول. للتوفر الحالي تواصل مع المبيعات.",
    },
  ],
  seoTitle: "كريك ڤيو القاهرة الجديدة | ماونتن ڤيو — إطلاق على الواجهة المائية",
  seoDescription:
    "كريك ڤيو نيو كايرو من ماونتن ڤيو: وحدات متنوعة، تقسيط حتى ١٤ سنة، وتسليم مبكر. أسعار بداية على خطة ٦ سنوات — تواصل للتفاصيل.",
  ogImage: "/projects/creekview-new-cairo/hero-creekfront.webp",
  phoneNumber: "201038666566",
  whatsappNumber: "201038666566",
  whatsappInquiryMessage:
    "السلام عليكم، مهتم بمشروع كريك ڤيو القاهرة الجديدة من ماونتن ڤيو وأرغب في التفاصيل والأسعار.",
  ctaText: "سجّل اهتمامك بكريك ڤيو",
  leadFormCtaText: "ابعتلي تفاصيل كريك ڤيو",
  offerBadge: "إطلاق جديد — كريك ڤيو",
};
