import Link from 'next/link';
import { Layers, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0B] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <Layers size={18} className="text-black" />
              </div>
              <span className="font-space font-bold text-lg text-white">AmalGus</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
              World&apos;s First B2B2C Glass & Allied Products Niche Marketplace. Connecting the entire glass ecosystem — manufacturers, dealers, architects, and buyers.
            </p>
            <div className="mt-4 space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500"><Mail size={13} />[EMAIL_ADDRESS]</div>
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Platform</div>
            <ul className="space-y-2">
              {[['Glass Catalog', '/catalog'], ['Get Estimate', '/estimate'], ['Live Rates', '/rates'], ['Find Installers', '/partners']].map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-gray-500 hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Glass Types</div>
            <ul className="space-y-2 text-sm text-gray-500">
              {['Clear Float', 'Toughened', 'Laminated', 'DGU / IGU', 'Low-E Glass', 'Smart Glass'].map(t => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-gray-600">© 2026 AmalGus Technology. All rights reserved.</div>
          <div className="text-xs text-gray-600">Built for the glass & allied products industry.</div>
        </div>
      </div>
    </footer>
  );
}
