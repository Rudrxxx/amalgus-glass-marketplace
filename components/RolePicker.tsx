'use client';
import { CustomerRole } from '@/types';
import { Home, Ruler, Building2, Store } from 'lucide-react';
import clsx from 'clsx';

const roles = [
  { value: 'homeowner' as CustomerRole, label: 'Homeowner', icon: Home, desc: 'Personal renovation or new home' },
  { value: 'architect' as CustomerRole, label: 'Architect / Designer', icon: Ruler, desc: 'Specifying glass for projects' },
  { value: 'builder' as CustomerRole, label: 'Builder / Developer', icon: Building2, desc: 'Bulk orders, multiple sites' },
  { value: 'dealer' as CustomerRole, label: 'Glass Dealer', icon: Store, desc: 'Trade pricing & factory-direct' },
];

interface Props {
  selected: CustomerRole;
  onChange: (role: CustomerRole) => void;
}

export default function RolePicker({ selected, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {roles.map(role => {
        const Icon = role.icon;
        const isSelected = selected === role.value;
        return (
          <button
            key={role.value}
            onClick={() => onChange(isSelected ? null : role.value)}
            className={clsx(
              'relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all text-center',
              isSelected
                ? 'bg-amber-500/10 border-amber-500/60 text-amber-400'
                : 'bg-white/[0.02] border-white/[0.08] text-gray-400 hover:border-white/20 hover:text-white hover:bg-white/[0.04]'
            )}
          >
            <Icon size={22} className={isSelected ? 'text-amber-400' : 'text-gray-500'} />
            <div>
              <div className="text-sm font-semibold">{role.label}</div>
              <div className="text-[11px] opacity-60 mt-0.5 leading-tight">{role.desc}</div>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-amber-400" />
            )}
          </button>
        );
      })}
    </div>
  );
}
