import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const site = configured || "https://smilecare.ae";
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.VERCEL_ENV === "development" ||
    (!process.env.VERCEL_ENV && process.env.NODE_ENV !== "production");

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${site}/sitemap.xml`,
      host: site,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/wp-admin/", "/wp-content/", "/wp-includes/", "/wp-json/", "/xmlrpc.php"],
      },
    ],
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
