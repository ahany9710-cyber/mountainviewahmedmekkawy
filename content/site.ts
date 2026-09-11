/**
 * Site-level content for Mountain View 1.1 landing.
 */

export interface TrustFact {
  value: string;
  label: string;
}

export interface SiteFAQ {
  question: string;
  answer: string;
}

export const SITE = {
  developer: "ماونتن ڤيو",
  url: "https://www.mountainview-offers.com",
  whatsappNumber: "201038666566",
  phoneNumber: "201038666566",

  hero: {
    eyebrow: "ماونتن ڤيو · Signature Living",
    headline: "ماونتن ڤيو ١.١ — وحدات جاهزة للتسليم",
    subheadline:
      "وحدات متشطبة بالكامل في واحد من أرقى مشروعات ماونتن ڤيو أمام النائب العام. أسعار من 14.5 مليون — أنظمة سداد مميزة.",
    primaryCta: "اتصل بنا الآن",
    secondaryCta: "كلمنا على واتساب",
    image: "/projects/mountain-view-1-1/hero-signature.webp",
  },

  trustFacts: [
    { value: "متشطبة", label: "بالكامل" },
    { value: "Ready", label: "to Move" },
    { value: "١٢٧", label: "فدان" },
    { value: "أمام", label: "النائب العام" },
  ] satisfies TrustFact[],

  whyPoints: [
    {
      title: "Signature Living",
      description:
        "امتداد لإرث ماونتن ڤيو ١ — مجتمع حصري حول الخصوصية والانتماء.",
    },
    {
      title: "استلام فوري",
      description: "وحدات متشطبة بالكامل وجاهزة للسكن بدون انتظار.",
    },
    {
      title: "أنظمة سداد مميزة",
      description: "10% + 5% حتى 8 سنوات · الفيلات 20% + 5% حتى 7 سنوات.",
    },
    {
      title: "فريق مبيعات بيرد دلوقتي",
      description: "اتصل أو ابعت واتساب — هنرتّب لك التفاصيل والعرض.",
    },
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
        "للوحدات: 10% + 5% وتقسيط حتى 8 سنوات. للفيلات: 20% + 5% حتى 7 سنوات.",
    },
    {
      question: "إزاي أحجز؟",
      answer:
        "بتتواصل مع فريق المبيعات بالاتصال أو واتساب، بنناقش الوحدة والخطة المناسبة، وبنبعتلك العرض الكتابي.",
    },
    {
      question: "أقدر أزور الموقع؟",
      answer:
        "أيوه، بنرتّبلك معاينة مع مستشار مبيعات — ابعت واتساب أو سجّل في النموذج.",
    },
  ] satisfies SiteFAQ[],
};
