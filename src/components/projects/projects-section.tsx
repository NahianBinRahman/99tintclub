"use client";

import React, { useState } from "react";
import { projects, ProjectItem } from "@/data/projects";
import { ProjectShowcase } from "./project-showcase";
import { ProjectModal } from "./project-modal";
import { motion } from "framer-motion";
import { ArrowDown, ShieldCheck, Sparkles, Award, ChevronDown } from "lucide-react";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#050505] text-white"
    >
      {/* =========================================================================
          1. Grand Intro Header (100% Screen Fit)
          ========================================================================= */}
      <article
        id="projects-intro"
        data-snap-section="true"
        className="relative w-full h-screen max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] select-none"
      >
        {/* Subtle Background Red Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[600px] h-[300px] bg-[#FF1A1A]/12 blur-[130px] pointer-events-none -z-10" />

        {/* Top Studio Metadata Header */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
            <span>// 99 TINT CLUB ARCHIVE — 03.INTRO</span>
          </div>
        </div>

        {/* Center Stage */}
        <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 max-w-5xl z-10 my-auto px-6">
          {/* Section Marker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-[9px] sm:text-[10.5px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-ping" />
            <span>03 // PRIVATE ARCHIVE & FEATURED BUILDS</span>
          </motion.div>

          {/* Grand Header Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-anton text-3xl sm:text-5xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-white leading-[0.93]"
          >
            BESPOKE <span className="text-[#FF1A1A]">BUILDS</span> & ARCHIVE
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm text-[#A0A0A0] max-w-2xl font-sans font-light leading-relaxed line-clamp-2 sm:line-clamp-3"
          >
            A curated showcase of precision automotive transformations. From track-grade Weissach aero packages to bespoke hypercar protection—engineered for concourse perfection.
          </motion.p>

          {/* Value Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-1 text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-zinc-400"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>Edge-Tucked Precision</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>Self-Healing Armor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-[#FF1A1A]" />
              <span>Studio Certified</span>
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center gap-2 pt-1 font-mono text-[10px] sm:text-[10.5px]"
          >
            <span className="px-3 py-1 rounded-full bg-white text-black font-bold tracking-wider">
              ALL BUILDS ({projects.length})
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 tracking-wider">
              CERAMIC COATING
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 tracking-wider">
              PAINT PROTECTION FILM
            </span>
            <span className="px-3 py-1 rounded-full bg-zinc-900/90 border border-white/10 text-zinc-300 tracking-wider hidden sm:inline-block">
              WINDOW TINT
            </span>
          </motion.div>

          {/* Scroll Down Action Button */}
          <motion.button
            type="button"
            onClick={() => {
              const el = document.getElementById(`project-${projects[0].id}`);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors cursor-pointer outline-none"
          >
            <span className="text-[9px] font-mono tracking-widest uppercase">
              SCROLL OR CLICK TO EXPLORE ARCHIVE
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
            <span className="text-zinc-500 text-xs">05</span>
            <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
              — Featured Builds Archive Overview
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("project-01");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 text-[9.5px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>VIEW FIRST BUILD</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF1A1A]" />
          </button>
        </div>
      </article>

      {/* =========================================================================
          2. All Individual Project Sections Rendered Vertically (100% Screen Fit)
          ========================================================================= */}
      <div className="relative w-full">
        {projects.map((project, index) => {
          const prevTargetId =
            index === 0
              ? "projects-intro"
              : `project-${projects[index - 1].id}`;
          const nextTargetId =
            index === projects.length - 1
              ? "projects-cta"
              : `project-${projects[index + 1].id}`;

          return (
            <ProjectShowcase
              key={project.id}
              project={project}
              index={index}
              totalCount={projects.length}
              allProjects={projects}
              prevTargetId={prevTargetId}
              nextTargetId={nextTargetId}
              onViewProject={handleViewProject}
            />
          );
        })}
      </div>

      {/* =========================================================================
          3. Projects Closing CTA Banner (100% Screen Fit)
          ========================================================================= */}
      <article
        id="projects-cta"
        data-snap-section="true"
        className="relative w-full h-screen max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-gradient-to-b from-[#050505] to-[#0c0c0c] select-none text-center"
      >
        {/* Top Studio Metadata Header */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-16 sm:pt-20 lg:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
            <span>// 99 TINT CLUB ARCHIVE — 03.CONSULTATION</span>
          </div>
        </div>

        {/* Center Stage */}
        <div className="max-w-3xl mx-auto px-6 space-y-3 sm:space-y-4 my-auto z-10">
          <span className="text-[9.5px] sm:text-[10.5px] font-mono uppercase tracking-[0.3em] text-[#FF1A1A] font-semibold">
            ELEVATE YOUR VEHICLE // PRIVATE ARCHIVE
          </span>
          <h3 className="font-anton text-2xl sm:text-4xl lg:text-5xl uppercase text-white tracking-tight leading-tight">
            HAVE A SPECIAL PROJECT IN MIND?
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
            We reserve limited monthly studio slots to ensure uncompromising concourse standards for every vehicle entrusted to our studio artisans.
          </p>
          <div className="pt-2">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#FF1A1A] hover:bg-[#e01414] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-[0_6px_25px_rgba(255,26,26,0.45)] hover:shadow-[0_8px_35px_rgba(255,26,26,0.6)] transition-all duration-300 cursor-pointer"
            >
              BOOK A PRIVATE CONSULTATION
            </a>
          </div>
        </div>

        {/* Bottom Stepper Bar */}
        <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
          <div className="flex items-center gap-2.5">
            <span className="text-white font-bold text-sm">05</span>
            <span className="text-zinc-600">/</span>
            <span className="text-zinc-500 text-xs">05</span>
            <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
              — Private Archive Consultation
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById("about");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-1.5 text-[9.5px] font-mono text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <span>CONTINUE TO STUDIO PHILOSOPHY</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#FF1A1A]" />
          </button>
        </div>
      </article>

      {/* =========================================================================
          4. PROJECT DETAIL MODAL
          ========================================================================= */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
