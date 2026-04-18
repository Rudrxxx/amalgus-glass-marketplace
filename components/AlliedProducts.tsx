'use client';
import { AlliedProduct } from '@/types';

export default function AlliedProducts({ products, title = 'Allied Products' }: { products: AlliedProduct[]; title?: string }) {
  if (!products.length) return null;
  return (
    <div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>{title}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 10 }}>
        {products.map(p => (
          <div key={p.id} className="glass-card-hover" style={{ borderRadius: 16, padding: 16 }}>
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{p.name}</div>
                <div style={{ fontSize: 11, color: '#F59E0B', marginBottom: 6 }}>{p.category}</div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', lineHeight: 1.5, margin: 0,
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>{p.price}</span>
              <button className="btn-ghost" style={{ padding: '5px 12px', fontSize: 11 }}>Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
