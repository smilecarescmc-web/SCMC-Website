import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { site } from "./site";

export function localizedMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = ""
): Metadata {
  const normalized = path ? `/${path.replace(/^\//, "")}` : "";
  const localePath = `/${locale}${normalized}`;
  return {
    title: `${title} | ${site.name}`,
    description,
    metadataBase: new URL(site.domain),
    alternates: {
      canonical: localePath,
      languages: {
        en: `/en${normalized}`,
        ar: `/ar${normalized}`,
        "x-default": `/en${normalized}`,
      },
    },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      url: localePath,
      siteName: site.name,
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      type: "website",
    },
  };
}
