export interface SubServiceItem {
  id: string;
  title: string;
  description: string;
  href: string;
  tag?: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  children?: SubServiceItem[];
}

export interface NavigationConfig {
  brand: {
    name: string;
    shortName: string;
    prefix: string;
    accent: string;
    suffix: string;
    tagline: string;
  };
  menuItems: NavItem[];
  ctaButton: {
    label: string;
    href: string;
  };
}

export const navigationData: NavigationConfig = {
  brand: {
    name: "99Tint Club",
    shortName: "99TC",
    prefix: "$99",
    accent: "TINT",
    suffix: "CLUB",
    tagline: "Ultra Automotive Customization Studio",
  },
  menuItems: [
    {
      id: "services",
      label: "SERVICES",
      href: "#services",
      children: [
        {
          id: "window-tint",
          title: "Window Tint",
          description: "Nano-ceramic heat rejection & 99% UV protection.",
          href: "#service-window-tint",
          tag: "Top Rated",
        },
        {
          id: "ceramic-coating",
          title: "Ceramic Coating",
          description: "Multi-layer 9H molecular hydrophobic armor & intense gloss.",
          href: "#service-ceramic-coating",
          tag: "Signature",
        },
        {
          id: "paint-correction",
          title: "Paint Correction",
          description: "Multi-stage defect removal & optical mirror gloss finish.",
          href: "#service-paint-correction",
          tag: "Concourse",
        },
        {
          id: "complete-detail",
          title: "Complete Detail",
          description: "Full interior sanitization & exterior decontamination wash.",
          href: "#service-complete-detail",
        },
        {
          id: "engine-detailing",
          title: "Engine Detailing",
          description: "Precision bay degreasing, steam cleaning & component dressing.",
          href: "#service-engine-detailing",
        },
        {
          id: "paint-protection-film",
          title: "Paint Protection Film (PPF)",
          description: "Self-healing clear bra & satin stealth rock chip armor.",
          href: "#service-paint-protection-film",
          tag: "Ultimate Armor",
        },
      ],
    },
    {
      id: "projects",
      label: "OUR WORK",
      href: "#projects",
    },
    {
      id: "about",
      label: "ABOUT",
      href: "#about",
    },
    {
      id: "reviews",
      label: "REVIEWS",
      href: "#testimonials",
    },
    {
      id: "contact",
      label: "CONTACT",
      href: "#contact",
    },
  ],
  ctaButton: {
    label: "GET IN TOUCH",
    href: "#contact",
  },
};
