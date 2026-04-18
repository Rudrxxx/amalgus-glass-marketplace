import Link from 'next/link';
import { ArrowRight, Sparkles, BarChart3, Users, ShieldCheck, Zap, Layers } from 'lucide-react';
import RateTicker from '@/components/RateTicker';
import GlassProductCard from '@/components/GlassProductCard';
import HomeClient from '@/components/HomeClient';
import { glassProducts } from '@/data/glassProducts';

const stats = [
  { label: 'Glass Types', value: '25+', icon: '🔲' },
  { label: 'Verified Vendors', value: '200+', icon: '✅' },
  { label: 'Market Size', value: '₹190B', icon: '📈' },
  { label: 'Customer Types', value: '52', icon: '👥' },
];

const features = [
  { icon: Sparkles, title: 'AI Smart Matching', desc: 'Describe your project in plain language. Our AI recommends the exact glass type, thickness, and process.' },
  { icon: BarChart3, title: 'Daily Live Rates', desc: 'Real-time factory pricing from across India — like a stock ticker built for the glass trade.' },
  { icon: ShieldCheck, title: 'Verified Vendors', desc: 'Every vendor is KYC-verified. Compare prices, ratings, and delivery from multiple suppliers side by side.' },
  { icon: Zap, title: 'Instant Estimates', desc: 'Enter dimensions, get a professional quote in seconds. Download and share directly with clients.' },
  { icon: Users, title: 'Certified Installers', desc: 'Find and book verified glass installation professionals in your city with real project reviews.' },
  { icon: Layers, title: 'Allied Products', desc: 'Complete your order with hardware, sealants, frames, and fittings. Everything glass needs — in one place.' },
];

export default function HomePage() {
  return (
    <>
      <RateTicker />

      {/* ── HERO ── */}
      <section className="hero-mesh noise-bg" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '96px 24px 80px' }}>
          <div style={{ maxWidth: 700 }}>
            <div className="section-label" style={{ marginBottom: 24 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
              World&apos;s First B2B2C Glass Marketplace
            </div>

            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 800,
              fontSize: 'clamp(40px, 6vw, 72px)', lineHeight: 1.05,
              color: '#fff', margin: '0 0 24px', letterSpacing: '-0.02em',
            }}>
              Buy Glass the{' '}
              <span className="gradient-text">Smart Way.</span>
              <br />No More Guesswork.
            </h1>

            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 560, margin: '0 0 36px' }}>
              AI-powered glass discovery, instant estimates, verified vendors, and certified installers — all in one platform built for India&apos;s ₹190B glass industry.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/catalog" className="btn-primary">
                Explore Catalog <ArrowRight size={16} />
              </Link>
              <Link href="/estimate" className="btn-ghost">
                Get Free Estimate
              </Link>
            </div>
          </div>

          {/* Floating accent */}
          <div style={{
            position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
            width: 320, height: 320, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
        </div>
      </section>

      {/* ── STATS ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.01)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                <div className="stat-number">{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── AI ADVISOR ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto 40px', textAlign: 'center' }}>
          <div className="section-label" style={{ marginBottom: 16 }}><Sparkles size={10} />AI Glass Advisor</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 800, color: '#fff', margin: '0 0 14px', letterSpacing: '-0.02em' }}>
            Tell Us What You Need
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', lineHeight: 1.7, margin: 0 }}>
            Describe your project in plain language. Our AI advisor instantly recommends the right glass type, thickness, and process for your exact application.
          </p>
        </div>
        <HomeClient />
      </section>

      {/* ── PRODUCTS ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 80 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36 }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 6px', letterSpacing: '-0.02em' }}>Glass Products</h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', margin: 0 }}>Industry-grade glass for every application</p>
          </div>
          <Link href="/catalog" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, color: '#F59E0B', textDecoration: 'none', fontWeight: 700 }}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {glassProducts.slice(0, 4).map(p => <GlassProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* ── WHY ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 100px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 80 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 800, color: '#fff', textAlign: 'center', marginBottom: 40, letterSpacing: '-0.02em' }}>Why AmalGus</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {features.map(f => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="glass-card-hover" style={{ borderRadius: 20, padding: 24 }}>
                <div style={{ width: 42, height: 42, borderRadius: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={18} color="#F59E0B" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
