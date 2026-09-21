import type { MetadataRoute } from "next";
import { officialDoctors } from "@/lib/officialDoctors";
import { officialBlogData } from "@/lib/official-blog.generated";
import { services } from "@/lib/scmcFullData";

const baseRoutes = ["/", "/services", "/doctors", "/about", "/contact", "/blog", "/faqs", "/clinic-gallery", "/events", "/privacy-policy"];

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "";
  return (configured || vercelProduction || "https://scmc-website-eight.vercel.app").replace(/\/+$/, "");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteUrl();
  const paths = [
    ...baseRoutes,
    ...services.map((service) => service.route),
    ...officialDoctors.map((doctor) => `/doctors/${doctor.slug}`),
    ...officialBlogData.map((article) => `/blog/${article.slug}`),
  ];

  return paths.flatMap((path) => {
    const clean = path === "/" ? "" : path;
    const en = `${site}/en${clean}`;
    const ar = `${site}/ar${clean}`;
    return [
      {
        url: en,
        lastModified: new Date(),
        changeFrequency: path.startsWith("/blog/") ? "monthly" : "weekly",
        priority: path === "/" ? 1 : path.startsWith("/doctors/") || path.startsWith("/services/") ? 0.8 : 0.7,
        alternates: { languages: { en, ar } },
      },
      {
        url: ar,
        lastModified: new Date(),
        changeFrequency: path.startsWith("/blog/") ? "monthly" : "weekly",
        priority: path === "/" ? 1 : path.startsWith("/doctors/") || path.startsWith("/services/") ? 0.8 : 0.7,
        alternates: { languages: { en, ar } },
      },
    ];
  });
}