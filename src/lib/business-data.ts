/**
 * Centralized Business Configuration & Verified Data Store
 * 
 * IMPORTANT:
 * - Update these values with verified figures from the business owner.
 * - Do not invent or fabricate awards, certifications, or statistics.
 * - Clearly marks what requires final client sign-off.
 */

export interface BusinessMetrics {
  vehiclesServiced: string;
  vehiclesServicedLabel: string;
  vehiclesServicedNote: string;
  
  facilityType: string;
  facilityLabel: string;
  facilityNote: string;

  satisfactionRate: string;
  satisfactionLabel: string;
  satisfactionNote: string;

  warrantyTerm: string;
  warrantyLabel: string;
  warrantyNote: string;
}

export const businessMetrics: BusinessMetrics = {
  // Configurable metric: replace with client-verified vehicle count
  vehiclesServiced: "1,500+",
  vehiclesServicedLabel: "Vehicles Enhanced",
  vehiclesServicedNote: "Supercars, sports & luxury models serviced",

  // Configurable facility note: replaces unverified "42 worldwide hubs"
  facilityType: "Precision",
  facilityLabel: "Climate-Controlled Bays",
  facilityNote: "Dedicated dust-filtered inspection suites",

  // Configurable satisfaction metric
  satisfactionRate: "99%",
  satisfactionLabel: "Client Satisfaction",
  satisfactionNote: "Private collector and enthusiast referrals",

  // Configurable protection warranty
  warrantyTerm: "Up to 10 Yr",
  warrantyLabel: "Warranty Protection",
  warrantyNote: "Manufacturer-backed film & coating coverage",
};

export const businessInfo = {
  name: "$99 TINT CLUB",
  legalName: "$99 Tint Club LLC",
  tagline: "Professional Window Tinting & Solar Protection",
  description:
    "Professional window tinting in Yucaipa and the Inland Empire. Reduce heat, glare, and UV exposure with premium window films for your vehicle, home, or business.",
  phone: "+1 (909) 790-9988",
  email: "concierge@99tintclub.com",
  address: "34800 Yucaipa Blvd, Yucaipa, CA 92399 (Serving the Inland Empire)",
  workingHours: "Mon - Sat: 8:00 AM - 6:00 PM",
  disclaimer:
    "Custom estimates provided upon vehicle, home, or commercial glass inspection.",
};

export const aboutData = {
  badge: "About $99 Tint Club",
  title: "CRAFTSMANSHIP MEETS",
  titleHighlight: "SURFACE SCIENCE",
  subtitle:
    "Founded with a singular pursuit: to provide supercars and luxury vehicles with authentic, uncompromising protection and finish clarity.",
  paragraphs: [
    "$99 Tint Club Detailing was built on the philosophy that modern high-performance vehicles demand a higher standard of care than conventional detail shops can deliver. Between complex composite panels, thin OEM clearcoats, and intricate aerodynamic elements, vehicle preservation is an exact science.",
    "Operating out of our climate-controlled, dust-filtered detailing suites, we combine optical-grade compounding, precision template-cut paint protection film, and molecular ceramic coatings. Every vehicle that enters our studio is treated to meticulous inspection, measured paint depth evaluation, and honest, transparent consultation.",
    "We do not believe in synthetic marketing claims or one-size-fits-all treatments. Whether you drive a track-focused GT car, a modern hypercar, or a timeless classic, our work is defined by lasting durability, optical depth, and seamless finish.",
  ],
  pillars: [
    {
      title: "Controlled Environment",
      description: "Dust-filtered, temperature-regulated installation bays for optimal film adhesion and ceramic curing.",
    },
    {
      title: "Measured Preservation",
      description: "Digital ultrasonic paint depth analysis to conserve clearcoat while achieving swirl-free clarity.",
    },
    {
      title: "Precision Templates",
      description: "Custom computerized PPF patterns with wrapped edges to avoid blade contact on painted surfaces.",
    },
    {
      title: "Transparent Consultation",
      description: "Detailed pre-service walk-through and physical inspection reports with no hidden fees.",
    },
  ],
  milestones: [
    { year: "2018", label: "Studio Founded", detail: "Established as a dedicated bespoke detailing facility." },
    { year: "2020", label: "Facility Expansion", detail: "Upgraded to multi-bay climate-controlled installation suites." },
    { year: "2022", label: "Advanced PPF Division", detail: "Integrated custom computerized template cutting system." },
    { year: "Present", label: "Collector Trusted", detail: "Over 1,500+ premium and exotic vehicles safeguarded." },
  ],
};

export interface VehicleClass {
  id: string;
  name: string;
  multiplier: number;
  iconText: string;
  example: string;
}

export interface AddonOption {
  id: string;
  name: string;
  basePrice: number;
  durationHours: number;
  description: string;
}

/**
 * Estimator Configuration (Pending client verification of pricing & turnaround)
 */
export const defaultVehicleClasses: VehicleClass[] = [
  { id: "supercar", name: "California Exotic & Sports", multiplier: 1.15, iconText: "911 / Taycan", example: "Porsche 911, Taycan, Corvette Z06" },
  { id: "coupe", name: "Performance Sedan & EV", multiplier: 1.0, iconText: "Model S / M4", example: "Tesla Model S / 3, BMW M3/M4, Audi RS" },
  { id: "suv", name: "Luxury SUV & Crossover", multiplier: 1.25, iconText: "Range / G63", example: "Range Rover Sport, AMG G63, Tesla Model Y" },
  { id: "grand", name: "California Flagship & Truck", multiplier: 1.4, iconText: "Cyber / Escalade", example: "Tesla Cybertruck, Cadillac Escalade, Rivian R1T" },
];

export const defaultAddonOptions: AddonOption[] = [
  {
    id: "correction",
    name: "Multi-Stage Paint Correction",
    basePrice: 650,
    durationHours: 12,
    description: "Removes wash swirls, light surface scratches, and clearcoat hazing.",
  },
  {
    id: "ceramic",
    name: "Multi-Year Ceramic Coating",
    basePrice: 950,
    durationHours: 16,
    description: "Hydrophobic ceramic matrix providing deep mirror gloss and UV barrier.",
  },
  {
    id: "ppf",
    name: "Full Front Self-Healing PPF",
    basePrice: 1650,
    durationHours: 24,
    description: "Precision-cut thermoplastic film shielding against stone chips and road debris.",
  },
  {
    id: "interior",
    name: "Bespoke Interior & Leather Care",
    basePrice: 480,
    durationHours: 6,
    description: "Gentle pH-balanced cleaning, leather conditioning, and anti-dye protective shield.",
  },
  {
    id: "wheels",
    name: "Wheels-Off Ceramic & Caliper Protection",
    basePrice: 380,
    durationHours: 5,
    description: "Heat-resistant ceramic barrier on wheel faces, barrels, and brake calipers.",
  },
  {
    id: "tint",
    name: "Infrared Ceramic Window Tint",
    basePrice: 420,
    durationHours: 4,
    description: "High-rejection nano-ceramic film blocking solar heat without signal disruption.",
  },
];

