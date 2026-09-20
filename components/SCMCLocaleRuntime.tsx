"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SCMCLocaleRuntime() {
  const pathname = usePathname() || "/";

  useEffect(() => {
    const ar = pathname === "/ar" || pathname.startsWith("/ar/");
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    document.body.classList.toggle("scmc-is-ar", ar);
  }, [pathname]);

  return null;
}
