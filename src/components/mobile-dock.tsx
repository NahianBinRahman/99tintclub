"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, MessageSquare, Calendar, ShieldCheck } from "lucide-react";
import { useSiteConfig } from "@/context/site-context";

export function MobileDock() {
  const pathname = usePathname();
  const { config } = useSiteConfig();

  // Do not show dock inside admin console
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.location.hash = "#contact";
    }
  };

  const cleanPhone = (config.phone || "+1 (800) 998-4682").replace(/[^0-9+]/g, "");

  return (
    <div className="fixed bottom-3 inset-x-3 z-40 md:hidden pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav
          aria-label="Mobile Quick Actions"
          className="relative bg-zinc-950/90 backdrop-blur-2xl border border-white/15 rounded-2xl p-2 px-3 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between gap-2"
        >
          {/* Call Studio */}
          <a
            href={`tel:${cleanPhone}`}
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all text-center group"
            aria-label="Call studio"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 group-hover:border-[#FF1A1A]/40 group-hover:text-[#FF1A1A] transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase mt-1 text-zinc-300">
              Call Bay
            </span>
          </a>

          {/* WhatsApp / Chat */}
          <a
            href={`https://wa.me/${cleanPhone.replace("+", "")}?text=Hello%2099%20Tint%20Club%2C%20I%20would%20like%20to%20inquire%20about%20automotive%20services.`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 active:scale-95 transition-all text-center group"
            aria-label="Chat on WhatsApp"
          >
            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-colors">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-semibold tracking-wider uppercase mt-1 text-zinc-300">
              WhatsApp
            </span>
          </a>

          {/* Book Consultation / Fast CTA */}
          <Link
            href="#contact"
            onClick={handleBookClick}
            className="flex-[1.4] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FF1A1A] hover:bg-[#ff3333] active:scale-95 text-white font-anton uppercase tracking-wider text-xs shadow-[0_0_20px_rgba(255,26,26,0.4)] transition-all"
            aria-label="Book reservation"
          >
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Book Bay</span>
          </Link>
        </nav>
      </div>
    </div>
  );
}
