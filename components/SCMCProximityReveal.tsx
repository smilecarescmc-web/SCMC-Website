"use client";

import { useEffect } from "react";

export function SCMCProximityReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(
        "main > section:not(.scmc-v10-hero), footer"
      )
    );

    for (const node of nodes) {
      node.classList.add("scmc-proximity-node", "is-away");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const ratio = entry.intersectionRatio;

          el.classList.remove("is-away", "is-warm", "is-near");

          if (!entry.isIntersecting || ratio < 0.04) {
            el.classList.add("is-away");
          } else if (ratio < 0.20) {
            el.classList.add("is-warm");
          } else {
            el.classList.add("is-near");
          }
        }
      },
      {
        root: null,
        rootMargin: "8% 0px 8% 0px",
        threshold: [0, 0.04, 0.10, 0.20, 0.40],
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}