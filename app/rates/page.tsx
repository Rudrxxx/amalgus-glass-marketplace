import { dailyRates } from '@/data/dailyRates';
import RateTicker from '@/components/RateTicker';

export default function RatesPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Daily Glass Rates</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>Live market rates from factories across India. Updated daily.</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#34D399', fontSize: 12, fontWeight: 600, marginBottom: 4 }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#34D399', display: 'inline-block' }} />
            Live Feed
          </div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{new Date().toLocaleDateString('en-IN', { dateStyle: 'medium' })}</div>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}><RateTicker /></div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 14 }}>
        {dailyRates.map((r, i) => (
          <div key={i} className="glass-card-hover" style={{ borderRadius: 18, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, color: '#fff', margin: '0 0 4px' }}>{r.glassType}</h3>
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: 6 }}>{r.thickness}</span>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 99, fontSize: 11, fontWeight: 600,
                background: r.change > 0 ? 'rgba(52,211,153,0.1)' : r.change < 0 ? 'rgba(248,113,113,0.1)' : 'rgba(255,255,255,0.05)',
                color: r.change > 0 ? '#6EE7B7' : r.change < 0 ? '#FCA5A5' : 'rgba(255,255,255,0.3)',
              }}>
                {r.change > 0 ? '▲' : r.change < 0 ? '▼' : '—'}
                {r.change !== 0 ? ` ${Math.abs(r.changePercent).toFixed(2)}%` : ' Flat'}
              </div>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#F59E0B', lineHeight: 1, marginBottom: 4 }}>₹{r.rate}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)' }}>{r.unit}</div>
            {r.change !== 0 && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 8 }}>Yesterday: ₹{(r.rate - r.change).toFixed(0)}</div>}
          </div>
        ))}
      </div>

      <div className="glass-card" style={{ borderRadius: 14, padding: '14px 18px', marginTop: 24, fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
        Rates are indicative market prices sourced from fabricators and distributors across Gujarat, Maharashtra, Telangana, and Karnataka. Actual transaction prices may vary based on quantity, location, and vendor terms.
      </div>
    </div>
  );
}
