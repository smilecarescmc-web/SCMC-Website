import type { MetadataRoute } from "next";
import { officialDoctors } from "@/lib/officialDoctors";
import { officialBlogData } from "@/lib/official-blog.generated";
import { services } from "@/lib/scmcFullData";

const BASE_URL = "https://smilecare.ae";

const baseRoutes = [
  "",
  "/services",
  "/doctors",
  "/about",
  "/contact",
  "/blog",
  "/faqs",
  "/clinic-gallery",
  "/events",
  "/privacy-policy",
];

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (configured) return configured;
  return BASE_URL;
}

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

  const now = new Date();

  return paths.flatMap((path) => {
    const isRoot = path === "" || path === "/";
    const clean = isRoot ? "" : path;
    const en = `${site}/en${clean}`;
    const ar = `${site}/ar${clean}`;

    const priority = isRoot ? 1.0 : path.startsWith("/doctors/") || path.startsWith("/services/") ? 0.8 : 0.7;
    const changeFrequency = path.startsWith("/blog/") ? "monthly" : "weekly";

    return [
      {
        url: en,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en,
            ar,
            "x-default": en,
          },
        },
      },
      {
        url: ar,
        lastModified: now,
        changeFrequency,
        priority,
        alternates: {
          languages: {
            en,
            ar,
            "x-default": en,
          },
        },
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
