"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface AboutImageProps {
  src: string;
  alt: string;
  isInView?: boolean;
}

export function AboutImage({ src, alt, isInView = true }: AboutImageProps) {
  return (
    <div className="relative w-full group flex items-center justify-center">
      {/* Outer Atmospheric Soft Red Radial Glow */}
      <div className="absolute -inset-2 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF1A1A]/20 via-[#FF1A1A]/5 to-transparent blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

      {/* Main Container - Carefully bounded for 100% viewport fit */}
      <div className="relative w-full max-w-[740px] aspect-[16/10] sm:aspect-[16/9] max-h-[38vh] sm:max-h-[44vh] lg:max-h-[48vh] mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/15 group-hover:border-white/30 bg-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] transition-colors duration-500">
        {/* Photo Container with AUTO ZOOM-OUT animation that fires every time section is revealed */}
        <motion.div
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 1.25, opacity: 0.65 }
          }
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full h-full overflow-hidden"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1400px) 60vw, 1200px"
            className="object-cover object-center filter brightness-[0.95] contrast-[1.06] transition-transform duration-700 ease-out group-hover:scale-105"
            priority={true}
          />
        </motion.div>

        {/* Cinematic Vignette Gradients & Studio Lighting */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] pointer-events-none" />

        {/* Top Floating Glass Telemetry HUD */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-20 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[9px] font-mono uppercase tracking-widest text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-pulse" />
          <span>STUDIO CLEANROOM // BAY-01</span>
        </div>

        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-20 hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-widest text-zinc-400">
          <span className="text-[#FF1A1A]">ISO-CLASS 5</span>
          <span>AIR FILTRATION</span>
        </div>

        {/* Bottom Technical Overlay Badges */}
        <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-20 flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-zinc-300">
            <span className="text-[#FF1A1A]">[</span>
            <span>DISMANTLED EDGE TUCKING // 100% INVISIBLE</span>
            <span className="text-[#FF1A1A]">]</span>
          </div>
        </div>

        {/* Corner Cyber Crosshairs */}
        <div className="absolute top-3.5 right-3.5 z-20 w-3.5 h-3.5 border-t border-r border-white/30 pointer-events-none hidden sm:block" />
        <div className="absolute bottom-3.5 right-3.5 z-20 w-3.5 h-3.5 border-b border-r border-white/30 pointer-events-none hidden sm:block" />
      </div>
    </div>
  );
}
