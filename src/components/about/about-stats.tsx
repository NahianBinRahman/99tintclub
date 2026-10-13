"use client";

import React from "react";
import { motion } from "framer-motion";
import { AboutStat } from "@/data/about";
import { AnimatedCounter } from "./animated-counter";
import { ShieldCheck, Sparkles, Award, Gauge } from "lucide-react";

interface AboutStatsProps {
  stats: AboutStat[];
  isInView?: boolean;
}

const statIcons = [
  <Award key="1" className="w-3.5 h-3.5 text-[#FF1A1A]" />,
  <ShieldCheck key="2" className="w-3.5 h-3.5 text-[#FF1A1A]" />,
  <Sparkles key="3" className="w-3.5 h-3.5 text-[#FF1A1A]" />,
  <Gauge key="4" className="w-3.5 h-3.5 text-[#FF1A1A]" />,
];

export function AboutStats({ stats, isInView = true }: AboutStatsProps) {
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 lg:gap-3">
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.id}
          animate={
            isInView
              ? { opacity: 1, y: 0, scale: 1 }
              : { opacity: 0, y: 20, scale: 0.95 }
          }
          transition={{
            duration: 0.6,
            delay: 0.1 + idx * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="group relative p-3 sm:p-3.5 rounded-xl sm:rounded-2xl bg-zinc-950/75 backdrop-blur-xl border border-white/10 hover:border-white/25 transition-all duration-300 overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
        >
          {/* Subtle Corner Top-Right Red Accent Glow on Hover */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF1A1A]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#FF1A1A]/20 transition-all duration-500" />

          {/* Top Line Accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1A1A]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="relative z-10 flex flex-col justify-between h-full space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[8.5px] font-mono uppercase tracking-[0.2em] text-[#FF1A1A] font-bold">
                // 0{idx + 1}.STAT
              </span>
              <div className="p-1 rounded-md bg-white/[0.04] border border-white/10 group-hover:border-[#FF1A1A]/40 transition-colors">
                {statIcons[idx % statIcons.length]}
              </div>
            </div>

            {/* Bold Animated Number */}
            <div className="font-anton text-2xl sm:text-3xl lg:text-[32px] tracking-tight text-white leading-none group-hover:text-zinc-100 transition-colors">
              <AnimatedCounter
                value={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals || 0}
              />
            </div>

            {/* Label */}
            <p className="font-mono text-[10.5px] sm:text-[11px] uppercase tracking-wider text-zinc-200 font-semibold line-clamp-1">
              {stat.label}
            </p>

            {/* Micro Description */}
            <p className="text-[9.5px] sm:text-[10px] text-zinc-400 font-sans font-light leading-snug line-clamp-1">
              {stat.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
