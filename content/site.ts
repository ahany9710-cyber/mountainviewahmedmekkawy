/**
 * Site-level content — Flair Agency (broker) promoting Mountain View 1.1.
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
  /** Advertising / operating business (Google Ads identity). */
  agency: "Flair Agency",
  agencyAr: "فلير إيجنسي",
  agencyRole: "وكيل تسويق عقاري (بروكر)",
  partnershipNote:
    "شراكة تسويقية مع ماونتن ڤيو — لسنا المطوّر، والعرض الرسمي يُعتمد من المطوّر.",

  developer: "ماونتن ڤيو",
  url: "https://www.mountainview-offers.com",
  whatsappNumber: "201038666566",
  phoneNumber: "201038666566",

  hero: {
    eyebrow: "Flair Agency · عرض Mountain View 1.1",
    headline: "ماونتن ڤيو ١.١ — وحدات جاهزة للتسليم حسب التوفر",
    subheadline:
      "عرض تسويقي من Flair Agency لوحدات في مشروع ماونتن ڤيو ١.١ أمام النائب العام. الأسعار استرشادية وتبدأ من 14.5 مليون — التفاصيل مع مستشارينا.",
    primaryCta: "اتصل بنا الآن",
    secondaryCta: "كلمنا على واتساب",
    image: "/projects/mountain-view-1-1/hero-signature.webp",
  },

  trustFacts: [
    { value: "متشطبة", label: "حسب الوحدة" },
    { value: "Ready", label: "حسب التوفر" },
    { value: "١٢٧", label: "فدان" },
    { value: "أمام", label: "النائب العام" },
  ] satisfies TrustFact[],

  whyPoints: [
    {
      title: "Signature Living",
      description:
        "مشروع من ماونتن ڤيو — مجتمع Signature Living في القاهرة الجديدة.",
    },
    {
      title: "وحدات جاهزة حسب التوفر",
      description:
        "بعض الوحدات Ready to Move ومتشطبة — التوفر الحالي يُؤكد مع المستشار.",
    },
    {
      title: "أنظمة سداد معلنة",
      description:
        "خطط استرشادية: 10% + 5% حتى 8 سنوات · الفيلات 20% + 5% حتى 7 سنوات — العرض الرسمي من المطوّر.",
    },
    {
      title: "Flair Agency",
      description:
        "بروكـر تسويق عقاري بشراكة مع ماونتن ڤيو — نرتّب التفاصيل والمعاينة والعرض.",
    },
  ],

  faqs: [
    {
      question: "أنتم المطوّر؟",
      answer:
        "لا — نحن Flair Agency، وكيل تسويق عقاري (بروكر) بشراكة مع ماونتن ڤيو. المطوّر هو ماونتن ڤيو، والعروض النهائية معتمدة منه.",
    },
    {
      question: "الوحدات جاهزة للتسليم فعلاً؟",
      answer:
        "جزء من الوحدات معلن كـ Ready to Move ومتشطب — التوفر والمراحل تتغيّر ويُؤكد مع المستشار قبل أي التزام.",
    },
    {
      question: "إيه أنظمة السداد المتاحة؟",
      answer:
        "خطط استرشادية معلنة: للوحدات 10% + 5% حتى 8 سنوات، وللفيلات 20% + 5% حتى 7 سنوات. الجدول النهائي في العرض الرسمي من المطوّر.",
    },
    {
      question: "إزاي أحجز؟",
      answer:
        "تواصل مع Flair Agency بالاتصال أو واتساب، نناقش الوحدة والخطة، ونرسل العرض الكتابي المعتمد من المطوّر.",
    },
  ] satisfies SiteFAQ[],
};
