export interface ScrapItemRate {
  id: string;
  name: string;
  category: "Paper" | "Metals" | "Plastics" | "E-Waste" | "Appliances" | "Vehicles";
  rate: number;
  unit: "per kg" | "per piece" | "per unit";
  iconName: string;
  popular?: boolean;
  description?: string;
  minimumQty?: string;
}

export interface ServiceAreaInfo {
  id: string;
  name: string;
  slug: string;
  postalCode?: string;
  estimatedArrivalMinutes: number;
  popularLocations: string[];
  description: string;
  activeExecutives: number;
  landmarks?: string[];
  nearbyAreas?: string[];
  localIntroText?: string;
  faqs?: { question: string; answer: string }[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface ScrapPickupBooking {
  name: string;
  phone: string;
  address: string;
  area: string;
  scrapTypes: string[];
  estimatedWeight: string;
  preferredDate: string;
  preferredTime: string;
  notes?: string;
}

export interface PickupBookingRequest {
  id: string;
  name: string;
  mobile: string;
  locality: string;
  address?: string;
  scrapCategory: string;
  estimatedWeightKg?: string;
  pickupDate?: string;
  preferredTimeSlot?: string;
  status: "PENDING" | "CONTACTED" | "COMPLETED" | "CANCELLED";
  createdAt?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  locality: string;
  rating: number;
  date: string;
  comment: string;
  scrapTypesSold: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Rates & Weighing" | "Pickup & Time" | "Commercial";
}
