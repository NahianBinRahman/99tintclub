"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  projectNumber?: string;
  isInView?: boolean;
}

export function ProjectImage({
  src,
  alt,
  priority = false,
  className = "",
  projectNumber = "01",
  isInView = true,
}: ProjectImageProps) {
  return (
    <div className={`relative w-full group ${className}`}>
      {/* Outer Subtle Red Glow on Hover */}
      <div className="absolute -inset-1 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#FF1A1A]/20 via-transparent to-[#FF1A1A]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

      {/* Main Container - Carefully bounded height for 100% viewport fit */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] w-full max-w-[620px] max-h-[42vh] sm:max-h-[48vh] lg:max-h-[56vh] mx-auto rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/25 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] bg-zinc-950 transition-colors duration-500">
        {/* Photo Container with AUTO ZOOM-OUT animation that fires every time section is revealed */}
        <motion.div
          animate={
            isInView
              ? { scale: 1, opacity: 1 }
              : { scale: 1.22, opacity: 0.65 }
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
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            className="object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.95] contrast-[1.05] group-hover:brightness-100"
            priority={priority || projectNumber === "01"}
          />
        </motion.div>

        {/* Realistic Cinema Lighting Gradient & Sheen */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.06] pointer-events-none" />

        {/* Tech HUD Accents (Mansory / Brabus telemetry style) */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 flex items-center gap-2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-zinc-300">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-pulse" />
          <span>STUDIO ARCHIVE // CAM_{projectNumber}</span>
        </div>

        <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-10 hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-zinc-400">
          <span>RAW 8K CAPTURE</span>
          <span className="text-[#FF1A1A]">|</span>
          <span>REC</span>
        </div>

        <div className="absolute bottom-3.5 left-3.5 sm:bottom-4 sm:left-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-zinc-400">
          <span className="text-[#FF1A1A]">[</span>
          <span>OPTICAL GRADE SPEC</span>
          <span className="text-[#FF1A1A]">]</span>
        </div>

        {/* Subtle Corner Crosshairs */}
        <div className="absolute bottom-3.5 right-3.5 z-10 w-4 h-4 border-r border-b border-white/30 pointer-events-none" />
        <div className="absolute top-3.5 right-3.5 z-10 w-4 h-4 border-r border-t border-white/30 pointer-events-none" />
      </div>
    </div>
  );
}
