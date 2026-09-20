"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { clinic, services } from "@/lib/scmcFullData";

export function AppointmentForm() {
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>(services[0].title);
  const [preference, setPreference] = useState<string>("WhatsApp");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      "Smile Care appointment request",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Service: ${service}`,
      `Preferred communication: ${preference}`,
    ].join("\n");

    const number = clinic.whatsapp.replace(/\D/g, "");
    window.open(
      `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form className="scmc-booking-form" onSubmit={submit}>
      <div className="scmc-form-grid">
        <label>
          <span>Name</span>
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="First & last name"
            autoComplete="name"
          />
        </label>

        <label>
          <span>Phone</span>
          <input
            required
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            placeholder="+971"
            autoComplete="tel"
            inputMode="tel"
          />
        </label>

        <label>
          <span>Service</span>
          <select value={service} onChange={(event) => setService(event.target.value)}>
            {services.map((item) => (
              <option key={item.key} value={item.title}>{item.title}</option>
            ))}
          </select>
        </label>

        <label>
          <span>Preferred communication</span>
          <select value={preference} onChange={(event) => setPreference(event.target.value)}>
            <option value="WhatsApp">WhatsApp text</option>
            <option value="Phone call">Phone call</option>
          </select>
        </label>
      </div>

      <div className="scmc-form-foot">
        <p>Your appointment request opens in WhatsApp so the Smile Care team can confirm the preferred time.</p>
        <button type="submit">
          Request appointment
          <ArrowUpRight size={12} strokeWidth={1.5} />
        </button>
      </div>
    </form>
  );
}