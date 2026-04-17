'use client';
import { ServicePartner } from '@/types';
import { Star, MapPin, CheckCircle, Phone } from 'lucide-react';

interface Props {
  partners: ServicePartner[];
}

export default function ServicePartners({ partners }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {partners.map(partner => (
        <div key={partner.id} className="glass-card rounded-2xl p-5 hover:border-white/20 transition-all space-y-3">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-400">
              {partner.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-white text-sm">{partner.name}</span>
                {partner.verified && <CheckCircle size={13} className="text-amber-400" />}
              </div>
              <div className="text-xs text-gray-500">{partner.specialty}</div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <MapPin size={12} />
            {partner.location}
          </div>

          {/* Rating + Experience */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-white">{partner.rating}</span>
              <span className="text-gray-600">({partner.reviewCount} reviews)</span>
            </div>
            <span className="text-gray-500">{partner.experience}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {partner.tags.map(tag => (
              <span key={tag} className="text-[11px] px-2 py-0.5 bg-white/[0.04] border border-white/[0.06] text-gray-400 rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-white/[0.06]">
            <div>
              <div className="text-xs text-gray-600">Rate</div>
              <div className="text-sm font-semibold text-amber-400">{partner.priceRange}</div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-amber-500/10 hover:bg-amber-500 border border-amber-500/30 hover:border-amber-500 text-amber-400 hover:text-black text-xs font-semibold rounded-lg transition-all">
              <Phone size={11} />
              Contact
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
