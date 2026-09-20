"use client";
import React, { useState, useRef } from "react";
import { Sparkles } from "lucide-react";

export default function InteractiveShowcase() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const pos = ((clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, pos)));
  };

  return (
    <section id="interactive-showcase" className="py-32 bg-[#F3F2EE] border-t border-stone-300/80">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="max-w-xl mb-14">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-stone-500 block mb-3">
            [CLINICAL EVIDENCE // INTERACTIVE DYNAMICS]
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-[-0.03em] text-stone-950">
            Precision Transformation
          </h2>
          <p className="mt-3 text-sm text-stone-600 font-light">
            Drag the divider to observe structural restoration and micro-aesthetic alignment.
          </p>
        </div>

        {/* Interactive Before/After Split */}
        <div 
          ref={containerRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="relative w-full aspect-[16/9] max-h-[600px] rounded-sm overflow-hidden cursor-ew-resize select-none border border-stone-300 shadow-xl"
        >
          {/* After Layer (Full) */}
          <img loading="lazy" decoding="async" 
            src="/assets/DSC08023.JPG" 
            alt="After Case" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-6 right-6 z-10 px-3 py-1 bg-stone-950/80 text-white backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest">
            Clinical Outcome
          </div>

          {/* Before Layer (Clipped) */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img loading="lazy" decoding="async" 
              src="/assets/DSC08017.JPG" 
              alt="Before Case" 
              className="absolute inset-0 w-full h-full object-cover grayscale"
              style={{ width: "100%", maxWidth: "none" }}
            />
            <div className="absolute top-6 left-6 z-10 px-3 py-1 bg-stone-900/80 text-stone-300 backdrop-blur-md rounded-full text-[10px] font-mono uppercase tracking-widest">
              Initial Baseline
            </div>
          </div>

          {/* Divider Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-stone-950 flex items-center justify-center text-xs font-mono shadow-lg">
              ↔
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
