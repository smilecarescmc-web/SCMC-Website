"use client";

import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";

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

/**
 * Locale under a Next.js rewrite must not depend on usePathname() during
 * hydration: the server sees the rewritten internal path while the browser
 * sees /en or /ar. useSyncExternalStore lets React hydrate with a stable
 * server snapshot, then switch to the browser-visible locale after hydration.
 */
function subscribeLocale() {
  return () => {};
}

function getBrowserLocale(): ScmcLocale {
  const pathname = window.location.pathname;
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "en";
}

function getServerLocale(): ScmcLocale {
  return "en";
}

export function useScmcLocale() {
  const routerPathname = usePathname() || "/";
  const basePath = stripLocale(routerPathname);

  const locale = useSyncExternalStore(
    subscribeLocale,
    getBrowserLocale,
    getServerLocale
  );

  // Never expose the rewrite-dependent pathname directly to rendered UI.
  // This value is deterministic on the server and during first hydration.
  const pathname = localePath(basePath, locale);

  return {
    locale,
    ar: locale === "ar",
    pathname,
    basePath,
    href: (path: string) => localePath(path, locale),
  };
}