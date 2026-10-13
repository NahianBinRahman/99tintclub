export interface HeroBadge {
  id: string;
  position: "top-left" | "top-right";
  text: string;
  subtext?: string;
}

export interface FloatingCardConfig {
  title: string;
  subtitle: string;
  specBadge: string;
  statusText: string;
  imageSrc: string;
  imageAlt: string;
}

export interface HeroConfig {
  video: {
    src: string;
    poster: string;
  };
  badges: HeroBadge[];
  title: string;
  titleLines: {
    line1: string;
    line2: string;
  };
  supportingSnippet: string;
  description: string;
  primaryButton: {
    label: string;
    href: string;
  };
  secondaryButton: {
    label: string;
    href: string;
  };
  floatingCard: FloatingCardConfig;
}

export const heroData: HeroConfig = {
  video: {
    src: "/videos/hero-bg-99tintclub.mp4",
    poster: "/images/car-preview.jpg",
  },
  badges: [
    {
      id: "badge-left",
      position: "top-left",
      text: "SHINERY DETAIL STUDIO",
    },
    {
      id: "badge-right",
      position: "top-right",
      text: "PREMIUM CAR CARE",
    },
  ],
  title: "WE MAKE YOUR CAR SHINE DIFFERENT",
  titleLines: {
    line1: "WE MAKE YOUR CAR",
    line2: "SHINE DIFFERENT",
  },
  supportingSnippet: "premium care, hand-done in every detail by our team at stonery studio.",
  description:
    "premium care, hand-done in every detail by our team at stonery studio.",
  primaryButton: {
    label: "BOOK NOW",
    href: "#booking",
  },
  secondaryButton: {
    label: "Explore Services",
    href: "#services",
  },
  floatingCard: {
    title: "GT-R SPEC PROTO",
    subtitle: "Ceramic Pro 9H",
    specBadge: "99% IR REJECTION",
    statusText: "STUDIO ACTIVE",
    imageSrc: "/images/car-preview.jpg",
    imageAlt: "Supercar detailing studio preview",
  },
};
