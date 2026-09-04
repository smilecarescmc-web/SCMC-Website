import type { Metadata } from "next";
import { AppointmentForm } from "@/components/AppointmentForm";
import { isLocale } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return localizedMetadata(locale, locale === "ar" ? "تواصل معنا" : "Contact", locale === "ar" ? "تواصل مع مركز سمايل كير الطبي واطلب موعداً." : "Contact Smile Care Medical Center and request an appointment.", "contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params; const locale = isLocale(raw) ? raw : "en";
  return <section className="contact-page"><div className="shell contact-grid"><div className="contact-copy"><span className="eyebrow" data-reveal>{locale === "ar" ? "تواصل معنا" : "Contact"}</span><h1 className="display" data-reveal>{locale === "ar" ? "أسهل خطوة في الرعاية هي البداية." : "The easiest step in care should be the first one."}</h1><p className="lead" data-reveal>{locale === "ar" ? "أرسل طلب موعد عبر واتساب أو تواصل مباشرة مع فريق سمايل كير." : "Send an appointment request on WhatsApp or contact the Smile Care team directly."}</p><div className="contact-details" data-reveal><div className="contact-detail"><span>{locale === "ar" ? "الهاتف" : "Phone"}</span><a href={`tel:${site.phone}`}>{site.phone}</a></div><div className="contact-detail"><span>WhatsApp</span><a href={`https://wa.me/${site.whatsapp.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">{site.whatsapp}</a></div><div className="contact-detail"><span>{locale === "ar" ? "البريد" : "Email"}</span><a href={`mailto:${site.email}`}>{site.email}</a></div><div className="contact-detail"><span>{locale === "ar" ? "الساعات" : "Hours"}</span><span>{site.hours[locale]}</span></div><div className="contact-detail"><span>MOHAP</span><span>{site.mohap}</span></div></div></div><div className="appointment-wrap" id="appointment" data-reveal><span className="eyebrow">{locale === "ar" ? "طلب موعد" : "Appointment request"}</span><h2>{locale === "ar" ? "أخبرنا كيف يمكننا مساعدتك." : "Tell us how we can help."}</h2><AppointmentForm locale={locale} /></div></div></section>;
}
