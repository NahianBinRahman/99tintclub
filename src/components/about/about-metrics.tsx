"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AboutData } from "@/data/about";
import { AboutImage } from "./about-image";
import { AboutStats } from "./about-stats";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AboutMetricsProps {
  data: AboutData;
  prevTargetId: string;
  nextTargetId: string;
}

export function AboutMetrics({
  data,
  prevTargetId,
}: AboutMetricsProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Viewport tracking for auto-zoom & entrance animations every time section enters view
  const isInView = useInView(containerRef, {
    amount: 0.12,
    once: false,
  });

  // Track scroll position of this section relative to viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax upward exit & downward return matching the service showcase
  const contentY = useTransform(
    scrollYProgress,
    [0.05, 0.45, 0.55, 0.95],
    [160, 0, 0, -200]
  );

  const contentOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.38, 0.62, 0.95],
    [0, 1, 1, 0]
  );

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article
      id="about-metrics"
      ref={containerRef}
      data-snap-section="true"
      data-snap-about="true"
      className="relative w-full min-h-0 md:min-h-screen md:h-screen md:max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] select-none py-8 md:py-0"
    >
      {/* Background Subtle Red Ambient Glow */}
      <div className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[650px] h-[450px] bg-[#FF1A1A]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Cyber / Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Top Studio Metadata Header - Cleared below navbar */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
          <span>// 99 TINT CLUB ARCHIVE — 04.02 // VERIFIABLE METRICS</span>
        </div>
      </div>

      {/* Center Stage: Left 2x2 Stats Grid + Right Dominant Vehicle Image */}
      <motion.div
        style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
        className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center flex-1 z-10 my-auto py-6 md:py-0"
      >
        {/* LEFT: Brand Statistics (5 cols) */}
        <div className="lg:col-span-5 xl:col-span-5 order-2 lg:order-1 flex flex-col justify-center space-y-3 sm:space-y-4">
          <motion.div
            animate={
              isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6 }}
            className="space-y-1"
          >
            <span className="text-[9px] sm:text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A] font-bold">
              // STUDIO PROVEN METRICS
            </span>
            <h3 className="font-anton text-2xl sm:text-3xl lg:text-[34px] uppercase tracking-wide text-white leading-none">
              VERIFIABLE EXCELLENCE
            </h3>
          </motion.div>

          {/* 2x2 Statistics Grid */}
          <AboutStats stats={data.stats} isInView={isInView} />
        </div>

        {/* RIGHT: Dominant Vehicle Image Stage (7 cols) with Auto-Zoom */}
        <motion.div
          animate={
            isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }
          }
          transition={{ duration: 0.8, delay: 0.15 }}
          className="lg:col-span-7 xl:col-span-7 order-1 lg:order-2 flex flex-col justify-center items-center"
        >
          <AboutImage
            src={data.image}
            alt={data.imageAlt}
            isInView={isInView}
          />
        </motion.div>
      </motion.div>

      {/* Bottom Bar: Studio Specifications + Stepper & Navigation */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
        {/* Progress Counter & Quick Studio Specs */}
        <div className="flex items-center gap-2.5">
          <span className="text-white font-bold text-sm">02</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 text-xs">02</span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
            — Verifiable Metrics & Cleanroom Spec
          </span>
        </div>

        {/* Studio Specs Bar */}
        <div className="hidden xl:flex items-center gap-6 text-[10px] font-mono text-zinc-500">
          {data.studioSpecs.slice(0, 3).map((spec, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span>{spec.label}:</span>
              <span className="text-zinc-300 font-bold">{spec.value}</span>
            </div>
          ))}
        </div>

        {/* Direct Dot Indicators */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToTarget("about")}
            className="w-2 h-1.5 bg-white/20 hover:bg-white/50 rounded-full cursor-pointer transition-all"
            aria-label="Philosophy Section"
          />
          <button
            type="button"
            onClick={() => scrollToTarget("about-metrics")}
            className="w-7 h-1.5 bg-[#FF1A1A] rounded-full cursor-pointer transition-all"
            aria-label="Metrics Section"
          />
        </div>

        {/* Directional Chevrons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToTarget(prevTargetId)}
            className="p-2 rounded-full border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            aria-label="Previous Section"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => scrollToTarget("about")}
            className="p-2 rounded-full border border-white/15 text-zinc-500 hover:text-white hover:border-white/30 transition-all cursor-pointer"
            aria-label="Top of About"
          >
            <ChevronDown className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </article>
  );
}
