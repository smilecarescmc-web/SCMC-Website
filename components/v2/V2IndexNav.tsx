"use client";

import Link from "next/link";
import { useState } from "react";
import { primaryNavigation, primaryNavigationAr } from "@/lib/v2-content";

type Props = {
  alternateHref: string;
  alternateLabel: string;
  isArabic: boolean;
};

export default function V2IndexNav({ alternateHref, alternateLabel, isArabic }: Props) {
  const [open, setOpen] = useState(false);

  const navigation = isArabic ? primaryNavigationAr : primaryNavigation;

  return (
    <>
      <button
        type="button"
        className="v2-index-toggle"
        aria-expanded={open}
        aria-controls="v2-index-panel"
        onClick={() => setOpen((value) => !value)}
        data-magnetic
      >
        <span>{open ? "Close" : "Index"}</span>
        <span aria-hidden="true">{open ? "×" : "⌗"}</span>
      </button>

      <div
        id="v2-index-panel"
        className="v2-index-panel"
        data-open={open ? "true" : "false"}
        aria-hidden={!open}
      >
        <div className="v2-index-panel__inner">
          <div className="v2-index-panel__meta">
            <span>Smile Care Editions</span>
            <span>Ras Al Khaimah · UAE</span>
            <span>EST. 2007</span>
          </div>

          <nav className="v2-index-panel__links" aria-label="Site index">
            {navigation.map((item, index) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.label}</strong>
                <em aria-hidden="true">↗</em>
              </Link>
            ))}
          </nav>

          <div className="v2-index-panel__footer">
            <Link href={alternateHref} onClick={() => setOpen(false)}>
              {alternateLabel}
            </Link>
            <a href="tel:+97172282080">+971 7 228 2080</a>
            <a href="mailto:info@smilecare.ae">info@smilecare.ae</a>
          </div>
        </div>
      </div>
    </>
  );
}
