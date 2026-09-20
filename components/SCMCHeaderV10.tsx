"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

function stripLocale(pathname: string) {
  const clean = pathname.replace(/^\/(en|ar)(?=\/|$)/, "");
  return clean || "/";
}

function withLocale(pathname: string, locale: "en" | "ar") {
  const clean = stripLocale(pathname);
  return `/${locale}${clean === "/" ? "" : clean}`;
}

export function SCMCHeaderV10() {
  const pathname = usePathname() || "/";
  const locale: "en" | "ar" = pathname.startsWith("/ar") ? "ar" : "en";
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const base = useMemo(() => stripLocale(pathname), [pathname]);

  useEffect(() => {
    const saved = localStorage.getItem("scmc-theme");
    const initial =
      saved === "dark" || saved === "light"
        ? saved
        : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("scmc-theme", next);
    document.documentElement.dataset.theme = next;
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  const labels =
    locale === "ar"
      ? {
          home: "الرئيسية",
          services: "الخدمات",
          doctors: "الأطباء",
          about: "من نحن",
          contact: "تواصل معنا",
          book: "احجز موعداً",
          menu: "التنقل الرئيسي",
          theme: theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن",
        }
      : {
          home: "Home",
          services: "Services",
          doctors: "Doctors",
          about: "About",
          contact: "Contact",
          book: "Book appointment",
          menu: "Primary navigation",
          theme: theme === "dark" ? "Light mode" : "Dark mode",
        };

  const link = (path: string) => withLocale(path, locale);

  return (
    <header className="scmc-v10-header">
      <a className="scmc-v10-header__brand" href={link("/")} aria-label="Smile Care home">
        <img src="/assets/smilecare-official/brand/logo.png" alt="Smile Care Medical Center" />
      </a>

      <nav className="scmc-v10-header__nav" aria-label={labels.menu}>
        <a className={base === "/" ? "is-active" : ""} href={link("/")}>{labels.home}</a>
        <a className={base.startsWith("/services") ? "is-active" : ""} href={link("/services")}>{labels.services}</a>
        <a className={base.startsWith("/doctors") ? "is-active" : ""} href={link("/doctors")}>{labels.doctors}</a>
        <a className={base.startsWith("/about") ? "is-active" : ""} href={link("/about")}>{labels.about}</a>
        <a className={base.startsWith("/contact") ? "is-active" : ""} href={link("/contact")}>{labels.contact}</a>
      </nav>

      <div className="scmc-v10-header__actions">
        <a className="scmc-v10-header__phone" href="tel:+97172282080">+971 7 228 2080</a>

        <a
          className="scmc-v10-header__locale"
          href={withLocale(base, locale === "ar" ? "en" : "ar")}
          aria-label={locale === "ar" ? "English" : "العربية"}
        >
          {locale === "ar" ? "EN" : "AR"}
        </a>

        <button className="scmc-v10-header__theme" type="button" onClick={toggleTheme} aria-label={labels.theme}>
          <span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
        </button>

        <a className="scmc-v10-header__book" href={link("/contact#appointment")}>{labels.book}</a>
      </div>
    </header>
  );
}