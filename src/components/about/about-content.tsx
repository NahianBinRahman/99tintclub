"use client";

import React from "react";
import { motion } from "framer-motion";
import { AboutData } from "@/data/about";
import { ShieldCheck, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

interface AboutContentProps {
  data: AboutData;
}

export function AboutContent({ data }: AboutContentProps) {
  return (
    <div className="w-full flex flex-col space-y-6 sm:space-y-8">
      {/* 1. Eyebrow Badge & Tagline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-ping" />
          <span>{data.badge}</span>
        </div>

        <p className="text-[10px] sm:text-[11.5px] font-mono uppercase tracking-[0.3em] text-zinc-400 font-semibold">
          {data.tagline}
        </p>
      </motion.div>

      {/* 2. Large Monumental Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-anton text-4xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white leading-[0.93] drop-shadow-md"
      >
        {data.title}{" "}
        <span className="text-[#FF1A1A] relative inline-block">
          {data.titleHighlight}
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#FF1A1A] to-transparent opacity-60" />
        </span>
      </motion.h2>

      {/* 3. Editorial Narratives */}
      <div className="space-y-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-zinc-200 text-sm sm:text-base lg:text-lg leading-relaxed font-light"
        >
          {data.description}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-light border-l-2 border-[#FF1A1A]/50 pl-4 py-1"
        >
          {data.detailedParagraph}
        </motion.p>
      </div>

      {/* 4. Studio Engineering Pillars */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2"
      >
        {data.pillars.map((pillar) => (
          <div
            key={pillar.id}
            className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all space-y-1.5"
          >
            <div className="text-[9px] font-mono text-[#FF1A1A] tracking-widest uppercase">
              {pillar.code}
            </div>
            <h4 className="text-xs sm:text-[13px] font-mono font-bold text-white uppercase">
              {pillar.title}
            </h4>
            <p className="text-[11px] text-zinc-400 font-sans leading-tight">
              {pillar.description}
            </p>
          </div>
        ))}
      </motion.div>

      {/* 5. Action Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        className="flex flex-wrap items-center gap-4 pt-3"
      >
        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#FF1A1A] hover:bg-[#e01414] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-[0_10px_30px_rgba(255,26,26,0.35)] cursor-pointer group/cta"
        >
          <span>BOOK STUDIO CONSULTATION</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
        </a>

        <a
          href="#projects"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs uppercase tracking-[0.2em] transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF1A1A]" />
          <span>VIEW ARCHIVE</span>
        </a>
      </motion.div>
    </div>
  );
}
