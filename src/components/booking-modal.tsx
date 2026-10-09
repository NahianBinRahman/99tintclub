"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { useSiteConfig } from "@/context/site-context";
import {
  X,
  CheckCircle2,
  Truck,
  ArrowRight,
} from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
  prefilledVehicle?: string;
  estimatedPrice?: number;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledService,
  prefilledVehicle,
  estimatedPrice,
}) => {
  const { config } = useSiteConfig();
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    vehicle: prefilledVehicle || "",
    service: prefilledService || config.services[0]?.title || "Graphene & Ceramic Matrix Shield",
    date: "",
    enclosedTransport: false,
    notes: "",
  });

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({ ...prev, service: prefilledService }));
    }
    if (prefilledVehicle) {
      setFormData((prev) => ({ ...prev, vehicle: prefilledVehicle }));
    }
  }, [prefilledService, prefilledVehicle]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleReset();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Persist booking to localStorage for Admin Dashboard
    try {
      const existing = JSON.parse(localStorage.getItem("tintclub_bookings") || "[]");
      const newBooking = {
        id: `BK-${Date.now().toString().slice(-5)}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        vehicle: formData.vehicle || "Porsche 911 GT3",
        service: formData.service,
        date: formData.date || new Date().toISOString().split("T")[0],
        price: "Custom Consultation Quote",
        enclosedTransport: formData.enclosedTransport,
        status: "Pending Review",
        createdAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }),
      };
      localStorage.setItem("tintclub_bookings", JSON.stringify([newBooking, ...existing]));
    } catch {
      // localStorage may fail in private mode
    }

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#5EE07C", "#34d399", "#ffffff"],
      });
    } catch {
      // fallback
    }

    setStep("confirmed");
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Book Detailing Appointment"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden my-auto animate-in zoom-in-95 duration-200 bg-[#252525]">
        {/* Top Gradient Accent Line */}
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: "var(--accent-gradient)" }}
        />

        {/* Close button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors z-20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          aria-label="Close booking modal"
        >
          <X className="w-4 h-4" />
        </button>

        {step === "form" ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-7">
            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase text-[var(--accent-primary)] font-bold tracking-widest block mb-1">
                WINDOW TINTING & PROTECTION
              </span>
              <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                GET IN <span className="shimmer-text">TOUCH</span>
              </h3>
              <p className="text-xs text-zinc-300 mt-1 font-normal">
                Professional window tinting in Yucaipa and the Inland Empire. Complete your details below for a free estimate.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.04] border border-[var(--accent-primary)]/40 mb-5 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono text-zinc-400 block">
                  Service Estimate
                </span>
                <span className="text-sm font-black text-white font-mono uppercase">
                  Free Inspection & Quote
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-[#5EE07C] font-semibold block">
                  No Obligation
                </span>
                <span className="text-[10px] text-zinc-400">Yucaipa & Inland Empire</span>
              </div>
            </div>

            <div className="space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="marcus@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1">
                    Phone Number
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
              </div>

              {/* Vehicle & Target Service */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1">
                    Vehicle Year, Make & Model
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. 2024 Porsche 911 GT3"
                    value={formData.vehicle}
                    onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1">
                    Preferred Treatment
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#141824] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                  >
                    {config.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title} ({s.price})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-300 block mb-1">
                  Target Arrival Date
                </label>
                <input
                  required
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                />
              </div>

              {/* Transport Checkbox */}
              <div
                onClick={() => setFormData({ ...formData, enclosedTransport: !formData.enclosedTransport })}
                role="checkbox"
                aria-checked={formData.enclosedTransport}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === " " || e.key === "Enter") {
                    e.preventDefault();
                    setFormData({ ...formData, enclosedTransport: !formData.enclosedTransport });
                  }
                }}
                className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer select-none flex items-center justify-between transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white uppercase">
                      Request Enclosed Transport
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      Door-to-door hydraulic enclosed carrier transport available.
                    </div>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={formData.enclosedTransport}
                  onChange={() => {}}
                  className="w-4 h-4 rounded text-[var(--accent-primary)] pointer-events-none"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-200 hover:opacity-95 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ background: "var(--accent-gradient)" }}
              >
                <span>Book Detailing</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-widest block mb-1">
              REQUEST ID: #OUT-{Math.floor(100000 + Math.random() * 900000)}
            </span>
            <h3 className="text-2xl font-black uppercase text-white mb-2">
              APPOINTMENT REQUEST <span className="shimmer-text">RECEIVED</span>
            </h3>
            <p className="text-xs text-zinc-300 max-w-md mx-auto leading-relaxed mb-6 font-normal">
              Thank you, <strong className="text-white">{formData.name}</strong>. Our concierge will contact you within 2 business hours at{" "}
              <strong className="text-[var(--accent-primary)]">{formData.phone}</strong> to confirm your vehicle intake details.
            </p>

            {/* Summary Ticket */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] text-left space-y-2 mb-6 text-xs">
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400 uppercase font-mono">Vehicle</span>
                <span className="font-bold text-white">{formData.vehicle || "Porsche 911"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400 uppercase font-mono">Treatment</span>
                <span className="font-bold text-[var(--accent-primary)]">{formData.service}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/[0.04]">
                <span className="text-zinc-400 uppercase font-mono">Transport</span>
                <span className="font-bold text-zinc-300">
                  {formData.enclosedTransport ? "Enclosed Carrier Requested" : "Direct Studio Arrival"}
                </span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs bg-white text-black hover:bg-zinc-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Done & Return to Studio
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
