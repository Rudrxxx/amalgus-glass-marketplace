'use client';
import { useState, useEffect } from 'react';
import { glassProducts } from '@/data/glassProducts';
import { EstimateResult } from '@/types';
import VendorCompare from './VendorCompare';
import AlliedProducts from './AlliedProducts';
import { getCompatibleAlliedProducts } from '@/data/alliedProducts';
import { Calculator, Download, Share2, Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function EstimateForm() {
  const searchParams = useSearchParams();
  const preselect = searchParams.get('product');

  const [productId, setProductId] = useState(preselect || glassProducts[0].id);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(2100);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EstimateResult | null>(null);
  const [error, setError] = useState('');

  const selectedProduct = glassProducts.find(p => p.id === productId);

  const handleEstimate = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, width, height, quantity }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Estimate failed');
    } finally {
      setLoading(false);
    }
  };

  const alliedForProduct = selectedProduct ? getCompatibleAlliedProducts(selectedProduct.glassType) : [];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Left: Form */}
      <div className="space-y-6">
        {/* Product Select */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Glass Type
          </label>
          <select
            value={productId}
            onChange={e => setProductId(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none"
          >
            {glassProducts.map(p => (
              <option key={p.id} value={p.id} className="bg-[#1a1a1a]">
                {p.name} ({p.thickness})
              </option>
            ))}
          </select>
          {selectedProduct && (
            <p className="text-xs text-gray-600 mt-2">₹{selectedProduct.priceMin}–₹{selectedProduct.priceMax} per sq.ft · {selectedProduct.process}</p>
          )}
        </div>

        {/* Dimensions */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Width (mm)
            </label>
            <input
              type="number"
              value={width}
              onChange={e => setWidth(Number(e.target.value))}
              min={100}
              className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Height (mm)
            </label>
            <input
              type="number"
              value={height}
              onChange={e => setHeight(Number(e.target.value))}
              min={100}
              className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
            />
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Quantity (panels)
          </label>
          <input
            type="number"
            value={quantity}
            onChange={e => setQuantity(Number(e.target.value))}
            min={1}
            className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500/50"
          />
        </div>

        {/* Preview */}
        <div className="glass-card rounded-xl p-4 text-sm text-gray-400 space-y-1">
          <div className="flex justify-between">
            <span>Dimensions</span><span className="text-white">{width}mm × {height}mm</span>
          </div>
          <div className="flex justify-between">
            <span>Area per panel</span><span className="text-white">{((width * height) / 92903).toFixed(2)} sq.ft</span>
          </div>
          <div className="flex justify-between">
            <span>Total area ({quantity} panels)</span><span className="text-white">{((width * height * quantity) / 92903).toFixed(2)} sq.ft</span>
          </div>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          onClick={handleEstimate}
          disabled={loading}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 text-black font-bold rounded-xl text-sm flex items-center justify-center gap-2 transition-all"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : <Calculator size={16} />}
          {loading ? 'Calculating...' : 'Generate Estimate'}
        </button>
      </div>

      {/* Right: Results */}
      <div className="space-y-6">
        {result ? (
          <>
            {/* Cost breakdown */}
            <div className="glass-card rounded-2xl p-6 amber-glow space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">Estimate Summary</h3>
                <div className="flex gap-2">
                  <button className="p-1.5 glass-card rounded-lg hover:border-white/20 transition-all"><Share2 size={14} className="text-gray-400" /></button>
                  <button className="p-1.5 glass-card rounded-lg hover:border-white/20 transition-all"><Download size={14} className="text-gray-400" /></button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                {[
                  { label: 'Glass Type', value: `${result.glassType} · ${result.thickness}` },
                  { label: 'Total Area', value: `${result.areaSqFt} sq.ft` },
                  { label: 'Rate (mid-market)', value: `₹${result.ratePerSqFt}/sq.ft` },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-gray-400">
                    <span>{item.label}</span><span className="text-white">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.06] pt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-400"><span>Glass Cost</span><span className="text-white">₹{result.glassCost.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-400"><span>Est. Installation</span><span className="text-white">₹{result.installationCost.toLocaleString()}</span></div>
                <div className="flex justify-between font-bold text-base pt-1 border-t border-white/[0.06] mt-1">
                  <span className="text-white">Total Estimate</span>
                  <span className="text-amber-400">₹{result.totalCost.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-xs text-gray-600">* Estimate based on mid-market rates. Final price depends on vendor, quantity, and site conditions. Installation estimate at 20% of glass cost.</p>
            </div>

            {/* Vendor comparison */}
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Compare Vendors</h3>
              <VendorCompare vendors={result.vendors} basePrice={result.ratePerSqFt} />
            </div>

            {/* Allied cross-sell */}
            {alliedForProduct.length > 0 && (
              <AlliedProducts products={alliedForProduct} title="You'll Also Need" />
            )}
          </>
        ) : (
          <div className="h-full flex items-center justify-center glass-card rounded-2xl p-12 text-center">
            <div>
              <Calculator size={40} className="text-gray-700 mx-auto mb-3" />
              <p className="text-gray-600 text-sm">Fill in your dimensions and click<br />Generate Estimate to see pricing.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
