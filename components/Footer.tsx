"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clinic, services } from "@/lib/scmcFullData";
import { useScmcLocale } from "@/lib/locale-client";

export function Footer() {
  const { ar, href } = useScmcLocale();

  return (
    <footer className="scmc-footer">
      <div className="scmc-shell scmc-footer__top">
        <div className="scmc-footer__brand">
          <img src="/assets/smilecare-official/brand/logo.png" alt="Smile Care Medical Center" />
          <p>
            {ar
              ? "رعاية طبية متعددة التخصصات في رأس الخيمة، صُممت حول الراحة والوضوح وتجربة مريض شخصية."
              : "Multidisciplinary medical care in Ras Al Khaimah, shaped around comfort, clarity and a personal patient experience."}
          </p>
        </div>

        <div className="scmc-footer__col">
          <span>{ar ? "استكشف" : "Explore"}</span>
          <Link href={href("/about")}>{ar ? "من نحن" : "About"}</Link>
          <Link href={href("/doctors")}>{ar ? "الأطباء" : "Doctors"}</Link>
          <Link href={href("/services")}>{ar ? "الخدمات" : "Services"}</Link>
          <Link href={href("/blog")}>{ar ? "المدونة" : "Journal"}</Link>
          <Link href={href("/contact")}>{ar ? "تواصل معنا" : "Contact"}</Link>
        </div>

        <div className="scmc-footer__col">
          <span>{ar ? "الأقسام" : "Departments"}</span>
          {services.map((service) => (
            <Link href={href(service.route)} key={service.key}>
              {ar
                ? {
                    dental: "طب الأسنان",
                    "botox-fillers": "البوتوكس والفيلر",
                    dermatology: "الجلدية",
                    facials: "علاجات الوجه",
                    "laser-hair-removal": "إزالة الشعر بالليزر",
                    laboratory: "المختبر الطبي",
                  }[service.key]
                : service.title}
            </Link>
          ))}
        </div>

        <div className="scmc-footer__col scmc-footer__contact">
          <span>{ar ? "تواصل" : "Contact"}</span>
          <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
          <a href={clinic.bookingWhatsApp} target="_blank" rel="noreferrer">{clinic.whatsappDisplay}</a>
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          <Link href={href("/contact#appointment")} className="scmc-footer__book">
            {ar ? "طلب موعد" : "Request appointment"} <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>

      <div className="scmc-shell scmc-footer__meta">
        <span>{ar ? `ترخيص وزارة الصحة رقم ${clinic.license}` : `MOHAP LICENSE NO. ${clinic.license}`}</span>
        <span>{ar ? "برج حمد، شارع 14B، الطابق الميزانين، النخيل، رأس الخيمة، الإمارات" : clinic.address}</span>
        <span>© {new Date().getFullYear()} SMILE CARE MEDICAL CENTER</span>
      </div>

      <div className="scmc-shell scmc-footer__trust">
        <div className="scmc-footer__logos">
          <img src="/assets/smilecare-official/brand/logo.png" alt="Smile Care Medical Center" />
          <img src="/v2/mohap.webp" alt="UAE Ministry of Health and Prevention" />
        </div>
        <p>
          {ar ? "تصميم وتطوير " : "Designed & Developed by "}
          <a href="https://7z-magic.com" target="_blank" rel="noopener noreferrer">7Z Magic</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
