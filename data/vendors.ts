import { Vendor } from '@/types';

export const vendorsByProduct: Record<string, Vendor[]> = {
  'gp-001': [
    { id: 'v1', name: 'Gujarat Glass Works', location: 'Ahmedabad, Gujarat', rating: 4.7, reviewCount: 312, price: 48, delivery: '2 days', verified: true, yearsInBusiness: 18 },
    { id: 'v2', name: 'Mumbai Float Distributors', location: 'Andheri, Mumbai', rating: 4.3, reviewCount: 198, price: 52, delivery: '3 days', verified: true, yearsInBusiness: 12 },
    { id: 'v3', name: 'Pune Glass Depot', location: 'Pimpri, Pune', rating: 4.5, reviewCount: 87, price: 55, delivery: '1 day', verified: false, yearsInBusiness: 6 },
  ],
  'gp-002': [
    { id: 'v4', name: 'SafeGlass Industries', location: 'Hyderabad, Telangana', rating: 4.8, reviewCount: 445, price: 130, delivery: '5 days', verified: true, yearsInBusiness: 22 },
    { id: 'v5', name: 'TemperTech Glass', location: 'Bangalore, Karnataka', rating: 4.6, reviewCount: 231, price: 145, delivery: '7 days', verified: true, yearsInBusiness: 15 },
    { id: 'v6', name: 'Shield Glass Co.', location: 'Chennai, Tamil Nadu', rating: 4.2, reviewCount: 156, price: 128, delivery: '6 days', verified: true, yearsInBusiness: 9 },
  ],
  'gp-003': [
    { id: 'v7', name: 'LaminaPlus', location: 'Delhi NCR', rating: 4.9, reviewCount: 567, price: 195, delivery: '8 days', verified: true, yearsInBusiness: 28 },
    { id: 'v8', name: 'SafeLayer Glass', location: 'Pune, Maharashtra', rating: 4.5, reviewCount: 123, price: 210, delivery: '10 days', verified: true, yearsInBusiness: 11 },
  ],
  'gp-004': [
    { id: 'v9', name: 'InsulaTech Solutions', location: 'Mumbai, Maharashtra', rating: 4.9, reviewCount: 289, price: 380, delivery: '12 days', verified: true, yearsInBusiness: 20 },
    { id: 'v10', name: 'EnergyGlass Pro', location: 'Bangalore, Karnataka', rating: 4.7, reviewCount: 178, price: 420, delivery: '14 days', verified: true, yearsInBusiness: 14 },
  ],
  default: [
    { id: 'v11', name: 'AmalGus Certified Vendor', location: 'Pan India', rating: 4.6, reviewCount: 320, price: 0, delivery: '5–7 days', verified: true, yearsInBusiness: 10 },
    { id: 'v12', name: 'National Glass Distributors', location: 'Mumbai, Maharashtra', rating: 4.4, reviewCount: 215, price: 0, delivery: '4–6 days', verified: true, yearsInBusiness: 16 },
  ],
};

export const getVendorsForProduct = (productId: string): Vendor[] => {
  return vendorsByProduct[productId] || vendorsByProduct['default'];
};
