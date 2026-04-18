'use client';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0C0C0E', marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 48, marginBottom: 48 }} className="footer-grid">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: 'linear-gradient(135deg,#F59E0B,#FCD34D)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, color: '#000' }}>A</div>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, color: '#fff' }}>AmalGus</span>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, maxWidth: 280, margin: '0 0 16px' }}>
              World&apos;s First B2B2C Glass & Allied Products Niche Marketplace — connecting the entire glass ecosystem.
            </p>
            <a href="mailto:preetam@amalgus.com" style={{ fontSize: 12, color: 'rgba(245,158,11,0.7)', textDecoration: 'none' }}>preetam@amalgus.com</a>
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Platform</div>
            {[['Glass Catalog', '/catalog'], ['Get Estimate', '/estimate'], ['Live Rates', '/rates'], ['Find Installers', '/partners']].map(([l, h]) => (
              <Link key={h} href={h} style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', marginBottom: 10, transition: 'color 0.15s' }}
                onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
                onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
              >{l}</Link>
            ))}
          </div>

          <div>
            <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Glass Types</div>
            {['Clear Float', 'Toughened', 'Laminated', 'DGU / IGU', 'Low-E Glass', 'Smart Glass'].map(t => (
              <div key={t} style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>{t}</div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>© 2026 AmalGus Technology. All rights reserved.</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>Built for India&apos;s glass industry.</span>
        </div>
      </div>
    </footer>
  );
}
