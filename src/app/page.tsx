import { Navbar } from "@/components/navbar/navbar";
import { Hero } from "@/components/hero/hero";
import { ServicesSection } from "@/components/services/services-section";
import { ProjectsSection } from "@/components/projects/projects-section";
import { AboutSection } from "@/components/about/about-section";
import { TestimonialsSection } from "@/components/testimonials/testimonials-section";
import { ContactSection } from "@/components/contact/contact-section";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white text-black selection:bg-[#FF1A1A] selection:text-white">
      {/* Minimal Header / Navbar */}
      <Navbar />

      {/* Phase 1: Cinematic Hero Section matching reference style */}
      <Hero />

      {/* Phase 2: Cinematic Services & Packages Showcase */}
      <ServicesSection />

      {/* Phase 3: Cinematic Projects / Portfolio Showcase */}
      <ProjectsSection />

      {/* Phase 4: Cinematic Brand About & Philosophy Showcase */}
      <AboutSection />

      {/* Phase 5: Verified Client Reviews / Testimonials */}
      <TestimonialsSection />

      {/* Phase 6: Luxury Studio Contact & Booking Atelier */}
      <ContactSection />
    </main>
  );
}
