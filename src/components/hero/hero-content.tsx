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
      className="select-none"
    >
      <motion.div variants={lineVariants} className="overflow-hidden">
        <h1 className="font-anton text-lg sm:text-2xl md:text-3xl lg:text-[2rem] xl:text-[2.4rem] uppercase tracking-tight text-black select-none flex flex-col gap-1.5 sm:gap-2">
          <span className="block whitespace-nowrap text-black leading-none">{line1}</span>
          <span className="block whitespace-nowrap text-black leading-none">{line2}</span>
        </h1>
      </motion.div>
    </motion.div>
  );
}
