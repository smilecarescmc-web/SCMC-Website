"use client";

import { usePathname } from "next/navigation";

export type ScmcLocale = "en" | "ar";

export function stripLocale(pathname: string) {
  const clean = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return clean || "/";
}

export function localePath(path: string, locale: ScmcLocale) {
  const [baseAndQuery, hash = ""] = path.split("#", 2);
  const [base, query = ""] = baseAndQuery.split("?", 2);
  const clean = stripLocale(base || "/");
  const localized = `/${locale}${clean === "/" ? "" : clean}`;
  return localized + (query ? `?${query}` : "") + (hash ? `#${hash}` : "");
}

export function useScmcLocale() {
  const pathname = usePathname() || "/";
  const locale: ScmcLocale = pathname.startsWith("/ar") ? "ar" : "en";
  return {
    locale,
    ar: locale === "ar",
    pathname,
    basePath: stripLocale(pathname),
    href: (path: string) => localePath(path, locale),
  };
}
