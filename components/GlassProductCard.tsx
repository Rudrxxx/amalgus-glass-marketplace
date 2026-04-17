'use client';
import { GlassProduct } from '@/types';
import { CheckCircle, Clock, ChevronRight, Layers } from 'lucide-react';
import Link from 'next/link';
import clsx from 'clsx';

interface Props {
  product: GlassProduct;
  compact?: boolean;
}

const glassColors: Record<string, string> = {
  'Clear Float': 'from-blue-500/20 to-cyan-500/10',
  'Toughened': 'from-emerald-500/20 to-teal-500/10',
  'Laminated': 'from-purple-500/20 to-violet-500/10',
  'Insulated (DGU/IGU)': 'from-sky-500/20 to-blue-500/10',
  'Frosted': 'from-slate-500/20 to-gray-500/10',
  'Reflective': 'from-cyan-500/20 to-blue-500/10',
  'Low-E': 'from-green-500/20 to-emerald-500/10',
  'Back-Painted': 'from-rose-500/20 to-pink-500/10',
  'Smart Glass': 'from-amber-500/20 to-yellow-500/10',
  'Toughened Laminated': 'from-orange-500/20 to-red-500/10',
};

export default function GlassProductCard({ product, compact }: Props) {
  const gradient = glassColors[product.glassType] || 'from-gray-500/20 to-slate-500/10';

  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-1 group">
      {/* Visual header */}
      <div className={clsx('relative h-28 bg-gradient-to-br', gradient, 'flex items-center justify-center')}>
        <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
          <Layers size={28} className="text-white/70" />
        </div>
        {!product.inStock && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-red-500/80 rounded text-[10px] font-semibold text-white">
            LEAD TIME
          </div>
        )}
        {product.inStock && (
          <div className="absolute top-3 right-3 px-2 py-1 bg-emerald-500/80 rounded text-[10px] font-semibold text-white">
            IN STOCK
          </div>
        )}
      </div>

      <div className="p-4 space-y-3">
        {/* Name + Type */}
        <div>
          <h3 className="font-semibold text-white text-sm leading-tight">{product.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs text-gray-500">{product.thickness}</span>
            <span className="text-gray-700">·</span>
            <span className="text-xs text-gray-500">{product.process}</span>
          </div>
        </div>

        {!compact && (
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{product.description}</p>
        )}

        {/* Applications */}
        <div className="flex flex-wrap gap-1">
          {product.application.slice(0, 3).map(app => (
            <span key={app} className="text-[11px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-gray-400 rounded-full">
              {app}
            </span>
          ))}
          {product.application.length > 3 && (
            <span className="text-[11px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-gray-500 rounded-full">
              +{product.application.length - 3}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="text-xs text-gray-600">Starting from</div>
            <div className="text-base font-bold text-amber-400">₹{product.priceMin}<span className="text-xs text-gray-500 font-normal">/{product.unit}</span></div>
          </div>
          <Link
            href={`/estimate?product=${product.id}`}
            className="flex items-center gap-1 px-3 py-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 text-amber-400 hover:text-black text-xs font-semibold rounded-lg transition-all group-hover:bg-amber-500 group-hover:text-black group-hover:border-amber-500"
          >
            Get Quote <ChevronRight size={12} />
          </Link>
        </div>

        {/* Lead time */}
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Clock size={11} />
          <span>Lead time: {product.leadTime}</span>
        </div>
      </div>
    </div>
  );
}
