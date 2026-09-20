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

type Service = {
  count: string;
  name: string;
  description: string;
  reference: string;
  image: string;
  alt: string;
};

type PortalTarget = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  lastPointerX: number;
  lastPointerY: number;
  initialized: boolean;
};

type PortalPhysics = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tiltX: number;
  tiltY: number;
};

const services: Service[] = [
  {
    count: "(01) //",
    name: "Dental Care",
    description: "Restorative, cosmetic and preventive dentistry.",
    reference: "DENT / 01",
    image: "/scmc-luxe/services/dental.jpeg",
    alt: "Smile Care dental treatment",
  },
  {
    count: "(02) //",
    name: "Botox & Fillers",
    description: "Measured injectables with naturally balanced outcomes.",
    reference: "INJ / 02",
    image: "/scmc-luxe/services/botox-fillers.jpeg",
    alt: "Smile Care aesthetic injectable treatment",
  },
  {
    count: "(03) //",
    name: "Dermatology",
    description: "Consultant-led diagnosis and considered skin health.",
    reference: "DERM / 03",
    image: "/scmc-luxe/services/dermatology.jpeg",
    alt: "Smile Care dermatology treatment",
  },
  {
    count: "(04) //",
    name: "Facials",
    description: "Layered protocols for clarity, hydration and luminosity.",
    reference: "FACE / 04",
    image: "/scmc-luxe/services/facials.jpeg",
    alt: "Smile Care facial treatment",
  },
  {
    count: "(05) //",
    name: "Laser",
    description: "Technology-led treatments calibrated to the individual.",
    reference: "LASER / 05",
    image: "/scmc-luxe/services/laser.jpeg",
    alt: "Smile Care laser treatment",
  },
  {
    count: "(06) //",
    name: "Laboratory",
    description: "Integrated diagnostics supporting confident clinical care.",
    reference: "LAB / 06",
    image: "/scmc-luxe/services/laboratory.jpeg",
    alt: "Smile Care clinical laboratory",
  },
];

const PORTAL_WIDTH = 320;
const PORTAL_HEIGHT = 200;
const PORTAL_GAP = 26;

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function lerp(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

export default function InteractiveIndex() {
  const sectionRef = useRef<HTMLElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const targetRef = useRef<PortalTarget>({
    x: 0,
    y: 0,
    velocityX: 0,
    velocityY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    initialized: false,
  });

  const physicsRef = useRef<PortalPhysics>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tiltX: 0,
    tiltY: 0,
  });

  const revealImage = useCallback((index: number) => {
    const portal = portalRef.current;
    if (!portal) return;

    const images = Array.from(
      portal.querySelectorAll<HTMLElement>("[data-portal-image]"),
    );
    const nextImage = images[index];
    if (!nextImage) return;

    const previousIndex = activeRef.current;
    const previousImage = images[previousIndex];
    activeRef.current = index;
    setActiveIndex(index);

    if (previousImage && previousImage !== nextImage) {
      gsap.set(previousImage, { zIndex: 1, visibility: "visible" });
    }

    gsap.killTweensOf(nextImage);
    gsap.set(nextImage, { zIndex: 2, visibility: "visible" });
    gsap.fromTo(
      nextImage,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        scale: 1.16,
      },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 0.78,
        ease: "expo.out",
        overwrite: true,
        onComplete: () => {
          images.forEach((image, imageIndex) => {
            if (imageIndex !== index) {
              gsap.set(image, { visibility: "hidden", zIndex: 0 });
            }
          });
        },
      },
    );
  }, []);

  const setPointerTarget = useCallback((clientX: number, clientY: number) => {
    const target = targetRef.current;
    const physics = physicsRef.current;
    const safeX = clamp(
      clientX + PORTAL_GAP,
      16,
      Math.max(16, window.innerWidth - PORTAL_WIDTH - 16),
    );
    const safeY = clamp(
      clientY - PORTAL_HEIGHT / 2,
      16,
      Math.max(16, window.innerHeight - PORTAL_HEIGHT - 16),
    );

    if (!target.initialized) {
      target.initialized = true;
      target.lastPointerX = clientX;
      target.lastPointerY = clientY;
      target.x = safeX;
      target.y = safeY;
      physics.x = safeX;
      physics.y = safeY;
    }

    target.velocityX = lerp(target.velocityX, clientX - target.lastPointerX, 0.42);
    target.velocityY = lerp(target.velocityY, clientY - target.lastPointerY, 0.42);
    target.lastPointerX = clientX;
    target.lastPointerY = clientY;
    target.x = safeX;
    target.y = safeY;
  }, []);

  const showPortal = useCallback(
    (index: number, clientX: number, clientY: number) => {
      const portal = portalRef.current;
      if (!portal) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (reduceMotion || !finePointer) return;

      setPointerTarget(clientX, clientY);
      revealImage(index);

      if (!visibleRef.current) {
        visibleRef.current = true;
        gsap.set(portal, { visibility: "visible" });
        gsap.fromTo(
          portal,
          { clipPath: "inset(50% 50% 50% 50% round 18px)" },
          {
            clipPath: "inset(0% 0% 0% 0% round 18px)",
            duration: 0.72,
            ease: "expo.out",
            overwrite: true,
          },
        );
      }
    },
    [revealImage, setPointerTarget],
  );

  const hidePortal = useCallback(() => {
    const portal = portalRef.current;
    if (!portal || !visibleRef.current) return;

    visibleRef.current = false;
    gsap.to(portal, {
      clipPath: "inset(50% 50% 50% 50% round 18px)",
      duration: 0.48,
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
      gsap.set("[data-portal-image]", {
        visibility: "hidden",
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
      });
      gsap.set('[data-portal-image="0"]', { visibility: "visible", zIndex: 1 });
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
      const physics = physicsRef.current;

      if (target.initialized) {
        const lerpedTargetX = lerp(physics.x, target.x, 0.24);
        const lerpedTargetY = lerp(physics.y, target.y, 0.24);
        const springX = (lerpedTargetX - physics.x) * 0.18;
        const springY = (lerpedTargetY - physics.y) * 0.18;

        physics.vx = (physics.vx + springX) * 0.74;
        physics.vy = (physics.vy + springY) * 0.74;
        physics.x += physics.vx;
        physics.y += physics.vy;
        physics.tiltX = lerp(
          physics.tiltX,
          clamp(-target.velocityY * 0.34, -7, 7),
          0.11,
        );
        physics.tiltY = lerp(
          physics.tiltY,
          clamp(target.velocityX * 0.34, -8, 8),
          0.11,
        );

        target.velocityX *= 0.82;
        target.velocityY *= 0.82;

        portal.style.transform = `translate3d(${physics.x}px, ${physics.y}px, 0)`;
        tilt.style.transform = `perspective(900px) rotateX(${physics.tiltX}deg) rotateY(${physics.tiltY}deg)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  const handlePointerEnter = (index: number, event: ReactPointerEvent<HTMLAnchorElement>) => {
    showPortal(index, event.clientX, event.clientY);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    setPointerTarget(event.clientX, event.clientY);
  };

  const handleFocus = (index: number, event: FocusEvent<HTMLAnchorElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    showPortal(index, bounds.right - 34, bounds.top + bounds.height / 2);
  };

  return (
    <section
      ref={sectionRef}
      className="scmcx-index"
      id="disciplines"
      aria-labelledby="scmcx-index-title"
      onPointerLeave={hidePortal}
    >
      <div className="scmcx-shell">
        <div className="scmcx-index__header">
          <p className="scmcx-section-index">Chapter 02 // Clinical archive</p>

          <div className="scmcx-section-copy">
            <h2
              className="scmcx-section-title"
              id="scmcx-index-title"
              data-scroll-words
              aria-label="Six disciplines. One considered standard of care."
            >
              {"Six disciplines. One considered standard of care."
                .split(" ")
                .map((word, index) => (
                  <span className="scmcx-word-mask" key={`${word}-${index}`} aria-hidden="true">
                    <span className="scmcx-word-inner" data-word>
                      {word}
                    </span>
                  </span>
                ))}
            </h2>

            <p>
              Move through the index. Each discipline is revealed as a living visual field—never a
              boxed card—while the archive itself stays precise, calm and clinically legible.
            </p>
          </div>
        </div>

        <div data-draw-line aria-hidden="true" />

        <ol className="scmcx-service-list">
          {services.map((service, index) => (
            <li className="scmcx-service" key={service.name}>
              <a
                className="scmcx-service__link"
                href="#consultation"
                data-cursor="view"
                onPointerEnter={(event) => handlePointerEnter(index, event)}
                onPointerMove={handlePointerMove}
                onFocus={(event) => handleFocus(index, event)}
                onBlur={hidePortal}
              >
                <span className="scmcx-service__count">{service.count}</span>
                <h3 className="scmcx-service__title">{service.name}</h3>
                <p className="scmcx-service__description">{service.description}</p>
                <span className="scmcx-service__arrow" aria-hidden="true">
                  â†—
                </span>
                <span className="scmcx-service__ref" hidden>
                  {service.reference}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div ref={portalRef} className="scmcx-portal" aria-hidden="true">
        <div ref={tiltRef} className="scmcx-portal__tilt">
          <div className="scmcx-portal__media">
            {services.map((service, index) => (
              <div
                className="scmcx-portal__image"
                data-portal-image={index}
                key={service.name}
              >
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  quality={90}
                  sizes="320px"
                />
              </div>
            ))}
          </div>
          <div className="scmcx-portal__overlay" />
          <span className="scmcx-portal__counter">{services[activeIndex].count}</span>
          <p className="scmcx-portal__label">{services[activeIndex].name}</p>
        </div>
      </div>
    </section>
  );
}