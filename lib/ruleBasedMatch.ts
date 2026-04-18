// lib/ruleBasedMatch.ts
import { AIMatchResult } from '@/types';

type Rule = {
  keywords: string[];
  result: AIMatchResult;
};

const rules: Rule[] = [
  {
    keywords: ['shower', 'bathroom', 'bath', 'wet area', 'pool', 'spa'],
    result: {
      recommendedProduct: 'Toughened / Tempered Glass',
      glassType: 'Toughened',
      thickness: '8mm',
      process: 'Heat Tempered',
      reason: 'Wet areas like showers and bathrooms legally require toughened safety glass. It is 4–5x stronger than standard glass and shatters into harmless granules if broken, preventing injury.',
      safetyNote: 'IS 2553 Part 2 mandates toughened glass for all wet area enclosures. Non-compliance can void insurance and building approvals.',
      alternativeOption: '10mm Toughened + Laminated for premium frameless shower enclosures',
      estimatedPriceRange: '₹120 – ₹160',
      applicationTips: [
        'Use 8mm minimum — 10mm preferred for doors over 2100mm height',
        'All edges must be polished to prevent chipping at hardware contact points',
        'Pair with SS 316 hardware (hinges, handle, wall channel) for corrosion resistance in wet zones',
      ],
    },
  },
  {
    keywords: ['soundproof', 'sound proof', 'acoustic', 'noise', 'office cabin', 'studio', 'silent'],
    result: {
      recommendedProduct: 'Laminated Safety Glass',
      glassType: 'Laminated',
      thickness: '10mm',
      process: 'PVB Laminated',
      reason: 'The PVB interlayer in laminated glass acts as a sound dampener, achieving STC 36+ ratings. It significantly reduces noise transmission for offices, studios, and urban residential projects.',
      safetyNote: null,
      alternativeOption: 'DGU/IGU with acoustic PVB inner pane for maximum STC 45+ performance',
      estimatedPriceRange: '₹180 – ₹250',
      applicationTips: [
        'For STC 45+, upgrade to DGU with asymmetric glass thickness (6mm + 8mm) and acoustic PVB',
        'Seal all frame perimeters with acoustic sealant — gaps negate glass performance',
        'Combine with solid door seals and floor sweeps for full acoustic envelope',
      ],
    },
  },
  {
    keywords: ['railing', 'balustrade', 'balcony', 'staircase', '15th', '16th', 'high rise', 'high-rise', 'floor railing'],
    result: {
      recommendedProduct: 'Toughened + Laminated Glass',
      glassType: 'Toughened Laminated',
      thickness: '12mm',
      process: 'Tempered + PVB Laminated',
      reason: 'High-rise railings require dual safety certification. Toughened strength handles wind and impact loads, while the laminated interlayer ensures the glass stays in place even if cracked — critical at height.',
      safetyNote: 'IS 16229 mandates toughened + laminated glass for railings above 6 metres. Failure to use correct specification is a life-safety violation.',
      alternativeOption: '15mm Toughened + Laminated for exposed coastal/wind-load locations',
      estimatedPriceRange: '₹320 – ₹420',
      applicationTips: [
        'Minimum 12mm for railings up to 1200mm height — increase to 15mm for taller panels',
        'Use structural silicone or SS clamp system — never drill toughened laminated glass on site',
        'Specify EN 12600 Class 1B1 impact rating in your purchase order',
      ],
    },
  },
  {
    keywords: ['energy', 'efficient', 'low-e', 'lowe', 'south facing', 'facade', 'heat', 'hvac', 'green', 'leed', 'solar'],
    result: {
      recommendedProduct: 'Low-E Energy Glass',
      glassType: 'Low-E',
      thickness: '6mm',
      process: 'Soft Coat (MSVD)',
      reason: 'Low-E coating reflects infrared heat while transmitting visible light, reducing cooling load by 30–40%. Ideal for south-facing facades and green building certifications like LEED and GRIHA.',
      safetyNote: null,
      alternativeOption: 'DGU/IGU with Low-E inner pane for maximum thermal performance (U-value ≤ 1.1)',
      estimatedPriceRange: '₹200 – ₹300',
      applicationTips: [
        'Always specify MSVD (soft coat) Low-E — it outperforms pyrolytic (hard coat) in solar control',
        'Install with Low-E coating facing inward (surface 3 of DGU) for optimal thermal performance',
        'Combine with argon gas fill in DGU for U-value ≤ 1.1 W/m²K',
      ],
    },
  },
  {
    keywords: ['kitchen', 'backsplash', 'back splash', 'lacquer', 'colour', 'color', 'decorative', 'wardrobe', 'feature wall'],
    result: {
      recommendedProduct: 'Back-Painted Lacquered Glass',
      glassType: 'Back-Painted',
      thickness: '8mm',
      process: 'Lacquered / Painted',
      reason: 'Back-painted glass provides a seamless, reflective colour surface perfect for kitchen backsplashes and feature walls. It is moisture-resistant, easy to clean, and available in 50+ RAL colours.',
      safetyNote: null,
      alternativeOption: '6mm Frosted / Acid Etched for a matte decorative alternative',
      estimatedPriceRange: '₹150 – ₹220',
      applicationTips: [
        'Choose RAL colour under daylight conditions — lacquer colours can shift under warm LED lighting',
        'Install with 3mm gap at edges and neutral-cure silicone — avoid acetoxy sealants near the paint',
        'Clean with pH-neutral glass cleaner only — avoid abrasives that can micro-scratch the surface',
      ],
    },
  },
  {
    keywords: ['privacy', 'conference', 'partition', 'frosted', 'office', 'cabin', 'meeting room'],
    result: {
      recommendedProduct: 'Frosted / Acid Etched Glass',
      glassType: 'Frosted',
      thickness: '6mm',
      process: 'Acid Etched',
      reason: 'Acid etched frosted glass transmits light while providing complete visual privacy. Its satin texture suits modern office partitions and conference rooms, maintaining an open feel without sacrificing confidentiality.',
      safetyNote: null,
      alternativeOption: 'Switchable Smart Glass for on-demand privacy (premium option)',
      estimatedPriceRange: '₹85 – ₹110',
      applicationTips: [
        'Specify double-sided etching for a uniform appearance when viewed from either side',
        'Can be combined with manifestation lines or logos for brand-aligned office interiors',
        'Pair with aluminium framing system for modular partition walls that can be reconfigured',
      ],
    },
  },
  {
    keywords: ['smart', 'switchable', 'pdlc', 'electric', 'hospital', 'opaque', 'transparent', 'automation'],
    result: {
      recommendedProduct: 'Switchable Smart Glass',
      glassType: 'Smart Glass',
      thickness: '8mm',
      process: 'PDLC / Electrochromic',
      reason: 'PDLC smart glass switches between transparent and opaque states with a simple switch or automation command. Ideal for hospitals, boardrooms, and premium residential spaces where instant privacy is needed.',
      safetyNote: null,
      alternativeOption: 'Frosted glass for static privacy at a fraction of the cost',
      estimatedPriceRange: '₹800 – ₹1,400',
      applicationTips: [
        'Plan electrical conduits during construction — retrofit wiring is complex and expensive',
        'Specify BMS/KNX compatibility upfront if integrating with building automation',
        'Lead time is 21–28 days — order early in the project timeline',
      ],
    },
  },
  {
    keywords: ['window', 'residential', 'home', 'house', 'flat', 'apartment', 'interior'],
    result: {
      recommendedProduct: 'Clear Float Glass',
      glassType: 'Clear Float',
      thickness: '5mm',
      process: 'Plain / Annealed',
      reason: 'Clear float glass is the standard choice for residential windows and interior applications. It offers excellent light transmission (>90%), a clean optical quality, and is the most cost-effective glazing solution.',
      safetyNote: null,
      alternativeOption: 'DGU/IGU for better thermal and acoustic performance in bedrooms or street-facing facades',
      estimatedPriceRange: '₹45 – ₹60',
      applicationTips: [
        'Upgrade to 6mm for windows larger than 1200 x 1500mm to handle wind loads safely',
        'Use toughened 8mm for any window within 300mm of the floor or in children\'s rooms',
        'Pair with UPVC or aluminium frames for best weather sealing and longevity',
      ],
    },
  },
  {
    keywords: ['curtain wall', 'commercial', 'building', 'exterior', 'high rise', 'tower', 'dgu', 'igu', 'insulated'],
    result: {
      recommendedProduct: 'DGU / IGU Insulated Glass',
      glassType: 'Insulated (DGU/IGU)',
      thickness: '6+12+6mm',
      process: 'Double Glazed Insulated',
      reason: 'DGU/IGU is the gold standard for commercial facades and curtain walls. The sealed air/argon gap provides U-values ≤ 1.8 W/m²K and noise reduction of 32–38 dB, critical for energy-efficient high-rise buildings.',
      safetyNote: 'Outer pane must be toughened or heat-strengthened per IS 2553 for facade applications.',
      alternativeOption: 'Low-E DGU for LEED/GRIHA certified green building projects',
      estimatedPriceRange: '₹350 – ₹500',
      applicationTips: [
        'Specify argon gas fill (90%+ purity) for 10–15% better thermal performance vs air fill',
        'Use warm-edge spacer bar (TPS or Super Spacer) to reduce edge heat loss by 30%',
        'Ensure DGU units are factory-sealed and integrity-tested before dispatch — field repairs are impossible',
      ],
    },
  },
];

export function ruleBasedMatch(query: string, role: string | null): AIMatchResult {
  const q = query.toLowerCase();

  for (const rule of rules) {
    if (rule.keywords.some(k => q.includes(k))) {
      const result = { ...rule.result };

      // Personalise reason prefix based on role
      if (role === 'architect') {
        result.reason = `For your specification: ${result.reason}`;
      } else if (role === 'builder') {
        result.reason = `For your project: ${result.reason} Bulk pricing available for 500+ sq.ft orders.`;
      } else if (role === 'dealer') {
        result.reason = `Trade note: ${result.reason} Factory-direct pricing available for this product.`;
      }

      return result;
    }
  }

  // Generic fallback
  return {
    recommendedProduct: 'Toughened / Tempered Glass',
    glassType: 'Toughened',
    thickness: '8mm',
    process: 'Heat Tempered',
    reason: 'Based on your query, toughened safety glass is a reliable starting point for most applications. It provides 4–5x the strength of standard glass and meets safety standards for the majority of glass uses.',
    safetyNote: null,
    alternativeOption: 'Please describe your specific application (shower, railing, facade, kitchen, etc.) for a more precise recommendation.',
    estimatedPriceRange: '₹120 – ₹160',
    applicationTips: [
      'Describe your exact project — room type, floor level, indoor/outdoor, and purpose',
      'Mention any specific requirements like privacy, energy efficiency, or safety ratings',
      'Include approximate dimensions for a more accurate price estimate',
    ],
  };
}
