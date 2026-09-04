import type { Locale } from "./i18n";

export const site = {
  name: "Smile Care Medical Center",
  shortName: "Smile Care",
  domain: "https://smilecare.ae",
  email: "info@smilecare.ae",
  phone: "+97172282080",
  whatsapp: "+971543217712",
  mohap: "5080",
  hours: {
    en: "Every day · 8:00 AM–10:00 PM",
    ar: "يومياً · 8:00 صباحاً–10:00 مساءً",
  },
  location: {
    en: "Ras Al Khaimah, UAE",
    ar: "رأس الخيمة، الإمارات العربية المتحدة",
  },
};

export const nav = {
  en: [
    ["Services", "/services"],
    ["Doctors", "/doctors"],
    ["About", "/about"],
    ["Journal", "/journal"],
    ["Contact", "/contact"],
  ],
  ar: [
    ["الخدمات", "/services"],
    ["الأطباء", "/doctors"],
    ["من نحن", "/about"],
    ["المجلة", "/journal"],
    ["تواصل معنا", "/contact"],
  ],
} satisfies Record<Locale, readonly [string, string][]>;

export const copy = {
  en: {
    eyebrow: "Smile Care · Ras Al Khaimah · Since 2007",
    heroTitle: "Care that feels considered before treatment even begins.",
    heroBody:
      "Smile Care Medical Center brings dentistry, dermatology, aesthetics, laser and laboratory services into one calm, carefully considered patient experience.",
    primaryCta: "Book an appointment",
    secondaryCta: "WhatsApp the team",
    storyTitle: "One dental chair became a medical center built around trust.",
    storyBody:
      "Founded in Ras Al Khaimah in 2007, Smile Care grew from a family dental clinic into a multidisciplinary medical center while keeping the personal character that built its reputation.",
    serviceEyebrow: "Explore care",
    serviceTitle: "Different specialties. One standard of experience.",
    teamEyebrow: "Medical team",
    teamTitle: "Meet the people behind the care.",
    environmentEyebrow: "The environment",
    environmentTitle: "A medical center designed to feel calmer than a clinic.",
    environmentBody:
      "The founders' stated vision was a medical center that feels closer to a healing spa: safe, comfortable and cared for from the first moment inside.",
    closingTitle: "Start with a conversation, not a waiting room.",
    closingBody:
      "Choose a service or message the Smile Care team directly. Appointment requests are confirmed by the center.",
  },
  ar: {
    eyebrow: "سمايل كير · رأس الخيمة · منذ 2007",
    heroTitle: "رعاية تشعر بتفاصيلها قبل أن يبدأ العلاج.",
    heroBody:
      "يجمع مركز سمايل كير الطبي خدمات الأسنان والجلدية والتجميل والليزر والمختبر ضمن تجربة هادئة ومدروسة للمريض.",
    primaryCta: "احجز موعداً",
    secondaryCta: "تواصل عبر واتساب",
    storyTitle: "كرسي أسنان واحد أصبح مركزاً طبياً بُني على الثقة.",
    storyBody:
      "تأسس سمايل كير في رأس الخيمة عام 2007، ونما من عيادة أسنان عائلية إلى مركز طبي متعدد التخصصات مع الحفاظ على الطابع الشخصي الذي بنى سمعته.",
    serviceEyebrow: "اكتشف الرعاية",
    serviceTitle: "تخصصات مختلفة. معيار واحد للتجربة.",
    teamEyebrow: "الفريق الطبي",
    teamTitle: "تعرّف على الأشخاص خلف الرعاية.",
    environmentEyebrow: "المكان",
    environmentTitle: "مركز طبي صُمّم ليمنحك هدوءاً أكبر من أجواء العيادة التقليدية.",
    environmentBody:
      "رؤية المؤسسين المعلنة هي مركز طبي أقرب إلى منتجع علاجي: شعور بالأمان والراحة والاهتمام منذ لحظة الدخول.",
    closingTitle: "ابدأ بمحادثة، لا بغرفة انتظار.",
    closingBody:
      "اختر الخدمة أو تواصل مباشرة مع فريق سمايل كير. يتم تأكيد طلبات المواعيد من المركز.",
  },
} satisfies Record<Locale, Record<string, string>>;
