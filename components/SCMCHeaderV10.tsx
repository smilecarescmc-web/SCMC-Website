"use client";

import Link from "next/link";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useScmcLocale, stripLocale, localePath } from "@/lib/locale-client";

export function SCMCHeaderV10() {
  const { locale, ar, pathname, href } = useScmcLocale();
  const base = stripLocale(pathname);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

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
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("scmc-theme", next);
    document.documentElement.dataset.theme = next;
  };

  const labels = ar
    ? {
        home: "الرئيسية",
        services: "الخدمات",
        doctors: "الأطباء",
        about: "من نحن",
        blog: "المدونة",
        contact: "تواصل معنا",
        book: "احجز موعداً",
        navigation: "التنقل الرئيسي",
        theme: theme === "dark" ? "الوضع الفاتح" : "الوضع الداكن",
      }
    : {
        home: "Home",
        services: "Services",
        doctors: "Doctors",
        about: "About",
        blog: "Journal",
        contact: "Contact",
        book: "Book appointment",
        navigation: "Primary navigation",
        theme: theme === "dark" ? "Light mode" : "Dark mode",
      };

  const navItems = [
    ["/", labels.home],
    ["/services", labels.services],
    ["/doctors", labels.doctors],
    ["/about", labels.about],
    ["/blog", labels.blog],
    ["/contact", labels.contact],
  ] as const;

  return (
    <header className="scmc-header" data-menu-open={menuOpen ? "true" : "false"}>
      <Link className="scmc-header__brand" href={href("/")} aria-label={ar ? "الرئيسية" : "Smile Care home"}>
        <img src="/assets/smilecare-official/brand/logo.png" alt="Smile Care Medical Center" />
      </Link>

      <nav className="scmc-header__nav" aria-label={labels.navigation}>
        {navItems.map(([path, label]) => (
          <Link
            key={path}
            className={base === path || (path !== "/" && base.startsWith(path)) ? "is-active" : ""}
            href={href(path)}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div className="scmc-header__actions">
        <a className="scmc-header__phone scmc-ltr-value" href="tel:+97172282080" dir="ltr"><bdi>+971 7 228 2080</bdi></a>
        <Link
          className="scmc-header__icon scmc-header__locale"
          href={localePath(base, locale === "ar" ? "en" : "ar")}
          aria-label={locale === "ar" ? "English" : "العربية"}
        >
          {locale === "ar" ? "EN" : "AR"}
        </Link>
        <button className="scmc-header__icon" type="button" onClick={toggleTheme} aria-label={labels.theme}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <Link className="scmc-header__book" href={href("/contact#appointment")}>{labels.book}</Link>
        <button
          className="scmc-header__icon scmc-header__menu"
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>
    </header>
  );
}
