"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import { ProjectImage } from "./project-image";
import { ProjectOverlay } from "./project-overlay";
import { ProjectBackground } from "./project-background";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ProjectShowcaseProps {
  project: ProjectItem;
  index: number;
  totalCount: number;
  allProjects: ProjectItem[];
  prevTargetId: string;
  nextTargetId: string;
  onViewProject: (project: ProjectItem) => void;
}

export function ProjectShowcase({
  project,
  index,
  totalCount,
  allProjects,
  prevTargetId,
  nextTargetId,
  onViewProject,
}: ProjectShowcaseProps) {
  const containerRef = useRef<HTMLElement>(null);
  const isEven = index % 2 === 0;
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Track if this section is actively in the viewport (triggers photo auto-zoom & card entrance)
  const isInView = useInView(containerRef, {
    amount: 0.12,
    once: false,
  });

  // Track scroll position of this section relative to the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax upward exit & downward return matching the service showcase (desktop only)
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
    [0, 0.04, 0.04, 0]
  );

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <article
      id={`project-${project.id}`}
      ref={containerRef}
      data-snap-project="true"
      data-snap-section="true"
      className="relative w-full min-h-0 md:min-h-screen md:h-screen md:max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] select-none py-6 sm:py-8 md:py-0"
    >
      {/* Dark Luxury Ambient Background with alternating glows */}
      <ProjectBackground glowPosition={isEven ? "left" : "right"} />

      {/* Large Transparent Watermark Number Behind Content */}
      <motion.span
        style={{ y: watermarkY, opacity: watermarkOpacity }}
        className="absolute font-anton select-none text-[22vw] leading-none text-white/[0.035] tracking-tighter pointer-events-none z-0 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      >
        {project.id}
      </motion.span>

      {/* Top Studio Metadata Header */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-4 sm:pt-6 md:pt-16 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
          <span>// 99 TINT CLUB ARCHIVE — 03.{project.id}</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-400">
          <span className="text-[#FF1A1A]">{project.year} ARCHIVE</span>
          <span className="text-zinc-600">/</span>
          <span>{project.category}</span>
        </div>
      </div>

      {/* Center Stage: Image and Content Grid */}
      <div className="w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-8 lg:gap-12 xl:gap-16 items-center flex-1 z-10 my-3 md:my-auto py-2 md:py-0">
        {/* Left Column in Even / Right in Odd: Image */}
        <motion.div
          style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
          className={`w-full flex items-center justify-center ${
            isEven ? "order-1 lg:order-1" : "order-1 lg:order-2"
          }`}
        >
          <ProjectImage
            src={project.images[0]}
            alt={project.vehicle}
            projectNumber={project.id}
            priority={index === 0}
            isInView={isInView}
          />
        </motion.div>

        {/* Right Column in Even / Left in Odd: Overlay Content Card */}
        <motion.div
          style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
          className={`w-full flex items-center justify-center ${
            isEven ? "order-2 lg:order-2" : "order-2 lg:order-1"
          }`}
        >
          <ProjectOverlay
            project={project}
            onViewProject={onViewProject}
            isInView={isInView}
          />
        </motion.div>
      </div>

      {/* Bottom Bar: Stepper & Navigation Controls for This Vertical Section */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-4 sm:pb-6 flex items-center justify-between text-xs font-mono uppercase tracking-widest text-zinc-400 select-none">
        {/* Project Progress Counter */}
        <div className="flex items-center gap-2.5">
          <span className="text-white font-bold text-sm">
            0{index + 1}
          </span>
          <span className="text-zinc-600">/</span>
          <span className="text-zinc-500 text-xs">
            0{totalCount}
          </span>
          <span className="hidden sm:inline-block text-[10px] text-zinc-500 pl-2">
            — {project.vehicle}
          </span>
        </div>

        {/* Direct Dot Indicators to Jump between Projects */}
        <div className="hidden md:flex items-center gap-2">
          {allProjects.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToTarget(`project-${item.id}`)}
              className={`transition-all duration-300 rounded-full cursor-pointer ${
                idx === index
                  ? "w-7 h-1.5 bg-[#FF1A1A]"
                  : "w-2 h-1.5 bg-white/20 hover:bg-white/50"
              }`}
              aria-label={`Jump to ${item.vehicle}`}
            />
          ))}
        </div>

        {/* Next / Previous Section Directional Buttons */}
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
