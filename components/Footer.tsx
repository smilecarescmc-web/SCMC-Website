import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { clinic, services } from "@/lib/scmcFullData";

export function Footer() {
  return (
    <footer className="scmc-footer">
      <div className="scmc-footer-orb scmc-footer-orb-a" />
      <div className="scmc-footer-orb scmc-footer-orb-b" />

      <div className="scmc-shell scmc-footer-grid">
        <div className="scmc-footer-brand">
          <Image
            src="/assets/smilecare-official/brand/logo.png"
            alt="Smile Care Medical Center"
            width={192}
            height={94}
          />
          <p>
            Multidisciplinary medical care in Ras Al Khaimah, shaped around comfort,
            clarity and a personal patient experience.
          </p>
        </div>

        <div className="scmc-footer-col">
          <span className="scmc-footer-label">Explore</span>
          <Link href="/about">About</Link>
          <Link href="/doctors">Doctors</Link>
          <Link href="/services">Services</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/contact">Contact</Link>
        </div>

        <div className="scmc-footer-col">
          <span className="scmc-footer-label">Departments</span>
          {services.map((service) => (
            <Link href={service.route} key={service.key}>{service.title}</Link>
          ))}
        </div>

        <div className="scmc-footer-col scmc-footer-contact">
          <span className="scmc-footer-label">Contact</span>
          <a href={clinic.phoneHref}>{clinic.phoneDisplay}</a>
          <a href={clinic.bookingWhatsApp} target="_blank" rel="noreferrer">
            {clinic.whatsappDisplay}
          </a>
          <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
          <Link href="/contact#appointment" className="scmc-footer-book">
            Request appointment <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      <div className="scmc-shell scmc-footer-meta">
        <span>MOHAP LICENSE NO. {clinic.license}</span>
        <span>{clinic.address}</span>
        <span>© {new Date().getFullYear()} SMILE CARE MEDICAL CENTER</span>
      </div>

      <div className="scmc-shell scmc-footer-trust">
        <div className="scmc-footer-trust-logos">
          <Image
            src="/assets/smilecare-official/brand/logo.png"
            alt="Smile Care Medical Center"
            width={150}
            height={64}
          />
          <img src="/v2/mohap.webp" alt="UAE Ministry of Health and Prevention" />
        </div>
        <p>
          Designed &amp; Developed by{" "}
          <a href="https://7z-magic.com" target="_blank" rel="noopener noreferrer">7Z Magic</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
