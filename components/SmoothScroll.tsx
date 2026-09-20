"use client";

import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type SmoothScrollProps = PropsWithChildren<{
  className?: string;
}>;

export function SmoothScroll({ children, className = "" }: SmoothScrollProps) {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    document.documentElement.classList.toggle("scmc-reduced-motion", reduceMotion);

    let lenis: Lenis | null = null;
    let ticker: ((time: number) => void) | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.05,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      });

      lenis.on("scroll", ScrollTrigger.update);

      ticker = (time: number) => {
        lenis?.raf(time * 1000);
      };

      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);
    }

    ScrollTrigger.refresh();

    if (coarsePointer || reduceMotion || !cursorRef.current) {
      return () => {
        if (ticker) gsap.ticker.remove(ticker);
        lenis?.destroy();
      };
    }

    const cursor = cursorRef.current;

    const state = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      tx: window.innerWidth / 2,
      ty: window.innerHeight / 2,
      speed: 0,
      visible: false,
      scale: 1,
    };

    let frame = 0;
    let previousX = state.x;
    let previousY = state.y;

    const renderCursor = () => {
      state.x += (state.tx - state.x) * 0.18;
      state.y += (state.ty - state.y) * 0.18;

      const dx = state.x - previousX;
      const dy = state.y - previousY;
      const velocity = Math.min(16, Math.hypot(dx, dy));
      state.speed += (velocity - state.speed) * 0.2;

      previousX = state.x;
      previousY = state.y;

      const stretch = 1 + state.speed * 0.012;
      const squash = 1 - Math.min(0.12, state.speed * 0.006);

      cursor.style.transform =
        `translate3d(${state.x}px, ${state.y}px, 0) translate(-50%, -50%) scale(${state.scale * stretch}, ${state.scale * squash})`;
      cursor.style.opacity = state.visible ? "1" : "0";

      frame = requestAnimationFrame(renderCursor);
    };

    const handlePointerMove = (event: PointerEvent) => {
      state.tx = event.clientX;
      state.ty = event.clientY;
      state.visible = true;
    };

    const handlePointerLeave = () => {
      state.visible = false;
    };

    const magneticElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-magnetic]")
    );

    const magneticCleanups: Array<() => void> = [];

    magneticElements.forEach((element) => {
      const onMove = (event: PointerEvent) => {
        const rect = element.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);

        element.style.transform = `translate3d(${dx * 0.12}px, ${dy * 0.12}px, 0)`;
        state.scale = 1.7;
      };

      const onLeave = () => {
        element.style.transform = "translate3d(0, 0, 0)";
        state.scale = 1;
      };

      element.addEventListener("pointermove", onMove);
      element.addEventListener("pointerleave", onLeave);

      magneticCleanups.push(() => {
        element.removeEventListener("pointermove", onMove);
        element.removeEventListener("pointerleave", onLeave);
      });
    });

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);
    frame = requestAnimationFrame(renderCursor);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      magneticCleanups.forEach((cleanup) => cleanup());

      if (ticker) gsap.ticker.remove(ticker);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className={`scmc-site ${className}`.trim()}>
      {children}
      <div ref={cursorRef} className="scmc-cursor" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}

export default SmoothScroll;