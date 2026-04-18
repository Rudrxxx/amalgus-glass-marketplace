# AmalGus — World's First B2B2C Glass Marketplace

A working prototype of the AmalGus Glass Marketplace demonstrating AI-powered glass discovery, real-time rate tracking, instant estimation, and vendor comparison.

## 🚀 Live Demo
[Link to your Vercel deployment]

## 🛠 Tech Stack
- **Frontend + Backend:** Next.js 15 (App Router) + TypeScript
- **AI:** OpenAI GPT-4o-mini (smart glass matching)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

## ✅ Features Implemented
- **Glass Product Catalog** — 10 glass types with full industry specs, search + filters (type, application, process, price)
- **AI Smart Matching** — GPT-4o-mini reads plain-language requirements and recommends the right glass type, thickness, and process. Enforces safety rules (toughened for wet areas, laminated for heights, etc.)
- **Customer Role Selection** — Homeowner / Architect / Builder / Dealer context passed to AI for tailored recommendations
- **Estimate Generator** — Width × Height × Quantity → price breakdown with glass cost + installation estimate
- **Vendor Comparison** — 2–3 verified vendors per product with ratings, location, delivery time, and price comparison
- **Daily Rate Dashboard** — Live rate ticker + rate cards for 12 glass types with daily change indicators
- **Allied Products Cross-Sell** — Compatible hardware, sealants, and fittings suggested per glass type
- **Service Partner Network** — 6 verified installers with specialty, rating, location, and price
- **Responsive UI** — Mobile-first design, dark premium aesthetic appropriate for the glass industry

## 🏗 Architecture
app/
├── api/ai-match/    → OpenAI GPT-4o-mini glass recommendation endpoint
├── api/estimate/    → Price calculation endpoint (mm → sq.ft → cost)
├── catalog/         → Filterable glass product catalog
├── estimate/        → Quote generator with vendor compare
├── rates/           → Daily rate dashboard
└── partners/        → Service installer directory
data/                → Mock data (glass products, vendors, rates, allied products)
components/          → Reusable UI components
types/               → TypeScript interfaces
lib/                 → OpenAI client

## 🔧 Setup
1. Clone repo
2. `npm install`
3. Create `.env.local` with `OPENAI_API_KEY=your_key`
4. `npm run dev`

## 📊 Industry Context
This prototype reflects real glass industry knowledge:
- Correct glass type + thickness + process combinations
- Safety compliance rules (toughened for safety, laminated for heights)
- Realistic ₹/sq.ft pricing based on Indian market rates
- B2B2C customer segmentation (52 customer types across 9 groups)
- Allied product ecosystem (hardware, sealants, frames, machinery)
