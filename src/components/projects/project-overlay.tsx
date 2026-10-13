"use client";

import React from "react";
import { motion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";

interface ProjectOverlayProps {
  project: ProjectItem;
  onViewProject: (project: ProjectItem) => void;
  isInView?: boolean;
  className?: string;
}

export function ProjectOverlay({
  project,
  onViewProject,
  isInView = true,
  className = "",
}: ProjectOverlayProps) {
  return (
    <motion.div
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`relative z-20 w-full max-w-xl backdrop-blur-2xl bg-[#09090b]/85 border border-white/10 rounded-2xl md:rounded-3xl p-5 sm:p-6 lg:p-7 xl:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden group/overlay transition-all duration-500 hover:border-white/20 select-text ${className}`}
    >
      {/* Subtle top edge highlight */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF1A1A]/50 to-transparent" />

      {/* Ambient Red Glow on hover */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#FF1A1A]/10 rounded-full blur-3xl pointer-events-none group-hover/overlay:bg-[#FF1A1A]/20 transition-all duration-700" />

      {/* Top Meta Header: Project ID and Category */}
      <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <span className="font-mono text-xl sm:text-2xl font-black text-[#FF1A1A] tracking-tighter">
            {project.id}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-zinc-400">
            {project.year} ARCHIVE
          </span>
        </div>

        <div className="flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-[11px] font-mono tracking-wider text-zinc-300">
          <Sparkles className="w-3 h-3 text-[#FF1A1A]" />
          <span>{project.category}</span>
        </div>
      </div>

      {/* Vehicle Name and Title */}
      <div className="space-y-1 mb-3">
        <h3 className="font-anton text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] text-white tracking-wide uppercase leading-[0.96] drop-shadow-sm group-hover/overlay:text-zinc-100 transition-colors">
          {project.vehicle}
        </h3>
        <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-mono text-[#FF1A1A] font-semibold">
          {project.title}
        </p>
      </div>

      {/* Short Luxury Description */}
      <p className="text-zinc-300 text-xs sm:text-[13px] lg:text-[13.5px] leading-relaxed font-light mb-4 line-clamp-2 sm:line-clamp-3">
        {project.description}
      </p>

      {/* Services Checklist / Tags */}
      <div className="mb-5 sm:mb-6">
        <p className="text-[9px] sm:text-[9.5px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-2">
          ENGINEERED PACKAGES COMPLETED
        </p>
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {project.services.slice(0, 3).map((service, idx) => (
            <span
              key={idx}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-zinc-900/90 border border-white/5 text-[10px] sm:text-[11px] text-zinc-300 font-mono"
            >
              <ShieldCheck className="w-3 h-3 text-[#FF1A1A] shrink-0" />
              <span>{service}</span>
            </span>
          ))}
          {project.services.length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded-md bg-zinc-900/50 border border-white/5 text-[10px] text-zinc-400 font-mono">
              +{project.services.length - 3} MORE
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-4 pt-1 border-t border-white/5">
        <button
          type="button"
          onClick={() => onViewProject(project)}
          className="relative inline-flex items-center justify-between gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-white text-black font-mono text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:bg-[#FF1A1A] hover:text-white shadow-[0_10px_25px_rgba(255,255,255,0.15)] hover:shadow-[0_10px_30px_rgba(255,26,26,0.3)] cursor-pointer group/btn"
        >
          <span>VIEW PROJECT</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
        </button>

        <div className="hidden sm:flex flex-col text-[10px] font-mono text-zinc-400 tracking-wider text-right">
          <span className="text-zinc-200">{project.specs?.turnaround || "Bespoke Delivery"}</span>
          <span className="text-zinc-500">{project.specs?.warranty || "10-Yr Guarantee"}</span>
        </div>
      </div>
    </motion.div>
  );
}
