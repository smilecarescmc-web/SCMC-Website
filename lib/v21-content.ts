import pagesJson from "@/content/v21/fidelity-pages.json";

export type V21Block = {
  index: number;
  tag: string;
  text: string;
  href: string;
};

export type V21Image = {
  src: string;
  sourceSrc: string;
  alt: string;
};

export type V21Page = {
  path: string;
  url: string;
  lang: string;
  title: string;
  description: string;
  canonical: string;
  enAlternate: string;
  arAlternate: string;
  category: string;
  blocks: V21Block[];
  images: V21Image[];
  sourceBlockHash: string;
  sourceHtml: string;
};

const pages = pagesJson as V21Page[];

function normalizePath(pathname: string) {
  let value = pathname || "/";

  try {
    value = decodeURIComponent(value);
  } catch {
  }

  if (!value.startsWith("/")) value = `/${value}`;
  if (value !== "/" && !value.endsWith("/")) value += "/";

  return value;
}

const pageMap = new Map(
  pages.map((page) => [normalizePath(page.path), page] as const)
);

export function getV21Page(pathname: string) {
  return pageMap.get(normalizePath(pathname));
}

export function getV21Pages() {
  return pages;
}

export function pathToParams(pathname: string) {
  const clean = normalizePath(pathname).replace(/^\/|\/$/g, "");
  return clean ? clean.split("/") : [];
}

export function pageDirection(page: V21Page) {
  return page.lang.toLowerCase().startsWith("ar") ? "rtl" : "ltr";
}

export function alternatePath(page: V21Page) {
  const isArabic = pageDirection(page) === "rtl";
  const target = isArabic ? page.enAlternate : page.arAlternate;

  if (!target) return isArabic ? "/" : "/ar/";

  try {
    return new URL(target).pathname;
  } catch {
    return target;
  }
}

export const contact = {
  phone: "+97172282080",
  phoneLabel: "+971 7 228 2080",
  whatsapp: "971543217712",
  whatsappLabel: "+971 54 321 7712",
  email: "info@smilecare.ae",
  address:
    "Hamad Tower, 14B St, Mezzanine Floor, Al Nakheel, Ras Al Khaimah, UAE",
  license: "MOHAP License No. 5080",
} as const;

export const navigation = {
  en: [
    ["Services", "/services/"],
    ["Doctors", "/doctors/"],
    ["About", "/about/"],
    ["FAQs", "/faqs/"],
    ["Blogs", "/blogs/"],
    ["Contact", "/contact-us/"],
  ],
  ar: [
    ["الخدمات", "/ar/services/"],
    ["الأطباء", "/ar/doctors/"],
    ["من نحن", "/ar/about/"],
    ["الأسئلة الشائعة", "/ar/faqs/"],
    ["المدونة", "/ar/blogs/"],
    ["تواصل معنا", "/ar/contact-us/"],
  ],
} as const;