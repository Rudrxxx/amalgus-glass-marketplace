'use client';
import { useState } from 'react';
import { Sparkles, Send, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import { AIMatchResult, CustomerRole } from '@/types';

const samples = [
  "Glass for bathroom shower",
  "Soundproof office cabin",
  "Balcony railing 15th floor",
  "Energy efficient south facade",
  "Kitchen backsplash decorative",
  "Privacy conference room",
];

export default function AIMatchWidget({ role }: { role: CustomerRole }) {
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIMatchResult | null>(null);
  const [error, setError] = useState('');

  const submit = async (query?: string) => {
    const text = query || q;
    if (!text.trim()) return;
    setLoading(true); setError(''); setResult(null);
    if (query) setQ(query);
    try {
      const res = await fetch('/api/ai-match', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error occurred');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Input row */}
      <div style={{ display: 'flex', gap: 10 }}>
        <input value={q} onChange={e => setQ(e.target.value)} onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Describe your glass requirement in plain language..."
          className="input-field" style={{ flex: 1 }} />
        <button onClick={() => submit()} disabled={loading || !q.trim()} className="btn-primary" style={{
          padding: '12px 20px', opacity: loading || !q.trim() ? 0.4 : 1,
          pointerEvents: loading || !q.trim() ? 'none' : 'auto',
        }}>
          {loading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={16} />}
          <span style={{ display: 'none' }} className="sm:inline">{loading ? 'Matching...' : 'Match'}</span>
        </button>
      </div>

      {/* Sample chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {samples.map(s => (
          <button key={s} onClick={() => submit(s)} style={{
            padding: '6px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            color: 'rgba(255,255,255,0.5)', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.18)'; el.style.color = '#fff'; }}
          onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.5)'; }}
          >{s}</button>
        ))}
      </div>

      {error && (
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 12, color: '#FCA5A5', fontSize: 13 }}>
          <AlertTriangle size={16} style={{ flexShrink: 0 }} /> {error}
        </div>
      )}

      {result && (
        <div className="glass-card amber-glow" style={{ borderRadius: 20, padding: 24, animation: 'fade-up 0.35s ease-out' }}>
          {/* Top row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 8 }}><Sparkles size={10} />AI Recommendation</div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{result.recommendedProduct}</h3>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Est. Price</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#F59E0B' }}>{result.estimatedPriceRange}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>per sq.ft</div>
            </div>
          </div>

          {/* Specs grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ l: 'Glass Type', v: result.glassType }, { l: 'Thickness', v: result.thickness }, { l: 'Process', v: result.process }].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.l}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>{s.v}</div>
              </div>
            ))}
          </div>

          {/* Reason */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Why This Glass</div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, margin: 0 }}>{result.reason}</p>
          </div>

          {/* Safety note */}
          {result.safetyNote && (
            <div style={{ display: 'flex', gap: 10, padding: '12px 14px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 12, marginBottom: 16 }}>
              <AlertTriangle size={15} color="#F59E0B" style={{ flexShrink: 0, marginTop: 1 }} />
              <p style={{ fontSize: 12, color: '#FDE68A', margin: 0, lineHeight: 1.6 }}>{result.safetyNote}</p>
            </div>
          )}

          {/* Tips */}
          {result.applicationTips?.length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Application Tips</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {result.applicationTips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                    <ChevronRight size={14} color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          )}

          {result.alternativeOption && (
            <div style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>Alternative: </span>{result.alternativeOption}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
