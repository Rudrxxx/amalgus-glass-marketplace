// components/HomeClient.tsx
'use client';
import { useState } from 'react';
import AIMatchWidget from './AIMatchWidget';
import RolePicker from './RolePicker';
import { CustomerRole } from '@/types';
import { glassProducts } from '@/data/glassProducts';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const roleTaglines: Record<NonNullable<CustomerRole>, string> = {
  homeowner: 'Showing recommendations suited for home renovation & personal projects.',
  architect:  'Showing specification-grade recommendations with technical data.',
  builder:    'Showing bulk-order friendly options with factory-direct pricing.',
  dealer:     'Showing trade pricing and high-volume product lines.',
};

const roleFeaturedProducts: Record<NonNullable<CustomerRole>, string[]> = {
  homeowner: ['gp-001', 'gp-002', 'gp-005', 'gp-008'],
  architect:  ['gp-004', 'gp-007', 'gp-010', 'gp-003'],
  builder:    ['gp-002', 'gp-004', 'gp-003', 'gp-010'],
  dealer:     ['gp-002', 'gp-006', 'gp-001', 'gp-003'],
};

export default function HomeClient() {
  const [role, setRole] = useState<CustomerRole>(null);

  const featuredIds = role ? roleFeaturedProducts[role] : null;
  const featured = featuredIds
    ? featuredIds.map(id => glassProducts.find(p => p.id === id)).filter(Boolean)
    : null;

  return (
    <div className="max-w-3xl mx-auto" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <RolePicker selected={role} onChange={setRole} />

      {/* Role-specific banner */}
      {role && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 12 }}>
          <span style={{ fontSize: 18 }}>{role === 'homeowner' ? '🏠' : role === 'architect' ? '📐' : role === 'builder' ? '🏗️' : '🏪'}</span>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{roleTaglines[role]}</p>
        </div>
      )}

      <AIMatchWidget role={role} />

      {/* Role-specific featured products */}
      {featured && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
              Recommended for {role?.charAt(0).toUpperCase()}{role?.slice(1)}s
            </div>
            <Link href="/catalog" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#F59E0B', textDecoration: 'none' }}>
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {featured.map(p => p && (
              <Link key={p.id} href={`/estimate?product=${p.id}`} style={{ display: 'flex', gap: 12, padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.07)', textDecoration: 'none', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(245,158,11,0.25)'; el.style.background = 'rgba(245,158,11,0.04)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.07)'; el.style.background = 'rgba(255,255,255,0.025)'; }}>
                <div style={{ fontSize: 22, flexShrink: 0, lineHeight: 1.3 }}>🪟</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: '#F59E0B' }}>₹{p.priceMin} – ₹{p.priceMax}/sq.ft</div>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{p.thickness} · {p.process}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
