import { Suspense } from 'react';
import EstimateForm from '@/components/EstimateForm';
import { Calculator } from 'lucide-react';

export default function EstimatePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-4">
          <Calculator size={12} />
          Instant Estimate Generator
        </div>
        <h1 className="text-3xl font-space font-bold text-white mb-2">Get Glass Estimate</h1>
        <p className="text-gray-400 max-w-xl">
          Enter your glass dimensions and quantity. Get an instant price estimate with vendor comparison and allied product recommendations.
        </p>
      </div>
      <Suspense fallback={<div className="text-gray-500 text-sm">Loading...</div>}>
        <EstimateForm />
      </Suspense>
    </div>
  );
}
