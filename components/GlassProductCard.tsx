'use client';
import { GlassProduct } from '@/types';
import { Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const gradients: Record<string, string> = {
  'Clear Float':           'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(14,165,233,0.05))',
  'Toughened':             'linear-gradient(135deg, rgba(52,211,153,0.2), rgba(16,185,129,0.05))',
  'Laminated':             'linear-gradient(135deg, rgba(167,139,250,0.2), rgba(124,58,237,0.05))',
  'Insulated (DGU/IGU)':  'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(99,102,241,0.05))',
  'Frosted':               'linear-gradient(135deg, rgba(148,163,184,0.2), rgba(100,116,139,0.05))',
  'Reflective':            'linear-gradient(135deg, rgba(103,232,249,0.2), rgba(56,189,248,0.05))',
  'Low-E':                 'linear-gradient(135deg, rgba(74,222,128,0.2), rgba(34,197,94,0.05))',
  'Back-Painted':          'linear-gradient(135deg, rgba(251,113,133,0.2), rgba(244,63,94,0.05))',
  'Smart Glass':           'linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.05))',
  'Toughened Laminated':   'linear-gradient(135deg, rgba(251,146,60,0.2), rgba(239,68,68,0.05))',
};

const icons: Record<string, string> = {
  'Clear Float': '🔲', 'Toughened': '🛡️', 'Laminated': '🔗',
  'Insulated (DGU/IGU)': '🌡️', 'Frosted': '❄️', 'Reflective': '✨',
  'Low-E': '☀️', 'Back-Painted': '🎨', 'Smart Glass': '⚡', 'Toughened Laminated': '🏗️',
};

export default function GlassProductCard({ product }: { product: GlassProduct }) {
  const grad = gradients[product.glassType] || 'linear-gradient(135deg, rgba(100,100,100,0.2), rgba(50,50,50,0.05))';
  const icon = icons[product.glassType] || '🪟';

  return (
    <div className="glass-card-hover" style={{ borderRadius: 20, overflow: 'hidden' }}>
      {/* Card header */}
      <div style={{ background: grad, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16,
          background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26,
        }}>{icon}</div>

        <div style={{
          position: 'absolute', top: 10, right: 10,
          padding: '3px 8px', borderRadius: 6, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
          background: product.inStock ? 'rgba(52,211,153,0.2)' : 'rgba(248,113,113,0.2)',
          color: product.inStock ? '#6EE7B7' : '#FCA5A5',
          border: `1px solid ${product.inStock ? 'rgba(52,211,153,0.3)' : 'rgba(248,113,113,0.3)'}`,
        }}>
          {product.inStock ? 'IN STOCK' : 'ON ORDER'}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: 16 }}>
        <div style={{ marginBottom: 8 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', margin: 0, lineHeight: 1.3 }}>{product.name}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>{product.thickness}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>{product.process}</span>
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, marginBottom: 12,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 14 }}>
          {product.application.slice(0, 3).map(app => (
            <span key={app} className="tag">{app}</span>
          ))}
          {product.application.length > 3 && <span className="tag">+{product.application.length - 3}</span>}
        </div>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>From</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#F59E0B', lineHeight: 1 }}>
              ₹{product.priceMin}<span style={{ fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)' }}>/{product.unit}</span>
            </div>
          </div>
          <Link href={`/estimate?product=${product.id}`} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 14px', borderRadius: 10, fontSize: 12, fontWeight: 700,
            background: 'rgba(245,158,11,0.12)', color: '#F59E0B',
            border: '1px solid rgba(245,158,11,0.25)', textDecoration: 'none',
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.background = '#F59E0B'; el.style.color = '#000'; el.style.borderColor = '#F59E0B'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(245,158,11,0.12)'; el.style.color = '#F59E0B'; el.style.borderColor = 'rgba(245,158,11,0.25)'; }}
          >
            Quote <ChevronRight size={12} />
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>
          <Clock size={10} /> {product.leadTime}
        </div>
      </div>
    </div>
  );
}
