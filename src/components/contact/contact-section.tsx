"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { contactData } from "@/data/contact";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowUp,
  CheckCircle2,
  Send,
} from "lucide-react";

export function ContactSection() {
  const [selectedService, setSelectedService] = useState(
    contactData.servicesAvailable[0]
  );
  const [vehicle, setVehicle] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setVehicle("");
      setName("");
      setPhone("");
    }, 4000);
  };

  const scrollToTop = () => {
    const hero = document.getElementById("hero");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <article
      id="contact"
      data-snap-section="true"
      className="relative w-full h-screen max-h-screen flex flex-col justify-between items-center overflow-hidden border-b border-white/[0.04] bg-[#050505] text-white select-none"
    >
      {/* Background Red Studio Radial Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[360px] bg-[#FF1A1A]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* =========================================================================
          Top Studio Metadata Header (Clearance below fixed navbar)
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pt-14 sm:pt-16 lg:pt-14 flex items-center justify-between text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 pointer-events-none select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A] animate-pulse" />
          <span>// 99 TINT CLUB ARCHIVE — 06.STUDIO CONTACT</span>
        </div>
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-[9px]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          <span>STUDIO OPEN // SLOTS AVAILABLE</span>
        </div>
      </div>

      {/* =========================================================================
          Center Stage: Luxury Frosted Glass Contact & Booking Studio Matrix
          ========================================================================= */}
      <div className="relative w-full max-w-[1300px] mx-auto px-4 sm:px-8 lg:px-10 flex-1 flex flex-col justify-center z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
          {/* Left Column (5 Cols): Studio Details & Direct Concierge */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-[#FF1A1A] mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A1A]" />
                <span>{contactData.badge}</span>
              </div>

              {/* Title */}
              <h2 className="font-anton text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white leading-[0.95]">
                RESERVE YOUR <span className="text-[#FF1A1A]">STUDIO SLOT</span>
              </h2>

              <p className="mt-1.5 text-[11px] sm:text-xs text-zinc-400 font-light leading-relaxed max-w-md">
                {contactData.subheadline}
              </p>
            </div>

            {/* Direct Studio Channels Glass Box */}
            <div className="rounded-[22px] bg-white/[0.025] border border-white/[0.09] backdrop-blur-xl p-3.5 sm:p-4 space-y-2.5 shadow-lg">
              {/* Phone / WhatsApp */}
              <a
                href={`tel:${contactData.phone}`}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#FF1A1A]/10 border border-[#FF1A1A]/20 flex items-center justify-center text-[#FF1A1A] group-hover:scale-110 transition-transform">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9.5px] font-mono uppercase text-zinc-500 tracking-wider">
                    DIRECT CONCIERGE LINE
                  </div>
                  <div className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-[#FF1A1A] transition-colors">
                    {contactData.phone} ({contactData.phoneFormatted})
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contactData.email}`}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300 group-hover:scale-110 transition-transform">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9.5px] font-mono uppercase text-zinc-500 tracking-wider">
                    VIP EMAIL INQUIRIES
                  </div>
                  <div className="text-xs font-medium text-white group-hover:text-zinc-200 transition-colors">
                    {contactData.email}
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-zinc-300">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[9.5px] font-mono uppercase text-zinc-500 tracking-wider">
                    STUDIO CLEANROOM ATELIER
                  </div>
                  <div className="text-[11px] text-zinc-300 font-light line-clamp-1">
                    {contactData.address}, {contactData.city}
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Snippet */}
            <div className="flex items-center gap-3 text-[9.5px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-[#FF1A1A]" />
                <span>MON–FRI: 08:00 – 19:00</span>
              </span>
              <span>•</span>
              <span>SAT: 09:00 – 17:00</span>
            </div>
          </div>

          {/* Right Column (7 Cols): Sleek Glass Booking Consultation Form */}
          <div className="lg:col-span-7">
            <div className="rounded-[28px] sm:rounded-[32px] bg-white/[0.035] border border-white/[0.14] backdrop-blur-2xl p-4 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)]">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 sm:py-10 flex flex-col items-center text-center space-y-2.5"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FF1A1A]/20 border border-[#FF1A1A] flex items-center justify-center text-[#FF1A1A]">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-anton uppercase text-white tracking-wide">
                    CONSULTATION REQUEST CONFIRMED
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-sm font-light">
                    Our lead studio technician will contact you via WhatsApp / Phone within 30 minutes to finalize your appointment schedule.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Select Service Pills */}
                  <div>
                    <label className="block text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 mb-1.5">
                      SELECT PRIMARY SERVICE / PACKAGE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {contactData.servicesAvailable.slice(0, 6).map((srv) => (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => setSelectedService(srv)}
                          className={`px-2 py-1.5 rounded-lg text-[10px] font-mono tracking-tight transition-all text-center cursor-pointer ${
                            selectedService === srv
                              ? "bg-[#FF1A1A] text-white font-bold shadow-[0_0_12px_rgba(255,26,26,0.4)] border border-[#FF1A1A]"
                              : "bg-white/[0.03] text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white"
                          }`}
                        >
                          {srv}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Inputs Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                        VEHICLE MAKE, MODEL & YEAR
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicle}
                        onChange={(e) => setVehicle(e.target.value)}
                        placeholder="e.g. Porsche 911 GT3 (2024)"
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF1A1A] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                        YOUR FULL NAME
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Marcus Vance"
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF1A1A] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9.5px] font-mono uppercase tracking-widest text-zinc-400 mb-1">
                      DIRECT PHONE OR WHATSAPP NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#FF1A1A] transition-colors"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      className="w-full py-2.5 sm:py-3 rounded-full bg-[#FF1A1A] hover:bg-[#e01414] text-white font-mono text-xs uppercase tracking-[0.2em] font-bold shadow-[0_6px_25px_rgba(255,26,26,0.45)] hover:shadow-[0_8px_32px_rgba(255,26,26,0.65)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>CONFIRM STUDIO APPOINTMENT</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Bottom Studio Footer Bar
          ========================================================================= */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto px-6 sm:px-10 lg:px-14 pb-2.5 sm:pb-3.5 flex items-center justify-between text-[8.5px] sm:text-[9.5px] font-mono uppercase tracking-widest text-zinc-500 border-t border-white/[0.04] pt-2 select-none">
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-400 font-bold">© 2026 99 TINT CLUB</span>
          <span>•</span>
          <span className="hidden sm:inline-block">ALL RIGHTS RESERVED</span>
          <span className="hidden sm:inline-block">•</span>
          <span className="hidden md:inline-block text-zinc-600">
            CONCOURSE AUTOMOTIVE ATELIER SPEC
          </span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors cursor-pointer group"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3 h-3 text-[#FF1A1A] group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </article>
  );
}
