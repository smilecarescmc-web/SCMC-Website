import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { nav, site } from "@/lib/site";

export function Footer({ locale }: { locale: Locale }) {
  const whatsapp = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}`;
  return (
    <footer className="site-footer">
      <div className="footer-grid shell">
        <div className="footer-brand">
          <Image src="/brand/scmc-lockup-beige.png" alt="Smile Care Medical Center" width={290} height={142} className="footer-logo" />
          <p>{locale === "ar" ? "مركز طبي متعدد التخصصات في رأس الخيمة منذ عام 2007." : "A multidisciplinary medical center in Ras Al Khaimah, established in 2007."}</p>
        </div>
        <div>
          <span className="footer-label">{locale === "ar" ? "استكشف" : "Explore"}</span>
          <div className="footer-links">
            {nav[locale].map(([label, href]) => <Link key={href} href={`/${locale}${href}`}>{label}</Link>)}
          </div>
        </div>
        <div>
          <span className="footer-label">{locale === "ar" ? "تواصل" : "Contact"}</span>
          <div className="footer-links">
            <a href={`tel:${site.phone}`}>{site.phone}</a>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp</a>
            <span>{site.hours[locale]}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom shell">
        <span>MOHAP License No. {site.mohap}</span>
        <span>© {new Date().getFullYear()} Smile Care Medical Center</span>
      </div>
    </footer>
  );
}
