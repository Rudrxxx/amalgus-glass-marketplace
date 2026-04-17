'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Layers, ChevronDown } from 'lucide-react';

const navLinks = [
  { href: '/catalog', label: 'Glass Catalog' },
  { href: '/estimate', label: 'Get Estimate' },
  { href: '/rates', label: 'Live Rates' },
  { href: '/partners', label: 'Find Installers' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0A0B]/90 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center group-hover:bg-amber-400 transition-colors">
            <Layers className="w-4.5 h-4.5 text-black" size={18} />
          </div>
          <div>
            <span className="font-space font-bold text-lg text-white tracking-tight">AmalGus</span>
            <span className="hidden sm:block text-[10px] text-amber-500/70 -mt-1 tracking-wider uppercase">Glass Marketplace</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/catalog" className="text-sm text-gray-400 hover:text-white transition-colors">
            Sign In
          </Link>
          <Link
            href="/estimate"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold rounded-lg transition-colors"
          >
            Get Estimate
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0A0A0B] px-4 py-3 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.05] rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/estimate"
            onClick={() => setOpen(false)}
            className="block mt-2 px-3 py-2.5 bg-amber-500 text-black text-sm font-semibold rounded-lg text-center"
          >
            Get Estimate
          </Link>
        </div>
      )}
    </nav>
  );
}
