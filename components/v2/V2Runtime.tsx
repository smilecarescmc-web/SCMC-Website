"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function V2Runtime() {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
      anchors: true,
      respectReducedMotion: true,
    });

    let scrollFrame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      scrollFrame = requestAnimationFrame(raf);
    };
    scrollFrame = requestAnimationFrame(raf);

    const updateProgress = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      document.documentElement.style.setProperty(
        "--v2-scroll-progress",
        String(Math.min(1, Math.max(0, window.scrollY / max))),
      );
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    const cursor = cursorRef.current;
    let cursorFrame = 0;
    const magneticCleanup: Array<() => void> = [];

    if (cursor && finePointer && !reduced) {
      const state = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        vx: 0,
        vy: 0,
        tx: window.innerWidth / 2,
        ty: window.innerHeight / 2,
      };

      const onMove = (event: PointerEvent) => {
        state.tx = event.clientX;
        state.ty = event.clientY;
        cursor.dataset.visible = "true";
      };

      const onLeave = () => {
        cursor.dataset.visible = "false";
      };

      const draw = () => {
        const stiffness = 0.15;
        const damping = 0.7;
        state.vx = (state.vx + (state.tx - state.x) * stiffness) * damping;
        state.vy = (state.vy + (state.ty - state.y) * stiffness) * damping;
        state.x += state.vx;
        state.y += state.vy;
        cursor.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
        cursorFrame = requestAnimationFrame(draw);
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);

      document.querySelectorAll<HTMLElement>("a,button,[data-cursor]").forEach((node) => {
        const enter = () => {
          if (cursor) cursor.dataset.active = "true";
        };
        const leave = () => {
          if (cursor) cursor.dataset.active = "false";
        };
        node.addEventListener("pointerenter", enter);
        node.addEventListener("pointerleave", leave);
        magneticCleanup.push(() => {
          node.removeEventListener("pointerenter", enter);
          node.removeEventListener("pointerleave", leave);
        });
      });

      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((node) => {
        const move = (event: PointerEvent) => {
          const rect = node.getBoundingClientRect();
          const dx = event.clientX - (rect.left + rect.width / 2);
          const dy = event.clientY - (rect.top + rect.height / 2);
          node.style.setProperty("--mx", `${dx * 0.12}px`);
          node.style.setProperty("--my", `${dy * 0.12}px`);
        };
        const leave = () => {
          node.style.setProperty("--mx", "0px");
          node.style.setProperty("--my", "0px");
        };
        node.addEventListener("pointermove", move);
        node.addEventListener("pointerleave", leave);
        magneticCleanup.push(() => {
          node.removeEventListener("pointermove", move);
          node.removeEventListener("pointerleave", leave);
        });
      });

      cursorFrame = requestAnimationFrame(draw);

      magneticCleanup.push(() => {
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("mouseleave", onLeave);
        cancelAnimationFrame(cursorFrame);
      });
    }

    return () => {
      cancelAnimationFrame(scrollFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
      magneticCleanup.forEach((cleanup) => cleanup());
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={cursorRef} className="v2-cursor" data-visible="false" data-active="false" aria-hidden="true">
      <span className="v2-cursor__ring" />
      <span className="v2-cursor__dot" />
    </div>
  );
}
