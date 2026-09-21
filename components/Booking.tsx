"use client";
import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Booking() {
  return (
    <section id="contact" className="py-24 bg-stone-950 text-stone-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-400 block mb-3">
            [LOCATION & APPOINTMENTS]
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-snug">
            Book your consultation at Ras Al Khaimah.
          </h2>
          <p className="mt-4 text-stone-400 text-sm font-light leading-relaxed max-w-md">
            Serving the community since 2007. We welcome patients of all ages for comprehensive dental and aesthetic treatments.
          </p>

          <div className="mt-10 space-y-4 text-xs font-mono text-stone-300">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-stone-400" />
              <span>Hamad Tower, 14B St, M Floor, Al Nakheel, Ras Al Khaimah</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-stone-400" />
              <span>+971 7 228 2080 / WhatsApp: +971 54 321 7712</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-stone-400" />
              <span>info@smilecare.ae</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-stone-400" />
              <span>Saturday – Thursday: 09:00 AM – 09:00 PM</span>
            </div>
          </div>
        </div>

        <div className="bg-[#141414] border border-stone-800 p-8 rounded-sm">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 mb-2">Patient Full Name</label>
              <input type="text" placeholder="Full name" className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-stone-500 rounded" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 mb-2">Phone / WhatsApp</label>
                <input type="tel" placeholder="+971 -- --- ----" className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-sm text-stone-100 placeholder-stone-600 focus:outline-none focus:border-stone-500 rounded" />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider font-mono text-stone-400 mb-2">Department</label>
                <select className="w-full bg-stone-900 border border-stone-800 px-4 py-3 text-sm text-stone-100 focus:outline-none focus:border-stone-500 rounded">
                  <option>Dental Care</option>
                  <option>Botox & Fillers</option>
                  <option>Dermatology & Skin</option>
                  <option>Facial Treatment</option>
                  <option>Laser Hair Removal</option>
                  <option>Clinical Laboratory</option>
                </select>
              </div>
            </div>
            <button className="w-full mt-2 bg-stone-100 text-stone-950 py-3.5 text-xs font-mono uppercase tracking-[0.14em] font-medium hover:bg-stone-200 transition-colors rounded">
              Confirm Consultation Request
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
