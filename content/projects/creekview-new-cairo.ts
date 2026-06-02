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
    "مجتمع سكني على الواجهة المائية في القاهرة الجديدة — ممرات مشاة، مساحات خضراء، ووحدات بتشطيبات Millennial وحدائق خاصة وSkyvilla.",
  headline: "إطلاق كريك ڤيو — عيشة هادية على الكريك في القاهرة الجديدة",
  subheadline:
    "أسعار بداية على خطة ٦ سنوات، تقسيط مرن حتى ١٤ سنة، وتسليم مبكر — خطط سداد بتفاصيل توضّحها مع مستشار المبيعات.",
  description:
    "كريك ڤيو يجمع بين architecture ماونتن ڤيو المعروفة، ومساحات مفتوحة على الماء والمناظر، مع تشكيلة وحدات من غرفة وحتى فيلات حديقة.",
  cover: "/projects/creekview-new-cairo/cover.png",
  galleryImages: [
    "/projects/creekview-new-cairo/gallery-01.png",
    "/projects/creekview-new-cairo/gallery-02.png",
    "/projects/creekview-new-cairo/gallery-03.png",
    "/projects/creekview-new-cairo/gallery-04.png",
    "/projects/creekview-new-cairo/gallery-05.png",
    "/projects/creekview-new-cairo/gallery-06.png",
    "/projects/creekview-new-cairo/gallery-07.png",
    "/projects/creekview-new-cairo/gallery-08.png",
    "/projects/creekview-new-cairo/gallery-09.png",
    "/projects/creekview-new-cairo/gallery-10.png",
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
    "واجهة مائية (كريك)",
    "ممرات مشاة ودراجات",
    "مناظر طبيعية وحدائق",
    "إضاءة خارجية وأمن ٢٤/٧",
  ],
  heroImage: "/projects/creekview-new-cairo/cover.png",
  startingPrice: "من ٥٫٤ مليون جنيه (خطة ٦ سنوات)",
  downPayment: "حسب خطة السداد — يُحدّد مع المبيعات",
  installmentYears: 14,
  deliveryDate: "تسليم مبكر ٢٫٥ سنة مع خطة ٦ سنوات",
  propertyTypes: [
    "Millennial",
    "Garden Millennial",
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
      title: "مجتمع على الماء",
      description:
        "تصميم يركّز على الكريك والمشي والمساحات الخضراء — أسلوب حياة أهدى وسط القاهرة الجديدة.",
    },
    {
      title: "مرونة في السداد",
      description:
        "خطة بداية ٦ سنوات للأسعار المعروضة، مع إمكانية تقسيط حتى ١٤ سنة — التفاصيل مع مستشار المبيعات.",
    },
    {
      title: "جودة ماونتن ڤيو",
      description:
        "نفس فلسفة التطوير والتشطيبات المعتادة لمشاريع ماونتن ڤيو في القاهرة الجديدة.",
    },
  ],
  nearbyPlaces: [
    { name: "الحركة الرئيسية بالتجمع", distance: "سهولة وصول" },
    { name: "مراكز تعليم وخدمات", distance: "بالقرب من المشروع" },
    { name: "ماونتن ڤيو — مشاريع أخرى", distance: "نفس مطوّر موثوق" },
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
  ogImage: "/projects/creekview-new-cairo/cover.png",
  phoneNumber: "201223147238",
  whatsappNumber: "201118884994",
  whatsappInquiryMessage:
    "السلام عليكم، مهتم بمشروع كريك ڤيو القاهرة الجديدة من ماونتن ڤيو وأرغب في التفاصيل والأسعار.",
  ctaText: "سجّل اهتمامك بكريك ڤيو",
  leadFormCtaText: "ابعتلي تفاصيل كريك ڤيو",
  offerBadge: "إطلاق جديد — كريك ڤيو",
};
