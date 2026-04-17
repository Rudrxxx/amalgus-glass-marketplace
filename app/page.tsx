import Link from 'next/link';
import { ArrowRight, Layers, Sparkles, BarChart3, Users, ShieldCheck, Zap } from 'lucide-react';
import RateTicker from '@/components/RateTicker';
import GlassProductCard from '@/components/GlassProductCard';
import AIMatchWidget from '@/components/AIMatchWidget';
import RolePicker from '@/components/RolePicker';
import { glassProducts } from '@/data/glassProducts';
import HomeClient from '../components/HomeClient';

export default function HomePage() {
  const featuredProducts = glassProducts.slice(0, 4);

  return (
    <>
      {/* Rate Ticker */}
      <RateTicker />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 pulse-dot" />
              World&apos;s First B2B2C Glass Marketplace
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-space font-bold text-white leading-[1.1] mb-6">
              Buy Glass the{' '}
              <span className="gradient-text">Smart Way.</span>
              <br />No More Guesswork.
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-2xl">
              AI-powered glass discovery, instant estimates, verified vendors, and certified installers — all in one platform built for India&apos;s ₹190B glass industry.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/catalog" className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-sm transition-colors">
                Explore Glass Catalog <ArrowRight size={16} />
              </Link>
              <Link href="/estimate" className="flex items-center gap-2 px-6 py-3.5 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.10] text-white font-semibold rounded-xl text-sm transition-colors">
                Get Free Estimate
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Glass Types', value: '25+', icon: Layers },
              { label: 'Verified Vendors', value: '200+', icon: ShieldCheck },
              { label: 'Market Size', value: '₹190B', icon: BarChart3 },
              { label: 'Customer Types', value: '52', icon: Users },
            ].map(stat => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <Icon size={20} className="text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold font-space text-white">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-400 mb-4">
            <Sparkles size={12} />
            AI Glass Advisor
          </div>
          <h2 className="text-3xl font-space font-bold text-white mb-3">Tell Us What You Need</h2>
          <p className="text-gray-400">Describe your project in plain language. Our AI advisor will recommend the right glass type, thickness, and process.</p>
        </div>

        <HomeClient />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/[0.06]">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-space font-bold text-white">Glass Products</h2>
            <p className="text-sm text-gray-500 mt-1">Industry-grade glass for every application</p>
          </div>
          <Link href="/catalog" className="flex items-center gap-1.5 text-sm text-amber-400 hover:text-amber-300 font-semibold transition-colors">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProducts.map(product => (
            <GlassProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 border-t border-white/[0.06]">
        <h2 className="text-2xl font-space font-bold text-white mb-8 text-center">Why AmalGus</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { icon: Sparkles, title: 'AI Smart Matching', desc: 'Describe your project; AI recommends the right glass type, thickness, and process instantly.' },
            { icon: BarChart3, title: 'Daily Live Rates', desc: 'Glass prices updated daily from factories across India — like a stock ticker for the glass industry.' },
            { icon: ShieldCheck, title: 'Verified Vendors', desc: 'Every vendor on AmalGus is verified. Compare prices, ratings, and delivery from multiple suppliers.' },
            { icon: Zap, title: 'Instant Estimates', desc: 'Enter dimensions, get a professional price estimate in seconds. Share it directly with clients.' },
            { icon: Users, title: 'Certified Installers', desc: 'Find and book verified glass installation professionals in your city with verified ratings.' },
            { icon: Layers, title: 'Allied Products', desc: 'Complete your glass order with hardware, sealants, frames, and fittings — all in one place.' },
          ].map(feature => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="glass-card rounded-2xl p-6 hover:border-white/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-amber-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
