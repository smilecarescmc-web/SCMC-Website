"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScmcLocale } from "@/lib/locale-client";
import { useEffect, useRef, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const STORAGE_KEY = "scmc-preloader-seen-v2";

export function Preloader() {
  const reduced = useReducedMotion();
  const { ar } = useScmcLocale();
  const [visible, setVisible] = useState(true);
  const progressLabelRef = useRef<HTMLSpanElement | null>(null);
  const progressBarRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "1";
    if (alreadySeen) {
      const hideTimer = window.setTimeout(() => setVisible(false), 0);
      return () => window.clearTimeout(hideTimer);
    }

    sessionStorage.setItem(STORAGE_KEY, "1");

    // Keep the branded first-visit moment noticeable but short. Do not lock
    // document scrolling; the overlay itself already covers the viewport.
    const duration = reduced ? 90 : 360;
    const startedAt = performance.now();
    let raf = 0;
    let releaseTimer = 0;

    const update = (now: number) => {
      const raw = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      const value = Math.round(eased * 100);

      if (progressLabelRef.current) {
        progressLabelRef.current.textContent = `${String(value).padStart(3, "0")}%`;
      }
      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${eased})`;
      }

      if (raw < 1) {
        raf = requestAnimationFrame(update);
        return;
      }

      releaseTimer = window.setTimeout(() => setVisible(false), reduced ? 5 : 20);
    };

    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(releaseTimer);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="scmc-preloader"
          className="scmc-cinematic-preloader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduced ? 0.03 : 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          aria-hidden="true"
        >
          <div className="scmc-preloader-aura" />
          <div className="scmc-preloader-frame" />

          <div className="scmc-preloader-content">
            <div className="scmc-preloader-logo-wrap">
              <img
                src={LOGO}
                alt=""
                className="scmc-adaptive-logo scmc-preloader-logo"
                width={190}
                height={76}
                decoding="async"
              />
            </div>

            <div className="scmc-preloader-progress-row">
              <span ref={progressLabelRef}>000%</span>
              <div className="scmc-preloader-track">
                <span ref={progressBarRef} style={{ transform: "scaleX(0)" }} />
              </div>
            </div>

            <div className="scmc-preloader-meta">
              <span>{ar ? "مركز سمايل كير الطبي" : "Smile Care Medical Center"}</span>
              <span>{ar ? "رأس الخيمة · 5080" : "Ras Al Khaimah · 5080"}</span>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Preloader;
