"use client";

import React from "react";
import { useSiteConfig } from "@/context/site-context";
import { Star, ShieldCheck, Quote, CheckCircle2 } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const { config } = useSiteConfig();

  // Helper for initials fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <section id="reviews" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.06] bg-[#1A1B1B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CLIENT REPUTATION & FEEDBACK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
            CLIENT <span className="shimmer-text">EXPERIENCES</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
            Real feedback from supercar owners, enthusiasts, and collectors who trust $99 Tint Club with their vehicles.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {config.testimonials.map((t) => (
            <div
              key={t.id}
              className="glass-panel rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-white/20 transition-all duration-250 hover:-translate-y-1 flex flex-col justify-between h-full relative group"
            >
              <Quote className="w-9 h-9 text-white/[0.04] absolute top-6 right-6 group-hover:text-[var(--accent-primary)]/20 transition-colors pointer-events-none" />

              <div>
                {/* Rating stars & Platform Tag */}
                <div className="flex items-center justify-between gap-2 mb-5">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[var(--accent-primary)] text-[var(--accent-primary)]"
                      />
                    ))}
                  </div>

                  {t.platform && (
                    <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.08]">
                      {t.platform}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed italic mb-8 relative z-10 font-normal">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Client Profile */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center gap-3">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/15 flex-shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white font-mono flex-shrink-0">
                    {getInitials(t.name)}
                  </div>
                )}

                <div className="overflow-hidden">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold text-white uppercase truncate">{t.name}</span>
                    {t.verified && (
                      <span title="Verified Detailing Client" className="inline-flex items-center">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5EE07C] flex-shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-zinc-400">{t.role}</div>
                  <div className="text-[11px] font-mono text-[var(--accent-primary)] mt-0.5 truncate">
                    {t.car}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Data Client Notice */}
        <div className="mt-8 text-center text-[10px] text-zinc-400 font-mono">
          * Reviews shown above represent representative client feedback formats. Connect Google Business / Yelp reviews in the Admin Studio.
        </div>
      </div>
    </section>
  );
};
