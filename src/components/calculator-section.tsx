"use client";

import React, { useState } from "react";
import { Gauge, Check, Calculator, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import {
  VehicleClass,
  AddonOption,
  defaultVehicleClasses,
  defaultAddonOptions,
} from "@/lib/business-data";

interface CalculatorSectionProps {
  onProceedWithEstimate: (details: { vehicle: string; total: number; services: string[] }) => void;
}

export const CalculatorSection: React.FC<CalculatorSectionProps> = ({ onProceedWithEstimate }) => {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleClass>(defaultVehicleClasses[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["correction", "ceramic"]);

  const toggleAddon = (id: string) => {
    if (selectedAddons.includes(id)) {
      if (selectedAddons.length > 1) {
        setSelectedAddons(selectedAddons.filter((item) => item !== id));
      }
    } else {
      setSelectedAddons([...selectedAddons, id]);
    }
  };

  // Calculations
  const rawSum = defaultAddonOptions.filter((opt) => selectedAddons.includes(opt.id)).reduce(
    (acc, curr) => acc + curr.basePrice,
    0
  );
  const totalHours = defaultAddonOptions.filter((opt) => selectedAddons.includes(opt.id)).reduce(
    (acc, curr) => acc + curr.durationHours,
    0
  );

  const finalTotal = Math.round(rawSum * selectedVehicle.multiplier);
  const totalDays = Math.max(1, Math.ceil(totalHours / 10));

  const handleBook = () => {
    const serviceNames = defaultAddonOptions.filter((opt) => selectedAddons.includes(opt.id)).map(
      (opt) => opt.name
    );
    onProceedWithEstimate({
      vehicle: selectedVehicle.name,
      total: finalTotal,
      services: serviceNames,
    });
  };

  return (
    <section id="calculator" className="py-20 sm:py-24 relative overflow-hidden border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono uppercase tracking-widest text-[var(--accent-primary)] mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>REAL-TIME ESTIMATION ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-3">
            SPECIFICATION & <span className="shimmer-text">INVESTMENT ESTIMATOR</span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base font-normal leading-relaxed">
            Select your vehicle class and desired protection modules to calculate instant estimated
            investment and turnaround time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Vehicle & Option Selectors */}
          <div className="lg:col-span-8 space-y-8">
            {/* Step 1: Select Vehicle */}
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white font-mono">
                  1
                </span>
                <span>Select Vehicle Classification</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {defaultVehicleClasses.map((vc) => (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedVehicle(vc)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                      selectedVehicle.id === vc.id
                        ? "bg-white/[0.08] border-white/40 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                        : "glass-panel border-white/[0.08] hover:border-white/20 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white uppercase">{vc.name}</div>
                      <div className="text-xs text-zinc-300 mt-0.5">{vc.example}</div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--accent-primary)]">
                      {vc.iconText}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Treatments */}
            <div>
              <div className="text-xs uppercase font-extrabold tracking-wider text-zinc-300 mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white font-mono">
                  2
                </span>
                <span>Choose Protection & Detailing Modules</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {defaultAddonOptions.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon.id)}
                      role="checkbox"
                      aria-checked={isChecked}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                          e.preventDefault();
                          toggleAddon(addon.id);
                        }
                      }}
                      className={`p-4 rounded-xl border cursor-pointer select-none transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] ${
                        isChecked
                          ? "bg-white/[0.06] border-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                          : "glass-panel border-white/[0.08] hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="text-xs font-bold text-white uppercase leading-snug">
                          {addon.name}
                        </div>
                        <div
                          className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors flex-shrink-0 ${
                            isChecked
                              ? "bg-[var(--accent-primary)] border-[var(--accent-primary)] text-black"
                              : "border-white/25 bg-white/5"
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                      </div>

                      <p className="text-xs text-zinc-300 mb-3 font-normal leading-relaxed">{addon.description}</p>

                      <div className="flex items-center justify-between text-xs font-mono pt-2.5 border-t border-white/[0.06]">
                        <span className="text-zinc-400">Est. {addon.durationHours} hrs</span>
                        <span className="text-white font-bold">
                          ${Math.round(addon.basePrice * selectedVehicle.multiplier)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Estimate Summary HUD */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="rounded-2xl glass-panel p-6 border border-white/[0.12] shadow-2xl relative overflow-hidden">
              {/* Shimmer gradient line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: "var(--accent-gradient)" }}
              />

              <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    ESTIMATE SUMMARY
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    {selectedVehicle.name}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--accent-primary)]">
                  <Gauge className="w-4 h-4" />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 mb-5 max-h-56 overflow-y-auto pr-1">
                {defaultAddonOptions.filter((opt) => selectedAddons.includes(opt.id)).map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between text-xs py-1.5 border-b border-white/[0.04]"
                  >
                    <span className="text-zinc-200 font-medium truncate pr-2">{opt.name}</span>
                    <span className="font-mono text-white font-bold flex-shrink-0">
                      ${Math.round(opt.basePrice * selectedVehicle.multiplier)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Lab Schedule & Duration */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                  <span>Est. Turnaround</span>
                </div>
                <span className="font-mono font-bold text-white">{totalDays} Business Days</span>
              </div>

              {/* Total & Action */}
              <div className="pt-2 border-t border-white/[0.08] mb-5">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-xs uppercase font-extrabold text-zinc-300">Estimated Investment</span>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-white font-mono">${finalTotal}</span>
                    <span className="text-[10px] text-zinc-400 block font-mono">USD • Tax Included</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBook}
                className="w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-black flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)] transition-all duration-200 hover:opacity-95 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                style={{ background: "var(--accent-gradient)" }}
              >
                <span>Book Detailing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Required Professional Disclaimer */}
              <p className="mt-4 text-[11px] text-zinc-400 leading-relaxed text-center font-normal border-t border-white/[0.06] pt-3">
                Final pricing may vary based on vehicle condition, size, selected materials, and inspection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
