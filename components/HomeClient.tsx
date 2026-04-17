'use client';
import { useState } from 'react';
import AIMatchWidget from './AIMatchWidget';
import RolePicker from './RolePicker';
import { CustomerRole } from '@/types';

export default function HomeClient() {
  const [role, setRole] = useState<CustomerRole>(null);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <RolePicker selected={role} onChange={setRole} />
      <AIMatchWidget role={role} />
    </div>
  );
}
