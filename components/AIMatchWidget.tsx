'use client';
import { useState } from 'react';
import { Sparkles, Send, AlertTriangle, ChevronRight, Loader2 } from 'lucide-react';
import { AIMatchResult, CustomerRole } from '@/types';
import clsx from 'clsx';

const sampleQueries = [
  "I need glass for my bathroom shower",
  "Soundproof glass for my office cabin",
  "Glass railing for balcony on 15th floor",
  "Energy efficient glass for south-facing facade",
  "Decorative glass for kitchen backsplash",
  "Privacy glass for conference room",
];

interface Props {
  role: CustomerRole;
}

export default function AIMatchWidget({ role }: Props) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIMatchResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (q?: string) => {
    const searchQuery = q || query;
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);
    if (q) setQuery(q);

    try {
      const res = await fetch('/api/ai-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, role }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Input */}
      <div className="relative">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="Describe your glass requirement in plain language..."
              className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.06] transition-all pr-12"
            />
          </div>
          <button
            onClick={() => handleSubmit()}
            disabled={loading || !query.trim()}
            className={clsx(
              'px-5 py-3.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all',
              loading || !query.trim()
                ? 'bg-white/[0.05] text-gray-600 cursor-not-allowed'
                : 'bg-amber-500 hover:bg-amber-400 text-black'
            )}
          >
            {loading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
            <span className="hidden sm:inline">{loading ? 'Matching...' : 'Match Glass'}</span>
          </button>
        </div>
      </div>

      {/* Sample queries */}
      <div className="flex flex-wrap gap-2">
        {sampleQueries.map(q => (
          <button
            key={q}
            onClick={() => handleSubmit(q)}
            className="text-xs px-3 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/20 text-gray-400 hover:text-white rounded-full transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          <AlertTriangle size={16} />
          {error}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="glass-card rounded-2xl p-6 amber-glow space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Sparkles size={16} className="text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">AI Recommendation</span>
              </div>
              <h3 className="text-xl font-bold text-white">{result.recommendedProduct}</h3>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">Est. Price Range</div>
              <div className="text-lg font-bold text-amber-400">{result.estimatedPriceRange}</div>
              <div className="text-xs text-gray-500">per sq.ft</div>
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Glass Type', value: result.glassType },
              { label: 'Thickness', value: result.thickness },
              { label: 'Process', value: result.process },
            ].map(spec => (
              <div key={spec.label} className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 text-center">
                <div className="text-xs text-gray-500 mb-1">{spec.label}</div>
                <div className="text-sm font-semibold text-white">{spec.value}</div>
              </div>
            ))}
          </div>

          {/* Reason */}
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Why This Glass</div>
            <p className="text-sm text-gray-300 leading-relaxed">{result.reason}</p>
          </div>

          {/* Safety note */}
          {result.safetyNote && (
            <div className="flex gap-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <AlertTriangle size={16} className="text-amber-400 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-300">{result.safetyNote}</p>
            </div>
          )}

          {/* Tips */}
          {result.applicationTips?.length > 0 && (
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">Application Tips</div>
              <ul className="space-y-1.5">
                {result.applicationTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-400">
                    <ChevronRight size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternative */}
          {result.alternativeOption && (
            <div className="pt-2 border-t border-white/[0.06] text-sm text-gray-500">
              <span className="text-gray-400">Alternative: </span>{result.alternativeOption}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
