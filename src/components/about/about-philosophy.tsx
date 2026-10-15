"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { AboutData } from "@/data/about";
import { ChevronDown, ChevronUp, ArrowRight, Sparkles } from "lucide-react";

interface AboutPhilosophyProps {
  data: AboutData;
  prevTargetId: string;
  nextTargetId: string;
}

export function AboutPhilosophy({
  data,
  prevTargetId,
  nextTargetId,
}: AboutPhilosophyProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Viewport tracking for auto entrance animations every time section enters view
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

  // Watermark Parallax
  const watermarkY = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, -80]);
  const watermarkOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.6, 0.9],
    [0, 0.035, 0.035, 0]
  );

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article
      id="about"
      ref={containerRef}
      data-snap-section="true"
      data-snap-about="true"
      className="relative w-full min-h-0 md:min-h-screen md:h-screen md:max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] select-none py-8 md:py-0"
    >
      {/* Background Subtle Red Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-[#FF1A1A]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Cyber / Grid Lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Large Transparent Background Typography "99TINT" */}
      <motion.div
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-anton text-[26vw] leading-none text-white/[0.035] tracking-tighter select-none pointer-events-none z-0"
      >
        99TINT
      </motion.div>

      {/* Top Studio Metadata Header - Cleared below navbar */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
          <span>// 99 TINT CLUB ARCHIVE — 04.01 // STUDIO PHILOSOPHY</span>
        </div>
      </div>

      {/* Center Stage: Monumental Statement & Philosophy Pillars */}
      <motion.div
        style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
        className="w-full max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-14 flex flex-col justify-center items-center text-center flex-1 z-10 my-auto space-y-2.5 sm:space-y-3.5 lg:space-y-4"
      >
        {/* Eyebrow Badge & Tagline */}
        <div className="space-y-1 sm:space-y-1.5">
          <motion.div
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-ping" />
            <span>{data.badge}</span>
          </motion.div>

          <motion.p
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-400 font-semibold"
          >
            {data.tagline}
          </motion.p>
        </div>

        {/* Monumental Headline */}
        <motion.h2
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="font-anton text-3xl sm:text-4xl lg:text-5xl xl:text-[58px] uppercase tracking-tight text-white leading-[0.93] drop-shadow-md"
        >
          {data.title}{" "}
          <span className="text-[#FF1A1A] relative inline-block">
            {data.titleHighlight}
            <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF1A1A] to-transparent opacity-60" />
          </span>
        </motion.h2>

        {/* Narrative Paragraph */}
        <motion.p
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.65, delay: 0.18 }}
          className="text-zinc-300 text-xs sm:text-[13px] lg:text-sm font-sans font-light leading-relaxed max-w-2xl line-clamp-2"
        >
          {data.description}
        </motion.p>

        {/* 3 Studio Engineering Pillars */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.65, delay: 0.22 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 w-full max-w-3xl pt-1 text-left"
        >
          {data.pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="p-2.5 sm:p-3 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 hover:border-[#FF1A1A]/40 transition-all space-y-1 shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
            >
              <div className="text-[8.5px] font-mono text-[#FF1A1A] tracking-widest uppercase">
                {pillar.code}
              </div>
              <h4 className="text-[11.5px] sm:text-xs font-mono font-bold text-white uppercase">
                {pillar.title}
              </h4>
              <p className="text-[10px] text-zinc-400 font-sans leading-tight line-clamp-2">
                {pillar.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Action Row */}
        <motion.div
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.65, delay: 0.28 }}
          className="flex flex-wrap items-center justify-center gap-3 pt-1.5"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 sm:py-3 rounded-xl bg-[#FF1A1A] hover:bg-[#e01414] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-[0_10px_25px_rgba(255,26,26,0.35)] cursor-pointer group/cta"
          >
            <span>BOOK STUDIO CONSULTATION</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/cta:translate-x-1" />
          </a>

          <button
            type="button"
            onClick={() => scrollToTarget(nextTargetId)}
            className="inline-flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF1A1A]" />
            <span>EXPLORE VERIFIED METRICS</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Bottom Bar: Stepper & Navigation Controls */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
        {/* Progress Counter */}
        <div className="flex items-center gap-2.5">
          <span className="text-white font-bold text-sm">01</span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 text-xs">02</span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
            — Studio Philosophy & Standards
          </span>
        </div>

        {/* Direct Dot Indicators */}
        <div className="hidden md:flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollToTarget("about")}
            className="w-7 h-1.5 bg-[#FF1A1A] rounded-full cursor-pointer transition-all"
            aria-label="Philosophy Section"
          />
          <button
            type="button"
            onClick={() => scrollToTarget(nextTargetId)}
            className="w-2 h-1.5 bg-white/20 hover:bg-white/50 rounded-full cursor-pointer transition-all"
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
            onClick={() => scrollToTarget(nextTargetId)}
            className="p-2 rounded-full border border-white/15 text-white hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer"
            aria-label="Next Section"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
