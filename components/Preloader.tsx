"use client";

import { useScmcLocale } from "@/lib/locale-client";
import { useEffect, useState } from "react";

const LOGO = "/assets/smilecare-official/brand/logo.png";
const CLEANUP_MS = 1700;

export function Preloader() {
  const { ar } = useScmcLocale();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = window.setTimeout(
      () => setVisible(false),
      reduced ? 180 : CLEANUP_MS
    );

    return () => window.clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="scmc-cinematic-preloader scmc-cinematic-preloader--v21"
      aria-hidden="true"
    >
      <div className="scmc-v21-preloader__veil" />
      <div className="scmc-v21-preloader__shutter scmc-v21-preloader__shutter--top" />
      <div className="scmc-v21-preloader__shutter scmc-v21-preloader__shutter--bottom" />
      <div className="scmc-v21-preloader__slash scmc-v21-preloader__slash--a" />
      <div className="scmc-v21-preloader__slash scmc-v21-preloader__slash--b" />
      <div className="scmc-v21-preloader__halo" />
      <div className="scmc-v21-preloader__beam" />

      <div className="scmc-v21-preloader__center">
        <img src={LOGO} alt="" width={192} height={78} />
        <div className="scmc-v21-preloader__progress">
          <span />
        </div>
        <div className="scmc-v21-preloader__meta">
          <span>{ar ? "مركز سمايل كير الطبي" : "Smile Care Medical Center"}</span>
          <span>{ar ? "رأس الخيمة · 5080" : "Ras Al Khaimah · 5080"}</span>
        </div>
      </div>

      <div className="scmc-v21-preloader__frame" />
    </div>
  );
}

export default Preloader;
