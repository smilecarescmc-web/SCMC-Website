"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { serviceIndex, serviceIndexAr } from "@/lib/v2-content";

export default function V2ServiceIndex({ isArabic = false }: { isArabic?: boolean }) {
  const services = isArabic ? serviceIndexAr : serviceIndex;
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const physics = useRef({ x: 0, y: 0, vx: 0, vy: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const state = physics.current;
    state.x = window.innerWidth * 0.68;
    state.y = window.innerHeight * 0.45;
    state.tx = state.x;
    state.ty = state.y;

    let frame = 0;
    const draw = () => {
      const stiffness = 0.11;
      const damping = 0.76;
      state.vx = (state.vx + (state.tx - state.x) * stiffness) * damping;
      state.vy = (state.vy + (state.ty - state.y) * stiffness) * damping;
      state.x += state.vx;
      state.y += state.vy;

      if (portalRef.current) {
        const rotation = Math.max(-4, Math.min(4, state.vx * 0.05));
        portalRef.current.style.transform =
          `translate3d(${state.x + 24}px, ${state.y + 18}px, 0) rotate(${rotation}deg)`;
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      className="v2-service-index"
      onPointerMove={(event: PointerEvent<HTMLDivElement>) => {
        physics.current.tx = event.clientX;
        physics.current.ty = event.clientY;
      }}
    >
      {services.map((service, index) => (
        <Link
          key={service.code}
          href={service.href}
          className="v2-service-row"
          onPointerEnter={() => setActive(index)}
          data-cursor
        >
          <span className="v2-mono">{service.code}</span>
          <strong>{service.title}</strong>
          <span className="v2-service-row__meta">Explore discipline</span>
          <span aria-hidden="true">↗</span>
        </Link>
      ))}

      <div ref={portalRef} className="v2-service-portal" aria-hidden="true">
        <img loading="lazy" decoding="async" src={services[active].image} alt="" />
        <div>
          <span>{services[active].code}</span>
          <span>{services[active].title}</span>
        </div>
      </div>
    </div>
  );
}
