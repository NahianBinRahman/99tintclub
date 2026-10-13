"use client";

import { motion } from "framer-motion";

interface ProjectBackgroundProps {
  glowPosition?: "left" | "right" | "center";
}

export function ProjectBackground({ glowPosition = "center" }: ProjectBackgroundProps) {
  const getGlowPositionClass = () => {
    switch (glowPosition) {
      case "left":
        return "left-[5%] top-[25%]";
      case "right":
        return "right-[5%] top-[25%]";
      default:
        return "left-1/2 -translate-x-1/2 top-1/3";
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10">
      {/* Deep Obsidian Base */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Atmospheric Soft Red Radial Glow */}
      <motion.div
        animate={{
          opacity: [0.12, 0.22, 0.12],
          scale: [1, 1.08, 1],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute w-[450px] sm:w-[650px] lg:w-[850px] h-[450px] sm:h-[650px] lg:h-[850px] rounded-full bg-[radial-gradient(circle,rgba(255,26,26,0.18)_0%,rgba(255,26,26,0.04)_45%,transparent_70%)] blur-[120px] ${getGlowPositionClass()}`}
      />

      {/* Secondary Deep Silver/White Ambient Light */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Subtle Studio Grid Lines */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Vignette Mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
    </div>
  );
}
