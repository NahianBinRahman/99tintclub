export interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Ceramic Coating' | 'PPF Wraps' | 'PPF Protection Film' | 'Paint Correction' | 'Interior Spa' | 'Interior Detailing' | 'Window Tint' | 'Full Package' | 'Full Concierge Package';
  price: string;
  duration: string;
  description: string;
  features: string[];
  popular?: boolean;
  image: string;
  badge?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  carModel: string;
  year: string;
  glossRating: string;
  treatment: string;
  image: string;
  beforeImage?: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  car: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
  platform?: string;
  verified?: boolean;
}

export interface BusinessStats {
  vehiclesServiced: string;
  yearsExperience: string;
  clientSatisfaction: string;
  warrantyProtection: string;
}

export interface AboutConfig {
  tagline: string;
  mission: string;
  history: string;
  standards: string[];
}

export interface StatItem {
  id: string;
  label: string;
  value: string;
  suffix?: string;
  description: string;
}

export type AccentColorTheme = 'apex-combo' | 'amber' | 'cyan' | 'red' | 'violet' | 'emerald';
export type FontSizeScale = 'compact' | 'normal' | 'spacious';

export interface ThemeConfig {
  accent: AccentColorTheme;
  fontSize: FontSizeScale;
  enableGridBackground: boolean;
  enableAmbientGlow: boolean;
  cardGlassOpacity: number;
}

export interface SiteConfig {
  brandName: string;
  tagline: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleHighlight: string;
  heroTitleLine2: string;
  heroDescription: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  emergencyHotline: string;
  heroSupercarImage: string;
  theme: ThemeConfig;
  navItems: NavItem[];
  stats: StatItem[];
  services: ServiceItem[];
  projects: ProjectItem[];
  testimonials: TestimonialItem[];
}
