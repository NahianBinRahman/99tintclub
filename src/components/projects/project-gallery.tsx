"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, SlidersHorizontal, Eye } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
  vehicleTitle: string;
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
}

export function ProjectGallery({
  images,
  vehicleTitle,
  beforeAfter,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState<"gallery" | "comparison">("gallery");
  const [compareSliderPos, setCompareSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleSliderMove = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setCompareSliderPos(percentage);
  };

  return (
    <div className="space-y-4 w-full">
      {/* Top View Mode Switcher */}
      {beforeAfter && (
        <div className="flex items-center justify-between gap-4 pb-2">
          <div className="flex items-center space-x-1 p-1 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setViewMode("gallery")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "gallery"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>4K GALLERY ({images.length})</span>
            </button>
            <button
              onClick={() => setViewMode("comparison")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "comparison"
                  ? "bg-[#FF1A1A] text-white font-semibold shadow-[0_0_15px_rgba(255,26,26,0.5)]"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>BEFORE / AFTER REVEAL</span>
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-400 hidden sm:block">
            {viewMode === "gallery" ? (
              <span>FRAME {activeIndex + 1} OF {images.length}</span>
            ) : (
              <span>DRAG SLIDER TO INSPECT</span>
            )}
          </div>
        </div>
      )}

      {/* Main Display Area */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-black group select-none">
        {viewMode === "gallery" ? (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={images[activeIndex]}
                  alt={`${vehicleTitle} photograph ${activeIndex + 1}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  className="object-cover object-center"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Gallery Navigation Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF1A1A] hover:border-[#FF1A1A] transition-all opacity-80 group-hover:opacity-100 z-10 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-[#FF1A1A] hover:border-[#FF1A1A] transition-all opacity-80 group-hover:opacity-100 z-10 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom HUD bar */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <span className="font-mono text-[10px] tracking-widest text-white/70 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 uppercase">
                STUDIO INSPECTION // {activeIndex === 0 ? "FULL PROFILE" : `DETAIL 0${activeIndex}`}
              </span>
              <span className="font-mono text-[10px] text-white/50 px-2 py-0.5 rounded bg-black/40">
                RAW RESOLUTION
              </span>
            </div>
          </>
        ) : (
          /* Interactive Before / After Slider */
          beforeAfter && (
            <div
              className="relative w-full h-full cursor-ew-resize overflow-hidden"
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                handleSliderMove(e.clientX, rect);
              }}
              onTouchMove={(e) => {
                if (e.touches[0]) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  handleSliderMove(e.touches[0].clientX, rect);
                }
              }}
            >
              {/* After Image (Background) */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={beforeAfter.after}
                  alt="Finished transformed vehicle"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute bottom-3 right-3 z-10 font-mono text-[11px] font-bold text-white px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                  {beforeAfter.afterLabel || "AFTER TRANSFORMATION"}
                </div>
              </div>

              {/* Before Image (Clipped) */}
              <div
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ width: `${compareSliderPos}%` }}
              >
                <div className="relative w-full h-full" style={{ width: "100%", height: "100%" }}>
                  <Image
                    src={beforeAfter.before}
                    alt="Vehicle before transformation"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute bottom-3 left-3 z-10 font-mono text-[11px] font-bold text-zinc-300 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10">
                    {beforeAfter.beforeLabel || "BEFORE INSPECTION"}
                  </div>
                </div>
              </div>

              {/* Vertical Divider Line with handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(255,26,26,0.8)] z-20 pointer-events-none"
                style={{ left: `${compareSliderPos}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#FF1A1A] flex items-center justify-center text-white shadow-lg">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF1A1A]" />
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Thumbnails list */}
      {viewMode === "gallery" && images.length > 1 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                activeIndex === idx
                  ? "border-[#FF1A1A] shadow-[0_0_12px_rgba(255,26,26,0.4)] scale-[1.02]"
                  : "border-white/10 opacity-60 hover:opacity-100 hover:border-white/30"
              }`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-1 right-1 font-mono text-[9px] text-white/80 bg-black/60 px-1 rounded">
                0{idx + 1}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
