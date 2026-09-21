import type { MetadataRoute } from "next";

function siteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  if (configured) return configured;
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (productionHost) return `https://${productionHost}`.replace(/\/+$/, "");
  return "https://smilecare.ae";
}

export default function robots(): MetadataRoute.Robots {
  const site = siteUrl();
  const preview =
    process.env.VERCEL_ENV === "preview" ||
    (!process.env.NEXT_PUBLIC_SITE_URL && new URL(site).hostname.endsWith(".vercel.app"));

  return {
    rules: preview
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/" },
    sitemap: preview ? undefined : `${site}/sitemap.xml`,
    host: preview ? undefined : site,
  };
}