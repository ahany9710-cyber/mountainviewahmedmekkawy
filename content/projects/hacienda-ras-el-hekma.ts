/**
 * Hacienda Ras El Hekma — Palm Hills North Coast launch.
 * Content sourced from official brochure (May 2026).
 * Prices/terms are pre-launch placeholders — confirm against official developer sheet.
 */

export const WHATSAPP_DEFAULT_MSG =
  "مهتم بـ هاسيندا راس الحكمة،ياريت أعرف التفاصيل والأسعار";

export const HACIENDA = {
  projectName: "هاسيندا راس الحكمة",
  developer: "بالم هيلز",
  slug: "hacienda-ras-el-hekma",

  /** E.164 digits only (01222200310) — used for tel: and WhatsApp */
  WHATSAPP_NUMBER: "201222200310",
  PHONE: "201222200310",

  LEAD_ENDPOINT: "https://formspree.io/f/xkoeneel",

  logos: {
    developerOnDark: "/hacienda/logos/palm-hills-official.png",
    developer: "/hacienda/logos/palm-hills-developer.webp",
    developerAlt: "بالم هيلز للتطوير العقاري",
    brand: "/hacienda/logos/hacienda-brand-flag.jpg",
    brandAlt: "هاسيندا",
  },

  hero: {
    headlineDark: "هاسيندا راس الحكمة",
    headlineAccent: "Unlike Anywhere",
    taglineEn: "The Mediterranean's Most Extraordinary Shoreline",
    valueProp:
      "أول مدينة ساحلية مسوّرة من بالم هيلز على كيلو ٢٣٨ — ١٬٤٠٠ فدان، شاطئ ٤.٨ كم على المتوسط، ٨٦٪ مساحات خضراء ومائية، وتشطيب فُل فينِش.",
    trustLine: "بالم هيلز × ميران هيلز — منذ ١٩٩٧",
    heroImage: "/hacienda/brochure/hero-render.webp",
    heroAlt: "هاسيندا راس الحكمة — render رسمي من البروشور",
  },

  /** TODO: confirm all starting prices against official Palm Hills launch sheet */
  prices: {
    apartment: "من ١١.٥ مليون",
    chalet: "من ٢٤ مليون",
    twin: "من ٤٤ مليون",
    ultraVilla: "من ١٦٥ مليون",
    branded: "اسأل عن الأسعار",
  },

  finishingNote: "فُل فينِش + تكييفات + مطابخ",

  paymentPlan: {
    downPayment: "٥٪ مقدم + ٥٪ بعد ٣ شهور",
    installment: "تقسيط حتى ١٠ سنوات",
  },

  delivery: "الاستلام بعد ٤ سنوات",

  highlights: [
    { icon: "location", label: "كيلو ٢٣٨", value: "راس الحكمة" },
    { icon: "area", label: "١٬٤٠٠", value: "فدان" },
    { icon: "beach", label: "٤.٨ كم", value: "شاطئ" },
    { icon: "green", label: "٨٦٪", value: "خضراء ومائية" },
    { icon: "footprint", label: "١٤٪", value: "footprint" },
    { icon: "hotel", label: "٣", value: "فنادق عالمية" },
  ] as const,

  partnership: {
    title: "بالم هيلز × ميران هيلز",
    description:
      "تعاون بين خبرة بالم هيلز المحلية وتميز Miran Hills الإماراتية في التطوير الفاخر — لإطلاق وجهة ساحلية بمعايير عالمية على شاطئ راس الحكمة.",
    image: "/hacienda/brochure/partnership.webp",
    imageAlt: "شراكة بالم هيلز وميران هيلز",
    developers: [
      {
        id: "palm-hills",
        name: "Palm Hills",
        nameAr: "بالم هيلز",
        logo: "/hacienda/logos/palm-hills-developer.webp",
        country: "مصر · منذ ١٩٩٧",
      },
      {
        id: "miran-hills",
        name: "Miran Hills",
        nameAr: "ميران هيلز",
        logo: null,
        country: "الإمارات",
      },
    ],
  },

  location: {
    title: "الموقع والوصول",
    description:
      "على شاطئ راس الحكمة — اتصال مباشر بطريق الإسكندرية–مطروح الساحلي، وقرب مطار العلمين الدولي. هدوء منتجع حصري مع سهولة الوصول للبحر المتوسط.",
    image: "/hacienda/brochure/location-map.webp",
    imageAlt: "خريطة موقع هاسيندا راس الحكمة والمسافات",
    distances: [
      { km: "110", label: "مطار العلمين" },
      { km: "124", label: "Alamein Airport" },
      { km: "138", label: "سيدي عبد الرحمن" },
      { km: "165", label: "هاسيندا بلو" },
      { km: "238", label: "هاسيندا راس الحكمة" },
    ],
  },

  ecosystem: {
    title: "مدينة تتجاوز الساحل",
    description:
      "راس الحكمة تتحول إلى وجهة متوسطية متكاملة — بنية تحتية وخدمات عالمية تدعم أسلوب حياة ساحلي على مدار العام.",
    image: "/hacienda/brochure/ecosystem.webp",
    imageAlt: "منظومة راس الحكمة المتكاملة",
    items: [
      { icon: "airport", label: "مطار راس الحكمة الدولي" },
      { icon: "marina", label: "مارينا دولية ومحطة سفن سياحية" },
      { icon: "freezone", label: "منطقة خدمات حرة" },
      { icon: "cbd", label: "مركز أعمال مركزي" },
      { icon: "amphitheatre", label: "أمفيتياتر بحري" },
      { icon: "transit", label: "شبكة نقل سريع" },
      { icon: "dining", label: "مطاعم عالمية" },
      { icon: "smart", label: "مدينة ذكية" },
    ],
  },

  masterplan: {
    title: "فلسفة الماستر بلان",
    description:
      "تصميم يتفاعل مع البحر والبر — حيث اللاندسكيب والعمران والمساحات المفتوحة والواجهة البحرية تتكامل في نظام واحد يحافظ على جمال الساحل المتوسط.",
    acres: 1400,
    shorelineKm: 4.8,
    greenWaterPercent: 86,
    footprintPercent: 14,
    image: "/hacienda/brochure/masterplan.webp",
    imageAlt: "ماستر بلان هاسيندا راس الحكمة",
  },

  shoreline: {
    title: "تجربة الشاطئ",
    description:
      "٤.٨ كم من الشاطئ الرملي — مياه صافية، مشغّلين عالميين، مطاعم مميزة، ورياضات مائية في أجواء barefoot luxury على المتوسط.",
    image: "/hacienda/brochure/shoreline.webp",
    imageAlt: "شاطئ هاسيندا راس الحكمة",
  },

  parks: {
    title: "الحدائق واللاندسكيب",
    description:
      "شبكة حدائق وممرات خضراء تربط المجتمع وتؤطر إطلالات البحر — ٨٦٪ مساحات خضراء ومائية تجعل الطبيعة جزءًا أساسيًا من الحياة اليومية.",
    image: "/hacienda/brochure/parks.webp",
    imageAlt: "اللاندسكيب — هاسيندا راس الحكمة",
  },

  hospitality: {
    title: "الضيافة والشراكات العالمية",
    description: "ثلاث علامات فندقية دولية، beach clubs موقّعة، وتجارب fine dining على الواجهة البحرية.",
    hotels: 3,
    features: [
      "٣ علامات فندقية عالمية",
      "International Signature Beach Clubs",
      "World Class Fine Dining",
    ],
    image: "/hacienda/brochure/hospitality.webp",
    imageAlt: "الضيافة — هاسيندا راس الحكمة",
  },

  amenities: {
    title: "المرافق والمجتمع",
    features: [
      "Water Park",
      "Community Hubs",
      "International Dining",
      "Community Parks",
      "The Core — Retail & F&B",
      "Cycling Tracks",
    ],
    image: "/hacienda/brochure/amenities.webp",
    imageAlt: "مرافق المجتمع — هاسيندا راس الحكمة",
  },

  sportsWellness: {
    title: "Sports & Wellness District",
    titleAr: "منطقة الرياضة والعافية",
    anchor: "Palm Hills Sporting Club",
    description:
      "تنس، بادل، مسارات دراجات، رياضات مائية، وحدائق خضراء — نشاط واسترخاء في قلب المنظر المتوسطي.",
    facilities: ["تنس", "بادل", "Cycling Trails", "Waterfront Sports", "Green Parks"],
    image: "/hacienda/brochure/sports.webp",
    imageAlt: "Sports & Wellness District",
  },

  units: [
    {
      id: "ultra_villa",
      type: "Ultraluxury Villa",
      typeAr: "فيلا فائقة الفخامة",
      priceKey: "ultraVilla" as const,
      waPreset: "unit_villa",
      image: "/hacienda/brochure/residential.webp",
      imageAlt: "Ultraluxury Villa — هاسيندا راس الحكمة",
    },
    {
      id: "chalet",
      type: "Chalet",
      typeAr: "شاليه",
      priceKey: "chalet" as const,
      waPreset: "unit_chalet",
      image: "/hacienda/brochure/shoreline.webp",
      imageAlt: "شاليه — هاسيندا راس الحكمة",
    },
    {
      id: "twin",
      type: "Twinhouse",
      typeAr: "توين هاوس",
      priceKey: "twin" as const,
      waPreset: "unit_twin",
      image: "/hacienda/brochure/parks.webp",
      imageAlt: "توين هاوس — هاسيندا راس الحكمة",
    },
    {
      id: "apartment",
      type: "Apartment",
      typeAr: "شقة",
      priceKey: "apartment" as const,
      waPreset: "unit_apartment",
      image: "/hacienda/brochure/amenities.webp",
      imageAlt: "شقة — هاسيندا راس الحكمة",
    },
    {
      id: "branded",
      type: "Branded Residences",
      typeAr: "Branded Residences",
      priceKey: "branded" as const,
      waPreset: "unit_branded",
      image: "/hacienda/brochure/hospitality.webp",
      imageAlt: "Branded Residences — هاسيندا راس الحكمة",
    },
  ] as const,

  gallery: [
    {
      id: "g1",
      label: "هاسيندا راس الحكمة",
      image: "/hacienda/brochure/hero-render.webp",
      imageAlt: "هاسيندا راس الحكمة — render رسمي",
      featured: true,
    },
    {
      id: "g2",
      label: "هاسيندا وايت",
      image: "/hacienda/white/photos/07.webp",
      imageAlt: "هاسيندا وايت",
    },
    {
      id: "g3",
      label: "هاسيندا باي",
      image: "/hacienda/bay/photos/01.webp",
      imageAlt: "هاسيندا باي",
    },
    {
      id: "g4",
      label: "هاسيندا بلو",
      image: "/hacienda/blue/photos/03.webp",
      imageAlt: "هاسيندا بلو",
    },
    {
      id: "g5",
      label: "هاسيندا ريد",
      image: "/hacienda/red/photos/03.webp",
      imageAlt: "هاسيندا ريد",
    },
    {
      id: "g6",
      label: "الماستر بلان",
      image: "/hacienda/brochure/masterplan.webp",
      imageAlt: "ماستر بلان هاسيندا راس الحكمة",
    },
  ] as const,

  sisterProjects: [
    {
      id: "bay",
      nameAr: "هاسيندا باي",
      logo: null,
      photo: "/hacienda/bay/photos/02.webp",
    },
    {
      id: "white",
      nameAr: "هاسيندا وايت",
      logo: "/hacienda/white/logo.jpg",
      photo: "/hacienda/white/photos/01.webp",
    },
    {
      id: "blue",
      nameAr: "هاسيندا بلو",
      logo: "/hacienda/blue/logo.jpg",
      photo: "/hacienda/blue/photos/01.webp",
    },
    {
      id: "red",
      nameAr: "هاسيندا ريد",
      logo: "/hacienda/red/logo-cover.webp",
      photo: "/hacienda/red/photos/02.webp",
    },
  ] as const,

  developerTrust: {
    sqm: "37.8M",
    sqmLabel: "متر مربع",
    projects: "50",
    projectsLabel: "مشروع",
    families: "80K",
    familiesLabel: "أسرة",
    since: "1997",
    sinceLabel: "تأسست",
    image: "/hacienda/brochure/cover.webp",
    imageAlt: "بالم هيلز — Unlike Anywhere",
  },

  salesOffices: [
    {
      area: "أكتوبر",
      address: "Palm Hills October (Palm Central)",
    },
    {
      area: "الإسكندرية",
      address: "30 Patrice Lumumba",
    },
    {
      area: "الزمالك",
      address: "1 El Kamel Mohamed St.",
    },
    {
      area: "التجمع الخامس",
      address: "Namaa Building #75, 1st section, Road 90",
    },
  ] as const,

  formUnitTypes: [
    "شقة",
    "شاليه",
    "توين هاوس",
    "فيلا فائقة الفخامة",
    "Branded Residences",
    "غير محدد",
  ] as const,

  whatsappPresets: {
    default: WHATSAPP_DEFAULT_MSG,
    header: WHATSAPP_DEFAULT_MSG,
    hero: WHATSAPP_DEFAULT_MSG,
    sticky: WHATSAPP_DEFAULT_MSG,
    float: WHATSAPP_DEFAULT_MSG,
    footer: WHATSAPP_DEFAULT_MSG,
    form_followup:
      "مهتم بـ هاسيندا راس الحكمة، لسه بعت استمارة — ياريت التفاصيل والأسعار.",
    unit_apartment:
      "مهتم بـ هاسيندا راس الحكمة — شقة. ياريت أعرف التفاصيل والأسعار.",
    unit_chalet:
      "مهتم بـ هاسيندا راس الحكمة — شاليه. ياريت أعرف التفاصيل والأسعار.",
    unit_twin:
      "مهتم بـ هاسيندا راس الحكمة — توين هاوس. ياريت أعرف التفاصيل والأسعار.",
    unit_villa:
      "مهتم بـ هاسيندا راس الحكمة — فيلا فائقة الفخامة. ياريت أعرف التفاصيل والأسعار.",
    unit_branded:
      "مهتم بـ هاسيندا راس الحكمة — Branded Residences. ياريت أعرف التفاصيل والأسعار.",
  } as const,
} as const;

export type HaciendaWaPreset = keyof typeof HACIENDA.whatsappPresets;
