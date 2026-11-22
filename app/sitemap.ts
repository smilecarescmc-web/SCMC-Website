import type { MetadataRoute } from "next";
import { getDoctors, getBlogPosts, getServices } from "@/sanity/lib/fetchers";

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

type SitemapRoute = {
  path: string;
  lastModified?: Date;
  hasArabic: boolean;
};

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (configured) return configured;
  return BASE_URL;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = siteUrl();
  const [doctors, blogPosts, services] = await Promise.all([
    getDoctors(),
    getBlogPosts(),
    getServices(),
  ]);

  const routes: SitemapRoute[] = [
    ...baseRoutes.map((path) => ({ path, hasArabic: true })),
    ...services.map((service) => ({ path: service.route, hasArabic: true })),
    ...doctors.map((doctor) => ({ path: "/doctors/" + doctor.slug, hasArabic: true })),
    ...blogPosts.map((article) => ({
      path: "/blog/" + article.slug,
      lastModified: article.date ? new Date(article.date) : undefined,
      hasArabic: Boolean(article.contentAr || article.rawHtmlAr),
    })),
  ];

  const now = new Date();

  return routes.flatMap(({ path, lastModified, hasArabic }) => {
    const isRoot = path === "" || path === "/";
    const clean = isRoot ? "" : path;
    const en = `${site}/en${clean}`;
    const ar = `${site}/ar${clean}`;
    const modDate = lastModified && !Number.isNaN(lastModified.getTime()) ? lastModified : now;

    const priority = isRoot ? 1.0 : path.startsWith("/doctors/") || path.startsWith("/services/") ? 0.8 : 0.7;
    const changeFrequency = path.startsWith("/blog/") ? ("monthly" as const) : ("weekly" as const);

    const languages: Record<string, string> = {
      en,
      "x-default": en,
    };
    if (hasArabic) {
      languages.ar = ar;
    }

    const entries: MetadataRoute.Sitemap = [
      {
        url: en,
        lastModified: modDate,
        changeFrequency,
        priority,
        alternates: { languages },
      },
    ];

    if (hasArabic) {
      entries.push({
        url: ar,
        lastModified: modDate,
        changeFrequency,
        priority,
        alternates: { languages },
      });
    }

    return entries;
  });
}
