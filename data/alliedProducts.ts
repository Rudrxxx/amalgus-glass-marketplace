import { AlliedProduct } from '@/types';

export const alliedProducts: AlliedProduct[] = [
  { id: 'ap-001', name: 'Spider Fitting Set', category: 'Hardware & Fittings', price: '₹2,800–₹6,500/set', description: 'Stainless steel 4-point spider fittings for structural frameless glass facades and balustrades.', compatibleWith: ['Toughened', 'Laminated', 'Toughened Laminated'], icon: '🔩' },
  { id: 'ap-002', name: 'Frameless Shower Set', category: 'Shower Hardware', price: '₹8,500–₹18,000/set', description: 'Complete hardware kit for frameless shower enclosures: hinges, handle, wall channel, floor sweep.', compatibleWith: ['Toughened'], icon: '🚿' },
  { id: 'ap-003', name: 'Structural Silicone', category: 'Silicones & Sealants', price: '₹350–₹600/cartridge', description: 'Dow Corning / Sika structural silicone for glass-to-glass and glass-to-metal bonding in facades.', compatibleWith: ['DGU/IGU', 'Reflective', 'Low-E', 'Toughened Laminated'], icon: '🔧' },
  { id: 'ap-004', name: 'UPVC Window Frame', category: 'Doors & Windows', price: '₹280–₹420/sq.ft', description: 'Multi-chamber UPVC profiles for windows. Thermal break, weather sealed, 20+ year durability.', compatibleWith: ['Clear Float', 'DGU/IGU', 'Low-E', 'Frosted'], icon: '🪟' },
  { id: 'ap-005', name: 'SS Railing Clamp System', category: 'Glass Railings', price: '₹1,200–₹2,800/rft', description: 'Grade 316 stainless steel top and bottom clamp system for frameless glass balcony railings.', compatibleWith: ['Toughened', 'Laminated', 'Toughened Laminated'], icon: '🏗️' },
  { id: 'ap-006', name: 'Warm Edge Spacer Bar', category: 'IGU Components', price: '₹45–₹85/rft', description: 'Thermoplastic spacer bar for DGU/IGU units. Reduces heat loss at glass edge by 30% vs. aluminium.', compatibleWith: ['DGU/IGU', 'Low-E'], icon: '📦' },
  { id: 'ap-007', name: 'Glass Patch Fittings', category: 'Hardware & Fittings', price: '₹1,500–₹4,000/set', description: 'Patch lock, top & bottom pivot, and floor spring set for frameless glass doors.', compatibleWith: ['Toughened', 'Back-Painted'], icon: '🔑' },
  { id: 'ap-008', name: 'Sanitary Silicone', category: 'Silicones & Sealants', price: '₹180–₹280/cartridge', description: 'Anti-fungal sanitary sealant for wet areas: shower enclosures, bathrooms. Mold-resistant formula.', compatibleWith: ['Toughened', 'Frosted'], icon: '🛁' },
];

export const getCompatibleAlliedProducts = (glassType: string): AlliedProduct[] => {
  return alliedProducts.filter(p => p.compatibleWith.includes(glassType));
};
