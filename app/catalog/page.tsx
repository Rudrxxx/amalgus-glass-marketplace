'use client';
import { useState, useMemo } from 'react';
import { glassProducts } from '@/data/glassProducts';
import GlassProductCard from '@/components/GlassProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';

const allApps = Array.from(new Set(glassProducts.flatMap(p => p.application))).sort();
const allProc = Array.from(new Set(glassProducts.map(p => p.process))).sort();

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [app, setApp] = useState('');
  const [proc, setProc] = useState('');
  const [maxPrice, setMaxPrice] = useState(1500);

  const filtered = useMemo(() => glassProducts.filter(p => {
    const ms = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.glassType.toLowerCase().includes(search.toLowerCase()) || p.application.some(a => a.toLowerCase().includes(search.toLowerCase()));
    return ms && (!app || p.application.includes(app)) && (!proc || p.process === proc) && p.priceMin <= maxPrice;
  }), [search, app, proc, maxPrice]);

  const hasFilter = search || app || proc || maxPrice < 1500;
  const clear = () => { setSearch(''); setApp(''); setProc(''); setMaxPrice(1500); };

  const sel = (val: string, set: (v: string) => void, current: string, label: string, opts: string[]) => (
    <select value={current} onChange={e => set(e.target.value)} className="input-field" style={{ appearance: 'none' }}>
      <option value="" style={{ background: '#18181C' }}>{label}</option>
      {opts.map(o => <option key={o} value={o} style={{ background: '#18181C' }}>{o}</option>)}
    </select>
  );

  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Glass Catalog</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 14, margin: 0 }}>Browse {glassProducts.length} glass products with full industry specifications</p>
      </div>

      {/* Filters */}
      <div className="glass-card" style={{ borderRadius: 20, padding: 20, marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,0.6)' }}>
            <SlidersHorizontal size={14} color="#F59E0B" /> Filters
          </div>
          {hasFilter && <button onClick={clear} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={12} />Clear</button>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <Search size={13} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products..." className="input-field" style={{ paddingLeft: 36 }} />
          </div>
          {sel(app, setApp, app, 'All Applications', allApps)}
          {sel(proc, setProc, proc, 'All Processes', allProc)}
          <div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginBottom: 6 }}>Max Price: ₹{maxPrice}/sq.ft</div>
            <input type="range" min={45} max={1500} step={5} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#F59E0B' }} />
          </div>
        </div>
      </div>

      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 18 }}>
        Showing <strong style={{ color: '#fff' }}>{filtered.length}</strong> of {glassProducts.length} products
      </div>

      {filtered.length > 0
        ? <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
            {filtered.map(p => <GlassProductCard key={p.id} product={p} />)}
          </div>
        : <div className="glass-card" style={{ borderRadius: 20, padding: 60, textAlign: 'center' }}>
            <p style={{ color: 'rgba(255,255,255,0.3)' }}>No products match your filters.</p>
            <button onClick={clear} style={{ color: '#F59E0B', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, marginTop: 8 }}>Clear filters</button>
          </div>
      }
    </div>
  );
}
