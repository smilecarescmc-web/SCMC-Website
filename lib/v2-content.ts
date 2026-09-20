import recoveredPages from "@/content/v2/recovered-pages.json";
import doctorData from "@/content/v2/doctors.json";
import doctorMedia from "@/content/v2/doctor-media.json";

export type V2Block = {
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "li" | "blockquote" | "dt" | "dd" | "a";
  text: string;
  href?: string;
};

export type V2Image = {
  src: string;
  alt: string;
};

export type V2Fact = {
  value: string;
  label: string;
};

export type V2Page = {
  path: string;
  url: string;
  lang: string;
  title: string;
  description: string;
  canonical: string;
  enAlternate: string;
  arAlternate: string;
  category: string;
  blocks: V2Block[];
  images: V2Image[];
  facts: V2Fact[];
};

export type V2Doctor = {
  slug: string;
  name: string;
  role: string;
  url: string;
  ar_url: string;
  title: string;
  biography_lines: string[];
  html_source: string;
  text_source: string;
};

const pages = recoveredPages as V2Page[];
const doctors = doctorData as V2Doctor[];
const media = doctorMedia as Record<string, string>;

function normalizedPath(pathname: string) {
  let value = pathname || "/";
  try {
    value = decodeURIComponent(value);
  } catch {
    // Keep the route as received when it is already decoded or contains legacy escapes.
  }

  if (!value.startsWith("/")) value = `/${value}`;
  if (value !== "/" && !value.endsWith("/")) value = `${value}/`;
  return value;
}

const pageMap = new Map(pages.map((page) => [normalizedPath(page.path), page]));

export function getV2Page(pathname: string) {
  return pageMap.get(normalizedPath(pathname));
}

export function getV2Pages() {
  return pages;
}

export function getV2Doctors() {
  return doctors.map((doctor) => ({
    ...doctor,
    image: media[doctor.slug] || "",
  }));
}

export function getV2DoctorMedia(slug: string) {
  return media[slug] || "";
}

export function pathToParams(pathname: string) {
  const clean = normalizedPath(pathname).replace(/^\/|\/$/g, "");
  return clean ? clean.split("/") : [];
}

export function alternatePath(page: V2Page) {
  const currentArabic = page.lang.toLowerCase().startsWith("ar");
  const candidate = currentArabic ? page.enAlternate : page.arAlternate;

  if (!candidate) return currentArabic ? "/" : "/ar/";

  try {
    const url = new URL(candidate);
    return url.pathname;
  } catch {
    return candidate;
  }
}

export function pageDirection(page: V2Page) {
  return page.lang.toLowerCase().startsWith("ar") ? "rtl" : "ltr";
}

export const primaryNavigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services/" },
  { label: "Doctors", href: "/doctors/" },
  { label: "About", href: "/about/" },
  { label: "FAQs", href: "/faqs/" },
  { label: "Clinic Gallery", href: "/clinic-gallery/" },
  { label: "Blogs", href: "/blogs/" },
  { label: "Contact Us", href: "/contact-us/" },
] as const;


export const primaryNavigationAr = [
  { label: "الرئيسية", href: "/ar/" },
  { label: "الخدمات", href: "/ar/services/" },
  { label: "الأطباء", href: "/ar/doctors/" },
  { label: "من نحن", href: "/ar/about/" },
  { label: "الأسئلة الشائعة", href: "/ar/faqs/" },
  { label: "معرض العيادة", href: "/ar/clinic-gallery/" },
  { label: "المدونة", href: "/ar/blogs/" },
  { label: "تواصل معنا", href: "/ar/contact-us/" },
] as const;

export const scmcContact = {
  phone: "+97172282080",
  phoneLabel: "+971 7 228 2080",
  whatsapp: "+971543217712",
  whatsappLabel: "+971 54 321 7712",
  email: "info@smilecare.ae",
  license: "MOHAP License No. 5080",
  address:
    "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel, Ras Al Khaimah, UAE",
} as const;

export const serviceIndex = [
  {
    code: "01",
    title: "Dental Care",
    href: "/dental-clinic/",
    image: "/v2/service-dental.jpg",
  },
  {
    code: "02",
    title: "Botox And Fillers",
    href: "/services/facial-treatments-ras-al-khaimah/",
    image: "/v2/service-facial.jpg",
  },
  {
    code: "03",
    title: "Dermatology & Skin",
    href: "/dermatologist-ras-al-khaimah/",
    image: "/v2/service-dermatology.jpg",
  },
  {
    code: "04",
    title: "Facial Treatment",
    href: "/services/aesthetic-clinic-ras-al-khaimah/",
    image: "/v2/service-aesthetic.jpg",
  },
  {
    code: "05",
    title: "Hair Removal",
    href: "/hair-removal/",
    image: "/v2/service-laser.jpg",
  },
  {
    code: "06",
    title: "Laboratory",
    href: "/services/laboratory/",
    image: "/v2/service-laboratory.jpg",
  },
] as const;


export const serviceIndexAr = [
  {
    code: "01",
    title: "رعاية الأسنان",
    href: "/ar/dental-clinic/",
    image: "/v2/service-dental.jpg",
  },
  {
    code: "02",
    title: "البوتوكس والفيلرز",
    href: "/ar/services/facial-treatments-ras-al-khaimah/",
    image: "/v2/service-facial.jpg",
  },
  {
    code: "03",
    title: "الأمراض الجلدية والعناية بالبشرة",
    href: "/ar/dermatologist-ras-al-khaimah/",
    image: "/v2/service-dermatology.jpg",
  },
  {
    code: "04",
    title: "علاجات الوجه",
    href: "/ar/services/aesthetic-clinic-ras-al-khaimah/",
    image: "/v2/service-aesthetic.jpg",
  },
  {
    code: "05",
    title: "إزالة الشعر بالليزر",
    href: "/ar/hair-removal/",
    image: "/v2/service-laser.jpg",
  },
  {
    code: "06",
    title: "المختبر",
    href: "/ar/services/laboratory/",
    image: "/v2/service-laboratory.jpg",
  },
] as const;

export const insuranceAssets = [
  ["NAS INSURANCE", "/v2/insurance/nas.svg"],
  ["ALBUHAIRA INSURANCE", "/v2/insurance/albuhaira.jpg"],
  ["ALMADALLAH INSURANCE", "/v2/insurance/almadallah.jpg"],
  ["INAYAH INSURANCE", "/v2/insurance/inayah.webp"],
  ["METLIFE INSURANCE", "/v2/insurance/metlife.jpg"],
  ["NEURON Insurance", "/v2/insurance/neuron.svg"],
  ["GLOBEMED", "/v2/insurance/globemed.webp"],
  ["ASPiRE", "/v2/insurance/aspire.jpeg"],
  ["NEXTCARE INSURANCE", "/v2/insurance/nextcare.jpg"],
  ["MEDNET INSURANCE", "/v2/insurance/mednet.jpg"],
  ["DAMAN INSURANCE", "/v2/insurance/daman.jpg"],
  ["OMAN INSURANCE (Sukoon)", "/v2/insurance/sukoon.jpg"],
  ["ADNIC INSURANCE", "/v2/insurance/adnic.jpg"],
  ["FMC INSURANCE", "/v2/insurance/fmc.jpg"],
  ["DAMANA ( SAICO )", "/v2/insurance/damana.jpg"],
  ["AAFIYA", "/v2/insurance/aafiya.jpeg"],
] as const;
