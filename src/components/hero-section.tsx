"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSiteConfig } from "@/context/site-context";
import {
  ShieldCheck,
  MapPin,
  Settings2,
  Award,
  ArrowRight,
} from "lucide-react";

interface HeroSectionProps {
  onOpenBooking: () => void;
}

/**
 * Custom Futuristic Neon Green "$99" Graphic Component
 * Compact and responsive, scaled to sit on the same line as "TINT CLUB".
 */
const Futuristic99: React.FC<{ className?: string }> = ({ className = "" }) => (
  <span className={`inline-flex items-center select-none flex-shrink-0 ${className}`}>
    <svg
      viewBox="0 0 178 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 xs:h-9 sm:h-10 lg:h-11 w-auto filter drop-shadow-[0_0_12px_rgba(94,224,124,0.7)] drop-shadow-[0_0_24px_rgba(94,224,124,0.3)]"
      aria-label="$99"
    >
      {/* 1. Stylized Futuristic $ Symbol */}
      <g stroke="#5EE07C" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M 22 11 C 14 11 8 16 8 22 C 8 29 22 31 22 38 C 22 44 15 48 8 48" />
        <line x1="15" y1="5" x2="15" y2="53" strokeWidth="2.8" />
      </g>

      {/* 2. First 9 (Horizontal geometric bar aesthetic) */}
      <g stroke="#5EE07C" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="38" y="9" width="56" height="21" rx="6.5" />
        <path d="M 94 18 L 94 38 C 94 43 90 45.5 83 45.5 L 44 45.5" />
      </g>

      {/* 3. Second 9 (Matching structure) */}
      <g stroke="#5EE07C" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="108" y="9" width="56" height="21" rx="6.5" />
        <path d="M 164 18 L 164 38 C 164 43 160 45.5 153 45.5 L 114 45.5" />
      </g>
    </svg>
  </span>
);

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const { config } = useSiteConfig();

  // Mouse Parallax State
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check touch and reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      );
      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(motionQuery.matches);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || prefersReducedMotion) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const relativeY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

      setParallax({
        x: Math.max(-1, Math.min(1, relativeX)),
        y: Math.max(-1, Math.min(1, relativeY)),
      });
    },
    [isTouchDevice, prefersReducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setParallax({ x: 0, y: 0 });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[calc(100vh-4rem)] pt-20 sm:pt-24 pb-12 sm:pb-16 flex flex-col justify-center overflow-hidden border-b border-white/[0.06] bg-[#090a0d] select-none text-white"
      aria-label="$99 Tint Club Detailing Hero"
    >
      {/* ========================================================================= */}
      {/* 1. SEAMLESS BACKGROUND SCENE: PORSCHE, ASPHALT ROAD & GREEN GRADIENT WALL */}
      {/* ========================================================================= */}
      
      {/* Full Hero Background Layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <img
          src="/images/hero-car-bg.jpg"
          alt="Porsche 718 Cayman GT4 RS Background"
          className="w-full h-full object-cover object-[78%_center] sm:object-[70%_center] lg:object-center filter brightness-[1.02] contrast-[1.06]"
          style={{
            transform: `scale(1.02) translate3d(${parallax.x * -6}px, ${parallax.y * -4}px, 0)`,
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />

        {/* Left Dark Vignette: Blends smoothly over the left half for pure text legibility */}
        <div className="absolute inset-y-0 left-0 w-full sm:w-3/4 lg:w-3/5 bg-gradient-to-r from-[#090a0d] via-[#090a0d]/90 to-transparent z-1" />

        {/* Bottom Horizon Shadow */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#090a0d] via-[#090a0d]/70 to-transparent z-1" />

        {/* Top Header Shadow */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#090a0d]/80 to-transparent z-1" />
      </div>

      {/* Floating Luminescent Neon Green Crown Doodle directly above the Porsche's roofline */}
      <div
        className="absolute right-[14%] sm:right-[18%] lg:right-[21%] xl:right-[24%] top-[16%] sm:top-[19%] lg:top-[22%] z-10 pointer-events-none animate-float-crown"
        style={{
          transform: `translate3d(${parallax.x * 6}px, ${parallax.y * 5}px, 0)`,
        }}
      >
        <svg
          viewBox="0 0 110 85"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-16 h-13 sm:w-22 sm:h-18 lg:w-26 lg:h-20 filter drop-shadow-[0_0_18px_#5EE07C] drop-shadow-[0_0_32px_rgba(94,224,124,0.6)]"
        >
          {/* Glowing Neon Green Crown Outline from Reference */}
          <path
            d="M 15 62 Q 55 72 95 62 L 104 22 L 76 38 L 55 10 L 34 38 L 6 22 Z"
            stroke="#5EE07C"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="rgba(94, 224, 124, 0.05)"
          />
          {/* Crown Base Rim */}
          <path
            d="M 18 64 Q 55 74 92 64"
            stroke="#5EE07C"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN HERO CONTENT CONTAINER (FLEXIBLE HEIGHT FILLING)                  */}
      {/* ========================================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: RATING CARD, $99 TINT CLUB, CTAS & 2X2 PILLS */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-20 max-w-xl lg:max-w-2xl py-1 sm:py-2">
            
            {/* Top Rating Badge Card */}
            <div className="mb-3 sm:mb-3.5 px-3.5 py-1.5 rounded-xl bg-[#181a1e]/90 border border-white/[0.08] backdrop-blur-md flex items-center gap-2.5 shadow-md hover:border-[#5EE07C]/30 transition-colors">
              <div className="w-4 h-4 rounded-full bg-[#ef4444] text-white flex items-center justify-center text-[10px] font-black shadow-sm flex-shrink-0">
                ★
              </div>
              <div className="flex items-center gap-2 text-left">
                <div className="flex items-center gap-1 leading-none">
                  <span className="text-xs font-bold font-mono text-white">4.9</span>
                  <div className="flex text-[#f59e0b] text-[10px] tracking-tighter">
                    ★★★★★
                  </div>
                </div>
                <span className="text-zinc-600 text-[10px]">•</span>
                <span className="text-[10px] sm:text-[11px] text-zinc-400 font-medium truncate">
                  500+ Verified Clients • Inland Empire
                </span>
              </div>
            </div>

            {/* Main Headline: SINGLE ROW containing $99 + TINT CLUB */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-2.5 flex-nowrap w-full">
              <Futuristic99 />
              <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-[3rem] font-black tracking-tight text-white uppercase leading-none whitespace-nowrap">
                TINT CLUB
              </h1>
            </div>

            {/* Sub-Brand Eyebrow */}
            <div className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-[#5EE07C] font-bold mb-2.5 sm:mb-3 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5EE07C] animate-pulse" />
              <span>BESPOKE MOTORSPORT DETAILING & CERAMIC LAB</span>
            </div>

            {/* Subtitle Lines (Flexible & Readable) */}
            <p className="text-sm sm:text-base text-white font-semibold leading-snug max-w-xl mb-1.5">
              Comprehensive Approach To Caring For Your Automobile
            </p>
            <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed max-w-xl mb-5 sm:mb-6">
              Precision window tinting, multi-stage paint correction, and advanced ceramic coatings in Yucaipa and the Inland Empire.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full mb-5 sm:mb-6">
              {/* Solid Vibrant Green Button */}
              <button
                onClick={onOpenBooking}
                className="px-7 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#0a0b0d] bg-[#5EE07C] hover:bg-[#6ef58d] transition-all duration-200 shadow-[0_0_20px_rgba(94,224,124,0.45)] hover:shadow-[0_0_30px_rgba(94,224,124,0.65)] hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Book Appointment</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0a0b0d]" />
              </button>

              {/* Text Link with Arrow */}
              <a
                href="#services"
                className="text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 group py-1.5"
              >
                <span>Explore Services & Pricing</span>
                <span className="text-[#5EE07C] transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>

            {/* 2x2 Grid of Feature Chips (Flexible padding & hover effects) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-lg">
              {/* 1. Professional Grade Products */}
              <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#16181b]/95 border border-white/[0.07] backdrop-blur-md hover:border-[#5EE07C]/40 transition-colors">
                <div className="w-5 h-5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[#5EE07C] flex-shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5EE07C]" />
                </div>
                <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                  Professional Grade Products
                </span>
              </div>

              {/* 2. Convenient Location */}
              <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#16181b]/95 border border-white/[0.07] backdrop-blur-md hover:border-[#5EE07C]/40 transition-colors">
                <div className="w-5 h-5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[#5EE07C] flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5 text-[#5EE07C]" />
                </div>
                <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                  Convenient Yucaipa Studio
                </span>
              </div>

              {/* 3. Modern Equipment */}
              <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#16181b]/95 border border-white/[0.07] backdrop-blur-md hover:border-[#5EE07C]/40 transition-colors">
                <div className="w-5 h-5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[#5EE07C] flex-shrink-0">
                  <Settings2 className="w-3.5 h-3.5 text-[#5EE07C]" />
                </div>
                <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                  Cleanroom Installation Bays
                </span>
              </div>

              {/* 4. Quality Guarantee */}
              <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#16181b]/95 border border-white/[0.07] backdrop-blur-md hover:border-[#5EE07C]/40 transition-colors">
                <div className="w-5 h-5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-[#5EE07C] flex-shrink-0">
                  <Award className="w-3.5 h-3.5 text-[#5EE07C]" />
                </div>
                <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                  Lifetime Service Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Natural negative space letting the Porsche and green spotlight show through */}
          <div className="lg:col-span-5 hidden lg:block" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};
