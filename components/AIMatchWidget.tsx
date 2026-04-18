// components/AIMatchWidget.tsx
'use client';
import { useState } from 'react';
import { Sparkles, Send, AlertTriangle, ChevronRight, Loader2, Cpu, BookOpen } from 'lucide-react';
import { AIMatchResult, CustomerRole } from '@/types';
import Link from 'next/link';
import { glassProducts } from '@/data/glassProducts';

const samples = [
  'Glass for bathroom shower',
  'Soundproof office cabin',
  'Balcony railing 15th floor',
  'Energy efficient south facade',
  'Kitchen backsplash decorative',
  'Privacy conference room partition',
];

export default function AIMatchWidget({ role }: { role: CustomerRole }) {
  const [q, setQ]           = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]  = useState<AIMatchResult | null>(null);
  const [source, setSource]  = useState<'ai' | 'rules' | null>(null);
  const [error, setError]    = useState('');

  const submit = async (query?: string) => {
    const text = query || q;
    if (!text.trim()) return;
    setLoading(true); setError(''); setResult(null); setSource(null);
    if (query) setQ(query);
    try {
      const res  = await fetch('/api/ai-match', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data.result);
      setSource(data.source || 'rules');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Find matching product for "Get Estimate" CTA
  const matchedProduct = result
    ? glassProducts.find(p =>
        p.glassType.toLowerCase().includes(result.glassType.toLowerCase()) ||
        result.recommendedProduct.toLowerCase().includes(p.glassType.toLowerCase())
      )
    : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* Input row */}
      <div style={{ display: 'flex', gap: 10 }}>
        <input value={q} onChange={e => setQ(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Describe your glass requirement in plain language..."
          className="input-field" style={{ flex: 1 }} />
        <button onClick={() => submit()} disabled={loading || !q.trim()} className="btn-primary"
          style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 8,
            opacity: loading || !q.trim() ? 0.4 : 1,
            pointerEvents: loading || !q.trim() ? 'none' : 'auto' }}>
          {loading
            ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
            : <Sparkles size={16} />}
          <span>{loading ? 'Matching...' : 'Match'}</span>
        </button>
      </div>

      {/* Sample chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {samples.map(s => (
          <button key={s} onClick={() => submit(s)} disabled={loading}
            style={{ padding: '6px 14px', borderRadius: 99, fontSize: 12, cursor: 'pointer',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.5)', transition: 'all 0.15s',
              opacity: loading ? 0.4 : 1 }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.18)'; el.style.color = '#fff'; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = 'rgba(255,255,255,0.08)'; el.style.color = 'rgba(255,255,255,0.5)'; }}>
            {s}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 12, color: '#FCA5A5', fontSize: 13 }}>
          <AlertTriangle size={16} style={{ flexShrink: 0 }} /> {error}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="glass-card" style={{ borderRadius: 20, padding: 24 }}>
          {[80, 60, 90, 50].map((w, i) => (
            <div key={i} style={{ height: 14, borderRadius: 7, background: 'rgba(255,255,255,0.05)', marginBottom: i < 3 ? 12 : 0, width: `${w}%`, animation: 'pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
      )}

      {/* Result */}
      {result && !loading && (
        <div className="glass-card amber-glow" style={{ borderRadius: 20, padding: 24, animation: 'fade-up 0.35s ease-out' }}>
          {/* Source badge */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <div className="section-label" style={{ margin: 0 }}><Sparkles size={10} />AI Recommendation</div>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 99, fontSize: 9, fontWeight: 700, letterSpacing: '0.06em',
                  background: source === 'ai' ? 'rgba(52,211,153,0.1)' : 'rgba(99,102,241,0.1)',
                  color: source === 'ai' ? '#6EE7B7' : '#A5B4FC',
                  border: source === 'ai' ? '1px solid rgba(52,211,153,0.2)' : '1px solid rgba(99,102,241,0.2)' }}>
                  {source === 'ai' ? <><Cpu size={9} />Gemini AI</> : <><BookOpen size={9} />Expert Rules</>}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, color: '#fff', margin: 0 }}>{result.recommendedProduct}</h3>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Est. Price</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 800, color: '#F59E0B' }}>{result.estimatedPriceRange}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)' }}>per sq.ft</div>
            </div>
          </div>

          {/* Specs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {[{ l: 'Glass Type', v: result.glassType }, { l: 'Thickness', v: result.thickness }, { l: 'Process', v: result.process }].map(s => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: 12, textAlign: 'center' }}>
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
            <div style={{ paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 12, color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>
              <span style={{ color: 'rgba(255,255,255,0.55)' }}>Alternative: </span>{result.alternativeOption}
            </div>
          )}

          {/* CTA */}
          {matchedProduct && (
            <Link href={`/estimate?product=${matchedProduct.id}`} className="btn-primary"
              style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
              Get Estimate for This Glass <ChevronRight size={15} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
