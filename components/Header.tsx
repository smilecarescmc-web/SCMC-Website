"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { otherLocale } from "@/lib/i18n";
import { nav } from "@/lib/site";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const other = otherLocale(locale);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [locale, open]);

  const languageHref = useMemo(() => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return `/${other}`;
    parts[0] = other;
    return `/${parts.join("/")}`;
  }, [pathname, other]);

  return (
    <header className={`site-header ${compact ? "is-compact" : ""}`}>
      <div className="header-shell">
        <Link href={`/${locale}`} className="brand-link" aria-label="Smile Care Medical Center home">
          <Image
            src="/brand/scmc-lockup-emerald.png"
            alt="Smile Care Medical Center"
            width={248}
            height={122}
            className="brand-logo"
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary navigation"}>
          {nav[locale].map(([label, href]) => (
            <Link key={href} href={`/${locale}${href}`} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link href={languageHref} className="language-pill" aria-label={other === "ar" ? "العربية" : "English"}>
            {other === "ar" ? "ع" : "EN"}
          </Link>
          <Link href={`/${locale}/contact#appointment`} className="header-cta">
            <span>{locale === "ar" ? "احجز موعداً" : "Book"}</span>
            <ArrowUpRight size={16} strokeWidth={1.6} />
          </Link>
          <button className="menu-button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="Menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        <div className="mobile-menu-inner">
          {nav[locale].map(([label, href], index) => (
            <Link key={href} href={`/${locale}${href}`} className="mobile-nav-link">
              <span className="mobile-nav-index">0{index + 1}</span>
              <span>{label}</span>
            </Link>
          ))}
          <Link href={`/${locale}/contact#appointment`} className="mobile-book-link">
            {locale === "ar" ? "طلب موعد" : "Request an appointment"}
          </Link>
        </div>
      </div>
    </header>
  );
}
