import Link from "next/link";
import V2Runtime from "@/components/v2/V2Runtime";
import {
  alternatePath,
  contact,
  pageDirection,
  type V21Page,
} from "@/lib/v21-content";

type HeaderNavChild = {
  label: string;
  href: string;
};

type HeaderNavItem = {
  label: string;
  href: string;
  children?: readonly HeaderNavChild[];
};

const headerNavigation: Record<
  "en" | "ar",
  readonly HeaderNavItem[]
> = {
  en: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services/",
      children: [
        {
          label: "Dental",
          href: "/dental-clinic/",
        },
        {
          label: "Dermatology & Skin Treatments",
          href: "/dermatologist-ras-al-khaimah/",
        },
        {
          label: "Hair Removal",
          href: "/hair-removal/",
        },
        {
          label: "Aesthetics Treatments",
          href: "/services/aesthetic-clinic-ras-al-khaimah/",
        },
        {
          label: "Non Surgical",
          href: "/services/facial-treatments-ras-al-khaimah/",
        },
        {
          label: "Laboratory",
          href: "/services/laboratory/",
        },
      ],
    },
    {
      label: "Doctors",
      href: "/doctors/",
    },
    {
      label: "About",
      href: "/about/",
      children: [
        {
          label: "FAQs",
          href: "/faqs/",
        },
        {
          label: "Clinic Gallery",
          href: "/clinic-gallery/",
        },
        {
          label: "Events",
          href: "/events/",
        },
      ],
    },
    {
      label: "Blogs",
      href: "/blogs/",
    },
    {
      label: "Contact Us",
      href: "/contact-us/",
    },
  ],

  ar: [
    {
      label: "الرئيسية",
      href: "/ar/",
    },
    {
      label: "الخدمات",
      href: "/ar/services/",
      children: [
        {
          label: "الأسنان",
          href: "/ar/dental-clinic/",
        },
        {
          label: "الجلدية والعناية بالبشرة",
          href: "/ar/dermatologist-ras-al-khaimah/",
        },
        {
          label: "إزالة الشعر",
          href: "/ar/hair-removal/",
        },
        {
          label: "العلاجات التجميلية",
          href: "/ar/services/aesthetic-clinic-ras-al-khaimah/",
        },
        {
          label: "علاجات الوجه",
          href: "/ar/services/facial-treatments-ras-al-khaimah/",
        },
        {
          label: "المختبر",
          href: "/ar/services/laboratory/",
        },
      ],
    },
    {
      label: "الأطباء",
      href: "/ar/doctors/",
    },
    {
      label: "من نحن",
      href: "/ar/about/",
      children: [
        {
          label: "الأسئلة الشائعة",
          href: "/ar/faqs/",
        },
        {
          label: "معرض العيادة",
          href: "/ar/clinic-gallery/",
        },
        {
          label: "الفعاليات",
          href: "/ar/events/",
        },
      ],
    },
    {
      label: "المدونة",
      href: "/ar/blogs/",
    },
    {
      label: "تواصل معنا",
      href: "/ar/contact-us/",
    },
  ],
};

export default function V21Frame({
  page,
  children,
}: {
  page: V21Page;
  children: React.ReactNode;
}) {
  const rtl = pageDirection(page) === "rtl";

  const nav: readonly HeaderNavItem[] = rtl
    ? headerNavigation.ar
    : headerNavigation.en;

  return (
    <div
      className="v21-site"
      dir={rtl ? "rtl" : "ltr"}
    >
      <V2Runtime />

      <div
        className="v21-progress"
        aria-hidden="true"
      >
        <span />
      </div>

      <header
        className="v25-header"
        data-v25-header
      >
        <div className="v25-header__inner">
          <Link
            className="v25-brand"
            href={rtl ? "/ar/" : "/"}
            aria-label="Smile Care Medical Center"
          >
            <img loading="lazy" decoding="async"
              src="/v2/brand-logo.png"
              alt="Smile Care Medical Center"
            />
          </Link>

          <nav
            className="v25-nav"
            aria-label="Primary navigation"
          >
            {nav.map((item: HeaderNavItem) => (
              <div
                className="v25-nav__item"
                data-has-children={
                  item.children ? "true" : "false"
                }
                key={item.href}
              >
                <Link href={item.href}>
                  <span>{item.label}</span>

                  {item.children ? (
                    <span
                      className="v25-nav__chevron"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  ) : null}
                </Link>

                {item.children ? (
                  <div className="v25-dropdown">
                    <div className="v25-dropdown__inner">
                      {item.children.map(
                        (
                          child: HeaderNavChild,
                          index: number
                        ) => (
                          <Link
                            href={child.href}
                            key={child.href}
                          >
                            <span aria-hidden="true">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span>
                              {child.label}
                            </span>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            ))}
          </nav>

          <div className="v25-header__actions">
            <a
              className="v25-whatsapp"
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>

            <Link
              className="v25-language"
              href={alternatePath(page)}
            >
              English
            </Link>

            <Link
              className="v25-book"
              href={
                rtl
                  ? "/ar/book-an-appointment/"
                  : "/book-an-appointment/"
              }
            >
              {rtl ? "احجز موعداً" : "Book"}
            </Link>
          </div>
        </div>
      </header>

      {children}

      <footer className="v21-footer">
        <div className="v21-shell v21-footer__grid">
          <div>
            <span className="v21-meta">
              SMILE CARE MEDICAL CENTER
            </span>

            <p>
              {contact.address}
            </p>
          </div>

          <div>
            <span className="v21-meta">
              CONTACT
            </span>

            <a href={`tel:${contact.phone}`}>
              {contact.phoneLabel}
            </a>

            <a
              href={`https://wa.me/${contact.whatsapp}`}
            >
              {contact.whatsappLabel}
            </a>

            <a
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </div>

          <div>
            <span className="v21-meta">
              LICENSE
            </span>

            <p>
              {contact.license}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}