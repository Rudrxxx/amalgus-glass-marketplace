# AmalGus — World's First B2B2C Glass Marketplace

A working prototype of the AmalGus Glass Marketplace — AI-powered glass discovery, real-time pricing, instant estimation, and a complete glass ecosystem in one platform.

## Live Demo

**[→ Live on Vercel](https://amalgus-glass-marketplace.vercel.app)**

## Screenshots

| Home + AI Advisor | Catalog | Estimate + Vendor Compare |
|---|---|---|
| Role-aware AI glass matching | Filter by type, application, price | Full quote with cross-sell |

---

## Features Implemented

### Core (Required)
| Feature | Status |
|---|---|
| Glass Product Catalog (10 types, full specs) | ✔ |
| Search + filter (type, application, process, price) | ✔ |
| AI Smart Matching — Gemini 1.5-flash | ✔ |
| Rule-based fallback (works without API key) | ✔ |
| Estimate Generator (mm → sq.ft → ₹) | ✔ |
| Responsive UI, industry terminology | ✔ |

### Bonus Features
| Feature | Status |
|---|---|
| Multi-vendor comparison (per product) | ✔ |
| Daily rate dashboard + live ticker | ✔ |
| Allied products cross-sell on estimate | ✔ |
| Service partner directory (6 partners) | ✔ |
| Customer role selection (changes UI + recommendations) | ✔ |
| Deployment on Vercel | ✔ |

---

## 🏗 Architecture

```bash
app/
├── api/
│   ├── ai-match/     → Gemini AI glass recommendation (+ rule-based fallback)
│   └── estimate/     → Price calculation API (mm² → sq.ft → cost breakdown)
├── catalog/          → Filterable glass product catalog
├── estimate/         → Quote generator with vendor compare + allied products
├── rates/            → Daily rate dashboard
└── partners/         → Certified installer directory
components/           → Reusable UI components
data/                 → Mock data (products, vendors, rates, allied)
lib/                  → Gemini client, rule-based matcher
types/                → TypeScript interfaces
```

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend + Backend | Next.js 15 (App Router) + TypeScript |
| AI | Google Gemini 1.5-flash API |
| Fallback AI | Expert rule-based glass matching engine |
| Styling | Tailwind CSS + custom CSS design system |
| Fonts | Syne (display) + DM Sans (body) |
| Deployment | Vercel |

---

## 🔧 Setup

```bash
# 1. Clone
git clone https://github.com/yourusername/amalgus-glass-marketplace.git
cd amalgus-glass-marketplace

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local — add your Gemini API key
# Get a free key: https://makersuite.google.com/app/apikey
# NOTE: Platform works fully without a key (rule-based fallback)

# 4. Run development server
npm run dev
# Open http://localhost:3000
```

---

## 📊 Industry Knowledge Applied

- Correct glass type + thickness + process combinations per application
- Safety compliance rules enforced in AI: toughened for wet areas, laminated for heights, DGU for facades
- Realistic ₹/sq.ft pricing from Gujarat, Maharashtra, Karnataka, and Telangana factory rates
- B2B2C customer segmentation — 52 customer types across 9 groups reflected in role-aware UI
- Allied product ecosystem: hardware, sealants, frames, fittings — cross-sold per glass type
- Industry-standard specifications: IS 2553, IS 16229, LEED/GRIHA compliance notes

---