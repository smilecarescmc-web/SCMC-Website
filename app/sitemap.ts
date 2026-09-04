import type { MetadataRoute } from "next";
import { doctors } from "@/lib/doctors";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/doctors", "/about", "/journal", "/contact"];
  const urls = locales.flatMap((locale) => [
    ...staticPaths.map((path) => ({ url: `${site.domain}/${locale}${path}`, changeFrequency: "monthly" as const, priority: path === "" ? 1 : 0.8 })),
    ...services.map((service) => ({ url: `${site.domain}/${locale}/services/${service.slug}`, changeFrequency: "monthly" as const, priority: 0.75 })),
    ...doctors.map((doctor) => ({ url: `${site.domain}/${locale}/doctors/${doctor.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
  ]);
  return urls;
}
