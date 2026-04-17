'use client';
import { dailyRates } from '@/data/dailyRates';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function RateTicker() {
  const doubled = [...dailyRates, ...dailyRates];

  return (
    <div className="bg-[#111] border-y border-white/[0.06] overflow-hidden py-2.5">
      <div className="flex gap-8 animate-ticker whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((rate, i) => (
          <div key={i} className="flex items-center gap-3 px-2">
            <div className="text-xs font-medium text-gray-300">
              {rate.glassType} <span className="text-gray-600">{rate.thickness}</span>
            </div>
            <div className="text-sm font-bold text-white">₹{rate.rate}</div>
            <div className={`flex items-center gap-0.5 text-xs font-semibold ${rate.change > 0 ? 'text-emerald-400' : rate.change < 0 ? 'text-red-400' : 'text-gray-500'}`}>
              {rate.change > 0 ? <TrendingUp size={12} /> : rate.change < 0 ? <TrendingDown size={12} /> : <Minus size={12} />}
              {rate.change > 0 ? '+' : ''}{rate.change !== 0 ? rate.changePercent.toFixed(2) + '%' : 'Flat'}
            </div>
            <span className="text-gray-800 mx-1">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
