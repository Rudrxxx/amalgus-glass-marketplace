'use client';
import { Vendor } from '@/types';
import { Star, MapPin, CheckCircle, Clock, MessageCircle } from 'lucide-react';

export default function VendorCompare({ vendors, basePrice }: { vendors: Vendor[]; basePrice?: number }) {
  if (!vendors.length) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {vendors.map((v, i) => (
        <div key={v.id} className="glass-card" style={{ borderRadius: 16, padding: '16px 20px', borderColor: i === 0 ? 'rgba(245,158,11,0.3)' : undefined, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {i === 0 && <div style={{ position: 'absolute', marginTop: -28, background: '#F59E0B', color: '#000', fontSize: 9, fontWeight: 800, padding: '3px 8px', borderRadius: '0 0 6px 6px', letterSpacing: '0.06em' }}>BEST PRICE</div>}
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff' }}>{v.name}</span>
              {v.verified && <CheckCircle size={13} color="#F59E0B" />}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={10} />{v.location}</span>
              <span>{v.yearsInBusiness}yr exp</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>{v.rating}</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>({v.reviewCount})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'rgba(255,255,255,0.35)' }}>
            <Clock size={11} />{v.delivery}
          </div>
          {(v.price || basePrice) && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 800, color: '#F59E0B', lineHeight: 1 }}>₹{v.price || basePrice}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>per sq.ft</div>
            </div>
          )}
          <button className="btn-ghost" style={{ padding: '8px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            <MessageCircle size={13} /> Contact
          </button>
        </div>
      ))}
    </div>
  );
}
