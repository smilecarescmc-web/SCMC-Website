import { headers } from "next/headers";
import type { Metadata } from "next";
import { officialDoctors } from "@/lib/officialDoctors";

export const SITE_ORIGIN = "https://smilecare.ae";

type Locale = "en" | "ar";
type LocalizedCopy = { titleEn: string; titleAr: string; descriptionEn: string; descriptionAr: string };

const pageCopy: Record<string, LocalizedCopy> = {
  "/": {
    titleEn: "Dental & Medical Center in Ras Al Khaimah | Smile Care",
    titleAr: "مركز سمايل كير الطبي | عيادة أسنان في رأس الخيمة",
    descriptionEn: "Visit Smile Care Medical Center in Ras Al Khaimah for dental, dermatology, aesthetic, laser and laboratory services. MOHAP facility 5080. Request an appointment.",
    descriptionAr: "زوروا مركز سمايل كير الطبي في رأس الخيمة لخدمات الأسنان والجلدية والتجميل والليزر والمختبر. رقم ترخيص وزارة الصحة 5080. اطلبوا موعداً.",
  },
  "/services": {
    titleEn: "Dental, Skin & Aesthetic Services in RAK | Smile Care",
    titleAr: "خدمات الأسنان والجلدية والتجميل في رأس الخيمة | سمايل كير",
    descriptionEn: "Explore dental care, dermatology, facial treatments, laser hair removal, aesthetics and laboratory services at Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "اكتشفوا خدمات الأسنان والجلدية وعلاجات الوجه وإزالة الشعر بالليزر والتجميل والمختبر في مركز سمايل كير الطبي برأس الخيمة.",
  },
  "/services/dental": {
    titleEn: "Dental Clinic in Ras Al Khaimah | Smile Care",
    titleAr: "عيادة أسنان في رأس الخيمة | مركز سمايل كير الطبي",
    descriptionEn: "General, restorative, cosmetic and specialist dental care at Smile Care Medical Center in Ras Al Khaimah. Contact our team to request an appointment.",
    descriptionAr: "رعاية أسنان عامة وترميمية وتجميلية وتخصصية في مركز سمايل كير الطبي برأس الخيمة. تواصلوا مع فريقنا لطلب موعد.",
  },
  "/services/botox-fillers": {
    titleEn: "Botox & Dermal Fillers in RAK | Smile Care",
    titleAr: "البوتوكس والفيلر في رأس الخيمة | مركز سمايل كير",
    descriptionEn: "Consultation-led Botox and dermal filler services at Smile Care Medical Center in Ras Al Khaimah. Contact the clinic to discuss suitability and appointments.",
    descriptionAr: "خدمات البوتوكس والفيلر بإشراف طبي في مركز سمايل كير برأس الخيمة. تواصلوا مع المركز لمناقشة ملاءمة العلاج وطلب موعد.",
  },
  "/services/dermatology": {
    titleEn: "Dermatology Clinic in Ras Al Khaimah | Smile Care",
    titleAr: "عيادة جلدية في رأس الخيمة | مركز سمايل كير الطبي",
    descriptionEn: "Medical dermatology and skin care at Smile Care in Ras Al Khaimah, with assessment and treatment planning for common and ongoing skin concerns.",
    descriptionAr: "رعاية جلدية وطبية للبشرة في مركز سمايل كير برأس الخيمة، مع تقييم وخطة علاج للمشكلات الجلدية الشائعة والمستمرة.",
  },
  "/services/facials": {
    titleEn: "Facial Treatments in Ras Al Khaimah | Smile Care",
    titleAr: "علاجات الوجه في رأس الخيمة | مركز سمايل كير",
    descriptionEn: "Explore facial treatments selected around skin condition and individual needs at Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "تعرّفوا إلى علاجات الوجه التي تُختار بحسب حالة البشرة واحتياجاتها في مركز سمايل كير الطبي برأس الخيمة.",
  },
  "/services/laser-hair-removal": {
    titleEn: "Laser Hair Removal in Ras Al Khaimah | Smile Care",
    titleAr: "إزالة الشعر بالليزر في رأس الخيمة | مركز سمايل كير",
    descriptionEn: "Laser hair-removal consultations and treatment plans for women and men at Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "استشارات وخطط إزالة الشعر بالليزر للنساء والرجال في مركز سمايل كير الطبي برأس الخيمة.",
  },
  "/services/laboratory": {
    titleEn: "Clinical Laboratory in Ras Al Khaimah | Smile Care",
    titleAr: "مختبر طبي في رأس الخيمة | مركز سمايل كير",
    descriptionEn: "On-site clinical laboratory support for routine testing and diagnostic screening at Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "خدمات مختبرية داخل المركز للفحوصات الروتينية والتشخيصية في مركز سمايل كير الطبي برأس الخيمة.",
  },
  "/doctors": {
    titleEn: "Doctors & Specialists in Ras Al Khaimah | Smile Care",
    titleAr: "أطباء واختصاصيو مركز سمايل كير في رأس الخيمة",
    descriptionEn: "Meet the dental, dermatology and aesthetic clinicians at Smile Care Medical Center in Ras Al Khaimah. Explore specialties and request an appointment.",
    descriptionAr: "تعرّفوا إلى أطباء الأسنان والجلدية والتجميل في مركز سمايل كير الطبي برأس الخيمة، واكتشفوا اختصاصاتهم واطلبوا موعداً.",
  },
  "/about": {
    titleEn: "About Smile Care Medical Center | Ras Al Khaimah",
    titleAr: "عن مركز سمايل كير الطبي | رأس الخيمة",
    descriptionEn: "Learn about Smile Care Medical Center, founded in Ras Al Khaimah in 2007, and its multidisciplinary dental, dermatology and aesthetic care.",
    descriptionAr: "تعرّفوا إلى مركز سمايل كير الطبي الذي تأسس في رأس الخيمة عام 2007 ويقدم رعاية متعددة التخصصات في الأسنان والجلدية والتجميل.",
  },
  "/contact": {
    titleEn: "Contact Smile Care Medical Center | Ras Al Khaimah",
    titleAr: "تواصلوا مع مركز سمايل كير الطبي | رأس الخيمة",
    descriptionEn: "Contact Smile Care Medical Center in Al Nakheel, Ras Al Khaimah. Call, message us on WhatsApp or request an appointment online.",
    descriptionAr: "تواصلوا مع مركز سمايل كير الطبي في النخيل، رأس الخيمة. اتصلوا بنا أو راسلونا عبر واتساب أو اطلبوا موعداً عبر الموقع.",
  },
  "/blog": {
    titleEn: "Dental & Skin Care Articles | Smile Care RAK",
    titleAr: "مقالات الأسنان والعناية بالبشرة | سمايل كير رأس الخيمة",
    descriptionEn: "Read dental, dermatology and skin-care articles from Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "اقرؤوا مقالات مركز سمايل كير الطبي في رأس الخيمة عن الأسنان والجلدية والعناية بالبشرة.",
  },
  "/faqs": {
    titleEn: "Patient FAQs | Smile Care Medical Center",
    titleAr: "أسئلة شائعة للمرضى | مركز سمايل كير الطبي",
    descriptionEn: "Find answers to common questions about appointments, services and visits to Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "اعثروا على إجابات للأسئلة الشائعة حول المواعيد والخدمات وزيارة مركز سمايل كير الطبي في رأس الخيمة.",
  },
  "/clinic-gallery": {
    titleEn: "Smile Care Clinic Gallery | Ras Al Khaimah",
    titleAr: "صور مركز سمايل كير الطبي | رأس الخيمة",
    descriptionEn: "View the facilities and spaces at Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "شاهدوا مرافق ومساحات مركز سمايل كير الطبي في رأس الخيمة.",
  },
  "/events": {
    titleEn: "Clinic News & Events | Smile Care Medical Center",
    titleAr: "أخبار وفعاليات مركز سمايل كير الطبي",
    descriptionEn: "See selected milestones and community events from Smile Care Medical Center in Ras Al Khaimah.",
    descriptionAr: "تابعوا أبرز محطات وفعاليات مركز سمايل كير الطبي في رأس الخيمة.",
  },
  "/privacy-policy": {
    titleEn: "Privacy Policy | Smile Care Medical Center",
    titleAr: "سياسة الخصوصية | مركز سمايل كير الطبي",
    descriptionEn: "Read how Smile Care Medical Center handles information submitted through its website and patient enquiry channels.",
    descriptionAr: "اقرؤوا كيف يتعامل مركز سمايل كير الطبي مع المعلومات المرسلة عبر الموقع وقنوات استفسارات المرضى.",
  },
};

function normalizePath(path: string) {
  const withoutLocale = path.replace(/^\/(en|ar)(?=\/|$)/, "");
  const clean = withoutLocale.replace(/\/{2,}/g, "/").replace(/\/$/, "");
  return clean || "/";
}

function truncate(value: string, max = 158) {
  const clean = value.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return clean.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

function getCopy(path: string, locale: Locale): { title: string; description: string } {
  const known = pageCopy[path];
  if (known) {
    return locale === "ar"
      ? { title: known.titleAr, description: known.descriptionAr }
      : { title: known.titleEn, description: known.descriptionEn };
  }

  const doctorSlug = path.match(/^\/doctors\/([^/]+)$/)?.[1];
  const doctor = doctorSlug ? officialDoctors.find((item) => item.slug === doctorSlug) : undefined;
  if (doctor) {
    const name = locale === "ar" ? doctor.nameAr : doctor.nameEn;
    const specialty = locale === "ar" ? doctor.specialtyAr : doctor.specialtyEn.split("·")[0].trim();
    const note = locale === "ar" ? doctor.noteAr : doctor.noteEn;
    return {
      title: locale === "ar"
        ? name + " | " + specialty + " | سمايل كير"
        : name + " | " + specialty + " | Smile Care",
      description: truncate(locale === "ar"
        ? note + " في مركز سمايل كير الطبي برأس الخيمة."
        : note + " At Smile Care Medical Center in Ras Al Khaimah."),
    };
  }

  return {
    title: pageCopy["/"].titleEn,
    description: pageCopy["/"].descriptionEn,
  };
}

export async function getScmcMetadata(overrides: {
  title?: string;
  description?: string;
  canonicalLocale?: Locale;
  includeArabicAlternate?: boolean;
  index?: boolean;
} = {}): Promise<Metadata> {
  const requestHeaders = await headers();
  const locale: Locale = requestHeaders.get("x-scmc-locale") === "ar" ? "ar" : "en";
  const path = normalizePath(requestHeaders.get("x-scmc-path") || "/");
  const copy = getCopy(path, locale);
  const title = overrides.title || copy.title;
  const description = overrides.description || copy.description;
  const canonicalLocale = overrides.canonicalLocale || locale;
  const localizedPath = (language: Locale) => SITE_ORIGIN + "/" + language + (path === "/" ? "" : path);
  const canonical = localizedPath(canonicalLocale);
  const includeArabic = overrides.includeArabicAlternate !== false;

  const preview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development" ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV !== "production");
  const index = !preview && overrides.index !== false;

  return {
    metadataBase: new URL(SITE_ORIGIN),
    title,
    description,
    alternates: {
      canonical,
      languages: {
        en: localizedPath("en"),
        ...(includeArabic ? { ar: localizedPath("ar") } : {}),
        "x-default": localizedPath("en"),
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      url: canonical,
      siteName: "Smile Care Medical Center",
      title,
      description,
      images: [{
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: locale === "ar" ? "مركز سمايل كير الطبي — رأس الخيمة" : "Smile Care Medical Center — Ras Al Khaimah",
      }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
    robots: {
      index,
      follow: !preview,
      googleBot: preview || !index
        ? { index: false, follow: !preview }
        : { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
  };
}
