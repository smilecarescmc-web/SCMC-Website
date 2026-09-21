"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";
import { masterpieceAssets } from "../lib/masterpieceAssets";

export type TransformationRevealProps = {
  beforeSrc?: string | null;
  afterSrc?: string | null;
  className?: string;
} & Record<string, unknown>;

export function TransformationReveal({
  beforeSrc = masterpieceAssets.beforeAfter?.before ?? null,
  afterSrc = masterpieceAssets.beforeAfter?.after ?? null,
  className = "",
}: TransformationRevealProps = {}) {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [split, setSplit] = useState(50);

  if (!beforeSrc || !afterSrc) {
    return (
      <section id="outcomes" className={`scmc-section scmc-outcomes scmc-outcomes-verified ${className}`.trim()}>
        <div className="scmc-shell">
          <div className="scmc-section-kicker">
            <span>(04) — CLINICAL OUTCOMES</span>
            <span>VERIFIED PAIRS ONLY</span>
          </div>

          <div className="scmc-outcomes-placeholder">
            <h2>Outcomes without fabrication.</h2>
            <p>
              This interface is wired only to a verified before/after pair from the SCMC media
              library. No synthetic patient result is displayed when a matched clinical pair
              cannot be verified locally.
            </p>
            <a href="https://wa.me/971543217712" target="_blank" rel="noreferrer" data-magnetic>
              Request a relevant case review
              <span aria-hidden="true">â†—</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  const updateFromClientX = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;

    const rect = frame.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplit(Math.max(0, Math.min(100, next)));
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.buttons !== 1 && event.pointerType !== "touch") return;
    updateFromClientX(event.clientX);
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const style = {
    "--scmc-split": `${split}%`,
  } as CSSProperties;

  return (
    <section id="outcomes" className={`scmc-section scmc-outcomes ${className}`.trim()}>
      <div className="scmc-shell">
        <div className="scmc-section-kicker">
          <span>(04) — CLINICAL OUTCOMES</span>
          <span>DRAG // COMPARE</span>
        </div>

        <div className="scmc-section-heading-grid">
          <h2>Transformation, shown with restraint</h2>
          <p>
            Drag the clinical split to compare the verified paired imagery available in the
            center’s own media archive.
          </p>
        </div>

        <div
          ref={frameRef}
          className="scmc-before-after"
          style={style}
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onPointerMove={onPointerMove}
          onPointerDown={onPointerDown}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft") setSplit((value) => Math.max(0, value - 2));
            if (event.key === "ArrowRight") setSplit((value) => Math.min(100, value + 2));
            if (event.key === "Home") setSplit(0);
            if (event.key === "End") setSplit(100);
          }}
        >
          <div className="scmc-before-after-layer scmc-before-layer">
            <Image
              src={beforeSrc}
              alt="Clinical treatment result before"
              fill
              sizes="100vw"
              className="scmc-cover-image"
            />
            <span className="scmc-result-label">Before</span>
          </div>

          <div className="scmc-before-after-layer scmc-after-layer">
            <Image
              src={afterSrc}
              alt="Clinical treatment result after"
              fill
              sizes="100vw"
              className="scmc-cover-image"
            />
            <span className="scmc-result-label">After</span>
          </div>

          <div className="scmc-comparison-line" aria-hidden="true">
            <span>â†”</span>
          </div>
        </div>

        <div className="scmc-outcomes-disclaimer">
          <span>[CLINICAL IMAGERY // VERIFIED LOCAL PAIR]</span>
          <p>Individual outcomes vary. Assessment and treatment planning are patient-specific.</p>
        </div>
      </div>
    </section>
  );
}

export default TransformationReveal;