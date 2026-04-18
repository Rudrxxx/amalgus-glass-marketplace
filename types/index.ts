// types/index.ts
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
  safetyNote?: string | null;
  alternativeOption?: string | null;
  estimatedPriceRange: string;
  applicationTips: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: CustomerRole;
  avatar: string;
  company?: string;
  location: string;
  joinedDate: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  glassType: string;
  thickness: string;
  width: number;
  height: number;
  quantity: number;
  areaSqFt: number;
  ratePerSqFt: number;
  total: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'confirmed' | 'in-production' | 'dispatched' | 'delivered' | 'cancelled';
  items: OrderItem[];
  vendorName: string;
  totalAmount: number;
  estimateRef: string;
}
