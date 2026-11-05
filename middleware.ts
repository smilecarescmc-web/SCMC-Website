import { NextRequest, NextResponse } from "next/server";

const verifiedLegacyRedirects: Record<string, string> = {
  "/precise-skin-analysis-5-essential-steps": "/en/blog/precise-skin-analysis-5-essential-steps",
  "/portfolio/dr-nael-adel-ishnineh": "/en/doctors/dr-nael-adel",
  "/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025": "/en/blog/what-is-the-best-dental-clinic-in-ras-al-khaimah-for-2025",
  "/how-to-treat-acne-5-proven-steps": "/en/blog/how-to-treat-acne-5-proven-steps",
  "/tooth-sensitivity-common-causes-when-to-worry-effective-treatment-and-prevention": "/en/blog/tooth-sensitivity-common-causes-when-to-worry-effective-treatment-and-prevention",
  "/gum-disease-treatment": "/en/blog/gum-disease-treatment",
  "/digital-smile-design-5-stages-that-guarantee-accurate-results-before-starting-treatment": "/en/blog/digital-smile-design-5-stages-that-guarantee-accurate-results-before-starting-treatment",
  "/ar/أهمية-تحليل-البشرة-قبل-أي-روتين-جمالي": "/ar/blog/precise-skin-analysis-5-essential-steps",
  "/how-to-manage-oily-skin-and-large-pores": "/en/blog/how-to-manage-oily-skin-and-large-pores",
  "/dermatologist-ras-al-khaimah": "/en/services/dermatology",
  "/ar/services/facial-treatments-ras-al-khaimah": "/ar/services/facials",
  "/ar/dental-clinic": "/ar/services/dental",
  "/ar/dermatologist-ras-al-khaimah": "/ar/services/dermatology",
  "/ar/portfolio/د-سارة-عودة": "/ar/doctors/dr-sara-odeh",
};

function normalizeLegacyPath(pathname: string) {
  let decodedPath = pathname;
  try {
    decodedPath = decodeURIComponent(pathname);
  } catch {
    // Keep the original path if it contains malformed percent-encoding.
  }

  return decodedPath.length > 1 ? decodedPath.replace(/\/+$/, "") : "/";
}

function stripLocale(pathname: string) {
  const clean = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return clean || "/";
}

function localize(pathname: string, locale: "en" | "ar") {
  const clean = stripLocale(pathname);
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function middleware(request: NextRequest) {
  const originalPath = request.nextUrl.pathname;
  const legacyTarget = verifiedLegacyRedirects[normalizeLegacyPath(originalPath)];

  if (legacyTarget) {
    const target = request.nextUrl.clone();
    target.pathname = legacyTarget;
    return NextResponse.redirect(target, 301);
  }

  const locale: "en" | "ar" =
    originalPath === "/ar" || originalPath.startsWith("/ar/") ? "ar" : "en";
  const cleanPath = stripLocale(originalPath);

  if (cleanPath === "/contact-us") {
    const target = request.nextUrl.clone();
    target.pathname = localize("/contact", locale);
    return NextResponse.redirect(target, 308);
  }

  if (cleanPath === "/book-an-appointment") {
    const target = request.nextUrl.clone();
    target.pathname = localize("/contact", locale);
    target.hash = "appointment";
    return NextResponse.redirect(target, 308);
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-scmc-locale", locale);
  requestHeaders.set("x-scmc-path", cleanPath);

  let response: NextResponse;

  if (
    originalPath === "/en" ||
    originalPath.startsWith("/en/") ||
    originalPath === "/ar" ||
    originalPath.startsWith("/ar/")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = cleanPath;
    response = NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  } else {
    response = NextResponse.next({ request: { headers: requestHeaders } });
  }

  if (request.nextUrl.hostname.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|assets|media|scmc-luxe|favicon.ico|robots.txt|sitemap.xml|opengraph-image|icon|apple-icon).*)"],
};
