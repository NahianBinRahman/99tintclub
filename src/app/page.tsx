"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { BeforeAfterSlider } from "@/components/before-after-slider";
import { CalculatorSection } from "@/components/calculator-section";
import { ProjectsGallery } from "@/components/projects-gallery";
import { AboutSection } from "@/components/about-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ArVrStudio } from "@/components/ar-vr-studio";
import { Footer } from "@/components/footer";
import { BookingModal } from "@/components/booking-modal";
import { ScrollProgress } from "@/components/scroll-progress";
import { ServiceItem } from "@/types";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);
  const [prefilledVehicle, setPrefilledVehicle] = useState<string | undefined>(undefined);
  const [estimatedPrice, setEstimatedPrice] = useState<number | undefined>(undefined);

  const handleOpenGeneralBooking = () => {
    setPrefilledService(undefined);
    setPrefilledVehicle(undefined);
    setEstimatedPrice(undefined);
    setBookingOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setPrefilledService(service.title);
    setPrefilledVehicle(undefined);
    setEstimatedPrice(undefined);
    setBookingOpen(true);
  };

  const handleProceedWithEstimate = (details: {
    vehicle: string;
    total: number;
    services: string[];
  }) => {
    setPrefilledVehicle(details.vehicle);
    setPrefilledService(details.services.join(" + "));
    setEstimatedPrice(details.total);
    setBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#07080c] text-slate-100 flex flex-col selection:bg-[var(--accent-primary)] selection:text-black">
      <ScrollProgress />
      <Navbar onOpenBooking={handleOpenGeneralBooking} />

      <main className="flex-1">
        <HeroSection onOpenBooking={handleOpenGeneralBooking} />
        <ServicesSection onSelectService={handleSelectService} />
        <BeforeAfterSlider />
        <CalculatorSection onProceedWithEstimate={handleProceedWithEstimate} />
        <ProjectsGallery />
        <AboutSection onOpenBooking={handleOpenGeneralBooking} />
        <TestimonialsSection />
        <ArVrStudio />
      </main>

      <Footer />

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        prefilledService={prefilledService}
        prefilledVehicle={prefilledVehicle}
        estimatedPrice={estimatedPrice}
      />
    </div>
  );
}
