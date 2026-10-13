export type AccentColorTheme =
  | "red"
  | "#FF1A1A"
  | "#00F0FF"
  | "#FFB800"
  | "#10B981"
  | "#A855F7"
  | "apex-combo"
  | "amber"
  | "cyan"
  | "violet"
  | "emerald";

export type FontSizeScale = "compact" | "normal" | "spacious" | "large";

export type FontFamilyChoice =
  | "system"
  | "outfit"
  | "syne"
  | "space-grotesk"
  | "mono";

export interface ThemeConfig {
  accent: AccentColorTheme;
  primaryAccent?: AccentColorTheme;
  customAccentColor?: string;
  customBackgroundColor?: string;
  customCardColor?: string;
  fontSize: FontSizeScale;
  fontScale?: "compact" | "normal" | "large" | FontSizeScale;
  fontFamily: FontFamilyChoice;
  bgDark?: string;
  sections: {
    hero: boolean;
    services: boolean;
    projects: boolean;
    about: boolean;
    testimonials: boolean;
    contact: boolean;
  };
}

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
  order?: number;
  children?: SubServiceItem[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
  button: string;
  order: number;
  visible: boolean;
  category?: string;
  badge?: string;
  duration?: string;
  warranty?: string;
  startingPrice?: string;
  cta?: { label: string; href: string };
}

export interface ProjectItem {
  id: string;
  title: string;
  vehicle: string;
  category: string;
  year: string;
  description: string;
  services?: string[];
  images?: string[];
  image?: string;
  package?: string;
  featured?: boolean;
  order?: number;
  tags?: string[];
  specs?: {
    client?: string;
    finish?: string;
    protection?: string;
    tintSpec?: string;
    turnaround?: string;
    warranty?: string;
    [key: string]: string | undefined;
  };
  beforeAfter?: {
    before: string;
    after: string;
    beforeLabel?: string;
    afterLabel?: string;
  };
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  avatarInitial?: string;
  avatarColor?: string;
  reviewCount?: number;
  timeAgo?: string;
  rating: number;
  vehicle: string;
  service?: string;
  reviewText?: string;
  text?: string;
  studioReply?: string;
  verified?: boolean;
  date?: string;
}

export interface BookingRecord {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  service: string;
  status: "Pending Review" | "Confirmed" | "In Bay" | "Completed" | "Cancelled";
  createdAt: string;
}

export interface SiteConfig {
  brandName: string;
  shortName: string;
  prefix: string;
  accent: string;
  suffix: string;
  tagline: string;
  phone: string;
  phoneFormatted: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  workingHours: string;
  hours?: string;
  emergencyHotline: string;
  heroSubtitle?: string;
  heroCtaText?: string;
  ctaButton?: { label: string; href: string };
  // Hero Section
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroDescription: string;
  heroButtonLabel: string;
  heroButtonHref: string;
  // Menus
  navItems: NavItem[];
  // Services
  services: ServiceItem[];
  // Projects
  projects: ProjectItem[];
  // Testimonials
  testimonials: TestimonialItem[];
  // Theme
  theme: ThemeConfig;
  // Bookings
  bookings: BookingRecord[];
}
