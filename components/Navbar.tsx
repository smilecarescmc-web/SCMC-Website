"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ChevronDown,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const PHONE = "tel:+97172282080";
const WHATSAPP =
  "https://wa.me/971543217712?text=Hello%20Smile%20Care%2C%20I%20would%20like%20to%20book%20a%20consultation";

type Lang = "en" | "ar";
type Theme = "light" | "dark";

const NAV = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Dental Care", href: "/services/dental" },
      { label: "Botox & Dermal Fillers", href: "/services/botox-fillers" },
      { label: "Dermatology & Skin Care", href: "/services/dermatology" },
      { label: "Facial Treatments", href: "/services/facials" },
      { label: "Laser Hair Removal", href: "/services/laser-hair-removal" },
      { label: "Clinical Laboratory", href: "/services/laboratory" },
    ],
  },
  { label: "Doctors", href: "/doctors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

const AR_REPLACEMENTS: Array<[string, string]> = [
  ["Smile Care Medical Center", "\u0645\u0631\u0643\u0632 \u0633\u0645\u0627\u064a\u0644 \u0643\u064a\u0631 \u0627\u0644\u0637\u0628\u064a"],
  ["Premier Dental & Aesthetic Clinic RAK", "\u0639\u064a\u0627\u062f\u0629 \u0631\u0627\u0626\u062f\u0629 \u0644\u0637\u0628 \u0627\u0644\u0623\u0633\u0646\u0627\u0646 \u0648\u0627\u0644\u062a\u062c\u0645\u064a\u0644 \u0641\u064a \u0631\u0623\u0633 \u0627\u0644\u062e\u064a\u0645\u0629"],
  ["MOHAP License No. 5080", "\u062a\u0631\u062e\u064a\u0635 \u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u0635\u062d\u0629 \u0648\u0648\u0642\u0627\u064a\u0629 \u0627\u0644\u0645\u062c\u062a\u0645\u0639 \u0631\u0642\u0645 5080"],
  ["MOHAP License", "\u062a\u0631\u062e\u064a\u0635 \u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u0635\u062d\u0629"],
  ["Dental Care", "\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0627\u0644\u0623\u0633\u0646\u0627\u0646"],
  ["Cosmetic Smile Design", "\u062a\u0635\u0645\u064a\u0645 \u0627\u0644\u0627\u0628\u062a\u0633\u0627\u0645\u0629 \u0627\u0644\u062a\u062c\u0645\u064a\u0644\u064a"],
  ["Porcelain Veneers", "\u0642\u0634\u0648\u0631 \u0627\u0644\u0628\u0648\u0631\u0633\u0644\u0627\u0646"],
  ["Microscopic Endodontics", "\u0639\u0644\u0627\u062c \u062c\u0630\u0648\u0631 \u0627\u0644\u0623\u0633\u0646\u0627\u0646 \u0628\u0627\u0644\u0645\u062c\u0647\u0631"],
  ["Guided Implants", "\u0632\u0631\u0627\u0639\u0629 \u0627\u0644\u0623\u0633\u0646\u0627\u0646 \u0627\u0644\u0645\u0648\u062c\u0647\u0629"],
  ["Botox & Dermal Fillers", "\u0627\u0644\u0628\u0648\u062a\u0648\u0643\u0633 \u0648\u0627\u0644\u0641\u064a\u0644\u0631 \u0627\u0644\u062c\u0644\u062f\u064a"],
  ["Facial Balancing", "\u062a\u0648\u0627\u0632\u0646 \u0645\u0644\u0627\u0645\u062d \u0627\u0644\u0648\u062c\u0647"],
  ["Masseter Slimming", "\u062a\u0646\u062d\u064a\u0641 \u0639\u0636\u0644\u0629 \u0627\u0644\u0641\u0643"],
  ["Natural Volume", "\u0627\u0633\u062a\u0639\u0627\u062f\u0629 \u0627\u0644\u062d\u062c\u0645 \u0627\u0644\u0637\u0628\u064a\u0639\u064a"],
  ["Dermatology & Skin Care", "\u0627\u0644\u062c\u0644\u062f\u064a\u0629 \u0648\u0627\u0644\u0639\u0646\u0627\u064a\u0629 \u0628\u0627\u0644\u0628\u0634\u0631\u0629"],
  ["Acne Protocols", "\u0628\u0631\u0648\u062a\u0648\u0643\u0648\u0644\u0627\u062a \u0639\u0644\u0627\u062c \u062d\u0628 \u0627\u0644\u0634\u0628\u0627\u0628"],
  ["Melasma Correction", "\u0639\u0644\u0627\u062c \u0648\u062a\u0635\u062d\u064a\u062d \u0627\u0644\u0643\u0644\u0641"],
  ["Cellular Barrier Health", "\u062f\u0639\u0645 \u0635\u062d\u0629 \u0627\u0644\u062d\u0627\u062c\u0632 \u0627\u0644\u062e\u0644\u0648\u064a \u0644\u0644\u0628\u0634\u0631\u0629"],
  ["Facial Treatments", "\u0639\u0644\u0627\u062c\u0627\u062a \u0627\u0644\u0648\u062c\u0647"],
  ["Facial Treatment", "\u0639\u0644\u0627\u062c\u0627\u062a \u0627\u0644\u0648\u062c\u0647"],
  ["Hydrafacial MD", "\u0647\u064a\u062f\u0631\u0627\u0641\u064a\u0634\u0644 \u0625\u0645 \u062f\u064a"],
  ["Microneedling", "\u0627\u0644\u0648\u062e\u0632 \u0627\u0644\u062f\u0642\u064a\u0642"],
  ["Transdermal Infusions", "\u0627\u0644\u062a\u063a\u0630\u064a\u0629 \u0627\u0644\u0639\u0644\u0627\u062c\u064a\u0629 \u0639\u0628\u0631 \u0627\u0644\u0628\u0634\u0631\u0629"],
  ["Laser Hair Removal", "\u0625\u0632\u0627\u0644\u0629 \u0627\u0644\u0634\u0639\u0631 \u0628\u0627\u0644\u0644\u064a\u0632\u0631"],
  ["Dual-wavelength Alexandrite & Nd:YAG with Contact Cooling", "\u062a\u0642\u0646\u064a\u0629 \u0623\u0644\u0643\u0633\u0646\u062f\u0631\u0627\u064a\u062a \u0648Nd:YAG \u062b\u0646\u0627\u0626\u064a\u0629 \u0627\u0644\u0637\u0648\u0644 \u0627\u0644\u0645\u0648\u062c\u064a \u0645\u0639 \u062a\u0628\u0631\u064a\u062f \u062a\u0644\u0627\u0645\u0633\u064a"],
  ["Clinical Laboratory", "\u0627\u0644\u0645\u062e\u062a\u0628\u0631 \u0627\u0644\u0633\u0631\u064a\u0631\u064a"],
  ["On-site Diagnostic Screening & Rapid Assays", "\u0641\u062d\u0648\u0635\u0627\u062a \u062a\u0634\u062e\u064a\u0635\u064a\u0629 \u0648\u062a\u062d\u0627\u0644\u064a\u0644 \u0633\u0631\u064a\u0639\u0629 \u062f\u0627\u062e\u0644 \u0627\u0644\u0645\u0631\u0643\u0632"],
  ["Book an Appointment", "\u0627\u062d\u062c\u0632 \u0645\u0648\u0639\u062f\u0627\u064b"],
  ["Book appointment", "\u0627\u062d\u062c\u0632 \u0645\u0648\u0639\u062f\u0627\u064b"],
  ["Book", "\u0627\u062d\u062c\u0632"],
  ["Services", "\u0627\u0644\u062e\u062f\u0645\u0627\u062a"],
  ["Doctors", "\u0627\u0644\u0623\u0637\u0628\u0627\u0621"],
  ["About", "\u0645\u0646 \u0646\u062d\u0646"],
  ["Contact", "\u062a\u0648\u0627\u0635\u0644 \u0645\u0639\u0646\u0627"],
  ["Home", "\u0627\u0644\u0631\u0626\u064a\u0633\u064a\u0629"],
  ["WhatsApp", "\u0648\u0627\u062a\u0633\u0627\u0628"],
  ["Saturday - Thursday", "\u0627\u0644\u0633\u0628\u062a - \u0627\u0644\u062e\u0645\u064a\u0633"],
  ["Sat - Thu", "\u0627\u0644\u0633\u0628\u062a - \u0627\u0644\u062e\u0645\u064a\u0633"],
  ["09:00 AM - 09:00 PM", "09:00 \u0635 - 09:00 \u0645"],
  ["Founded May 22, 2007", "\u062a\u0623\u0633\u0633 \u0641\u064a 22 \u0645\u0627\u064a\u0648 2007"],
  ["Started with a single dental chair", "\u0628\u062f\u0623 \u0628\u0643\u0631\u0633\u064a \u0623\u0633\u0646\u0627\u0646 \u0648\u0627\u062d\u062f"],
  ["Started with 1 dental chair", "\u0628\u062f\u0623 \u0628\u0643\u0631\u0633\u064a \u0623\u0633\u0646\u0627\u0646 \u0648\u0627\u062d\u062f"],
  ["Hamad Tower", "\u0628\u0631\u062c \u062d\u0645\u062f"],
  ["Al Nakheel", "\u0627\u0644\u0646\u062e\u064a\u0644"],
  ["Ras Al Khaimah", "\u0631\u0623\u0633 \u0627\u0644\u062e\u064a\u0645\u0629"],
  ["United Arab Emirates", "\u0627\u0644\u0625\u0645\u0627\u0631\u0627\u062a \u0627\u0644\u0639\u0631\u0628\u064a\u0629 \u0627\u0644\u0645\u062a\u062d\u062f\u0629"],
];

const originalText = new WeakMap<Text, string>();

function translateText(value: string) {
  let output = value;

  for (const [english, arabic] of AR_REPLACEMENTS) {
    if (output.includes(english)) {
      output = output.split(english).join(arabic);
    }
  }

  return output;
}

function applyLanguage(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.scmcLang = lang;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT
  );

  const nodes: Text[] = [];
  let current = walker.nextNode();

  while (current) {
    const text = current as Text;
    const parent = text.parentElement;

    if (
      parent &&
      !parent.closest("script, style, noscript, [data-scmc-no-translate]")
    ) {
      nodes.push(text);
    }

    current = walker.nextNode();
  }

  for (const text of nodes) {
    if (!originalText.has(text)) {
      originalText.set(text, text.nodeValue || "");
    }

    const source = originalText.get(text) || "";
    text.nodeValue = lang === "ar" ? translateText(source) : source;
  }
}

function setTheme(theme: Theme) {
  document.documentElement.dataset.scmcTheme = theme;
  document.documentElement.style.colorScheme = theme;
}

export function Navbar() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setThemeState] = useState<Theme>("light");
  useEffect(() => {
    const savedLang = localStorage.getItem("scmc-language") as Lang | null;
    const initialLang: Lang =
      savedLang === "ar" || document.documentElement.lang === "ar"
        ? "ar"
        : "en";

    const savedTheme = localStorage.getItem("scmc-theme") as Theme | null;
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme: Theme =
      savedTheme === "dark" || savedTheme === "light"
        ? savedTheme
        : systemDark
          ? "dark"
          : "light";

    setLang(initialLang);
    setThemeState(initialTheme);
    applyLanguage(initialLang);
    setTheme(initialTheme);
}, []);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 12);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const utility = useMemo(
    () =>
      lang === "ar"
        ? {
            license: "\u062a\u0631\u062e\u064a\u0635 \u0648\u0632\u0627\u0631\u0629 \u0627\u0644\u0635\u062d\u0629 5080",
            hours: "\u0627\u0644\u0633\u0628\u062a - \u0627\u0644\u062e\u0645\u064a\u0633 - 09:00 \u0635 - 09:00 \u0645",
            book: "\u0627\u062d\u062c\u0632 \u0645\u0648\u0639\u062f\u0627\u064b",
            menu: "\u0627\u0644\u0642\u0627\u0626\u0645\u0629",
          }
        : {
            license: "MOHAP License 5080",
            hours: "Sat - Thu - 09:00 AM - 09:00 PM",
            book: "Book appointment",
            menu: "Menu",
          },
    [lang]
  );

  const chooseLanguage = (next: Lang) => {
    localStorage.setItem("scmc-language", next);
    setLang(next);
    applyLanguage(next);
  };

  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    localStorage.setItem("scmc-theme", next);
    setThemeState(next);
    setTheme(next);
  };

  return (
    <>
      <style>{`
        .scmc-locale-theme-controls {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          flex: 0 0 auto;
        }

        .scmc-language-switch {
          display: inline-flex;
          align-items: center;
          gap: 2px;
          height: 28px;
          padding: 2px;
          border: 1px solid rgba(20,19,18,.09);
          border-radius: 999px;
          background: rgba(250,249,246,.62);
          backdrop-filter: blur(12px);
        }

        .scmc-language-switch button {
          min-width: 27px;
          height: 22px;
          padding: 0 6px;
          border: 0;
          border-radius: 999px;
          background: transparent;
          color: rgba(20,19,18,.58);
          font: 500 9px/1 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          letter-spacing: .08em;
          cursor: pointer;
          transition: background .35s ease, color .35s ease;
        }

        .scmc-language-switch button.is-active {
          background: rgba(11,59,96,.10);
          color: #0b3b60;
        }

        .scmc-theme-switch {
          width: 28px;
          height: 28px;
          display: inline-grid;
          place-items: center;
          padding: 0;
          border: 1px solid rgba(20,19,18,.09);
          border-radius: 999px;
          background: rgba(250,249,246,.62);
          color: #141312;
          backdrop-filter: blur(12px);
          cursor: pointer;
          transition:
            transform .35s cubic-bezier(.22,1,.36,1),
            background .35s ease,
            color .35s ease,
            border-color .35s ease;
        }

        .scmc-theme-switch:hover {
          transform: translateY(-1px);
        }

        html[data-scmc-lang="ar"] body {
          font-family:
            "Segoe UI",
            Tahoma,
            Arial,
            sans-serif;
          text-align: right;
        }

        html[data-scmc-lang="ar"] .final-nav-row,
        html[data-scmc-lang="ar"] .final-utility-inner,
        html[data-scmc-lang="ar"] .final-hero-grid,
        html[data-scmc-lang="ar"] .final-mobile-drawer-inner {
          direction: rtl;
        }

        html[data-scmc-lang="ar"] .cin-brand-logo {
          object-position: right center;
        }

        html[data-scmc-theme="light"] {
          color-scheme: light;
        }

        html[data-scmc-theme="light"] body {
          background: #faf9f6;
          color: #141312;
        }

        html[data-scmc-theme="dark"] {
          color-scheme: dark;
        }

        html[data-scmc-theme="dark"] body,
        html[data-scmc-theme="dark"] main,
        html[data-scmc-theme="dark"] .final-home,
        html[data-scmc-theme="dark"] .final-page {
          background: #121110 !important;
          color: #f3f0e9 !important;
        }

        html[data-scmc-theme="dark"] .final-header,
        html[data-scmc-theme="dark"] .final-utility,
        html[data-scmc-theme="dark"] .final-mobile-drawer,
        html[data-scmc-theme="dark"] .final-dropdown {
          background: rgba(18,17,16,.82) !important;
          color: #f3f0e9 !important;
          border-color: rgba(255,255,255,.08) !important;
          backdrop-filter: blur(18px);
        }

        html[data-scmc-theme="dark"] .final-section,
        html[data-scmc-theme="dark"] .final-hero,
        html[data-scmc-theme="dark"] .final-page-hero,
        html[data-scmc-theme="dark"] .final-contact-section {
          background:
            radial-gradient(circle at 78% 20%, rgba(38,73,92,.12), transparent 36%),
            radial-gradient(circle at 18% 82%, rgba(112,93,72,.09), transparent 38%),
            #121110 !important;
          color: #f3f0e9 !important;
        }

        html[data-scmc-theme="dark"] h1,
        html[data-scmc-theme="dark"] h2,
        html[data-scmc-theme="dark"] h3,
        html[data-scmc-theme="dark"] h4,
        html[data-scmc-theme="dark"] p,
        html[data-scmc-theme="dark"] dt,
        html[data-scmc-theme="dark"] dd,
        html[data-scmc-theme="dark"] li,
        html[data-scmc-theme="dark"] .final-nav-link,
        html[data-scmc-theme="dark"] .final-dropdown-link,
        html[data-scmc-theme="dark"] .final-mobile-link,
        html[data-scmc-theme="dark"] .final-secondary-link {
          color: inherit !important;
        }

        html[data-scmc-theme="dark"] .final-service-row,
        html[data-scmc-theme="dark"] .final-doctor,
        html[data-scmc-theme="dark"] .final-page-card,
        html[data-scmc-theme="dark"] .final-insurance-item,
        html[data-scmc-theme="dark"] [class*="glass"] {
          background: rgba(255,255,255,.035) !important;
          border-color: rgba(255,255,255,.075) !important;
          box-shadow: 0 10px 34px rgba(0,0,0,.10) !important;
        }

        html[data-scmc-theme="dark"] .scmc-language-switch,
        html[data-scmc-theme="dark"] .scmc-theme-switch {
          background: rgba(255,255,255,.045);
          border-color: rgba(255,255,255,.09);
          color: #f3f0e9;
        }

        html[data-scmc-theme="dark"] .scmc-language-switch button {
          color: rgba(243,240,233,.58);
        }

        html[data-scmc-theme="dark"] .scmc-language-switch button.is-active {
          background: rgba(133,184,211,.14);
          color: #d8edf6;
        }

        html[data-scmc-theme="dark"] img:not(.cin-brand-logo) {
          filter: brightness(.94) saturate(.92);
        }

        @media (max-width: 760px) {
          .scmc-language-switch {
            height: 27px;
          }

          .scmc-theme-switch {
            width: 27px;
            height: 27px;
          }
        }
      `}</style>

      <header className={`final-header cin-navbar ${scrolled ? "is-scrolled" : ""}`}>
        <div className="final-utility">
          <div className="final-shell final-utility-inner">
            <div className="final-utility-group">
              <span>{utility.license}</span>
              <span className="final-utility-divider" />
              <span>{utility.hours}</span>
            </div>

            <div className="final-utility-group final-utility-contact">
              <a href={PHONE}>+971 7 228 2080</a>
              <span className="final-utility-divider" />
              <a href={WHATSAPP} target="_blank" rel="noreferrer">
                WhatsApp +971 54 321 7712
              </a>
            </div>
          </div>
        </div>

        <div className="final-shell final-nav-row">
          <Link href="/" className="cin-brand-link" aria-label="Smile Care home">
            <img
              src={LOGO}
              alt="Smile Care Medical Center"
              className="cin-brand-logo scmc-adaptive-logo"
              draggable={false}
            />
          </Link>

          <nav className="final-desktop-nav" aria-label="Primary navigation">
            {NAV.map((item) => (
              <div className="final-nav-item" key={item.href}>
                <Link href={item.href} className="final-nav-link">
                  <span>{item.label}</span>
                  {"children" in item ? (
                    <ChevronDown size={11} strokeWidth={1.4} />
                  ) : null}
                </Link>

                {"children" in item ? (
                  <div className="final-dropdown">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="final-dropdown-link"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="final-nav-actions">
            <div
              className="scmc-locale-theme-controls"
              data-scmc-no-translate
            >
              <div
                className="scmc-language-switch"
                aria-label="Language switcher"
              >
                <button
                  type="button"
                  className={lang === "en" ? "is-active" : ""}
                  onClick={() => chooseLanguage("en")}
                  aria-pressed={lang === "en"}
                >
                  EN
                </button>

                <button
                  type="button"
                  className={lang === "ar" ? "is-active" : ""}
                  onClick={() => chooseLanguage("ar")}
                  aria-pressed={lang === "ar"}
                >
                  AR
                </button>
              </div>

              <button
                type="button"
                className="scmc-theme-switch"
                onClick={toggleTheme}
                aria-label={theme === "light" ? "Dark mode" : "Light mode"}
                title={theme === "light" ? "Dark mode" : "Light mode"}
              >
                {theme === "light" ? (
                  <Moon size={13} strokeWidth={1.5} />
                ) : (
                  <Sun size={13} strokeWidth={1.5} />
                )}
              </button>
            </div>

            <Link href="/contact#appointment" className="final-book-button">
              {utility.book}
              <ArrowUpRight size={12} strokeWidth={1.4} />
            </Link>

            <button
              className="final-menu-button"
              aria-label={utility.menu}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        <div className={`final-mobile-drawer ${open ? "is-open" : ""}`}>
          <div className="final-shell final-mobile-drawer-inner">
            {NAV.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="final-mobile-link"
              >
                <span>0{index + 1}</span>
                <strong>{item.label}</strong>
              </Link>
            ))}

            <div className="final-mobile-contact">
              <a href={PHONE}>+971 7 228 2080</a>
              <a href="mailto:info@smilecare.ae">info@smilecare.ae</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;