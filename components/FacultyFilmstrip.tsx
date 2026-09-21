"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { scmcAssets } from "../lib/scmcCinematicAssets";

type FacultyMember = {
  key: keyof typeof scmcAssets.faculty;
  name: string;
  role: string;
  credential: string;
  group: string;
};

const faculty: FacultyMember[] = [
  {
    key: "nael",
    name: "Dr. Nael Adel",
    role: "Dentist · Co-Founder & Clinical Director",
    credential: "20+ years of dentistry experience",
    group: "CLINICAL LEADERSHIP",
  },
  {
    key: "hanan",
    name: "Mrs. Hanan Al Wawi",
    role: "Co-Founder & Managing Director",
    credential: "Finance graduate · MBA in Business Management",
    group: "EXECUTIVE LEADERSHIP",
  },
  {
    key: "mahra",
    name: "Dr. Mahra Abdullatif Al Shehhi",
    role: "Dentist",
    credential: "BDS · RAK MHSU, UAE · Graduate 2022",
    group: "CLINICAL FACULTY",
  },
  {
    key: "javier",
    name: "Dr. Javier Hernandez Hernandez",
    role: "Endodontist",
    credential: "DDS · Endodontics · 20+ years in advanced endodontic care",
    group: "CLINICAL FACULTY",
  },
  {
    key: "maher",
    name: "Dr. Maher Ahmed Khamis",
    role: "Oral & Maxillofacial Surgeon",
    credential: "Listed by Smile Care Medical Center",
    group: "CLINICAL FACULTY",
  },
  {
    key: "asmaa",
    name: "Dr. Asmaa Shehadeh",
    role: "Dentist",
    credential: "Listed by Smile Care Medical Center",
    group: "CLINICAL FACULTY",
  },
  {
    key: "duaa",
    name: "Dr. Duaa Kassem",
    role: "Dentist",
    credential: "BDS · RAK MHSU, UAE · Graduate 2018 · 7+ years experience",
    group: "CLINICAL FACULTY",
  },
  {
    key: "syed",
    name: "Dr. Syed Anwar",
    role: "Medical Faculty",
    credential: "Smile Care Medical Center",
    group: "CLINICAL FACULTY",
  },
];

export default function FacultyFilmstrip() {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef({
    active: false,
    pointerId: -1,
    startX: 0,
    startScroll: 0,
    lastX: 0,
    lastTime: 0,
    velocity: 0,
    raf: 0,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const atStart = track.scrollLeft <= 1;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      const wantsLeft = event.deltaY < 0;
      const wantsRight = event.deltaY > 0;

      if ((atStart && wantsLeft) || (atEnd && wantsRight)) return;
      event.preventDefault();
      track.scrollLeft += event.deltaY * 0.82;
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      track.removeEventListener("wheel", onWheel);
      if (drag.current.raf) cancelAnimationFrame(drag.current.raf);
    };
  }, []);

  const stopInertia = () => {
    if (drag.current.raf) cancelAnimationFrame(drag.current.raf);
    drag.current.raf = 0;
  };

  const runInertia = () => {
    const track = trackRef.current;
    if (!track) return;
    stopInertia();

    const tick = () => {
      drag.current.velocity *= 0.94;
      track.scrollLeft += drag.current.velocity;
      if (Math.abs(drag.current.velocity) > 0.25) {
        drag.current.raf = requestAnimationFrame(tick);
      } else {
        drag.current.raf = 0;
      }
    };
    drag.current.raf = requestAnimationFrame(tick);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || event.pointerType === "touch") return;
    stopInertia();
    drag.current.active = true;
    drag.current.pointerId = event.pointerId;
    drag.current.startX = event.clientX;
    drag.current.startScroll = track.scrollLeft;
    drag.current.lastX = event.clientX;
    drag.current.lastTime = performance.now();
    drag.current.velocity = 0;
    track.setPointerCapture(event.pointerId);
    track.classList.add("is-dragging");
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active || event.pointerId !== drag.current.pointerId) return;
    const now = performance.now();
    const delta = event.clientX - drag.current.startX;
    track.scrollLeft = drag.current.startScroll - delta;

    const dt = Math.max(8, now - drag.current.lastTime);
    drag.current.velocity = -((event.clientX - drag.current.lastX) / dt) * 16;
    drag.current.lastX = event.clientX;
    drag.current.lastTime = now;
  };

  const finishDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !drag.current.active) return;
    drag.current.active = false;
    if (track.hasPointerCapture(event.pointerId)) track.releasePointerCapture(event.pointerId);
    track.classList.remove("is-dragging");
    runInertia();
  };

  return (
    <section id="faculty" className="scmc-faculty scmc-section" aria-labelledby="faculty-title">
      <div className="scmc-shell scmc-faculty__head">
        <div className="scmc-section-head">
          <div>
            <p className="scmc-kicker">02 / MEDICAL FACULTY</p>
            <h2 id="faculty-title">Clinical leadership and faculty, presented without visual noise.</h2>
          </div>
          <p>
            The filmstrip keeps credentials concise and factual, with facility accreditation anchored to MOHAP License No. 5080.
          </p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="scmc-filmstrip"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        aria-label="Smile Care faculty filmstrip"
      >
        <div className="scmc-filmstrip__spacer" aria-hidden="true" />
        {faculty.map((member, index) => {
          const portrait = scmcAssets.faculty[member.key];
          return (
            <article className="scmc-faculty-card" key={member.name}>
              <div className="scmc-faculty-card__visual">
                {portrait ? (
                  <Image
                    src={portrait}
                    alt={member.name}
                    fill
                    sizes="(max-width: 700px) 78vw, 330px"
                  />
                ) : (
                  <div className="scmc-faculty-card__monogram" aria-hidden="true">
                    <span>{member.name.replace(/^(Dr\.|Mrs\.)\s*/i, "").split(" ").slice(0, 2).map((part) => part[0]).join("")}</span>
                  </div>
                )}
                <div className="scmc-faculty-card__counter">{String(index + 1).padStart(2, "0")} / {String(faculty.length).padStart(2, "0")}</div>
              </div>
              <div className="scmc-faculty-card__body">
                <div className="scmc-faculty-card__meta"><span>{member.group}</span><span>MOHAP FACILITY 5080</span></div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <small>{member.credential}</small>
              </div>
            </article>
          );
        })}
        <div className="scmc-filmstrip__endcap" aria-hidden="true">
          <span>SCMC</span>
          <small>Established 2007 · Ras Al Khaimah</small>
        </div>
      </div>
    </section>
  );
}