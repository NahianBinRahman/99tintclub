"use client";

import { motion } from "framer-motion";
import { services } from "@/data/services";
import { ServiceShowcase } from "./service-showcase";
import { ScrollSnapManager } from "./scroll-snap-manager";
import { ArrowDown, Shield, Sparkles, Award, ChevronDown } from "lucide-react";

export function ServicesSection() {
  const visibleServices = services.filter((s) => s.visible);

  return (
    <section
      id="services"
      className="relative w-full bg-[#050505] text-white"
    >
      {/* Global Desktop Section Snapping */}
      <ScrollSnapManager />

      {/* 1. Grand Intro Header (100% Screen Fit on Desktop, Fluid on Mobile) */}
      <article
        id="services-intro"
        data-snap-section="true"
        className="relative w-full min-h-0 md:min-h-screen md:h-screen md:max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] select-none py-10 md:py-0"
      >
        {/* Subtle Background Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[300px] bg-[#FF1A1A]/12 blur-[130px] pointer-events-none -z-10" />

        {/* Top Studio Metadata Header */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
            <span>// 99 TINT CLUB ARCHIVE — 02.INTRO</span>
          </div>
        </div>

        {/* Center Stage */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-5xl z-10 my-auto px-6">
          {/* Section Marker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-ping" />
            <span>02 // STUDIO SERVICES & PACKAGES</span>
          </motion.div>

          {/* Grand Header Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-anton text-3xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white leading-[0.93]"
          >
            ENGINEERED TO <span className="text-[#FF1A1A]">OUTSHINE</span> EVERY STANDARD
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#A0A0A0] max-w-2xl font-sans font-light leading-relaxed line-clamp-2 sm:line-clamp-3"
          >
            Explore our bespoke automotive protection and restoration suite. Every vehicle undergoes an exacting protocol by certified artisans in our cleanroom studio.
          </motion.p>

          {/* Value Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400"
          >
            <div className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>Multi-Year Warranty</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>Nano-Ceramic Formulas</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>Certified Installers</span>
            </div>
          </motion.div>

          {/* Scroll Down Action */}
          <motion.button
            type="button"
            onClick={() => {
              const el = document.getElementById("service-window-tint");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <span className="text-[9px] font-mono tracking-widest uppercase">
              SCROLL OR CLICK TO EXPLORE SERVICES
            </span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-3 h-3 text-zinc-400" />
            </motion.div>
          </motion.button>
        </div>

        {/* Bottom Stepper */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-bold text-sm">01</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500 text-xs">07</span>
            <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
              — Studio Services Overview
            </span>
          </div>
          <span className="text-[9.5px] font-mono text-zinc-500">99TC CLEANROOM SPEC</span>
        </div>
      </article>

      {/* 2. All Individual Service Sections Rendered Vertically */}
      <div className="relative w-full">
        {visibleServices.map((service, index) => {
          const prevTargetId =
            index === 0
              ? "services-intro"
              : `service-${visibleServices[index - 1].slug}`;
          const nextTargetId =
            index === visibleServices.length - 1
              ? "services-consultation"
              : `service-${visibleServices[index + 1].slug}`;

          return (
            <ServiceShowcase
              key={service.id}
              service={service}
              index={index}
              totalCount={visibleServices.length}
              allServices={visibleServices}
              prevTargetId={prevTargetId}
              nextTargetId={nextTargetId}
            />
          );
        })}
      </div>

      {/* 3. Bottom Showcase Closing Banner (100% Screen Fit) */}
      <article
        id="services-consultation"
        data-snap-section="true"
        className="relative w-full min-h-0 md:h-screen md:max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-gradient-to-b from-[#050505] to-[#0c0c0c] select-none text-center py-10 md:py-0"
      >
        {/* Top Studio Metadata Header */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
            <span>// 99 TINT CLUB ARCHIVE — 02.CONSULTATION</span>
          </div>
        </div>

        {/* Center Stage */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto px-6 space-y-3 sm:space-y-4 my-auto z-10"
        >
          <span className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A] font-semibold">
            CUSTOM PACKAGES & CONSULTATION
          </span>
          <h3 className="font-anton text-2xl sm:text-4xl lg:text-5xl uppercase text-white tracking-tight leading-tight">
            NEED A BESPOKE COMBINATION OF SERVICES?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            We tailor full-vehicle packages combining ceramic window tint, paint
            correction, and molecular ceramic coating into a single seamless
            appointment.
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#FF1A1A] hover:bg-[#e01414] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-[0_6px_25px_rgba(255,26,26,0.45)] hover:shadow-[0_8px_35px_rgba(255,26,26,0.6)] transition-all duration-300 cursor-pointer"
            >
              SCHEDULE STUDIO CONSULTATION
            </a>
          </div>
        </motion.div>

        {/* Bottom Stepper Bar */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-bold text-sm">07</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500 text-xs">07</span>
            <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
              — Services Consultation & Bespoke Packages
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("projects-intro");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 text-[9.5px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>CONTINUE TO PRIVATE ARCHIVE</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF1A1A]" />
          </button>
        </div>
      </article>
    </section>
  );
}
