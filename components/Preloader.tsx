"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const STORAGE_KEY = "scmc-final-preloader";

export function Preloader() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    setVisible(true);

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    const duration = reduced ? 260 : 1320;
    const startedAt = performance.now();
    let raf = 0;

    const update = (now: number) => {
      const raw = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - raw, 3);
      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        raf = requestAnimationFrame(update);
        return;
      }

      window.setTimeout(() => {
        sessionStorage.setItem(STORAGE_KEY, "1");
        setVisible(false);
        html.style.overflow = previousOverflow;
      }, reduced ? 20 : 120);
    };

    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      html.style.overflow = previousOverflow;
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="scmc-preloader"
          className="scmc-cinematic-preloader"
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 1 }}
          transition={{
            duration: reduced ? 0.08 : 0.66,
            ease: [0.76, 0, 0.24, 1],
          }}
          aria-hidden="true"
        >
          <motion.div
            className="scmc-preloader-content"
            initial={{ opacity: 0, scale: 0.975 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduced ? 0 : 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="scmc-preloader-logo-wrap">
              <img
                src={LOGO}
                alt=""
                className="scmc-adaptive-logo scmc-preloader-logo"
                width={180}
                height={72}
                decoding="async"
              />
            </div>

            <div className="scmc-preloader-progress-row">
              <span>{String(progress).padStart(3, "0")}%</span>
              <div className="scmc-preloader-track">
                <span
                  style={{
                    transform: `scaleX(${progress / 100})`,
                  }}
                />
              </div>
            </div>

            <div className="scmc-preloader-meta">
              <span>Smile Care Medical Center</span>
              <span>MOHAP 5080</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default Preloader;