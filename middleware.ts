import { NextRequest, NextResponse } from "next/server";

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

  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");
  const origin = configuredOrigin || request.nextUrl.origin;
  const canonicalLocale = locale;
  const canonicalPath = localize(cleanPath, canonicalLocale);
  const enPath = localize(cleanPath, "en");
  const arPath = localize(cleanPath, "ar");

  response.headers.set(
    "Link",
    [
      `<${origin}${canonicalPath}>; rel="canonical"`,
      `<${origin}${enPath}>; rel="alternate"; hreflang="en"`,
      `<${origin}${arPath}>; rel="alternate"; hreflang="ar"`,
      `<${origin}${enPath}>; rel="alternate"; hreflang="x-default"`,
    ].join(", ")
  );

  if (request.nextUrl.hostname.endsWith(".vercel.app")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|assets|media|scmc-luxe|favicon.ico|robots.txt|sitemap.xml|opengraph-image|icon|apple-icon).*)"],
};