"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type MotionValue } from "framer-motion";
import { Check, ChevronDown, Calendar } from "lucide-react";
import type { ServiceItem } from "@/data/services";

interface ServiceContentProps {
  service: ServiceItem;
  isEven: boolean;
  isInView: boolean;
  watermarkY?: MotionValue<number>;
  watermarkOpacity?: MotionValue<number>;
}

export function ServiceContent({
  service,
  isEven,
  isInView,
  watermarkY,
  watermarkOpacity,
}: ServiceContentProps) {
  const [featuresRevealed, setFeaturesRevealed] = useState(false);

  return (
    <div className="relative w-full z-10">
      {/* Semi-Transparent Background Watermark Service Number */}
      <motion.span
        style={
          watermarkY && watermarkOpacity
            ? { y: watermarkY, opacity: watermarkOpacity }
            : undefined
        }
        animate={
          isInView
            ? { opacity: 0.045, scale: 1 }
            : { opacity: 0, scale: 0.85 }
        }
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute -top-8 sm:-top-12 lg:-top-16 -left-3 sm:-left-6 text-[85px] sm:text-[120px] lg:text-[150px] font-anton text-white select-none pointer-events-none leading-none tracking-tighter"
      >
        {service.id}
      </motion.span>

      <div className="relative z-10 flex flex-col space-y-2.5 sm:space-y-3 lg:space-y-3.5">
        {/* Label & Technical Category */}
        <motion.div
          animate={
            isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
          }
          transition={{ duration: 0.5, delay: 0.05 }}
          className="flex items-center gap-2"
        >
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-[1.5px] bg-[#FF1A1A]" />
            <span className="text-[10px] sm:text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] text-[#FF1A1A]">
              {service.label}
            </span>
          </div>
          <span className="text-zinc-600 text-[10px] font-mono">/</span>
          <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400">
            {service.subtitle}
          </span>
        </motion.div>

        {/* Scaled Editorial Title with dynamic entrance on reveal */}
        <motion.h2
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }
          }
          transition={{ duration: 0.65, delay: 0.12 }}
          className="font-anton text-2xl sm:text-3xl lg:text-[38px] xl:text-[44px] uppercase text-white tracking-tight leading-[0.96]"
        >
          {service.title}
        </motion.h2>

        {/* Thin Futuristic Accent Line */}
        <motion.div
          animate={
            isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }
          }
          transition={{ duration: 0.6, delay: 0.18 }}
          style={{ transformOrigin: "left" }}
          className="w-full max-w-xs h-[1px] bg-gradient-to-r from-white/20 via-white/5 to-transparent"
        />

        {/* Editorial Description: adapts to 2 lines when features are expanded to maintain 100% viewport fit */}
        <motion.p
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }
          }
          transition={{ duration: 0.65, delay: 0.22 }}
          className={`text-xs sm:text-[13px] lg:text-[13.5px] text-[#A0A0A0] font-sans font-normal leading-relaxed max-w-lg ${
            featuresRevealed ? "line-clamp-2" : "line-clamp-3 sm:line-clamp-4"
          }`}
        >
          {service.description}
        </motion.p>

        {/* Interactive Features Expansion: Revealed Upon Clicking Button */}
        <AnimatePresence>
          {featuresRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden border-l-2 border-[#FF1A1A] pl-3 py-1 space-y-1.5 bg-gradient-to-r from-[#FF1A1A]/[0.05] to-transparent rounded-r-lg"
            >
              <div className="text-[9px] font-mono uppercase tracking-widest text-[#FF1A1A] font-semibold">
                // SPECIFICATIONS & PACKAGE DETAILS
              </div>
              <div className="space-y-1">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-start gap-2"
                  >
                    <div className="mt-0.5 flex-shrink-0 w-3 h-3 rounded-full bg-[#FF1A1A]/20 border border-[#FF1A1A]/50 flex items-center justify-center text-[#FF1A1A]">
                      <Check className="w-2 h-2 stroke-[3]" />
                    </div>
                    <span className="text-[11px] sm:text-[11.5px] text-zinc-200 font-sans leading-tight">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Button Row */}
        <motion.div
          animate={
            isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.6, delay: 0.28 }}
          className="pt-1 flex flex-wrap items-center gap-2.5"
        >
          {/* Toggle Button to Reveal / Hide Features */}
          <button
            type="button"
            onClick={() => setFeaturesRevealed(!featuresRevealed)}
            className={`inline-flex items-center gap-2 px-5 py-2 sm:py-2.5 rounded-full font-anton text-xs sm:text-[13px] uppercase tracking-wider transition-all duration-300 cursor-pointer shadow-md ${
              featuresRevealed
                ? "bg-zinc-800 text-white hover:bg-zinc-700 border border-white/20"
                : "bg-white text-black hover:bg-[#FF1A1A] hover:text-white shadow-[0_4px_16px_rgba(255,255,255,0.1)] hover:shadow-[0_4px_20px_rgba(255,26,26,0.45)]"
            }`}
          >
            <span>
              {featuresRevealed ? "HIDE SPECIFICATIONS" : service.button}
            </span>
            <div
              className={`w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-300 ${
                featuresRevealed
                  ? "rotate-180 bg-white/10"
                  : "bg-black/10 group-hover:bg-white/20"
              }`}
            >
              <ChevronDown className="w-2.5 h-2.5" />
            </div>
          </button>

          {/* Quick Booking Button (Visible when features revealed) */}
          {featuresRevealed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:py-2.5 rounded-full bg-[#FF1A1A] hover:bg-[#e01414] text-white font-anton text-xs sm:text-[13px] uppercase tracking-wider shadow-[0_4px_16px_rgba(255,26,26,0.4)] transition-all cursor-pointer"
              >
                <Calendar className="w-3 h-3" />
                <span>BOOK THIS SERVICE</span>
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
