import type { MetadataRoute } from "next";
import { officialDoctors } from "@/lib/officialDoctors";
import { officialBlogData } from "@/lib/official-blog.generated";
import { services } from "@/lib/scmcFullData";

const SITE_ORIGIN = "https://smilecare.ae";
const baseRoutes = ["/", "/services", "/doctors", "/about", "/contact", "/blog", "/faqs", "/clinic-gallery", "/events", "/privacy-policy"];

type SitemapRoute = {
  path: string;
  lastModified?: Date;
  hasArabic: boolean;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: SitemapRoute[] = [
    ...baseRoutes.map((path) => ({ path, hasArabic: true })),
    ...services.map((service) => ({ path: service.route, hasArabic: true })),
    ...officialDoctors.map((doctor) => ({ path: "/doctors/" + doctor.slug, hasArabic: true })),
    ...officialBlogData.map((article) => ({
      path: "/blog/" + article.slug,
      lastModified: new Date(article.date),
      hasArabic: Boolean(article.contentAr),
    })),
  ];

  return routes.flatMap(({ path, lastModified, hasArabic }) => {
    const cleanPath = path === "/" ? "" : path;
    const en = SITE_ORIGIN + "/en" + cleanPath;
    const ar = SITE_ORIGIN + "/ar" + cleanPath;
    const languages = {
      en,
      ...(hasArabic ? { ar } : {}),
      "x-default": en,
    };

    return [
      {
        url: en,
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages },
      },
      ...(hasArabic
        ? [{
            url: ar,
            ...(lastModified ? { lastModified } : {}),
            alternates: { languages },
          }]
        : []),
    ];
  });
}
