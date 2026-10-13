"use client";

import { motion } from "framer-motion";
import { type HeroBadge as HeroBadgeType } from "@/data/hero";

interface HeroBadgeProps {
  badge: HeroBadgeType;
  className?: string;
}

export function HeroBadge({ badge, className = "" }: HeroBadgeProps) {
  const isLeft = badge.position === "top-left";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isLeft ? 24 : -96,
      }}
      transition={{
        opacity: { duration: 0.6, delay: 0.2 },
        scale: { duration: 0.6, delay: 0.2 },
        x: {
          duration: 3.5,
          ease: "easeOut",
          delay: 0.2,
        },
      }}
      className={`inline-flex items-center justify-center px-4 sm:px-5.5 py-1.5 sm:py-2.5 rounded-full bg-black text-white shadow-[0_8px_24px_rgba(0,0,0,0.4)] select-none cursor-default ${className}`}
    >
      <span className="font-anton tracking-wider text-white text-xs sm:text-sm lg:text-base uppercase leading-none pt-0.5">
        {badge.text}
      </span>
    </motion.div>
  );
}
