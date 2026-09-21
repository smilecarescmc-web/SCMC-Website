"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = [
  ".scmc-section-head",
  ".scmc-section-copy",
  ".scmc-story__media",
  ".scmc-founder-card",
  ".scmc-reading-panel",
  ".scmc-service-card",
  ".scmc-service-row",
  ".scmc-doctor-mini",
  ".scmc-insurance-card",
  ".scmc-contact-photo",
  ".scmc-location-card",
  ".scmc-contact-row",
  ".scmc-booking-panel",
  ".scmc-cta-panel",
  ".scmc-benefit",
  ".scmc-blog-card",
  ".scmc-related-card",
  ".scmc-profile-body > *",
  ".scmc-article__hero",
  ".scmc-article__layout",
].join(",");

export function SCMCProximityReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    let observer: IntersectionObserver | null = null;
    let timer = 0;

    timer = window.setTimeout(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
        .filter((node) => !node.closest(".scmc-doctor-discovery"));

      for (const node of nodes) {
        node.classList.add("scmc-proximity-node", "is-away");
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const ratio = entry.intersectionRatio;
            el.classList.remove("is-away", "is-warm", "is-near");

            if (!entry.isIntersecting || ratio < 0.055) {
              el.classList.add("is-away");
            } else if (ratio < 0.24) {
              el.classList.add("is-warm");
            } else {
              el.classList.add("is-near");
            }
          }
        },
        {
          rootMargin: "7% 0px 7% 0px",
          threshold: [0, 0.055, 0.12, 0.24, 0.42],
        }
      );

      nodes.forEach((node) => observer?.observe(node));
    }, 70);

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
