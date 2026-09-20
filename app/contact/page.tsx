import { MapPin, Phone, MessageCircle, Mail, Clock3 } from "lucide-react";
import { AppointmentForm } from "@/components/AppointmentForm";
import { ScmcFrame } from "@/components/ScmcFrame";
import { MediaImage } from "@/components/MediaImage";
import { clinic } from "@/lib/scmcFullData";
import { scmcResolvedMedia } from "@/lib/scmcResolvedMedia";

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: clinic.phoneDisplay, href: `tel:${clinic.phone}` },
    { icon: MessageCircle, label: "WhatsApp", value: clinic.whatsappDisplay, href: `https://wa.me/${clinic.whatsapp.replace(/\D/g, "")}` },
    { icon: Mail, label: "Email", value: clinic.email, href: `mailto:${clinic.email}` },
    { icon: Clock3, label: "Hours", value: clinic.hours, href: null },
  ] as const;

  return (
    <ScmcFrame>
      <section className="scmc-page-intro scmc-ambient-section">
        <div className="scmc-shell scmc-page-intro-inner">
          <div>
            <span className="scmc-section-label">CONTACT</span>
            <h1 data-soft-reveal>Start with a conversation.</h1>
          </div>
          <p data-soft-reveal>
            Call, message the team on WhatsApp, or send an appointment request below.
          </p>
        </div>
      </section>

      <section className="scmc-soft-section">
        <div className="scmc-shell scmc-contact-grid">
          <div className="scmc-contact-info">
            <figure className="scmc-contact-media scmc-media-shell">
              <MediaImage
                src={scmcResolvedMedia.clinic.contact}
                alt="Smile Care Medical Center"
                className="scmc-media-cover"
              />
            </figure>

            <div className="scmc-location-card scmc-glass-card" data-soft-reveal>
              <span className="scmc-contact-icon"><MapPin size={15} /></span>
              <div>
                <span>LOCATION</span>
                <h2>Al Nakheel · Ras Al Khaimah</h2>
                <p>{clinic.address}</p>
              </div>
            </div>

            <div className="scmc-contact-list">
              {details.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="scmc-contact-icon"><Icon size={14} /></span>
                    <div>
                      <span>{item.label}</span>
                      <strong>{item.value}</strong>
                    </div>
                  </>
                );

                return item.href ? (
                  <a href={item.href} key={item.label} className="scmc-contact-row scmc-glass-card" data-soft-reveal>
                    {content}
                  </a>
                ) : (
                  <div key={item.label} className="scmc-contact-row scmc-glass-card" data-soft-reveal>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>

          <div id="appointment" className="scmc-booking-panel scmc-glass-panel" data-soft-reveal>
            <span className="scmc-section-label">APPOINTMENT REQUEST</span>
            <h2>Tell us what you need.</h2>
            <p>The center will confirm your preferred specialist and available time.</p>
            <AppointmentForm />
          </div>
        </div>
      </section>
    </ScmcFrame>
  );
}