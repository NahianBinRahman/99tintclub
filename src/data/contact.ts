export interface ContactInfo {
  badge: string;
  headline: string;
  subheadline: string;
  studioName: string;
  address: string;
  city: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  email: string;
  hours: {
    days: string;
    time: string;
  }[];
  servicesAvailable: string[];
}

export const contactData: ContactInfo = {
  badge: "06 // STUDIO CONSULTATION & APPOINTMENT",
  headline: "RESERVE YOUR STUDIO SLOT",
  subheadline:
    "We accept a limited number of vehicles weekly to maintain surgical, concourse-level execution. Secure your date with our master technicians.",
  studioName: "99 TINT CLUB ATELIER",
  address: "Studio 99, Precision Way, Auto Design District",
  city: "San Francisco Bay / Bahrain Facility",
  phone: "+1 (800) 998-4682",
  phoneFormatted: "1-800-99-TINT",
  whatsapp: "+1 (800) 998-4682",
  email: "concierge@99tintclub.com",
  hours: [
    { days: "Monday – Friday", time: "08:00 AM – 07:00 PM" },
    { days: "Saturday", time: "09:00 AM – 05:00 PM" },
    { days: "Sunday", time: "By Private Concierge Request" },
  ],
  servicesAvailable: [
    "Nano-Ceramic Window Tint",
    "Self-Healing PPF (Gloss / Stealth)",
    "Multi-Layer Ceramic Coating (9H)",
    "Concourse Multi-Stage Paint Correction",
    "Engine Bay & Interior Detail Spa",
    "Custom Bespoke Combination Package",
  ],
};
