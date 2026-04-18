import { servicePartners } from '@/data/servicePartners';
import ServicePartners from '@/components/ServicePartners';

export default function PartnersPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: 40 }}>
        <div className="section-label" style={{ marginBottom: 16 }}>Certified Installer Network</div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em' }}>Find Glass Installers</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, margin: 0 }}>Verified installation professionals across India. Rated by real customers.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 40 }}>
        {[['500+', 'Verified Partners', '✅'], ['42', 'Cities Covered', '📍'], ['12,000+', 'Jobs Completed', '🔨']].map(([v, l, icon]) => (
          <div key={l} className="glass-card" style={{ borderRadius: 16, padding: 20, textAlign: 'center' }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{v}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{l}</div>
          </div>
        ))}
      </div>

      <ServicePartners partners={servicePartners} />
    </div>
  );
}
