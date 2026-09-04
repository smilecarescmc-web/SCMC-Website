"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export function AppointmentForm({ locale }: { locale: Locale }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0].slug);
  const [preference, setPreference] = useState("whatsapp");

  const currentService = useMemo(() => services.find((item) => item.slug === service) ?? services[0], [service]);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const message = locale === "ar"
      ? `مرحباً سمايل كير، أود طلب موعد.\nالاسم: ${name}\nالهاتف: ${phone}\nالخدمة: ${currentService.title.ar}\nطريقة التواصل المفضلة: ${preference === "whatsapp" ? "واتساب" : "اتصال"}`
      : `Hello Smile Care, I would like to request an appointment.\nName: ${name}\nPhone: ${phone}\nService: ${currentService.title.en}\nPreferred contact: ${preference === "whatsapp" ? "WhatsApp" : "Phone call"}`;
    const href = `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="appointment-form" onSubmit={submit}>
      <div className="field-grid">
        <label className="field">
          <span>{locale === "ar" ? "الاسم" : "Name"}</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={locale === "ar" ? "الاسم الكامل" : "First & last name"} />
        </label>
        <label className="field">
          <span>{locale === "ar" ? "رقم الهاتف" : "Phone number"}</span>
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" placeholder="+971" />
        </label>
      </div>
      <label className="field">
        <span>{locale === "ar" ? "الخدمة" : "Service"}</span>
        <select value={service} onChange={(e) => setService(e.target.value)}>
          {services.map((item) => <option key={item.slug} value={item.slug}>{item.title[locale]}</option>)}
        </select>
      </label>
      <fieldset className="preference-field">
        <legend>{locale === "ar" ? "طريقة التواصل المفضلة" : "Preferred communication"}</legend>
        <label><input type="radio" name="preference" checked={preference === "whatsapp"} onChange={() => setPreference("whatsapp")} /> WhatsApp</label>
        <label><input type="radio" name="preference" checked={preference === "phone"} onChange={() => setPreference("phone")} /> {locale === "ar" ? "اتصال هاتفي" : "Phone call"}</label>
      </fieldset>
      <button className="form-submit" type="submit">
        <span>{locale === "ar" ? "إرسال الطلب عبر واتساب" : "Send request on WhatsApp"}</span>
        <ArrowUpRight size={18} strokeWidth={1.5} />
      </button>
      <p className="form-note">{locale === "ar" ? "يتم تأكيد الموعد من فريق سمايل كير. لا يُعتبر هذا النموذج تأكيداً تلقائياً للموعد." : "The Smile Care team will confirm your appointment. This request is not an automatic booking confirmation."}</p>
    </form>
  );
}
