import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Gamepad2, GitCompare, Sparkles, Trophy } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import SearchBar from '@/components/SearchBar';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts(6);
  const stats = [['296','AI-ready smartphones'], ['6','decision scores'], ['0 API','no-cost assistant'], ['SEO','buying guides']];
  const useCases = [
    { icon: Camera, label: 'Best camera phones', href: '/best/best-camera-phones' },
    { icon: BatteryCharging, label: 'Best battery phones', href: '/best/best-battery-phones' },
    { icon: Gamepad2, label: 'Best gaming phones', href: '/best/best-gaming-phones' },
    { icon: Trophy, label: 'Best value phones', href: '/best/best-value-phones' },
  ];

  return (
    <main className="surface-bg">
      <section className="hero-bg">
        <div className="content-shell hero-grid">
          <div>
            <div className="eyebrow"><Sparkles className="h-4 w-4" /> AI-native smartphone intelligence</div>
            <h1 className="hero-title">Choose the right phone without opening 20 tabs.</h1>
            <p className="hero-sub">Search, compare, and get recommendations from real smartphone data: scores, prices, camera, battery, gaming, value, specs, and buying guides.</p>
            <SearchBar size="large" />
            <div className="hero-actions">
              <Link href="/assistant" className="btn-primary">Start assistant <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/compare" className="btn-ghost">Compare phones <GitCompare className="h-4 w-4" /></Link>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-phone">
              <p className="ph-eyebrow">Live intelligence system</p>
              <div className="metric-grid mt-6">
                {stats.map(([value, label]) => (
                  <div key={label} className="metric">
                    <div className="metric-value">{value}</div>
                    <div className="metric-label">{label}</div>
                  </div>
                ))}
              </div>
              <div className="glass mt-5 p-5">
                <p className="text-sm leading-6 text-slate-300">Witflag reads your Supabase data, ranks products, detects user intent, and creates decision pages for buyers and search engines.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section content-shell">
        <div className="section-head">
          <div><p className="ph-eyebrow">Decision shortcuts</p><h2 className="section-title">Start from your real need.</h2></div>
          <Link href="/best" className="btn-ghost">View all guides</Link>
        </div>
        <div className="feature-grid">
          {useCases.map((item) => { const Icon = item.icon; return (
            <Link key={item.href} href={item.href} className="feature-card">
              <div className="feature-icon"><Icon className="h-5 w-5" /></div>
              <h3 className="mt-4 font-bold">{item.label}</h3>
              <p className="mt-2 text-sm text-slate-400">Ranked using Witflag scores.</p>
            </Link>
          ); })}
        </div>
      </section>

      <section className="section content-shell">
        <div className="section-head">
          <div><p className="ph-eyebrow">Live catalog</p><h2 className="section-title">Premium product cards.</h2></div>
          <Link href="/products" className="btn-ghost">Open catalog</Link>
        </div>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
