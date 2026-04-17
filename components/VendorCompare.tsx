'use client';
import { Vendor } from '@/types';
import { Star, MapPin, CheckCircle, Clock } from 'lucide-react';

interface Props {
  vendors: Vendor[];
  basePrice?: number;
}

export default function VendorCompare({ vendors, basePrice }: Props) {
  if (!vendors.length) return null;

  return (
    <div className="space-y-3">
      {vendors.map((vendor, i) => {
        const price = vendor.price || basePrice || 0;
        return (
          <div key={vendor.id} className={`glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 ${i === 0 ? 'border-amber-500/30' : ''}`}>
            {i === 0 && (
              <div className="absolute -top-px left-4 px-2 py-0.5 bg-amber-500 rounded-b text-[10px] font-bold text-black uppercase tracking-wider">
                Best Price
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-white text-sm">{vendor.name}</span>
                {vendor.verified && <CheckCircle size={13} className="text-amber-400" />}
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><MapPin size={11} />{vendor.location}</span>
                <span>{vendor.yearsInBusiness}yr experience</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star size={13} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-white">{vendor.rating}</span>
              <span className="text-gray-600 text-xs">({vendor.reviewCount})</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} />
              {vendor.delivery}
            </div>
            {price > 0 && (
              <div className="text-right">
                <div className="text-lg font-bold text-amber-400">₹{price}</div>
                <div className="text-xs text-gray-500">per sq.ft</div>
              </div>
            )}
            <button className="shrink-0 px-4 py-2 bg-white/[0.05] hover:bg-amber-500/10 border border-white/[0.08] hover:border-amber-500/40 text-white hover:text-amber-400 text-xs font-semibold rounded-lg transition-all">
              Contact
            </button>
          </div>
        );
      })}
    </div>
  );
}
