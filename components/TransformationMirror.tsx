"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from "react";
import { scmcAssets } from "../lib/scmcCinematicAssets";

export default function TransformationMirror() {
  const frameRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);

  const before = scmcAssets.transformation.before;
  const after = scmcAssets.transformation.after;

  if (!before || !after) return null;

  const updateFromPointer = (clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const value = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.max(2, Math.min(98, value)));
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromPointer(event.clientX);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    updateFromPointer(event.clientX);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(2, value - 2));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(98, value + 2));
    }
    if (event.key === "Home") {
      event.preventDefault();
      setPosition(2);
    }
    if (event.key === "End") {
      event.preventDefault();
      setPosition(98);
    }
  };

  return (
    <section id="results" className="scmc-transform scmc-section" aria-labelledby="transform-title">
      <div className="scmc-shell">
        <div className="scmc-section-head">
          <div>
            <p className="scmc-kicker">03 / CLINICAL OUTCOMES</p>
            <h2 id="transform-title">A measured view of verified treatment imagery.</h2>
          </div>
          <p>Drag the divider or use the arrow keys. This module only renders when a verified before/after pair exists in the project media archive.</p>
        </div>

        <div
          ref={frameRef}
          className={`scmc-compare ${dragging ? "is-dragging" : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <Image src={before} alt="Before treatment" fill sizes="100vw" className="scmc-compare__image" />
          <div className="scmc-compare__after" style={{ clipPath: `inset(0 0 0 ${position}%)` }}>
            <Image src={after} alt="After treatment" fill sizes="100vw" className="scmc-compare__image" />
          </div>

          <div className="scmc-compare__label scmc-compare__label--before">BEFORE</div>
          <div className="scmc-compare__label scmc-compare__label--after">AFTER</div>

          <div
            className="scmc-compare__handle"
            style={{ left: `${position}%` }}
            role="slider"
            aria-label="Before and after comparison"
            aria-valuemin={2}
            aria-valuemax={98}
            aria-valuenow={Math.round(position)}
            aria-valuetext={`${Math.round(position)}% after image revealed`}
            tabIndex={0}
            onKeyDown={onKeyDown}
          >
            <span>â€¹</span><span>â€º</span>
          </div>
        </div>
      </div>
    </section>
  );
}