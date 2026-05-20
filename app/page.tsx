import Link from 'next/link'
import type { Metadata } from 'next'
import { getProducts, safeNumber, formatPrice } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import BentoGrid from '@/components/BentoGrid'
import { 
  Sparkles, 
  ArrowRight, 
  Database, 
  Search, 
  Scale, 
  Zap, 
  ShieldCheck, 
  Globe,
  Camera,
  BatteryCharging,
  Gamepad2,
  BadgeDollarSign
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Witflag — AI Smartphone Intelligence',
  description: 'Structured product intelligence for smartphones. Score-based comparison, recommendations, and buying guides.',
}

export const revalidate = 3600

const GUIDE_CARDS = [
  { slug: 'best-camera-phones', label: 'Best camera phones', sub: 'Ranked by Witflag scores.', icon: <Camera className="h-6 w-6 text-cyan-400" /> },
  { slug: 'best-battery-phones', label: 'Best battery phones', sub: 'Ranked by Witflag scores.', icon: <BatteryCharging className="h-6 w-6 text-emerald-400" /> },
  { slug: 'best-gaming-phones', label: 'Best gaming phones', sub: 'Ranked by Witflag scores.', icon: <Gamepad2 className="h-6 w-6 text-violet-400" /> },
  { slug: 'best-value-phones', label: 'Best value phones', sub: 'Ranked by Witflag scores.', icon: <BadgeDollarSign className="h-6 w-6 text-amber-400" /> },
]

const FEATURE_LIST = [
  { icon: <Database className="h-6 w-6 text-cyan-400" />, title: 'Score-based intelligence', body: '6 decision signals scored using structured product data.' },
  { icon: <Search className="h-6 w-6 text-violet-400" />, title: 'Smart search', body: 'Natural language search across the full catalog.' },
  { icon: <Scale className="h-6 w-6 text-emerald-400" />, title: 'Product comparison', body: 'Compare up to 4 products side by side.' },
  { icon: <Zap className="h-6 w-6 text-amber-400" />, title: 'Data-ready updates', body: 'New products and data updated every day.' },
  { icon: <ShieldCheck className="h-6 w-6 text-rose-400" />, title: 'Trusted insights', body: 'Objective analysis for smarter buying.' },
  { icon: <Globe className="h-6 w-6 text-blue-400" />, title: 'International-ready platform', body: 'Multi-currency-ready structure.' },
]

export default async function HomePage() {
  const products = await getProducts(60)
  const topProducts = products.slice(0, 6)
  const featured = products[0]

  return (
    <div className="page relative overflow-hidden pb-24">
      {/* Background Gradients */}
      <div className="absolute top-0 -left-1/4 h-[800px] w-[800px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 -right-1/4 h-[800px] w-[800px] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 pt-24 pb-16 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="hero-badge mx-auto mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            Live from Supabase
          </div>
          
          <h1 className="hero-title mb-6 animate-fade-in-up delay-100">
            Structured product<br />
            <span className="text-gradient">intelligence</span><br />
            for smarter buying.
          </h1>
          
          <p className="hero-sub mx-auto mb-10 animate-fade-in-up delay-200">
            We score, rank, and compare smartphones using structured product data — so you can buy with confidence.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12 animate-fade-in-up delay-300">
            <div className="stat-pill"><strong className="text-white">{products.length}+</strong> Products</div>
            <div className="stat-pill"><strong className="text-white">6</strong> Decision signals</div>
            <div className="stat-pill"><strong className="text-white">Data-ready</strong> Updates</div>
            <div className="stat-pill"><strong className="text-white">Real</strong> Supabase data</div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400">
            <Link href="/products" className="btn-primary w-full sm:w-auto px-8 py-4 text-base">
              Browse Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/compare" className="btn-ghost w-full sm:w-auto px-8 py-4 text-base">
              Compare Now
            </Link>
          </div>
        </div>

        {/* Featured Product Card */}
        {featured && (
          <div className="mx-auto mt-20 max-w-2xl animate-fade-in-up delay-500">
            <Link href={`/products/${featured.slug || ''}`} className="glass-panel group relative flex items-center gap-6 p-6 transition-all hover:-translate-y-1 hover:border-cyan-500/30 hover:shadow-[0_0_40px_-15px_rgba(34,211,238,0.3)]">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-cyan-500/10 to-violet-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:bg-cyan-500/10 transition-colors">
                <Sparkles className="h-8 w-8 text-cyan-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">{featured.brand}</span>
                  <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[10px] font-bold text-violet-300 border border-violet-500/30">New Data</span>
                </div>
                <h3 className="truncate text-lg font-bold text-white group-hover:text-cyan-50">{featured.full_name || featured.model}</h3>
                <p className="text-sm text-slate-400 mt-1">{formatPrice(featured)}</p>
              </div>
              
              <div className="text-center pr-2">
                <div className="text-3xl font-black text-white group-hover:text-cyan-400 transition-colors tracking-tight">
                  {safeNumber(featured.global_score) ?? '—'}
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Global Score
                </div>
              </div>
            </Link>
          </div>
        )}
      </section>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col gap-24">
        {/* Guides Section */}
        <section>
          <div className="section-header">
            <h2 className="section-title text-2xl sm:text-3xl">Start by your need</h2>
            <Link href="/best" className="section-link group flex items-center gap-1">
              View all guides <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {GUIDE_CARDS.map(g => (
              <Link key={g.slug} href={`/best/${g.slug}`} className="glass-panel p-5 hover:border-cyan-500/30 hover:bg-white/[0.03] transition-all hover:-translate-y-1">
                <div className="mb-4 inline-flex rounded-xl bg-white/5 p-3 border border-white/5">
                  {g.icon}
                </div>
                <h3 className="mb-1 text-base font-bold text-white">{g.label}</h3>
                <p className="text-sm text-slate-400">{g.sub}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Scores You Can Trust */}
        <section>
          <div className="section-header mb-6">
            <h2 className="section-title text-2xl sm:text-3xl">Scores You Can Trust</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { label: 'Performance', sub: 'Raw power and speed', color: 'bg-cyan-400', shadow: 'shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]' },
              { label: 'Display', sub: 'Screen quality and refresh rate', color: 'bg-violet-400', shadow: 'shadow-[0_0_20px_-5px_rgba(139,92,246,0.4)]' },
              { label: 'Camera', sub: 'Photo and video quality', color: 'bg-rose-400', shadow: 'shadow-[0_0_20px_-5px_rgba(251,113,133,0.4)]' },
              { label: 'Battery', sub: 'Battery life and charging', color: 'bg-emerald-400', shadow: 'shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)]' },
              { label: 'Value', sub: 'Best experience for your money', color: 'bg-amber-400', shadow: 'shadow-[0_0_20px_-5px_rgba(251,191,36,0.4)]' },
            ].map(s => (
              <div key={s.label} className="glass-panel p-5 relative overflow-hidden group">
                <div className={`absolute top-0 right-0 h-16 w-16 -mr-8 -mt-8 rounded-full opacity-20 ${s.color} blur-xl`} />
                <div className={`mb-4 h-2.5 w-2.5 rounded-full ${s.color} ${s.shadow}`} />
                <h3 className="mb-1 text-sm font-bold text-white">{s.label}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{s.sub}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live products bento */}
        <section>
          <div className="section-header mb-8">
            <h2 className="section-title text-2xl sm:text-3xl">Live Insights</h2>
            <Link href="/products" className="section-link group flex items-center gap-1">
              Explore catalog <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <BentoGrid products={topProducts} />
        </section>

        {/* Features list */}
        <section>
          <div className="glass-panel rounded-3xl p-8 lg:p-12 border-t border-white/10 bg-gradient-to-b from-white/[0.03] to-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {FEATURE_LIST.map(f => (
                <div key={f.title} className="flex gap-5 items-start">
                  <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-bold text-white">{f.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
