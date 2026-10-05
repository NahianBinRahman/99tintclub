"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteConfig } from "@/context/site-context";
import {
  Shield,
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  X,
} from "lucide-react";

export const Footer: React.FC = () => {
  const { config } = useSiteConfig();
  const pathname = usePathname();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | null>(null);

  const getHref = (href: string) => {
    if (href.startsWith("#") && pathname && pathname !== "/") {
      return `/${href}`;
    }
    return href;
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  const exploreLinks = [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "About", href: "/about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  const serviceLinks = [
    { label: "Ceramic Coating", href: "#services" },
    { label: "Paint Protection Film (PPF)", href: "#services" },
    { label: "Paint Correction", href: "#paint-lab" },
    { label: "Interior Detailing", href: "#services" },
    { label: "Window Tint", href: "#services" },
  ];

  return (
    <>
      <footer id="contact" className="relative bg-[#050608] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
        {/* Ambient Glow */}
        <div
          className="glow-orb -bottom-20 left-1/3 w-[600px] h-[300px] opacity-10"
          style={{ background: "var(--accent-glow)" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-14 border-b border-white/[0.08]">
            {/* Col 1: Brand & Bio (4 cols) */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 mb-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] rounded-lg"
              >
                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center text-[var(--accent-primary)] group-hover:border-[var(--accent-primary)] transition-colors">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <span className="text-lg font-black tracking-wider text-white flex items-center gap-1.5">
                  {config.brandName}
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-primary)]" />
                </span>
              </Link>

              <p className="text-xs text-zinc-300 leading-relaxed mb-6 max-w-sm font-normal">
                {config.tagline}. Dedicated to climate-controlled vehicle protection, precision self-healing film installation, and concours-grade optical paint restoration.
              </p>

              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[11px] font-mono text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Beverly Hills Facility</span>
                </span>
              </div>
            </div>

            {/* Col 2: Explore Links (2 cols) */}
            <div className="lg:col-span-2">
              <div className="text-xs uppercase font-extrabold tracking-wider text-white mb-4">
                Explore
              </div>
              <ul className="space-y-2.5">
                {exploreLinks.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={getHref(item.href)}
                      className="text-xs text-zinc-300 hover:text-white hover:underline transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Services (2 cols) */}
            <div className="lg:col-span-2">
              <div className="text-xs uppercase font-extrabold tracking-wider text-white mb-4">
                Services
              </div>
              <ul className="space-y-2.5">
                {serviceLinks.map((item, idx) => (
                  <li key={idx}>
                    <a
                      href={getHref(item.href)}
                      className="text-xs text-zinc-300 hover:text-white hover:underline transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact & Concierge (4 cols) */}
            <div className="lg:col-span-4">
              <div className="text-xs uppercase font-extrabold tracking-wider text-white mb-4">
                Direct Concierge
              </div>
              <ul className="space-y-3 text-xs text-zinc-300 mb-6">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                  <span>{config.address}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
                  <a href={`tel:${config.phone}`} className="hover:text-white transition-colors">
                    {config.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0" />
                  <a href={`mailto:${config.email}`} className="hover:text-white transition-colors">
                    {config.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[var(--accent-primary)] flex-shrink-0 mt-0.5" />
                  <span>{config.workingHours}</span>
                </li>
              </ul>

              {/* Newsletter Subscription */}
              <div>
                <div className="text-xs uppercase font-bold text-white mb-2">
                  VIP Bulletin
                </div>
                <p className="text-[11px] text-zinc-400 mb-3 leading-relaxed">
                  Receive private announcements for seasonal booking schedules and collector events.
                </p>

                {subscribed ? (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 flex items-center gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>Thank you. You are registered for VIP announcements.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-2">
                    <div className="relative">
                      <input
                        required
                        type="email"
                        placeholder="Enter email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                      <button
                        type="submit"
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-[var(--accent-primary)] text-black hover:opacity-90 transition-opacity flex items-center justify-center font-bold"
                        aria-label="Subscribe to VIP bulletins"
                      >
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-[11px] text-zinc-400 leading-normal">
                      By subscribing, you agree to our{" "}
                      <button
                        type="button"
                        onClick={() => setActiveModal("privacy")}
                        className="underline text-zinc-300 hover:text-white"
                      >
                        Privacy Policy
                      </button>
                      .
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Credits, Legal & Admin Link */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 gap-4">
            <div>
              © {new Date().getFullYear()} {config.brandName} Studio Detailing. All rights reserved.
            </div>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <span>•</span>
              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="hover:text-white transition-colors"
              >
                Terms & Conditions
              </button>
              <span>•</span>
              {/* Unobtrusive small Admin Login link */}
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-zinc-300 transition-colors font-mono text-[11px]"
                title="Management Portal"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Accessible Legal Modals */}
      {activeModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeModal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/20 shadow-2xl p-6 sm:p-8 bg-[#0c0e16] max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {activeModal === "privacy" ? (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[var(--accent-primary)] font-bold">
                  LEGAL & PRIVACY
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                  Privacy Policy
                </h3>
                <div className="text-xs sm:text-sm text-zinc-300 space-y-3 leading-relaxed font-normal">
                  <p>
                    At Outumn Studio Detailing, we respect the privacy of our clientele. Any information collected during appointment requests, vehicle consultations, or newsletter subscriptions is utilized exclusively to provide high-standard concierge detailing services.
                  </p>
                  <p>
                    We do not sell, rent, or distribute personal customer records or vehicle registration data to third-party marketing entities. Information collected via digital inquiries is encrypted and stored securely.
                  </p>
                  <p>
                    For inquiries regarding stored client records or to request removal from our VIP bulletin list, contact our concierge directly at {config.email}.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase text-[var(--accent-primary)] font-bold">
                  TERMS OF SERVICE
                </span>
                <h3 className="text-xl sm:text-2xl font-black uppercase text-white">
                  Terms & Conditions
                </h3>
                <div className="text-xs sm:text-sm text-zinc-300 space-y-3 leading-relaxed font-normal">
                  <p>
                    All vehicle detailing estimates provided online or over the phone are approximations. Final service specifications and pricing are confirmed upon in-person vehicle intake and paint depth examination.
                  </p>
                  <p>
                    Paint protection film warranties are subject to manufacturer guidelines and proper post-installation care. Ceramic coatings require recommended maintenance washes to preserve peak hydrophobicity.
                  </p>
                  <p>
                    Cancellations or reschedule requests must be communicated at least 48 hours prior to scheduled studio bay intake.
                  </p>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
              <button
                onClick={() => setActiveModal(null)}
                className="px-5 py-2 rounded-xl bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
