export type CustomerRole = 'homeowner' | 'architect' | 'builder' | 'dealer' | null;

export interface GlassProduct {
  id: string;
  name: string;
  glassType: string;
  thickness: string;
  process: string;
  application: string[];
  priceMin: number;
  priceMax: number;
  unit: string;
  description: string;
  features: string[];
  image: string;
  inStock: boolean;
  leadTime: string;
}

export interface Vendor {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  delivery: string;
  verified: boolean;
  yearsInBusiness: number;
}

export interface ProductWithVendors extends GlassProduct {
  vendors: Vendor[];
}

export interface AlliedProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  compatibleWith: string[];
  icon: string;
}

export interface ServicePartner {
  id: string;
  name: string;
  specialty: string;
  location: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  experience: string;
  verified: boolean;
  avatar: string;
  tags: string[];
}

export interface DailyRate {
  glassType: string;
  thickness: string;
  rate: number;
  change: number;
  changePercent: number;
  unit: string;
}

export interface EstimateResult {
  glassType: string;
  thickness: string;
  width: number;
  height: number;
  quantity: number;
  areaSqFt: number;
  ratePerSqFt: number;
  glassCost: number;
  installationCost: number;
  totalCost: number;
  vendors: Vendor[];
}

export interface AIMatchResult {
  recommendedProduct: string;
  glassType: string;
  thickness: string;
  process: string;
  reason: string;
  safetyNote?: string;
  alternativeOption?: string;
  estimatedPriceRange: string;
  applicationTips: string[];
}
