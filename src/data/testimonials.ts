export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatarInitial: string;
  avatarColor: string;
  reviewCount: number;
  timeAgo: string;
  rating: number;
  vehicle: string;
  service: string;
  reviewText: string;
  studioReply: string;
}

export interface TestimonialsData {
  badge: string;
  headline: string;
  subheadline: string;
  overallRating: number;
  totalReviews: number;
  verifiedPlatform: string;
  reviews: TestimonialItem[];
}

export const testimonialsData: TestimonialsData = {
  badge: "05 // VERIFIED CLIENT ACCREDITATION",
  headline: "CLIENT FEEDBACK",
  subheadline:
    "Unfiltered reviews from supercar collectors, track-day drivers, and automotive enthusiasts who demand concourse precision.",
  overallRating: 5.0,
  totalReviews: 284,
  verifiedPlatform: "Google Verified Reviews",
  reviews: [
    {
      id: "rev-01",
      name: "Dr. ASWINI KRISHNA",
      role: "Verified Porsche GT3 RS Owner",
      avatarInitial: "D",
      avatarColor: "#EAB308", // Golden
      reviewCount: 4,
      timeAgo: "2 weeks ago",
      rating: 5,
      vehicle: "Porsche 911 GT3 RS (Weissach Package)",
      service: "Full Body Self-Healing PPF & 9H Ceramic Shield",
      reviewText:
        "The edge-wrapping precision on my GT3 RS is indistinguishable from bare factory paint. Zero relief cuts visible around the aero inlets. The team genuinely cares, explained every single step of the curing process, and delivered ahead of schedule. Truly the benchmark automotive studio.",
      studioReply:
        "Thank you so much for your valuable feedback Dr. Krishna! Honored to protect your Weissach GT3 RS and truly appreciate your trust in our studio.",
    },
    {
      id: "rev-02",
      name: "MARCUS VANDENBERG",
      role: "McLaren 720S Performance Owner",
      avatarInitial: "M",
      avatarColor: "#FF1A1A", // Red
      reviewCount: 7,
      timeAgo: "1 month ago",
      rating: 5,
      vehicle: "McLaren 720S Performance",
      service: "Multi-Stage Paint Correction & Nano-Ceramic Tint",
      reviewText:
        "Brought my 720S in with horrific dealership swirl marks under showroom lighting. The 99 Tint Club masters leveled the clear coat to a pure liquid mirror reflection. Their IR heat-rejection ceramic tint cut interior cabin heat by an unbelievable margin. Top-tier craftsmanship.",
      studioReply:
        "We are thrilled by the outcome on the McLaren, Marcus! That Azores Orange paint now has the concourse depth it deserves. Appreciate your support!",
    },
    {
      id: "rev-03",
      name: "FARHAN AL-RASHID",
      role: "BMW M8 Competition Owner",
      avatarInitial: "F",
      avatarColor: "#3B82F6", // Blue
      reviewCount: 3,
      timeAgo: "3 months ago",
      rating: 5,
      vehicle: "BMW M8 Competition Gran Coupe",
      service: "Stealth Satin Matte PPF Conversion",
      reviewText:
        "Transformed my Frozen Black M8 with their stealth satin PPF. The attention to tucking behind headlights and door handles makes it look like factory individual paint. Transparent communication and honest pricing. You won't find this level of care anywhere else.",
      studioReply:
        "Thank you Farhan! The stealth conversion on your M8 Gran Coupe looks commanding. Enjoy the protection and look forward to your next visit!",
    },
    {
      id: "rev-04",
      name: "ELENA ROSTOVA",
      role: "Mercedes-AMG G63 Owner",
      avatarInitial: "E",
      avatarColor: "#10B981", // Emerald
      reviewCount: 5,
      timeAgo: "4 months ago",
      rating: 5,
      vehicle: "Mercedes-AMG G63 Magno",
      service: "Concourse Interior Steam Extraction & Ceramic Shield",
      reviewText:
        "Flawless white leather interior preserved to perfection after their steam sanitization and ceramic coating barrier. Water and coffee bead right off without staining. The staff treated my vehicle like their own. Outstanding experience from start to finish.",
      studioReply:
        "Much gratitude Elena! Interior protection on the G63 is paramount, and we're so glad the nano-barrier is performing flawlessly for your daily drives.",
    },
  ],
};
