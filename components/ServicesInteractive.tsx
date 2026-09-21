"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { masterpieceAssets } from "../lib/masterpieceAssets";

type ServiceKey =
  | "dental"
  | "injectables"
  | "dermatology"
  | "facial"
  | "laser"
  | "laboratory";

type Service = {
  number: string;
  key: ServiceKey;
  title: string;
  note: string;
  detail: string;
};

export type ServicesInteractiveProps = {
  className?: string;
} & Record<string, unknown>;

const services: readonly Service[] = [
  {
    number: "01",
    key: "dental",
    title: "Dental Care",
    note: "Restorative + cosmetic",
    detail: "Cosmetic Smile Design · Porcelain Veneers · Microscopic Endodontics · Guided Implants",
  },
  {
    number: "02",
    key: "injectables",
    title: "Botox & Dermal Fillers",
    note: "Facial harmonization",
    detail: "Facial Balancing · Masseter Slimming · Natural Volume",
  },
  {
    number: "03",
    key: "dermatology",
    title: "Dermatology & Skin Care",
    note: "Clinical skin health",
    detail: "Acne Protocols · Melasma Correction · Cellular Barrier Health",
  },
  {
    number: "04",
    key: "facial",
    title: "Facial Treatments",
    note: "Regenerative protocols",
    detail: "Hydrafacial MD · Microneedling · Transdermal Infusions",
  },
  {
    number: "05",
    key: "laser",
    title: "Laser Hair Removal",
    note: "Dual wavelength",
    detail: "Alexandrite & Nd:YAG · Contact Cooling",
  },
  {
    number: "06",
    key: "laboratory",
    title: "Clinical Laboratory",
    note: "On-site diagnostics",
    detail: "Diagnostic Screening · Rapid Assays",
  },
] as const;

export function ServicesInteractive({ className = "" }: ServicesInteractiveProps = {}) {
  const [activeKey, setActiveKey] = useState<ServiceKey | null>(null);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  const activeService = useMemo(
    () => services.find((service) => service.key === activeKey) ?? null,
    [activeKey]
  );

  const activeImage = activeKey
    ? masterpieceAssets.services[activeKey] ?? masterpieceAssets.hero
    : null;

  useEffect(() => {
    let frame = 0;

    const render = () => {
      const portal = portalRef.current;

      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.14;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.14;

      const dx = targetRef.current.x - currentRef.current.x;
      const dy = targetRef.current.y - currentRef.current.y;

      rotationRef.current.y += (Math.max(-5, Math.min(5, dx * 0.018)) - rotationRef.current.y) * 0.12;
      rotationRef.current.x += (Math.max(-4, Math.min(4, -dy * 0.014)) - rotationRef.current.x) * 0.12;

      if (portal) {
        portal.style.transform =
          `translate3d(${currentRef.current.x}px, ${currentRef.current.y}px, 0) ` +
          `translate(-50%, -50%) perspective(900px) ` +
          `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
      }

      frame = requestAnimationFrame(render);
    };

    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, []);

  const updateTarget = (clientX: number, clientY: number) => {
    const offsetX = clientX > window.innerWidth * 0.68 ? -190 : 190;
    const offsetY = clientY > window.innerHeight * 0.65 ? -90 : 30;

    targetRef.current.x = clientX + offsetX;
    targetRef.current.y = clientY + offsetY;

    if (currentRef.current.x === 0 && currentRef.current.y === 0) {
      currentRef.current.x = targetRef.current.x;
      currentRef.current.y = targetRef.current.y;
    }
  };

  return (
    <section id="services" className={`scmc-section scmc-services ${className}`.trim()}>
      <div className="scmc-shell">
        <div className="scmc-section-kicker">
          <span>(01) — CLINICAL MATRIX</span>
          <span>6 CORE DEPARTMENTS</span>
        </div>

        <div className="scmc-section-heading-grid">
          <h2>Treatment architecture</h2>
          <p>
            One multidisciplinary center, organized around precise treatment planning,
            conservative clinical judgment and clear patient communication.
          </p>
        </div>

        <div
          className="scmc-treatment-matrix"
          onPointerLeave={() => setActiveKey(null)}
        >
          {services.map((service) => (
            <article
              key={service.key}
              className={`scmc-treatment-row ${activeKey === service.key ? "is-active" : ""}`}
              onPointerEnter={(event) => {
                setActiveKey(service.key);
                updateTarget(event.clientX, event.clientY);
              }}
              onPointerMove={(event) => updateTarget(event.clientX, event.clientY)}
            >
              <span className="scmc-treatment-index">({service.number})</span>

              <div className="scmc-treatment-name">
                <h3>{service.title}</h3>
                <small>{service.note}</small>
              </div>

              <p>{service.detail}</p>

              <span className="scmc-treatment-arrow" aria-hidden="true">
                â†—
              </span>
            </article>
          ))}
        </div>

        <div className="scmc-services-foot">
          <span>[HOVER // EXPLORE DISCIPLINE]</span>
          <a href="https://wa.me/971543217712" target="_blank" rel="noreferrer" data-magnetic>
            Discuss a treatment plan
            <span aria-hidden="true">â†—</span>
          </a>
        </div>
      </div>

      <div
        ref={portalRef}
        className={`scmc-floating-portal ${activeService && activeImage ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        {activeService && activeImage ? (
          <>
            <div className="scmc-floating-portal-media">
              <Image
                src={activeImage}
                alt=""
                fill
                sizes="320px"
                className="scmc-cover-image"
              />
            </div>
            <div className="scmc-floating-portal-meta">
              <span>({activeService.number})</span>
              <strong>{activeService.title}</strong>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

export default ServicesInteractive;