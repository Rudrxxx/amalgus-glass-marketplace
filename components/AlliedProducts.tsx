'use client';
import { AlliedProduct } from '@/types';
import { ShoppingCart } from 'lucide-react';

interface Props {
  products: AlliedProduct[];
  title?: string;
}

export default function AlliedProducts({ products, title = "Allied Products" }: Props) {
  if (!products.length) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {products.map(product => (
          <div key={product.id} className="glass-card rounded-xl p-4 hover:border-white/20 transition-all">
            <div className="flex items-start gap-3">
              <div className="text-2xl shrink-0">{product.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{product.name}</div>
                <div className="text-xs text-amber-500 mb-1">{product.category}</div>
                <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{product.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/[0.06]">
              <span className="text-sm font-semibold text-amber-400">{product.price}</span>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/30 text-gray-400 hover:text-amber-400 text-xs font-semibold rounded-lg transition-all">
                <ShoppingCart size={11} />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
