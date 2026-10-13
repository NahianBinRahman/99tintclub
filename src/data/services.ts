export interface ServiceItem {
  id: string;
  slug: string;
  label: string; // e.g. "01 / AUTOMOTIVE TINT"
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  button: string;
  order: number;
  visible: boolean;
}

export const services: ServiceItem[] = [
  {
    id: "01",
    slug: "window-tint",
    label: "01 / AUTOMOTIVE TINT",
    title: "AUTOMOTIVE WINDOW TINTING",
    subtitle: "NANO-CERAMIC HEAT REJECTION & 99% UV SHIELD",
    description:
      "Enhance driving comfort and privacy with professionally installed automotive window tint. Engineered with advanced nano-ceramic technology that reduces glare, blocks destructive UV exposure, and delivers maximum thermal heat rejection with crystal-clear optical visibility.",
    image: "/images/services/window-tint.jpg",
    features: [
      "Ceramic Window Tint with maximum infrared heat rejection",
      "99% UV ray protection preventing interior fading and glare",
      "Flawless hand-fitted application with zero bubbles or peeling",
      "Professional tint removal & replacement for aged film",
    ],
    button: "Explore Window Tint",
    order: 1,
    visible: true,
  },
  {
    id: "02",
    slug: "ceramic-coating",
    label: "02 / SURFACE ARMOR",
    title: "CERAMIC COATING",
    subtitle: "MULTI-LAYER 9H HYDROPHOBIC MOLECULAR SHIELD",
    description:
      "Upgrade your vehicle's paint with a permanent, ultra-slick nano-ceramic coating. Chemically bonds at the molecular level to form an impenetrable hydrophobic barrier that repels water, road grime, bird droppings, and UV oxidation while creating unmatched liquid gloss depth.",
    image: "/images/services/ceramic-coating.jpg",
    features: [
      "Certified multi-year 9H hardness surface protection",
      "Extreme hydrophobic water-beading and self-cleaning effect",
      "Deep mirror reflection and intense liquid gloss enhancement",
      "Defense against harsh environmental fallout and chemical stains",
    ],
    button: "Explore Ceramic Coating",
    order: 2,
    visible: true,
  },
  {
    id: "03",
    slug: "paint-correction",
    label: "03 / RESTORATION",
    title: "PAINT CORRECTION",
    subtitle: "MULTI-STAGE DEFECT REMOVAL & MIRROR GLOSS FINISH",
    description:
      "Eliminate swirl marks, haze, holograms, and surface scratches through meticulous multi-stage machine polishing. Guided by precision LED inspection lights, our master detailers level the clear coat to restore pure optical clarity and a flawless showroom reflection.",
    image: "/images/services/paint-correction.jpg",
    features: [
      "1-Step, 2-Step, and multi-stage concourse paint correction",
      "Up to 95%+ swirl, scratch, and oxidation elimination",
      "Micro-measurement of clear coat depth for absolute safety",
      "High-definition LED surface inspection and optical refinement",
    ],
    button: "Explore Paint Correction",
    order: 3,
    visible: true,
  },
  {
    id: "04",
    slug: "complete-detail",
    label: "04 / COMPLETE CARE",
    title: "COMPLETE DETAIL & AUTO WASHING",
    subtitle: "FULL INTERIOR SANITIZATION & EXTERIOR DECONTAMINATION",
    description:
      "The complete spa treatment for your vehicle. Combines gentle pH-neutral two-bucket hand washing, iron and clay decontamination, with deep interior steam cleaning, leather conditioning, and carpet extraction to return every cockpit to factory-fresh perfection.",
    image: "/images/services/complete-detail.jpg",
    features: [
      "Gentle touchless foam pre-wash and two-bucket hand wash",
      "Full chemical iron decontamination and mechanical clay bar treatment",
      "Deep interior steam sanitization and premium leather conditioning",
      "Upholstery extraction, dash UV protection, and crystal streak-free glass",
    ],
    button: "Explore Complete Detail",
    order: 4,
    visible: true,
  },
  {
    id: "05",
    slug: "engine-detailing",
    label: "05 / BAY RESTORATION",
    title: "ENGINE DETAILING",
    subtitle: "PRECISION DEGREASING, STEAM CLEANING & DRESSING",
    description:
      "Restore your engine bay to concourse presentation. We safely degrease and steam-clean engine compartments, carefully avoiding sensitive electrical modules, before dressing all plastic, rubber, and carbon fiber components in factory-matte protective conditioning.",
    image: "/images/services/engine-detailing.jpg",
    features: [
      "Safe low-moisture steam degreasing of grime, oil, and road dust",
      "Careful electrical component isolation and moisture management",
      "OEM-finish conditioning of carbon fiber, hoses, and engine plastics",
      "Metal polish and anti-static dressing preventing future dust buildup",
    ],
    button: "Explore Engine Detailing",
    order: 5,
    visible: true,
  },
  {
    id: "06",
    slug: "paint-protection-film",
    label: "06 / BALLISTIC ARMOR",
    title: "PAINT PROTECTION FILM (PPF)",
    subtitle: "SELF-HEALING OPTICAL CLEAR BRA & STEALTH MATTE ARMOR",
    description:
      "Shield your vehicle's factory paint from rock chips, road debris, bug acids, and harsh track hazards. Our optically clear, self-healing urethane film delivers invisible defense with instant heat-activated scratch recovery and high-gloss or satin stealth finishes.",
    image: "/images/services/paint-protection-film.jpg",
    features: [
      "Precision computer pre-cut patterns with hand-wrapped edges",
      "Self-healing elastomeric top coat removes micro-scratches with heat",
      "High-gloss crystal clarity or transformational stealth satin matte finish",
      "10-year manufacturer warranty against yellowing, cracking & bubbling",
    ],
    button: "Explore PPF Packages",
    order: 6,
    visible: true,
  },
];
