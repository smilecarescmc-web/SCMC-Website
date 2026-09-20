"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function AestheticMotion() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const glow = document.createElement("div");
    glow.className = "scmc-cursor-glow";
    document.body.appendChild(glow);

    let gx = window.innerWidth / 2;
    let gy = window.innerHeight / 2;
    let tx = gx;
    let ty = gy;
    let cursorRaf = 0;

    const onPointer = (event: PointerEvent) => {
      tx = event.clientX;
      ty = event.clientY;
    };

    const drawCursor = () => {
      gx += (tx - gx) * 0.13;
      gy += (ty - gy) * 0.13;
      glow.style.transform = `translate3d(${gx - 120}px, ${gy - 120}px, 0)`;
      cursorRaf = requestAnimationFrame(drawCursor);
    };

    window.addEventListener("pointermove", onPointer, { passive: true });

    if (!reduced && window.matchMedia("(pointer:fine)").matches) {
      cursorRaf = requestAnimationFrame(drawCursor);
    } else {
      glow.style.display = "none";
    }

    let lenis: Lenis | null = null;
    let scrollRaf = 0;

    if (!reduced) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 0.84,
        touchMultiplier: 1,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        scrollRaf = requestAnimationFrame(raf);
      };
      scrollRaf = requestAnimationFrame(raf);
    }

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-soft-reveal], [data-media-reveal]"
      )
    );

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => {
      observer.disconnect();
      lenis?.destroy();
      cancelAnimationFrame(scrollRaf);
      cancelAnimationFrame(cursorRaf);
      window.removeEventListener("pointermove", onPointer);
      glow.remove();
    };
  }, []);

  return null;
}