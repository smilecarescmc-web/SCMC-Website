"use client";

import { FormEvent, useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { clinic, services } from "@/lib/scmcFullData";
import { useScmcLocale } from "@/lib/locale-client";

const arService: Record<string, string> = {
  dental: "طب الأسنان",
  "botox-fillers": "البوتوكس والفيلر",
  dermatology: "الجلدية والعناية بالبشرة",
  facials: "علاجات الوجه",
  "laser-hair-removal": "إزالة الشعر بالليزر",
  laboratory: "المختبر الطبي",
};

export function AppointmentForm() {
  const { ar } = useScmcLocale();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(services[0].title);
  const [preference, setPreference] = useState("WhatsApp");
  const selectedService = useMemo(
    () => services.find((item) => item.title === service) || services[0],
    [service]
  );

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = ar
      ? [
          "طلب موعد - مركز سمايل كير الطبي",
          `الاسم: ${name.trim()}`,
          `الهاتف: ${phone.trim()}`,
          `الخدمة: ${arService[selectedService.key]}`,
          `التواصل المفضل: ${preference === "WhatsApp" ? "واتساب" : "مكالمة هاتفية"}`,
        ].join("\n")
      : [
          "Smile Care appointment request",
          `Name: ${name.trim()}`,
          `Phone: ${phone.trim()}`,
          `Service: ${service}`,
          `Preferred follow-up method: ${preference}`,
        ].join("\n");

    const number = clinic.whatsapp.replace(/\D/g, "");
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="scmc-booking-form" onSubmit={submit}>
      <div className="scmc-form-grid">
        <label>
          <span>{ar ? "الاسم" : "Name"}</span>
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder={ar ? "الاسم الأول واسم العائلة" : "First & last name"} autoComplete="name" />
        </label>
        <label>
          <span>{ar ? "رقم الهاتف" : "Phone"}</span>
          <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+971" autoComplete="tel" inputMode="tel" />
        </label>
        <label>
          <span>{ar ? "الخدمة" : "Service"}</span>
          <select value={service} onChange={(e) => setService(e.target.value)}>
            {services.map((item) => <option key={item.key} value={item.title}>{ar ? arService[item.key] : item.title}</option>)}
          </select>
        </label>
        <label>
          <span>{ar ? "وسيلة المتابعة المفضلة" : "Preferred follow-up method"}</span>
          <select value={preference} onChange={(e) => setPreference(e.target.value)}>
            <option value="WhatsApp">{ar ? "رسالة واتساب" : "WhatsApp text"}</option>
            <option value="Phone call">{ar ? "مكالمة هاتفية" : "Phone call"}</option>
          </select>
        </label>
      </div>
      <div className="scmc-form-foot">
        <p>{ar ? "سيتم فتح طلب الموعد عبر واتساب ليؤكد فريق سمايل كير الوقت المناسب." : "Your request opens in WhatsApp so the Smile Care team can confirm the preferred time."}</p>
        <button type="submit">
          {ar ? "إرسال طلب الموعد" : "Request appointment"}
          <ArrowUpRight size={13} />
        </button>
      </div>
    </form>
  );
}
