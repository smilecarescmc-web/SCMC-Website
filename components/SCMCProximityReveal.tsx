"use client";

import { useEffect } from "react";

export function SCMCProximityReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".scmc-section > .scmc-shell")
    );

    for (const node of nodes) node.classList.add("scmc-proximity-node", "is-away");

    const observer = new IntersectionObserver(
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
      { rootMargin: "4% 0px 4% 0px", threshold: [0, .06, .12, .22, .4] }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
