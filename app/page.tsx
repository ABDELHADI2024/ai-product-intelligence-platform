import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Cpu, GitCompare, Globe, RefreshCw, Search, Shield, Sparkles, Trophy, Zap } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import ScoreRing from '@/components/ScoreRing';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

const USE_CASES = [
  { icon: Camera,         label: 'Best camera phones',  href: '/best/best-camera-phones',  tag: 'Camera'      },
  { icon: BatteryCharging,label: 'Best battery phones', href: '/best/best-battery-phones', tag: 'Battery'     },
  { icon: Cpu,            label: 'Best gaming phones',  href: '/best/best-gaming-phones',  tag: 'Performance' },
  { icon: Trophy,         label: 'Best value phones',   href: '/best/best-value-phones',   tag: 'Value'       },
];

const AI_SCORES = [
  { icon: Zap,            label: 'Performance', desc: 'Measures raw power and speed',           color: '#7c3aed' },
  { icon: Sparkles,       label: 'Display',     desc: 'Screen quality, brightness, refresh rate', color: '#22d3ee' },
  { icon: Camera,         label: 'Camera',      desc: 'Photo & video quality and features',     color: '#6366f1' },
  { icon: BatteryCharging,label: 'Battery',     desc: 'Battery life and charging/watt',         color: '#4ade80' },
  { icon: Shield,         label: 'Value',       desc: 'Best experience for your money',         color: '#fbbf24' },
];

const FEATURES = [
  { icon: '🤖', label: 'AI-Powered Scoring',   desc: '5 metrics scored using advanced AI models.' },
  { icon: '🔍', label: 'Smart Search',          desc: 'Natural language search with AI understanding.' },
  { icon: '⚖️', label: 'Product Comparison',    desc: 'Compare up to 4 products side by side.' },
  { icon: '🔄', label: 'Daily Updates',         desc: 'New products and data updated every day.' },
  { icon: '🛡️', label: 'Trusted Insights',      desc: 'Objective analysis for smarter buying.' },
  { icon: '🌐', label: 'Global Platform',       desc: 'Multi-language, multi-currency, global availability.' },
];

const SCORES_BREAKDOWN = [
  { val: 82, label: 'Camera',  color: '#22d3ee' },
  { val: 86, label: 'Battery', color: '#a78bfa' },
  { val: 88, label: 'Display', color: '#4ade80' },
  { val: 78, label: 'Gaming',  color: '#fbbf24' },
  { val: 84, label: 'Value',   color: '#6366f1' },
];

export default async function HomePage() {
  const products = await getProducts(6);

  return (
    <main>

      {/* ══════════════ HERO ══════════════ */}
      <section className="hero-bg" style={{ borderBottom: '1px solid rgba(124,58,237,.15)', padding: '4.5rem 2.5rem 4rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '3.5rem', alignItems: 'center' }}>

          {/* Left */}
          <div className="fade-up">
            <div className="tag tag-v" style={{ marginBottom: '1.5rem' }}>
              <Sparkles size={12} /> AI-Powered Product Intelligence Platform
            </div>

            <h1 style={{
              fontFamily: 'Syne, sans-serif', fontWeight: 900,
              fontSize: 'clamp(2.4rem,4vw,3.4rem)',
              lineHeight: 1.06, letterSpacing: '-.03em', color: '#fff',
              maxWidth: 560, margin: 0,
            }}>
              AI-Powered Product Intelligence for{' '}
              <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Smarter
              </span>{' '}
              Buying Decisions
            </h1>

            <p style={{ marginTop: '1.25rem', color: '#a89ec9', fontSize: '.98rem', lineHeight: 1.72, maxWidth: 490 }}>
              We analyze, score and compare products using advanced AI so you can buy the best, with confidence.
            </p>

            {/* Search */}
            <div className="search-pill" style={{ marginTop: '2rem', maxWidth: 520 }}>
              <Search size={16} color="#a78bfa" />
              <input placeholder="Search a product, brand, or category..." />
              <Link href="/search" className="btn-primary" style={{ borderRadius: 10, padding: '.55rem 1.3rem', fontSize: '.82rem' }}>
                Search
              </Link>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem' }}>
              {[['10,000+','Products'],['50+','Categories'],['AI','Scored With 5 Metrics'],['Daily','Updated']].map(([v,l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.5rem', color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: '.68rem', color: '#4a4168', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.75rem' }}>
              <Link href="/products" className="btn-primary" style={{ padding: '.75rem 1.75rem', borderRadius: 14 }}>
                Browse Products <ArrowRight size={15} />
              </Link>
              <Link href="/compare" className="btn-ghost" style={{ padding: '.75rem 1.75rem', borderRadius: 14 }}>
                <GitCompare size={15} /> Compare Now
              </Link>
            </div>
          </div>

          {/* Right — hero product card */}
          <div className="fade-up delay-2">
            <div className="glass" style={{ borderRadius: 24, padding: '1.25rem' }}>
              {/* Product header */}
              <div style={{ background: 'rgba(13,9,32,.75)', borderRadius: 18, border: '1px solid rgba(124,58,237,.15)', padding: '1.25rem', marginBottom: '.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ width: 90, height: 130, background: 'linear-gradient(160deg,rgba(124,58,237,.3),rgba(99,102,241,.12))', borderRadius: 16, border: '1px solid rgba(124,58,237,.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem' }}>
                    📱
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '.7rem', color: '#4a4168' }}>Huawei</div>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.3rem', color: '#fff', margin: '.25rem 0' }}>Nova 15 Max</div>
                    <span className="tag tag-v" style={{ fontSize: '.62rem' }}>New Release</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '.75rem' }}>
                      <div>
                        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.85rem', color: '#fff' }}>€499</div>
                        <div style={{ fontSize: '.62rem', color: '#4a4168' }}>Price</div>
                      </div>
                      <ScoreRing value={84} size="md" />
                      <div style={{ fontSize: '.62rem', color: '#4a4168', lineHeight: 1.4 }}>Global<br/>Score</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scores breakdown */}
              <div style={{ marginBottom: '.85rem' }}>
                <div style={{ fontSize: '.62rem', letterSpacing: '.2em', textTransform: 'uppercase', color: '#4a4168', fontWeight: 600, marginBottom: '.6rem' }}>
                  AI Scores Breakdown
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '.4rem' }}>
                  {SCORES_BREAKDOWN.map(({ val, label, color }) => (
                    <div key={label} className="score-cell">
                      <div className="sv" style={{ color }}>{val}</div>
                      <div className="sl">{label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '.5rem' }}>
                <button className="btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: '.78rem', padding: '.55rem' }}>
                  + Add to compare
                </button>
                <button className="btn-ghost" style={{ borderRadius: 10, fontSize: '.78rem', padding: '.55rem 1rem' }}>
                  ↗ Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ TOP RATED ══════════════ */}
      <section style={{ background: 'var(--surface)', padding: '3rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
            <div>
              <span className="tag tag-v sec-label" style={{ marginBottom: '.5rem' }}>Top Scored</span>
              <div className="sec-title">Top Rated Products</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: '#a78bfa' }}>View all →</Link>
          </div>

          {/* Category shortcuts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.85rem', marginBottom: '2rem' }}>
            {USE_CASES.map(({ icon: Icon, label, href, tag }) => (
              <Link key={href} href={href} className="glass gring" style={{ borderRadius: 18, padding: '1.15rem', display: 'flex', flexDirection: 'column', gap: '.5rem', transition: 'transform .2s' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg,rgba(124,58,237,.25),rgba(99,102,241,.12))', border: '1px solid rgba(124,58,237,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={17} color="#a78bfa" />
                </div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '.88rem', color: '#fff' }}>{label}</div>
                <div style={{ fontSize: '.7rem', color: '#4a4168' }}>Ranked using Witflag scores.</div>
                <span className="tag tag-v" style={{ alignSelf: 'flex-start', fontSize: '.6rem' }}>{tag}</span>
              </Link>
            ))}
          </div>

          {/* AI Scores strip */}
          <div className="glass" style={{ borderRadius: 20, padding: '1.25rem 1.75rem' }}>
            <div style={{ textAlign: 'center', fontSize: '.65rem', letterSpacing: '.22em', textTransform: 'uppercase', color: '#4a4168', fontWeight: 600, marginBottom: '1rem' }}>
              AI Scores You Can Trust
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1.5rem' }}>
              {AI_SCORES.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}1a`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={16} color={color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '.82rem', color: '#fff' }}>{label}</div>
                    <div style={{ fontSize: '.65rem', color: '#4a4168', marginTop: 1, lineHeight: 1.4 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PRODUCTS GRID ══════════════ */}
      <section className="hero-bg" style={{ padding: '3rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.75rem' }}>
            <div>
              <span className="tag tag-c sec-label" style={{ marginBottom: '.5rem' }}>Live AI Data</span>
              <div className="sec-title">Live Smartphones from Supabase</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: '#a78bfa' }}>View catalog →</Link>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid rgba(124,58,237,.1)', padding: '3rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '.85rem' }}>
            {FEATURES.map(({ icon, label, desc }) => (
              <div key={label} className="feat-card">
                <div className="feat-icon">{icon}</div>
                <div className="feat-title">{label}</div>
                <div className="feat-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
