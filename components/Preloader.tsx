"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";

export function Preloader() {
  const reduced = useReducedMotion();
  const pathname = usePathname() || "/";
  const ar = pathname === "/ar" || pathname.startsWith("/ar/");
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const duration = reduced ? 280 : 1650;
    const startedAt = performance.now();
    let raf = 0;
    let releaseTimer = 0;

    const update = (now: number) => {
      const raw = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        raf = requestAnimationFrame(update);
        return;
      }

      releaseTimer = window.setTimeout(() => {
        setVisible(false);
        html.style.overflow = previousOverflow;
      }, reduced ? 20 : 180);
    };

    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(releaseTimer);
      html.style.overflow = previousOverflow;
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
          exit={{ opacity: 1, y: "-100%" }}
          transition={{
            duration: reduced ? 0.08 : 0.78,
            ease: [0.76, 0, 0.24, 1],
          }}
          aria-hidden="true"
        >
          <motion.div
            className="scmc-preloader-aura"
            initial={{ opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="scmc-preloader-frame" />

          <motion.div
            className="scmc-preloader-content"
            initial={{ opacity: 0, y: 12, scale: 0.965, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{
              duration: reduced ? 0 : 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="scmc-preloader-logo-wrap">
              <motion.img
                src={LOGO}
                alt=""
                className="scmc-adaptive-logo scmc-preloader-logo"
                width={190}
                height={76}
                decoding="async"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduced ? 0 : 0.58, delay: reduced ? 0 : 0.12 }}
              />
            </div>

            <div className="scmc-preloader-progress-row">
              <span>{String(progress).padStart(3, "0")}%</span>
              <div className="scmc-preloader-track">
                <span style={{ transform: `scaleX(${progress / 100})` }} />
              </div>
            </div>

            <div className="scmc-preloader-meta">
              <span>{ar ? "مركز سمايل كير الطبي" : "Smile Care Medical Center"}</span>
              <span>{ar ? "رأس الخيمة · 5080" : "Ras Al Khaimah · 5080"}</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Preloader;
