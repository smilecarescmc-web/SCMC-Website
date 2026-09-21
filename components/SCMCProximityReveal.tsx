"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const SELECTOR = [
  ".scmc-section-head", ".scmc-section-copy", ".scmc-story__media", ".scmc-founder-card",
  ".scmc-reading-panel", ".scmc-service-card", ".scmc-service-row", ".scmc-doctor-mini",
  ".scmc-doctor-card", ".scmc-directory-cta", ".scmc-standout__item", ".scmc-home-faq__item",
  ".scmc-review-card", ".scmc-care-pillar", ".scmc-discount-logo", ".scmc-insurance-card",
  ".scmc-contact-photo", ".scmc-location-card", ".scmc-contact-row", ".scmc-booking-panel",
  ".scmc-cta-panel", ".scmc-benefit", ".scmc-blog-card", ".scmc-related-card",
  ".scmc-profile-body > *", ".scmc-article__hero", ".scmc-article__layout",
].join(",");

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function SCMCProximityReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const idleWindow = window as IdleWindow;
    let observer: IntersectionObserver | null = null;
    let idleHandle: number | null = null;
    let fallbackTimer: number | null = null;

    const setup = () => {
      const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTOR))
        .filter((node) => !node.closest(".scmc-doctor-discovery"));

      for (const node of nodes) node.classList.add("scmc-proximity-node", "is-away");

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const el = entry.target as HTMLElement;
            const ratio = entry.intersectionRatio;
            el.classList.remove("is-away", "is-warm", "is-near");
            if (!entry.isIntersecting || ratio < 0.06) el.classList.add("is-away");
            else if (ratio < 0.22) el.classList.add("is-warm");
            else el.classList.add("is-near");
          }
        },
        { rootMargin: "7% 0px 7% 0px", threshold: [0, 0.06, 0.22] }
      );

      nodes.forEach((node) => observer?.observe(node));
    };

    if (idleWindow.requestIdleCallback) idleHandle = idleWindow.requestIdleCallback(setup, { timeout: 420 });
    else fallbackTimer = window.setTimeout(setup, 150);

    return () => {
      if (idleHandle !== null) idleWindow.cancelIdleCallback?.(idleHandle);
      if (fallbackTimer !== null) window.clearTimeout(fallbackTimer);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}