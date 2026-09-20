"use client";
import React from "react";
import { Award, Compass } from "lucide-react";

const facultyList = [
  { name: "Dr. Nael Adel", role: "Co-Founder & Clinical Director", specialty: "Specialist Dentist (20+ Years Gov & Private)", ref: "FOUNDER-01" },
  { name: "Mrs. Hanan Al Wawi", role: "Co-Founder & Managing Director", specialty: "MBA Business Management & Patient Experience", ref: "FOUNDER-02" },
  { name: "Dr. Mahra Abdullatif Al Shehhi", role: "Dentist", specialty: "General & Preventative Dental Arts", ref: "DENT-03" },
  { name: "Dr. Javier Hernandez Hernandez", role: "Endodontist Specialist", specialty: "Microscopic Root Canal Therapy", ref: "ENDO-04" },
  { name: "Dr. Maher Ahmed Khamis", role: "Oral & Maxillofacial Surgeon", specialty: "Surgical Extractions & Guided Implants", ref: "SURG-05" },
  { name: "Dr. Asmaa Shehadeh", role: "Dental Surgeon", specialty: "Aesthetic Dentistry & Smile Rehabilitation", ref: "AESTH-06" },
];

export default function Faculty() {
  return (
    <section id="founders" className="py-24 bg-[#F5F4F0] border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-stone-300/80">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-[0.16em] text-stone-500 block mb-2">
              [LEADERSHIP & CLINICAL FACULTY]
            </span>
            <h2 className="text-3xl font-light text-stone-950 tracking-[-0.02em]">
              Founding Vision & Medical Staff
            </h2>
          </div>
          <p className="text-xs font-mono text-stone-500 mt-2 md:mt-0 uppercase tracking-widest">
            Licensed by UAE Ministry of Health & Prevention
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facultyList.map((m, idx) => (
            <div 
              key={idx}
              data-magnetic
              className="bg-white border border-stone-200 p-6 rounded-sm hover:border-stone-400 transition-colors"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">{m.ref}</span>
                <Award className="w-4 h-4 text-stone-400" />
              </div>
              <h3 className="text-base font-medium text-stone-950">{m.name}</h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">{m.role}</p>
              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-600">
                <span>{m.specialty}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
