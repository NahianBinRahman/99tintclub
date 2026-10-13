"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { type FloatingCardConfig } from "@/data/hero";

interface FloatingCardProps {
  card: FloatingCardConfig;
  className?: string;
}

export function FloatingCard({ card, className = "" }: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -6, 0],
      }}
      transition={{
        opacity: { duration: 0.7, delay: 0.5 },
        scale: { duration: 0.7, delay: 0.5 },
        y: {
          duration: 4.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 0.8,
        },
      }}
      whileHover={{ scale: 1.04 }}
      className={`relative group cursor-pointer ${className}`}
    >
      {/* Light Frosted Glass Container matching reference screenshot */}
      <div className="relative w-48 sm:w-56 lg:w-64 h-32 sm:h-36 lg:h-40 p-2 sm:p-2.5 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/70 shadow-[0_16px_40px_rgba(0,0,0,0.12)] overflow-hidden transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src={card.imageSrc}
            alt={card.imageAlt}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 192px, 256px"
            priority
          />
        </div>
      </div>
    </motion.div>
  );
}
