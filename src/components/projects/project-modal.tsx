"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { ProjectGallery } from "./project-gallery";
import { X, CheckCircle2, ShieldAlert, Calendar, Sparkles, ArrowRight } from "lucide-react";

interface ProjectModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Lock body scroll while modal is active & handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 overflow-y-auto">
          {/* Backdrop Blur & Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-xl z-0"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#09090b] border border-white/15 text-white shadow-[0_25px_70px_rgba(0,0,0,0.9)] custom-scrollbar"
          >
            {/* Ambient Red Glow in Modal Header */}
            <div className="absolute top-0 right-1/4 w-96 h-48 bg-[#FF1A1A]/15 blur-3xl pointer-events-none" />

            {/* Sticky Header Bar */}
            <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#09090b]/90 backdrop-blur-md border-b border-white/10">
              <div className="flex items-center space-x-3">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#FF1A1A] text-white">
                  ARCHIVE // {project.id}
                </span>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest hidden sm:inline">
                  {project.category}
                </span>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-[#FF1A1A] hover:border-[#FF1A1A] transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              {/* Vehicle Title & Meta */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-[0.2em] text-[#FF1A1A]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{project.year} STUDIO COMMISSION</span>
                </div>
                <h2 className="font-anton text-3xl sm:text-4xl lg:text-5xl tracking-wide uppercase">
                  {project.vehicle}
                </h2>
                <p className="font-mono text-sm uppercase tracking-widest text-zinc-400">
                  {project.title}
                </p>
              </div>

              {/* Gallery Component */}
              <ProjectGallery
                images={project.images}
                vehicleTitle={project.vehicle}
                beforeAfter={project.beforeAfter}
              />

              {/* Two Column Details: Narrative & Technical Specs */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-white/10">
                {/* Left: Project Narrative */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 mb-2">
                      TRANSFORMATION OVERVIEW
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-zinc-400 mb-3">
                      COMPLETED STUDIO SERVICES
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="flex items-start space-x-2.5 p-3 rounded-xl bg-zinc-900/70 border border-white/5 text-xs text-zinc-200"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[#FF1A1A] shrink-0 mt-0.5" />
                          <span className="font-mono tracking-tight">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Technical Specification Panel */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-4">
                    <h3 className="text-xs font-mono uppercase tracking-[0.25em] text-white flex items-center justify-between pb-3 border-b border-white/10">
                      <span>BUILD SPECIFICATIONS</span>
                      <span className="text-[#FF1A1A]">VERIFIED</span>
                    </h3>

                    {project.specs && (
                      <div className="space-y-3 font-mono text-xs">
                        <div className="flex justify-between items-start py-1 border-b border-white/5">
                          <span className="text-zinc-500">SURFACE FINISH:</span>
                          <span className="text-zinc-200 text-right font-medium max-w-[60%]">
                            {project.specs.finish || "Ultra Hydrophobic"}
                          </span>
                        </div>
                        <div className="flex justify-between items-start py-1 border-b border-white/5">
                          <span className="text-zinc-500">ARMOR SPEC:</span>
                          <span className="text-zinc-200 text-right font-medium max-w-[60%]">
                            {project.specs.protection || "Multi-Layer 9H"}
                          </span>
                        </div>
                        <div className="flex justify-between items-start py-1 border-b border-white/5">
                          <span className="text-zinc-500">TINT PACKAGE:</span>
                          <span className="text-zinc-200 text-right font-medium max-w-[60%]">
                            {project.specs.tintSpec || "Nano-Ceramic IR"}
                          </span>
                        </div>
                        <div className="flex justify-between items-start py-1 border-b border-white/5">
                          <span className="text-zinc-500">BUILD TIME:</span>
                          <span className="text-zinc-200 text-right font-medium max-w-[60%]">
                            {project.specs.turnaround || "5-7 Days"}
                          </span>
                        </div>
                        <div className="flex justify-between items-start py-1">
                          <span className="text-zinc-500">WARRANTY:</span>
                          <span className="text-[#FF1A1A] text-right font-bold max-w-[60%]">
                            {project.specs.warranty || "10-Year Guarantee"}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="pt-4">
                      <a
                        href="#contact"
                        onClick={onClose}
                        className="w-full inline-flex items-center justify-center space-x-2 py-3.5 px-4 rounded-xl bg-[#FF1A1A] hover:bg-[#e01414] text-white font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all shadow-[0_10px_25px_rgba(255,26,26,0.35)]"
                      >
                        <span>COMMISSION SIMILAR BUILD</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
