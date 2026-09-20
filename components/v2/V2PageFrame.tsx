import Link from "next/link";
import V2IndexNav from "@/components/v2/V2IndexNav";
import V2Runtime from "@/components/v2/V2Runtime";
import {
  alternatePath,
  pageDirection,
  primaryNavigation,
  primaryNavigationAr,
  scmcContact,
  type V2Page,
} from "@/lib/v2-content";

type Props = {
  page: V2Page;
  children: React.ReactNode;
};

export default function V2PageFrame({ page, children }: Props) {
  const dir = pageDirection(page);
  const isArabic = dir === "rtl";
  const alternateHref = alternatePath(page);
  const navigation = isArabic ? primaryNavigationAr : primaryNavigation;

  return (
    <div className="v2-site" dir={dir} data-locale={isArabic ? "ar" : "en"}>
      <V2Runtime />

      <div className="v2-progress" aria-hidden="true">
        <span />
      </div>

      <header className="v2-header">
        <Link href={isArabic ? "/ar/" : "/"} className="v2-brand" aria-label="Smile Care Medical Center">
          <img loading="lazy" decoding="async" src="/v2/brand-logo.png" alt="Smile Care Medical Center" />
        </Link>

        <nav className="v2-header__nav" aria-label="Primary navigation">
          {navigation.slice(1, 5).map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="v2-header__end">
          <Link
            href={isArabic ? "/ar/احجز-موعداً/" : "/book-an-appointment/"}
            className="v2-book-link"
            data-magnetic
          >
            {isArabic ? "احجز موعداً" : "Book"}
          </Link>
          <V2IndexNav
            alternateHref={alternateHref}
            alternateLabel={isArabic ? "English" : "العربية"}
            isArabic={isArabic}
          />
        </div>
      </header>

      {children}

      <footer className="v2-footer">
        <div className="v2-shell v2-footer__top">
          <div>
            <p className="v2-eyebrow">Smile Care Medical Center</p>
            <h2>{isArabic ? "بدأ كل شيء بكرسي أسنان واحد." : "It all started with one dental chair in a clinic and the rest was history."}</h2>
          </div>
          <div className="v2-footer__contact">
            <a href={`tel:${scmcContact.phone}`}>{scmcContact.phoneLabel}</a>
            <a href={`https://wa.me/${scmcContact.whatsapp.replace("+", "")}`}>{scmcContact.whatsappLabel}</a>
            <a href={`mailto:${scmcContact.email}`}>{scmcContact.email}</a>
          </div>
        </div>

        <div className="v2-shell v2-footer__grid">
          <div>
            <span className="v2-mono">LOCATION</span>
            <p>{scmcContact.address}</p>
          </div>
          <div>
            <span className="v2-mono">LICENSE</span>
            <p>{scmcContact.license}</p>
          </div>
          <div>
            <span className="v2-mono">EXPLORE</span>
            {navigation.slice(0, 6).map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="v2-shell v2-footer__bottom">
          <span>© 2026 Smile Care Medical Center</span>
          <Link href="/privacy-policy/">Privacy Policy</Link>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
