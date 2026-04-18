'use client';
import { ServicePartner } from '@/types';
import { Star, MapPin, CheckCircle, Phone } from 'lucide-react';

export default function ServicePartners({ partners }: { partners: ServicePartner[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
      {partners.map(p => (
        <div key={p.id} className="glass-card-hover" style={{ borderRadius: 20, padding: 20 }}>
          <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))', border: '1px solid rgba(245,158,11,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 14, color: '#F59E0B', flexShrink: 0 }}>
              {p.avatar}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{p.name}</span>
                {p.verified && <CheckCircle size={13} color="#F59E0B" />}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>{p.specialty}</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 10 }}>
            <MapPin size={12} />{p.location}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{p.rating}</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>({p.reviewCount})</span>
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>{p.experience}</span>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
            {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 2 }}>Rate</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: '#F59E0B' }}>{p.priceRange}</div>
            </div>
            <button className="btn-primary" style={{ padding: '8px 16px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <Phone size={12} /> Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
