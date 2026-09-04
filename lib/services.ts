import type { Locale } from "./i18n";

export type Service = {
  slug: string;
  title: Record<Locale, string>;
  short: Record<Locale, string>;
  intro: Record<Locale, string>;
  points: Record<Locale, string[]>;
  image: string;
};

export const services: Service[] = [
  {
    slug: "dental-care",
    title: { en: "Dental Care", ar: "العناية بالأسنان" },
    short: {
      en: "General, restorative, cosmetic and specialist dental care.",
      ar: "رعاية أسنان عامة وترميمية وتجميلية وتخصصية.",
    },
    intro: {
      en: "Smile Care began with dentistry. Today the dental department covers routine care and a broad range of specialist treatments within the same medical center.",
      ar: "بدأت قصة سمايل كير مع طب الأسنان. واليوم يغطي قسم الأسنان الرعاية الروتينية ومجموعة واسعة من العلاجات التخصصية ضمن المركز نفسه.",
    },
    points: {
      en: ["Dental consultations", "Endodontic care", "Periodontal care", "Cosmetic dentistry", "Orthodontics", "Prosthodontics and restorative dentistry"],
      ar: ["استشارات الأسنان", "علاج جذور الأسنان", "رعاية اللثة", "طب الأسنان التجميلي", "تقويم الأسنان", "التركيبات والترميمات السنية"],
    },
    image: "/media/clinic/DSC08057.webp",
  },
  {
    slug: "dermatology-skin",
    title: { en: "Dermatology & Skin", ar: "الجلدية والعناية بالبشرة" },
    short: {
      en: "Skin-focused medical consultations and dermatology care.",
      ar: "استشارات جلدية ورعاية طبية تركز على صحة البشرة.",
    },
    intro: {
      en: "The dermatology service supports patients with common and ongoing skin concerns, with assessment and treatment planning led by the medical team.",
      ar: "يقدم قسم الجلدية تقييماً ومتابعة لمشكلات البشرة الشائعة والمستمرة، مع خطة علاج يحددها الفريق الطبي بعد الاستشارة.",
    },
    points: {
      en: ["Skin consultations", "Chronic skin-condition care", "Hair and scalp concerns", "Assessment of skin lesions", "Skin-health guidance"],
      ar: ["استشارات البشرة", "متابعة الحالات الجلدية المزمنة", "مشكلات الشعر وفروة الرأس", "تقييم الآفات الجلدية", "إرشادات صحة البشرة"],
    },
    image: "/media/clinic/cur-lobby.webp",
  },
  {
    slug: "aesthetics",
    title: { en: "Aesthetics", ar: "التجميل" },
    short: {
      en: "Consultation-led aesthetic treatments, including injectables.",
      ar: "علاجات تجميلية تبدأ بالاستشارة وتشمل الإجراءات الحقنية.",
    },
    intro: {
      en: "Aesthetic treatments are approached through consultation first, so the medical team can confirm suitability, goals and an appropriate treatment plan.",
      ar: "تبدأ العلاجات التجميلية بالاستشارة أولاً، ليحدد الفريق الطبي ملاءمة الإجراء والأهداف وخطة العلاج المناسبة.",
    },
    points: {
      en: ["Aesthetic consultation", "Botox services", "Filler services", "Treatment planning", "Aftercare guidance"],
      ar: ["استشارة تجميلية", "خدمات البوتوكس", "خدمات الفيلر", "تخطيط العلاج", "إرشادات ما بعد الإجراء"],
    },
    image: "/media/clinic/DSC08023.webp",
  },
  {
    slug: "facial-treatment",
    title: { en: "Facial Treatments", ar: "علاجات الوجه" },
    short: {
      en: "Skin-focused facial care within the center's aesthetics offering.",
      ar: "عناية بالوجه والبشرة ضمن خدمات التجميل في المركز.",
    },
    intro: {
      en: "Facial treatments are selected around skin needs and the outcome discussed during consultation, rather than a one-size-fits-all menu.",
      ar: "يتم اختيار علاجات الوجه وفق احتياجات البشرة والنتيجة التي تتم مناقشتها في الاستشارة، بدلاً من اعتماد إجراء واحد للجميع.",
    },
    points: {
      en: ["Skin assessment", "Facial care options", "Treatment selection", "Skin-maintenance guidance"],
      ar: ["تقييم البشرة", "خيارات العناية بالوجه", "اختيار العلاج", "إرشادات المحافظة على البشرة"],
    },
    image: "/media/clinic/DSC08007.webp",
  },
  {
    slug: "laser-hair-removal",
    title: { en: "Laser Hair Removal", ar: "إزالة الشعر بالليزر" },
    short: {
      en: "Laser hair-removal services for women and men.",
      ar: "خدمات إزالة الشعر بالليزر للنساء والرجال.",
    },
    intro: {
      en: "Laser hair-removal appointments are available through Smile Care's aesthetics and skin-care offering, with suitability confirmed before treatment.",
      ar: "تتوفر مواعيد إزالة الشعر بالليزر ضمن خدمات التجميل والعناية بالبشرة، مع التأكد من ملاءمة العلاج قبل البدء.",
    },
    points: {
      en: ["Consultation before treatment", "Women's laser hair removal", "Men's laser hair removal", "Treatment-area planning"],
      ar: ["استشارة قبل العلاج", "إزالة الشعر بالليزر للنساء", "إزالة الشعر بالليزر للرجال", "تحديد مناطق العلاج"],
    },
    image: "/media/clinic/cur-treatment.webp",
  },
  {
    slug: "laboratory",
    title: { en: "Laboratory", ar: "المختبر" },
    short: {
      en: "Laboratory support within Smile Care's multidisciplinary medical center.",
      ar: "خدمات مختبرية ضمن منظومة سمايل كير الطبية متعددة التخصصات.",
    },
    intro: {
      en: "Laboratory services support the center's broader clinical offering so patients can access more of their care in one place.",
      ar: "تدعم خدمات المختبر منظومة المركز السريرية لتسهيل حصول المرضى على مزيد من احتياجاتهم الطبية في مكان واحد.",
    },
    points: {
      en: ["Laboratory services", "Clinical support", "Coordinated care within the center"],
      ar: ["خدمات المختبر", "دعم سريري", "تنسيق الرعاية داخل المركز"],
    },
    image: "/media/clinic/DSC08044.webp",
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
