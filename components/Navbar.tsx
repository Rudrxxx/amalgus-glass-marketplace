'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/catalog', label: 'Catalog' },
  { href: '/estimate', label: 'Estimate' },
  { href: '/rates', label: 'Live Rates' },
  { href: '/partners', label: 'Installers' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: scrolled ? 'rgba(12,12,14,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 16, fontWeight: 800, color: '#000',
            fontFamily: 'var(--font-display)',
          }}>A</div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 18, color: '#fff', lineHeight: 1.1 }}>AmalGus</div>
            <div style={{ fontSize: 9, color: 'rgba(245,158,11,0.6)', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1 }}>Glass Marketplace</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="hidden md:flex">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} style={{
              padding: '8px 16px', borderRadius: 10, fontSize: 13, fontWeight: 500,
              color: 'rgba(255,255,255,0.55)', textDecoration: 'none',
              transition: 'color 0.15s, background 0.15s',
            }}
            onMouseEnter={e => { (e.target as HTMLElement).style.color = '#fff'; (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)'; }}
            onMouseLeave={e => { (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; (e.target as HTMLElement).style.background = 'transparent'; }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="hidden md:flex">
          <Link href="/catalog" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', transition: 'color 0.15s' }}
            onMouseEnter={e => (e.target as HTMLElement).style.color = '#fff'}
            onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(255,255,255,0.4)'}
          >Sign In</Link>
          <Link href="/estimate" className="btn-primary" style={{ padding: '9px 20px', fontSize: 13 }}>
            Free Estimate
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: 8 }} className="md:hidden">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{ background: '#0C0C0E', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '12px 24px 20px' }} className="md:hidden">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
              display: 'block', padding: '12px 0', fontSize: 15, fontWeight: 500,
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>{link.label}</Link>
          ))}
          <Link href="/estimate" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: 16, justifyContent: 'center', width: '100%' }}>
            Free Estimate
          </Link>
        </div>
      )}
    </nav>
  );
}
