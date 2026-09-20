"use client";

import Link from "next/link";
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
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => setMenuOpen(false), [pathname]);

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
          blog: "المدونة",
          contact: "تواصل معنا",
          book: "احجز موعداً",
          menu: "التنقل الرئيسي",
          openMenu: "فتح القائمة",
          closeMenu: "إغلاق القائمة",
          theme: theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن",
        }
      : {
          home: "Home",
          services: "Services",
          doctors: "Doctors",
          about: "About",
          blog: "Blog",
          contact: "Contact",
          book: "Book appointment",
          menu: "Primary navigation",
          openMenu: "Open menu",
          closeMenu: "Close menu",
          theme: theme === "dark" ? "Light mode" : "Dark mode",
        };

  const link = (path: string) => withLocale(path, locale);

  const navItems = [
    ["/", labels.home],
    ["/services", labels.services],
    ["/doctors", labels.doctors],
    ["/about", labels.about],
    ["/blog", labels.blog],
    ["/contact", labels.contact],
  ] as const;

  return (
    <header className="scmc-v10-header" data-menu-open={menuOpen ? "true" : "false"}>
      <Link className="scmc-v10-header__brand" href={link("/")} aria-label="Smile Care home">
        <img src="/assets/smilecare-official/brand/logo.png" alt="Smile Care Medical Center" />
      </Link>

      <nav className="scmc-v10-header__nav" aria-label={labels.menu}>
        {navItems.map(([path, label]) => (
          <Link
            key={path}
            className={base === path || (path !== "/" && base.startsWith(path)) ? "is-active" : ""}
            href={link(path)}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="scmc-v10-header__actions">
        <a className="scmc-v10-header__phone" href="tel:+97172282080">+971 7 228 2080</a>

        <Link
          className="scmc-v10-header__locale"
          href={withLocale(base, locale === "ar" ? "en" : "ar")}
          aria-label={locale === "ar" ? "English" : "العربية"}
        >
          {locale === "ar" ? "EN" : "AR"}
        </Link>

        <button className="scmc-v10-header__theme" type="button" onClick={toggleTheme} aria-label={labels.theme}>
          <span aria-hidden="true">{theme === "dark" ? "☀" : "◐"}</span>
        </button>

        <Link className="scmc-v10-header__book" href={link("/contact#appointment")}>{labels.book}</Link>

        <button
          className="scmc-v10-header__menu"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? labels.closeMenu : labels.openMenu}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>
    </header>
  );
}
