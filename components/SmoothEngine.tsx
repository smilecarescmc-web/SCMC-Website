"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothEngine() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const lenis = new Lenis({
      lerp: reduceMotion ? 1 : 0.085,
      smoothWheel: !reduceMotion,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: true,
      autoRaf: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tickLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickLenis);
    gsap.ticker.lagSmoothing(0);

    let raf = 0;
    let activeMagnetic: HTMLElement | null = null;
    const target = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 };
    const current = { ...target };
    const previous = { ...target };

    const resetMagnetic = (element: HTMLElement | null) => {
      if (!element) return;
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: true,
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;

      const hovered = document
        .elementFromPoint(event.clientX, event.clientY)
        ?.closest<HTMLElement>("[data-magnetic]") ?? null;

      if (hovered !== activeMagnetic) {
        resetMagnetic(activeMagnetic);
        activeMagnetic = hovered;
      }

      if (activeMagnetic) {
        const rect = activeMagnetic.getBoundingClientRect();
        const localX = event.clientX - (rect.left + rect.width * 0.5);
        const localY = event.clientY - (rect.top + rect.height * 0.5);
        gsap.to(activeMagnetic, {
          x: localX * 0.075,
          y: localY * 0.075,
          duration: 0.35,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    const animateCursor = () => {
      const cursor = cursorRef.current;
      const dot = dotRef.current;
      if (!cursor || !dot) return;

      previous.x = current.x;
      previous.y = current.y;
      current.x += (target.x - current.x) * 0.16;
      current.y += (target.y - current.y) * 0.16;

      const vx = current.x - previous.x;
      const vy = current.y - previous.y;
      const velocity = Math.min(18, Math.hypot(vx, vy));
      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = 1 + velocity * 0.022;
      const squash = Math.max(0.78, 1 - velocity * 0.012);

      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${stretch}, ${squash})`;
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      raf = window.requestAnimationFrame(animateCursor);
    };

    if (finePointer && !reduceMotion) {
      document.documentElement.dataset.cursor = "cinematic";
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      raf = window.requestAnimationFrame(animateCursor);
    }

    const scrollspyLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-scrollspy]"));
    const scrollspySections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"));
    const setActiveSection = (id: string) => {
      scrollspyLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${id}`;
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target instanceof HTMLElement) setActiveSection(visible.target.id);
      },
      { rootMargin: "-32% 0px -56% 0px", threshold: [0.01, 0.2, 0.5] },
    );
    scrollspySections.forEach((section) => sectionObserver.observe(section));

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh, { once: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("load", refresh);
      sectionObserver.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
      resetMagnetic(activeMagnetic);
      delete document.documentElement.dataset.cursor;
      gsap.ticker.remove(tickLenis);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id?.startsWith("scmc-")) trigger.kill();
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="scmc-cursor" aria-hidden="true" />
      <div ref={dotRef} className="scmc-cursor-dot" aria-hidden="true" />
    </>
  );
}