export interface ProjectItem {
  id: string;
  title: string;
  vehicle: string;
  category: string;
  year: string;
  description: string;
  services: string[];
  images: string[];
  featured: boolean;
  order?: number;
  specs?: {
    client?: string;
    finish?: string;
    protection?: string;
    tintSpec?: string;
    turnaround?: string;
    warranty?: string;
  };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
}

export const projects: ProjectItem[] = [
  {
    id: "01",
    title: "STEALTH WEISSACH AERO PACKAGE",
    vehicle: "Porsche 911 GT3 RS (992)",
    category: "Full Stealth PPF & Ceramic",
    year: "2024",
    description:
      "Complete bespoke track-grade transformation. Hand-wrapped satin self-healing PPF over raw Weissach exposed carbon fiber, combined with multi-layer 9H nano-ceramic surface coating and ultra-clear optical thermal window tint.",
    services: [
      "Full Body Stealth Satin PPF",
      "Exposed Carbon Fiber Ceramic Shield",
      "Nano-Ceramic IR 15% Window Tint",
      "9H Hydrophobic Wheel & Caliper Armor",
      "Full Underbody & Louver Detailing",
    ],
    images: [
      "/images/projects/project-01-cover.webp",
      "/images/projects/project-01-detail-01.webp",
      "/images/projects/project-01-detail-02.webp",
    ],
    featured: true,
    order: 1,
    specs: {
      finish: "Satin Matte Clear & High-Gloss Carbon",
      protection: "Self-Healing 8.5 Mil Elastomeric Urethane",
      tintSpec: "15% Nano-Ceramic IR Shield (99% UV Block)",
      turnaround: "5 Days Studio Craftsmanship",
      warranty: "10-Year Studio & Manufacturer Guarantee",
    },
    beforeAfter: {
      before: "/images/projects/project-01-detail-01.webp",
      after: "/images/projects/project-01-cover.webp",
      beforeLabel: "Micro Carbon Louver Inspection",
      afterLabel: "Finished Satin Shield",
    },
  },
  {
    id: "02",
    title: "HYPER-GLOSS REVUELTO V12 HYBRID",
    vehicle: "Lamborghini Revuelto V12",
    category: "Concourse Optical PPF & Tint",
    year: "2024",
    description:
      "Seamless optical gloss PPF installed with custom dismantled edge tucking on Giallo Auge pearl lacquer. Treated with dual-cured ceramic molecular sealant and infrared heat-rejecting ceramic window film.",
    services: [
      "High-Gloss Self-Healing Clear PPF",
      "Hand-Tucked Seamless Panel Edges",
      "Nano-Ceramic 20% IR Heat Rejection",
      "High-Temp Ceramic Exhaust & Caliper Armor",
      "Concourse Glass Hydrophobic Sealant",
    ],
    images: [
      "/images/projects/project-02-cover.webp",
      "/images/projects/project-02-detail-01.webp",
      "/images/projects/project-02-detail-02.webp",
    ],
    featured: true,
    order: 2,
    specs: {
      finish: "Ultra Liquid Mirror Pearl Gloss",
      protection: "Instant Heat-Activated Self-Healing PPF",
      tintSpec: "20% High-Performance Ceramic IR Film",
      turnaround: "6 Days Precision Craftsmanship",
      warranty: "Lifetime Studio Backed Warranty",
    },
    beforeAfter: {
      before: "/images/projects/project-02-detail-01.webp",
      after: "/images/projects/project-02-cover.webp",
      beforeLabel: "Y-Aero Splitter Edge Precision",
      afterLabel: "Full Hydrophobic Mirror Finish",
    },
  },
  {
    id: "03",
    title: "BRABUS 800 WIDESTAR EDITION",
    vehicle: "Mercedes-AMG G63 Brabus",
    category: "Satin Black Wrap & Limo Tint",
    year: "2024",
    description:
      "Complete exterior transformation into a stealth aesthetic. Cast satin obsidian black vinyl wrap, forged carbon fiber aerodynamic components wrapped in protective film, and 5% nano-ceramic limo privacy tint.",
    services: [
      "Satin Obsidian Black Vinyl Color Wrap",
      "5% Limo Privacy Nano-Ceramic Window Tint",
      "Forged Carbon Fiber PPF Armor",
      "24-Inch Monoblock Wheel Ceramic Coating",
      "Complete Interior Leather Conditioning",
    ],
    images: [
      "/images/projects/project-03-cover.webp",
      "/images/projects/project-03-detail-01.webp",
      "/images/projects/project-03-detail-02.webp",
    ],
    featured: true,
    order: 3,
    specs: {
      finish: "Deep Satin Obsidian Black & Forged Carbon",
      protection: "Dual-Layer Wrap & Protective Urethane",
      tintSpec: "5% Deep Privacy Ceramic (95% IR Heat Cut)",
      turnaround: "7 Days Custom Studio Transformation",
      warranty: "7-Year Color & Adhesion Warranty",
    },
    beforeAfter: {
      before: "/images/projects/project-03-detail-01.webp",
      after: "/images/projects/project-03-cover.webp",
      beforeLabel: "Forged Carbon Hood Scoop Fitment",
      afterLabel: "Full Stealth Widestar Stance",
    },
  },
];
