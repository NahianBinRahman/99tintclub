"use client";

import { motion, type Variants } from "framer-motion";
import { type HeroConfig } from "@/data/hero";

interface HeroContentProps {
  data: HeroConfig;
}

export function HeroContent({ data }: HeroContentProps) {
  const line1 = data.titleLines?.line1 || "WE MAKE YOUR CAR";
  const line2 = data.titleLines?.line2 || "SHINE DIFFERENT";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="select-none flex flex-col items-start"
    >
      <motion.div variants={lineVariants} className="overflow-hidden">
        <h1 className="font-anton text-2xl sm:text-3xl md:text-3xl lg:text-[2rem] xl:text-[2.4rem] uppercase tracking-tight text-black select-none flex flex-col gap-1 sm:gap-1.5 md:gap-2">
          <span className="block whitespace-nowrap text-black leading-none">{line1}</span>
          <span className="block whitespace-nowrap text-[#FF1A1A] md:text-black leading-none">{line2}</span>
        </h1>
      </motion.div>

      {/* Mobile-only supporting text placed cleanly beneath headline */}
      {(data.supportingSnippet || data.description) && (
        <motion.p
          variants={lineVariants}
          className="md:hidden mt-2 text-[10px] sm:text-xs text-black/75 font-sans font-medium leading-snug max-w-[280px] lowercase"
        >
          {data.supportingSnippet || data.description}
        </motion.p>
      )}
    </motion.div>
  );
}
