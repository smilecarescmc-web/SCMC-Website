"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function LocaleTemplate({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      node,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.55,
        ease: "power2.out",
        // Critical for fixed/sticky GSAP sections:
        // never leave a transformed ancestor around after the route reveal.
        onComplete: () => gsap.set(node, { clearProps: "transform" }),
      }
    );
  }, []);

  return <div ref={ref}>{children}</div>;
}
