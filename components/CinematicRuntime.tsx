"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main [data-cinematic-reveal]",
  "main [data-final-reveal]",
  "main h1",
  "main h2",
  "main h3",
  "main article",
  "main figure",
  "main .final-service-row",
  "main .final-doctor",
  "main .final-insurance-item",
  "main .final-page-card",
  "main .service-card",
  "main .doctor-card",
].join(",");

export function CinematicRuntime() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer =
      window.matchMedia("(pointer: fine)").matches &&
      window.innerWidth >= 900;

    let lenis: Lenis | null = null;
    let raf = 0;

    if (!reduced && finePointer) {
      lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        syncTouch: false,
      });

      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };

      raf = requestAnimationFrame(loop);
    }

    const revealNodes = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    ).filter((element) => !element.closest("[data-cinematic-static]"));

    if (reduced) {
      revealNodes.forEach((element) => {
        element.classList.add("cin-blur-reveal", "is-cinematic-visible");
      });
    }

    const observer = reduced
      ? null
      : new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              entry.target.classList.toggle(
                "is-cinematic-visible",
                entry.isIntersecting
              );
            });
          },
          {
            threshold: 0.08,
            rootMargin: "0px 0px -4% 0px",
          }
        );

    if (observer) {
      revealNodes.forEach((element) => {
        element.classList.add("cin-blur-reveal");
        observer.observe(element);
      });
    }

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}

export default CinematicRuntime;