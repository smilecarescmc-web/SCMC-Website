import type { MetadataRoute } from "next";

const SITE_ORIGIN = "https://smilecare.ae";

export default function robots(): MetadataRoute.Robots {
  const preview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development" ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV !== "production");

  if (preview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: SITE_ORIGIN + "/sitemap.xml",
    host: SITE_ORIGIN,
  };
}
