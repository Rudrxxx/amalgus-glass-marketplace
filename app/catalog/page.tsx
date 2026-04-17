'use client';
import { useState, useMemo } from 'react';
import { glassProducts } from '@/data/glassProducts';
import GlassProductCard from '@/components/GlassProductCard';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { GlassProduct } from '@/types';

const allApplications = Array.from(new Set(glassProducts.flatMap(p => p.application))).sort();
const allProcesses = Array.from(new Set(glassProducts.map(p => p.process))).sort();

export default function CatalogPage() {
  const [search, setSearch] = useState('');
  const [selectedApp, setSelectedApp] = useState<string>('');
  const [selectedProcess, setSelectedProcess] = useState<string>('');
  const [priceMax, setPriceMax] = useState<number>(1500);

  const filtered = useMemo(() => {
    return glassProducts.filter(p => {
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.glassType.toLowerCase().includes(search.toLowerCase()) ||
        p.application.some(a => a.toLowerCase().includes(search.toLowerCase()));
      const matchApp = !selectedApp || p.application.includes(selectedApp);
      const matchProcess = !selectedProcess || p.process === selectedProcess;
      const matchPrice = p.priceMin <= priceMax;
      return matchSearch && matchApp && matchProcess && matchPrice;
    });
  }, [search, selectedApp, selectedProcess, priceMax]);

  const clearFilters = () => {
    setSearch('');
    setSelectedApp('');
    setSelectedProcess('');
    setPriceMax(1500);
  };

  const hasFilters = search || selectedApp || selectedProcess || priceMax < 1500;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-space font-bold text-white mb-2">Glass Catalog</h1>
        <p className="text-gray-400">Browse {glassProducts.length} glass products with industry specifications</p>
      </div>

      {/* Filters */}
      <div className="glass-card rounded-2xl p-5 mb-8 space-y-4">
        <div className="flex items-center gap-2 mb-1">
          <SlidersHorizontal size={14} className="text-amber-400" />
          <span className="text-sm font-semibold text-gray-300">Filter Products</span>
          {hasFilters && (
            <button onClick={clearFilters} className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors">
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
            <input
              type="text"
              placeholder="Search glass type..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.10] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Application */}
          <select
            value={selectedApp}
            onChange={e => setSelectedApp(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none"
          >
            <option value="" className="bg-[#1a1a1a]">All Applications</option>
            {allApplications.map(a => <option key={a} value={a} className="bg-[#1a1a1a]">{a}</option>)}
          </select>

          {/* Process */}
          <select
            value={selectedProcess}
            onChange={e => setSelectedProcess(e.target.value)}
            className="bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500/50 appearance-none"
          >
            <option value="" className="bg-[#1a1a1a]">All Processes</option>
            {allProcesses.map(p => <option key={p} value={p} className="bg-[#1a1a1a]">{p}</option>)}
          </select>

          {/* Price */}
          <div>
            <div className="text-xs text-gray-500 mb-1">Max Price: ₹{priceMax}/sq.ft</div>
            <input
              type="range"
              min={45}
              max={1500}
              step={5}
              value={priceMax}
              onChange={e => setPriceMax(Number(e.target.value))}
              className="w-full accent-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing <span className="text-white font-semibold">{filtered.length}</span> products
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => <GlassProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-16 glass-card rounded-2xl">
          <p className="text-gray-500">No products match your filters.</p>
          <button onClick={clearFilters} className="mt-3 text-amber-400 text-sm hover:underline">Clear filters</button>
        </div>
      )}
    </div>
  );
}
