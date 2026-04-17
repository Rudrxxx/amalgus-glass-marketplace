import { servicePartners } from '@/data/servicePartners';
import ServicePartners from '@/components/ServicePartners';
import { Users, MapPin, ShieldCheck } from 'lucide-react';

export default function PartnersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-4">
          <Users size={12} />
          Certified Installer Network
        </div>
        <h1 className="text-3xl font-space font-bold text-white mb-2">Find Glass Installers</h1>
        <p className="text-gray-400 max-w-xl">
          Verified installation professionals across India. Rated by real customers. Book directly on AmalGus.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Verified Partners', value: '500+', icon: ShieldCheck },
          { label: 'Cities Covered', value: '42', icon: MapPin },
          { label: 'Jobs Completed', value: '12,000+', icon: Users },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <Icon size={18} className="text-amber-400 mx-auto mb-2" />
              <div className="text-xl font-bold font-space text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          );
        })}
      </div>

      <ServicePartners partners={servicePartners} />
    </div>
  );
}
