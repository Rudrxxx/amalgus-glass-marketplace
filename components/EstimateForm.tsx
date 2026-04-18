'use client';
import { useState } from 'react';
import { glassProducts } from '@/data/glassProducts';
import { EstimateResult } from '@/types';
import VendorCompare from './VendorCompare';
import AlliedProducts from './AlliedProducts';
import { getCompatibleAlliedProducts } from '@/data/alliedProducts';
import { Calculator, Download, Share2, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function EstimateForm() {
  const sp = useSearchParams();
  const [productId, setProductId] = useState(sp.get('product') || glassProducts[0].id);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(2100);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState('');

  const sel = glassProducts.find(p => p.id === productId);
  const allied = sel ? getCompatibleAlliedProducts(sel.glassType) : [];

  const run = async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/estimate', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId, width, height, quantity: qty }) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (e: unknown) { setError(e instanceof Error ? e.message : 'Error'); }
    finally { setLoading(false); }
  };

  const field = (label: string, val: number, set: (n: number) => void, min = 1) => (
    <div>
      <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>{label}</label>
      <input type="number" value={val} onChange={e => set(Number(e.target.value))} min={min} className="input-field" />
    </div>
  );

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 32, alignItems: 'start' }}>
      {/* LEFT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <label style={{ display: 'block', fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>Glass Type</label>
          <select value={productId} onChange={e => setProductId(e.target.value)} className="input-field" style={{ appearance: 'none' }}>
            {glassProducts.map(p => <option key={p.id} value={p.id} style={{ background: '#18181C' }}>{p.name} ({p.thickness})</option>)}
          </select>
          {sel && <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6 }}>₹{sel.priceMin}–₹{sel.priceMax}/sq.ft · {sel.process}</div>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {field('Width (mm)', width, setWidth, 100)}
          {field('Height (mm)', height, setHeight, 100)}
        </div>
        {field('Quantity (panels)', qty, setQty, 1)}

        {/* Preview */}
        <div className="glass-card" style={{ borderRadius: 14, padding: 16 }}>
          {[
            ['Dimensions', `${width}mm × ${height}mm`],
            ['Per panel', `${((width * height) / 92903).toFixed(2)} sq.ft`],
            [`Total (${qty} panels)`, `${((width * height * qty) / 92903).toFixed(2)} sq.ft`],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
              <span>{l}</span><span style={{ color: '#fff', fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        {error && <p style={{ color: '#FCA5A5', fontSize: 13 }}>{error}</p>}

        <button onClick={run} disabled={loading} className="btn-primary" style={{ justifyContent: 'center', opacity: loading ? 0.6 : 1 }}>
          {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Calculator size={16} />}
          {loading ? 'Calculating...' : 'Generate Estimate'}
        </button>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {result ? (
          <>
            <div className="glass-card amber-glow" style={{ borderRadius: 20, padding: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 16, color: '#fff', margin: 0 }}>Estimate Summary</h3>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn-ghost" style={{ padding: '7px 10px' }}><Share2 size={13} /></button>
                  <button className="btn-ghost" style={{ padding: '7px 10px' }}><Download size={13} /></button>
                </div>
              </div>

              {[['Glass Type', `${result.glassType} · ${result.thickness}`], ['Total Area', `${result.areaSqFt} sq.ft`], ['Mid-market Rate', `₹${result.ratePerSqFt}/sq.ft`]].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                  <span>{l}</span><span style={{ color: '#fff' }}>{v}</span>
                </div>
              ))}

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12, paddingTop: 16 }}>
                {[['Glass Cost', `₹${result.glassCost.toLocaleString()}`], ['Installation (~20%)', `₹${result.installationCost.toLocaleString()}`]].map(([l, v]) => (
                  <div key={l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>
                    <span>{l}</span><span style={{ color: '#fff' }}>{v}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 800, paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4 }}>
                  <span style={{ color: '#fff' }}>Total Estimate</span>
                  <span style={{ color: '#F59E0B' }}>₹{result.totalCost.toLocaleString()}</span>
                </div>
              </div>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', marginTop: 14, lineHeight: 1.6 }}>* Mid-market estimate. Final price depends on vendor, quantity, and site conditions.</p>
            </div>

            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>Compare Vendors</div>
              <VendorCompare vendors={result.vendors} basePrice={result.ratePerSqFt} />
            </div>

            {allied.length > 0 && <AlliedProducts products={allied} title="You'll Also Need" />}
          </>
        ) : (
          <div className="glass-card" style={{ borderRadius: 20, padding: 60, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📐</div>
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 14 }}>Fill in dimensions and generate your estimate.</p>
          </div>
        )}
      </div>
    </div>
  );
}
