"use client";

import React, { useState, useRef, useCallback } from "react";
import { Sparkles, Sliders } from "lucide-react";

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clamped);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setSliderPos((prev) => Math.max(5, prev - 5));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setSliderPos((prev) => Math.min(95, prev + 5));
    } else if (e.key === "Home") {
      e.preventDefault();
      setSliderPos(5);
    } else if (e.key === "End") {
      e.preventDefault();
      setSliderPos(95);
    }
  };

  return (
    <section id="paint-lab" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.06] bg-[#1A1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>OPTICAL CORRECTION & SURFACE RESTORATION</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
            SURGICAL PAINT RESTORATION{" "}
            <span className="shimmer-text">TRANSFORMATION</span>
          </h2>

          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-normal">
            Drag the interactive slider below or use your arrow keys to compare factory wash swirls,
            hazing, and oxidation against our multi-stage jeweled correction and protective ceramic topcoat.
          </p>
        </div>

        {/* Interactive Comparison Container */}
        <div className="relative max-w-5xl mx-auto rounded-2xl overflow-hidden glass-panel border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.7)] select-none">
          <div
            ref={containerRef}
            role="slider"
            tabIndex={0}
            aria-label="Before and after paint restoration comparison slider"
            aria-valuemin={5}
            aria-valuemax={95}
            aria-valuenow={Math.round(sliderPos)}
            onKeyDown={handleKeyDown}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
            onMouseMove={handleMouseMove}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            onTouchMove={handleTouchMove}
            className="relative w-full h-[340px] sm:h-[480px] cursor-ew-resize overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
          >
            {/* "AFTER" Image (Right Layer / Full Background) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
                alt="After paint correction and protective ceramic finish"
                className="w-full h-full object-cover"
              />
              {/* After Simple Label */}
              <div className="absolute bottom-5 right-5 backdrop-blur-md bg-black/80 border border-[#5EE07C]/40 px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5EE07C] shadow-[0_0_8px_rgba(94,224,124,0.8)]" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-[#5EE07C] font-mono">
                  AFTER
                </span>
              </div>
            </div>

            {/* "BEFORE" Image (Left Layer / Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPos}%` }}
            >
              <div className="relative w-full h-full" style={{ width: "100%", minWidth: "100%" }}>
                {/* Visual filter simulating swirls and hazing */}
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop"
                  alt="Before paint correction with wash swirls and hazing"
                  className="w-full h-full object-cover filter contrast-75 brightness-90 saturate-50 blur-[0.6px]"
                />
                <div className="absolute inset-0 bg-black/30 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Before Simple Label */}
              <div className="absolute bottom-5 left-5 backdrop-blur-md bg-black/80 border border-white/20 px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-300 font-mono">
                  BEFORE
                </span>
              </div>
            </div>

            {/* Draggable Divider Line & Machined Handle */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-[#5EE07C] cursor-ew-resize z-20 pointer-events-none"
              style={{
                left: `${sliderPos}%`,
                boxShadow: "0 0 12px rgba(94,224,124,0.6)",
              }}
            >
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#252525] border border-[#5EE07C] flex items-center justify-center shadow-[0_0_18px_rgba(94,224,124,0.45)] transition-transform hover:scale-110 pointer-events-auto cursor-ew-resize"
              >
                <Sliders className="w-3.5 h-3.5 text-[#5EE07C] rotate-90" />
              </div>
            </div>
          </div>

          {/* Quick Technical Summary Bar Under Slider */}
          <div className="bg-[#252525] px-6 py-4 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-[11px] uppercase font-mono text-zinc-400">Defect Reduction</div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">Multi-Stage Polish</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-mono text-zinc-400">Paint Integrity</div>
              <div className="text-xs sm:text-sm font-bold text-[#5EE07C] font-mono mt-0.5">Ultrasonic Gauged</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-mono text-zinc-400">Surface Finish</div>
              <div className="text-xs sm:text-sm font-bold text-white font-mono mt-0.5">High Specular Gloss</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-mono text-zinc-400">Surface Shield</div>
              <div className="text-xs sm:text-sm font-bold text-[#5EE07C] font-mono mt-0.5">Multi-Year Durability</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
