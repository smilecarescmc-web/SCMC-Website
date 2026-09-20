import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  if (path === "/en" || path.startsWith("/en/")) {
    url.pathname = path.slice(3) || "/";
    return NextResponse.rewrite(url);
  }

  if (path === "/ar" || path.startsWith("/ar/")) {
    url.pathname = path.slice(3) || "/";
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|assets|scmc-luxe|favicon.ico|robots.txt|sitemap.xml).*)"],
};