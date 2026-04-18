import { dailyRates } from '@/data/dailyRates';

export default function RateTicker() {
  const all = [...dailyRates, ...dailyRates];
  return (
    <div style={{
      background: '#111114', borderBottom: '1px solid rgba(255,255,255,0.06)',
      overflow: 'hidden', padding: '10px 0', position: 'relative',
    }}>
      {/* fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to right, #111114, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(to left, #111114, transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div className="animate-ticker" style={{ display: 'flex', gap: 0, width: 'max-content' }}>
        {all.map((rate, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 28px', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap' }}>
              {rate.glassType}
            </span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>{rate.thickness}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)', whiteSpace: 'nowrap' }}>₹{rate.rate}</span>
            <span style={{
              fontSize: 11, fontWeight: 600, whiteSpace: 'nowrap',
              color: rate.change > 0 ? '#34D399' : rate.change < 0 ? '#F87171' : 'rgba(255,255,255,0.3)',
            }}>
              {rate.change > 0 ? '▲' : rate.change < 0 ? '▼' : '—'}
              {rate.change !== 0 ? ` ${Math.abs(rate.changePercent).toFixed(1)}%` : ' Flat'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
