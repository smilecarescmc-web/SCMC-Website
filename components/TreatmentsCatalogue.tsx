"use client";

import gsap from "gsap";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";

type Treatment = {
  index: string;
  department: string;
  reference: string;
  image: string;
  alt: string;
  treatments: readonly string[];
};

type PortalTarget = {
  x: number;
  y: number;
  pointerX: number;
  pointerY: number;
  velocityX: number;
  velocityY: number;
  initialized: boolean;
};

type PortalState = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tiltX: number;
  tiltY: number;
};

const treatments: readonly Treatment[] = [
  {
    index: "(01) //",
    department: "Dental Care",
    reference: "DENTAL / 01",
    image: "/scmc-luxe/services/dental.jpeg",
    alt: "Dental care at Smile Care Medical Center",
    treatments: [
      "Digital Smile Design",
      "Hollywood Smile Porcelain Veneers",
      "Microscopic Endodontics/Root Canal",
      "Surgical Guided Implants",
      "Invisalign Clear Aligners",
      "Pediatric Dentistry",
      "Laser Teeth Whitening",
    ],
  },
  {
    index: "(02) //",
    department: "Botox & Dermal Fillers",
    reference: "AESTHETICS / 02",
    image: "/scmc-luxe/services/botox-fillers.jpeg",
    alt: "Botox and dermal filler treatment at Smile Care Medical Center",
    treatments: [
      "Dynamic Wrinkle Relaxation",
      "Forehead & Frown Lines",
      "Crow's Feet",
      "Lip Augmentation & Contouring",
      "Jawline Sculpting/Texas",
      "Masseter Reduction for Bruxism",
    ],
  },
  {
    index: "(03) //",
    department: "Dermatology & Skin Care",
    reference: "DERMATOLOGY / 03",
    image: "/scmc-luxe/services/dermatology.jpeg",
    alt: "Dermatology and skin care at Smile Care Medical Center",
    treatments: [
      "Clinical Acne Therapy",
      "Melasma & Hyperpigmentation protocols",
      "Platelet-Rich Plasma PRP",
      "Mesotherapy",
      "Medical Chemical Peeling",
      "Biological Barrier Repair",
    ],
  },
  {
    index: "(04) //",
    department: "Clinical Facial Treatments",
    reference: "FACIALS / 04",
    image: "/scmc-luxe/services/facials.jpeg",
    alt: "Clinical facial treatment at Smile Care Medical Center",
    treatments: [
      "Medical Hydrafacial MD®",
      "Deep Pore Extraction & Infusion",
      "Radiofrequency Microneedling",
      "Collagen Induction",
      "Skin Rejuvenation",
    ],
  },
  {
    index: "(05) //",
    department: "Laser Hair Removal",
    reference: "LASER / 05",
    image: "/scmc-luxe/services/laser.jpeg",
    alt: "Laser hair removal at Smile Care Medical Center",
    treatments: [
      "Hospital-grade Dual-Wavelength Alexandrite & Nd:YAG systems",
      "Integrated Contact Cooling",
      "Painless All-Skin-Phototypes protocols",
    ],
  },
  {
    index: "(06) //",
    department: "Clinical Diagnostic Laboratory",
    reference: "LABORATORY / 06",
    image: "/scmc-luxe/services/laboratory.jpeg",
    alt: "Clinical diagnostic laboratory at Smile Care Medical Center",
    treatments: [
      "On-premise fast biochemical assays",
      "Pre-surgical clearances",
      "Complete Blood Count CBC",
      "Hormonal Panels",
      "Allergy Profiling",
    ],
  },
] as const;

const PORTAL_WIDTH = 320;
const PORTAL_HEIGHT = 200;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

export default function TreatmentsCatalogue() {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<PortalTarget>({
    x: 0,
    y: 0,
    pointerX: 0,
    pointerY: 0,
    velocityX: 0,
    velocityY: 0,
    initialized: false,
  });
  const stateRef = useRef<PortalState>({ x: 0, y: 0, vx: 0, vy: 0, tiltX: 0, tiltY: 0 });
  const visibleRef = useRef(false);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const positionPortal = useCallback((clientX: number, clientY: number) => {
    const target = targetRef.current;
    const state = stateRef.current;
    const safeX = clamp(clientX + 28, 16, Math.max(16, window.innerWidth - PORTAL_WIDTH - 16));
    const safeY = clamp(
      clientY - PORTAL_HEIGHT / 2,
      16,
      Math.max(16, window.innerHeight - PORTAL_HEIGHT - 16),
    );

    if (!target.initialized) {
      target.initialized = true;
      target.pointerX = clientX;
      target.pointerY = clientY;
      state.x = safeX;
      state.y = safeY;
    }

    target.velocityX = lerp(target.velocityX, clientX - target.pointerX, 0.42);
    target.velocityY = lerp(target.velocityY, clientY - target.pointerY, 0.42);
    target.pointerX = clientX;
    target.pointerY = clientY;
    target.x = safeX;
    target.y = safeY;
  }, []);

  const revealMedia = useCallback((index: number) => {
    const portal = portalRef.current;
    if (!portal) return;

    const frames = Array.from(portal.querySelectorAll<HTMLElement>("[data-treatment-media]"));
    const next = frames[index];
    if (!next) return;

    const previous = frames[activeRef.current];
    activeRef.current = index;
    setActiveIndex(index);

    if (previous && previous !== next) {
      gsap.set(previous, { visibility: "visible", zIndex: 1 });
    }

    gsap.killTweensOf(next);
    gsap.set(next, { visibility: "visible", zIndex: 2 });
    gsap.fromTo(
      next,
      { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 0.76,
        ease: "expo.out",
        overwrite: true,
        onComplete: () => {
          frames.forEach((frame, frameIndex) => {
            if (frameIndex !== index) gsap.set(frame, { visibility: "hidden", zIndex: 0 });
          });
        },
      },
    );
  }, []);

  const showPortal = useCallback(
    (index: number, clientX: number, clientY: number) => {
      const portal = portalRef.current;
      if (!portal) return;

      setActiveIndex(index);
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (reducedMotion || !finePointer) return;

      positionPortal(clientX, clientY);
      revealMedia(index);

      if (!visibleRef.current) {
        visibleRef.current = true;
        gsap.set(portal, { visibility: "visible" });
        gsap.fromTo(
          portal,
          { clipPath: "inset(50% 50% 50% 50% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            duration: 0.68,
            ease: "expo.out",
            overwrite: true,
          },
        );
      }
    },
    [positionPortal, revealMedia],
  );

  const hidePortal = useCallback(() => {
    const portal = portalRef.current;
    if (!portal || !visibleRef.current) return;

    visibleRef.current = false;
    gsap.to(portal, {
      clipPath: "inset(50% 50% 50% 50% round 18px)",
      duration: 0.44,
      ease: "power4.inOut",
      overwrite: true,
      onComplete: () => {
        if (!visibleRef.current) gsap.set(portal, { visibility: "hidden" });
      },
    });
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap.set("[data-treatment-media]", { visibility: "hidden", zIndex: 0 });
      gsap.set('[data-treatment-media="0"]', { visibility: "visible", zIndex: 1 });
    }, section);

    return () => context.revert();
  }, []);

  useEffect(() => {
    const portal = portalRef.current;
    const tilt = tiltRef.current;
    if (!portal || !tilt) return;

    let rafId = 0;

    const tick = () => {
      const target = targetRef.current;
      const state = stateRef.current;

      if (target.initialized) {
        const desiredX = lerp(state.x, target.x, 0.24);
        const desiredY = lerp(state.y, target.y, 0.24);

        state.vx = (state.vx + (desiredX - state.x) * 0.18) * 0.74;
        state.vy = (state.vy + (desiredY - state.y) * 0.18) * 0.74;
        state.x += state.vx;
        state.y += state.vy;
        state.tiltX = lerp(state.tiltX, clamp(-target.velocityY * 0.34, -7, 7), 0.11);
        state.tiltY = lerp(state.tiltY, clamp(target.velocityX * 0.34, -8, 8), 0.11);
        target.velocityX *= 0.82;
        target.velocityY *= 0.82;

        portal.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
        tilt.style.transform = `perspective(900px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handleEnter = (index: number, event: ReactPointerEvent<HTMLButtonElement>) => {
    showPortal(index, event.clientX, event.clientY);
  };

  const handleMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    positionPortal(event.clientX, event.clientY);
  };

  const handleFocus = (index: number, event: FocusEvent<HTMLButtonElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    showPortal(index, bounds.right - 34, bounds.top + bounds.height / 2);
  };

  return (
    <section
      ref={sectionRef}
      className="scmcf-section scmcf-treatments"
      id="treatments"
      aria-labelledby="treatments-title"
      onPointerLeave={hidePortal}
    >
      <div className="scmcf-shell">
        <div className="scmcf-section-head">
          <p className="scmcf-index">Chapter 02 // Complete Clinical Catalogue</p>
          <h2 id="treatments-title" data-reveal-group aria-label="Every department. Every listed treatment.">
            {"Every department. Every listed treatment.".split(" ").map((word, index) => (
              <span className="scmcf-word-mask" key={`${word}-${index}`} aria-hidden="true">
                <span data-reveal-line>{word}</span>
              </span>
            ))}
          </h2>
        </div>

        <div className="scmcf-treatment-list">
          {treatments.map((department, index) => {
            const active = activeIndex === index;

            return (
              <article className={`scmcf-treatment${active ? " is-active" : ""}`} key={department.department}>
                <button
                  className="scmcf-treatment__trigger"
                  type="button"
                  aria-expanded={active}
                  aria-controls={`treatment-panel-${index}`}
                  onPointerEnter={(event) => handleEnter(index, event)}
                  onPointerMove={handleMove}
                  onFocus={(event) => handleFocus(index, event)}
                  onBlur={hidePortal}
                  onClick={() => setActiveIndex(index)}
                  data-cursor="view"
                >
                  <span className="scmcf-mono">{department.index}</span>
                  <span className="scmcf-treatment__title">{department.department}</span>
                  <span className="scmcf-mono">{department.reference}</span>
                  <span className="scmcf-treatment__mark" aria-hidden="true">
                    +
                  </span>
                </button>

                <div className="scmcf-treatment__panel" id={`treatment-panel-${index}`}>
                  <div className="scmcf-treatment__panel-inner">
                    <p className="scmcf-index">Complete treatment register</p>
                    <ul>
                      {department.treatments.map((treatment, treatmentIndex) => (
                        <li key={treatment}>
                          <span className="scmcf-mono">
                            {String(treatmentIndex + 1).padStart(2, "0")}
                          </span>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div ref={portalRef} className="scmcf-treatment-portal" aria-hidden="true">
        <div ref={tiltRef} className="scmcf-treatment-portal__tilt">
          {treatments.map((department, index) => (
            <div
              className="scmcf-treatment-portal__media"
              data-treatment-media={index}
              key={department.department}
            >
              <Image
                src={department.image}
                alt={department.alt}
                fill
                quality={75}
                sizes="320px"
              />
            </div>
          ))}
          <div className="scmcf-treatment-portal__veil" />
          <span className="scmcf-mono">{treatments[activeIndex].index}</span>
          <p>{treatments[activeIndex].department}</p>
        </div>
      </div>
    </section>
  );
}