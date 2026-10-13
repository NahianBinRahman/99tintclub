export interface AboutStat {
  id: string;
  number: string;
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
}

export interface AboutPillar {
  id: string;
  code: string;
  title: string;
  description: string;
}

export interface AboutData {
  eyebrow: string;
  badge: string;
  title: string;
  titleHighlight: string;
  tagline: string;
  description: string;
  detailedParagraph: string;
  image: string;
  imageAlt: string;
  stats: AboutStat[];
  pillars: AboutPillar[];
  studioSpecs: {
    label: string;
    value: string;
  }[];
}

export const about: AboutData = {
  eyebrow: "ABOUT 99TINT CLUB",
  badge: "04 // STUDIO PHILOSOPHY & HERITAGE",
  title: "PRECISION BEYOND",
  titleHighlight: "PROTECTION",
  tagline: "WHERE AEROSPACE SURFACE SCIENCE MEETS BESPOKE ARTISANAL CRAFTSMANSHIP",
  description:
    "99Tint Club was founded with a singular, uncompromising ambition: to elevate automotive preservation from standard workshop detailing into an exact laboratory science. Operating within controlled cleanroom environments, our certified artisans engineer protective armor for the world's most coveted automotive machinery.",
  detailedParagraph:
    "Every curve is optically evaluated, every panel meticulously wrapped with dismantled edge-tucking, and every ceramic layer molecularly cured. We do not simply protect vehicles—we amplify surface depth, shield structural integrity, and ensure timeless concourse distinction.",
  image: "/images/about/about-main.webp",
  imageAlt: "99Tint Club Bespoke Automotive Studio Masterpiece",
  stats: [
    {
      id: "stat-1",
      number: "10+",
      value: 10,
      suffix: "+",
      label: "Years Studio Craftsmanship",
      description: "Pioneering advanced urethane film & molecular ceramic engineering.",
    },
    {
      id: "stat-2",
      number: "5,000+",
      value: 5000,
      suffix: "+",
      label: "Bespoke Builds Protected",
      description: "From track-spec Weissach hypercars to flagship luxury SUVs.",
    },
    {
      id: "stat-3",
      number: "99.8%",
      value: 99.8,
      suffix: "%",
      decimals: 1,
      label: "Concourse Satisfaction Rate",
      description: "Uncompromised optical clarity backed by comprehensive studio warranties.",
    },
    {
      id: "stat-4",
      number: "100%",
      value: 100,
      suffix: "%",
      label: "Cleanroom Installation Protocol",
      description: "Zero-dust containment bays with calibrated micro-inspection lighting.",
    },
  ],
  pillars: [
    {
      id: "p-1",
      code: "SPEC // 01",
      title: "Cleanroom Environment",
      description: "Atmospherically filtered installation bays preventing microscopic airborne contaminants.",
    },
    {
      id: "p-2",
      code: "SPEC // 02",
      title: "Edge-Tucked Seams",
      description: "Disassembled panel tucking ensuring 100% invisible borders and seamless protection.",
    },
    {
      id: "p-3",
      code: "SPEC // 03",
      title: "Infrared Curing",
      description: "Precision thermal baking creating permanent molecular bonds with factory clear coats.",
    },
  ],
  studioSpecs: [
    { label: "FOUNDATION", value: "EST. 2014" },
    { label: "LOCATION", value: "STUDIO CLEANROOM // BAY 01-04" },
    { label: "STANDARDS", value: "CONCOURSE CLASS D'ELEGANCE" },
    { label: "WARRANTY", value: "UP TO LIFETIME COVERAGE" },
  ],
};
