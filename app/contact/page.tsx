"use client";

import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";
import { useScmcLocale } from "@/lib/locale-client";

export default function ContactPage() {
  const { ar } = useScmcLocale();

  const details = [
    { icon: Phone, label: ar ? "الهاتف" : "Phone", value: clinic.phoneDisplay, href: `tel:${clinic.phone}`, ltr: true },
    { icon: MessageCircle, label: ar ? "واتساب" : "WhatsApp", value: clinic.whatsappDisplay, href: `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}`, ltr: true },
    { icon: Mail, label: ar ? "البريد الإلكتروني" : "Email", value: clinic.email, href: `mailto:${clinic.email}`, ltr: true },
    { icon: Clock3, label: ar ? "ساعات العمل" : "Hours", value: ar ? "السبت – الخميس · 09:00 صباحاً – 09:00 مساءً" : clinic.hours, href: null, ltr: false },
  ] as const;

  return (
    <ScmcFrame>
      <section className="scmc-inner-hero">
        <div className="scmc-shell scmc-inner-hero__grid">
          <div>
            <p className="scmc-eyebrow">{ar ? "تواصل معنا" : "CONTACT"}</p>
            <h1>{ar ? "ابدأ بمحادثة." : "Start with a conversation."}</h1>
          </div>
          <p>{ar ? "اتصل بنا أو راسل الفريق عبر واتساب أو أرسل طلب موعد من النموذج أدناه." : "Call, message the team on WhatsApp, or send an appointment request below."}</p>
        </div>
      </section>

      <section className="scmc-section">
        <div className="scmc-shell scmc-contact-layout">
          <div className="scmc-contact-stack">
            <figure className="scmc-contact-photo">
              <MediaImage src={scmcResolvedMedia.clinic.contact} alt="Smile Care Medical Center" className="scmc-media-cover" />
            </figure>

            <div className="scmc-location-card">
              <span className="scmc-icon-box"><MapPin size={17} /></span>
              <div>
                <span>{ar ? "الموقع" : "LOCATION"}</span>
                <h2>{ar ? "النخيل · رأس الخيمة" : "Al Nakheel · Ras Al Khaimah"}</h2>
                <p>{ar ? "برج حمد، شارع 14B، الطابق الميزانين، النخيل، رأس الخيمة، الإمارات العربية المتحدة" : clinic.address}</p>
              </div>
            </div>

            <div className="scmc-contact-list">
              {details.map((item) => {
                const Icon = item.icon;
                const content = <>
                  <span className="scmc-icon-box"><Icon size={16} /></span>
                  <div><span>{item.label}</span><strong className={item.ltr ? "scmc-ltr-value" : undefined} dir={item.ltr ? "ltr" : undefined}>{item.ltr ? <bdi>{item.value}</bdi> : item.value}</strong></div>
                </>;
                return item.href
                  ? <a href={item.href} key={item.label} className="scmc-contact-row">{content}</a>
                  : <div key={item.label} className="scmc-contact-row">{content}</div>;
              })}
            </div>
          </div>

          <div id="appointment" className="scmc-booking-panel">
            <p className="scmc-eyebrow">{ar ? "طلب موعد" : "APPOINTMENT REQUEST"}</p>
            <h2>{ar ? "أخبرنا بما تحتاجه." : "Tell us what you need."}</h2>
            <p>{ar ? "سيتواصل معك الفريق لتأكيد الاختصاصي والوقت المناسب." : "The center will confirm the preferred specialist and available time."}</p>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </ScmcFrame>
  );
}
