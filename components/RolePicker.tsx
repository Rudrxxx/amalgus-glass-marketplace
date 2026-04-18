'use client';
import { CustomerRole } from '@/types';
import { Home, Ruler, Building2, Store } from 'lucide-react';

const roles = [
  { value: 'homeowner' as CustomerRole, label: 'Homeowner', icon: Home, desc: 'Personal renovation' },
  { value: 'architect' as CustomerRole, label: 'Architect', icon: Ruler, desc: 'Specifying for projects' },
  { value: 'builder' as CustomerRole, label: 'Builder', icon: Building2, desc: 'Bulk & multi-site' },
  { value: 'dealer' as CustomerRole, label: 'Dealer', icon: Store, desc: 'Factory-direct pricing' },
];

interface Props { selected: CustomerRole; onChange: (r: CustomerRole) => void; }

export default function RolePicker({ selected, onChange }: Props) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
      {roles.map(r => {
        const Icon = r.icon;
        const active = selected === r.value;
        return (
          <button key={r.value} onClick={() => onChange(active ? null : r.value)} style={{
            position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
            gap: 8, padding: '16px 8px', borderRadius: 14, cursor: 'pointer',
            background: active ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.025)',
            border: active ? '1px solid rgba(245,158,11,0.45)' : '1px solid rgba(255,255,255,0.07)',
            color: active ? '#F59E0B' : 'rgba(255,255,255,0.45)',
            transition: 'all 0.18s', textAlign: 'center',
          }}>
            <Icon size={20} color={active ? '#F59E0B' : 'rgba(255,255,255,0.35)'} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-display)', color: active ? '#F59E0B' : '#fff' }}>{r.label}</div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{r.desc}</div>
            </div>
            {active && <div style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: '#F59E0B' }} />}
          </button>
        );
      })}
    </div>
  );
}
