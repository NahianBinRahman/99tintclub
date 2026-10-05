"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { ScrollProgress } from "@/components/scroll-progress";

export default function AboutPage() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col selection:bg-[var(--accent-primary)] selection:text-black">
      <ScrollProgress />
      <Navbar onOpenBooking={() => setBookingOpen(true)} />

      <main className="flex-1 pt-16 sm:pt-20">
        <AboutSection onOpenBooking={() => setBookingOpen(true)} />
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  );
}
