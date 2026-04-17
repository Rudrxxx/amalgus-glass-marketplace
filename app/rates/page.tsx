import { dailyRates } from '@/data/dailyRates';
import { TrendingUp, TrendingDown, Minus, RefreshCw } from 'lucide-react';
import RateTicker from '@/components/RateTicker';

export default function RatesPage() {
  const lastUpdated = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-space font-bold text-white mb-2">Daily Glass Rates</h1>
            <p className="text-gray-400">Live market rates from factories across India. Updated daily.</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
              Live
            </div>
            Last updated: {lastUpdated}
          </div>
        </div>
      </div>

      <RateTicker />

      {/* Rate cards */}
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {dailyRates.map((rate, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 hover:border-white/20 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-white">{rate.glassType}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{rate.thickness}</p>
              </div>
              <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                rate.change > 0 ? 'bg-emerald-500/10 text-emerald-400' :
                rate.change < 0 ? 'bg-red-500/10 text-red-400' :
                'bg-gray-500/10 text-gray-400'
              }`}>
                {rate.change > 0 ? <TrendingUp size={11} /> : rate.change < 0 ? <TrendingDown size={11} /> : <Minus size={11} />}
                {rate.change > 0 ? '+' : ''}{rate.change !== 0 ? `${rate.changePercent.toFixed(2)}%` : 'No Change'}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold font-space text-amber-400">₹{rate.rate}</div>
                <div className="text-xs text-gray-500">{rate.unit}</div>
              </div>
              <div className="text-right text-xs text-gray-600">
                {rate.change !== 0 && (
                  <div>
                    Yesterday: ₹{(rate.rate - rate.change).toFixed(0)}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="mt-8 p-4 glass-card rounded-xl text-xs text-gray-500">
        <p className="flex items-center gap-2"><RefreshCw size={12} />Rates are indicative market prices sourced from fabricators and distributors across Gujarat, Maharashtra, Telangana, and Karnataka. Actual transaction prices may vary based on quantity, location, and vendor terms. Contact vendors on AmalGus for confirmed pricing.</p>
      </div>
    </div>
  );
}
