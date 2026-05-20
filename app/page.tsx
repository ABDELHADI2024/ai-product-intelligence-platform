import Link from 'next/link';
import { ArrowRight, BatteryCharging, Camera, Cpu, GitCompare, Search, Shield, Sparkles, Trophy, Zap } from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import ScoreRing from '@/components/ScoreRing';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

const USE_CASES = [
  { icon: Camera,          label: 'Best camera phones',  href: '/best/best-camera-phones',  tag: 'Camera'      },
  { icon: BatteryCharging, label: 'Best battery phones', href: '/best/best-battery-phones', tag: 'Battery'     },
  { icon: Cpu,             label: 'Best gaming phones',  href: '/best/best-gaming-phones',  tag: 'Gaming'      },
  { icon: Trophy,          label: 'Best value phones',   href: '/best/best-value-phones',   tag: 'Value'       },
];

const AI_SCORES = [
  { icon: Zap,             label: 'Performance', desc: 'Raw power and speed',              color: '#7c3aed' },
  { icon: Sparkles,        label: 'Display',     desc: 'Screen quality and refresh rate',  color: '#22d3ee' },
  { icon: Camera,          label: 'Camera',      desc: 'Photo and video quality',          color: '#6366f1' },
  { icon: BatteryCharging, label: 'Battery',     desc: 'Battery life and charging',        color: '#4ade80' },
  { icon: Shield,          label: 'Value',       desc: 'Best experience for your money',   color: '#fbbf24' },
];

const FEATURES = [
  { icon: '🤖', label: 'Smart Scoring',       desc: '5 metrics scored using structured product intelligence.' },
  { icon: '🔍', label: 'Smart Search',        desc: 'Natural language search with contextual understanding.' },
  { icon: '⚖️', label: 'Product Comparison',  desc: 'Compare up to 4 products side by side.' },
  { icon: '🔄', label: 'Daily Updates',       desc: 'New products and data updated every day.' },
  { icon: '🛡️', label: 'Trusted Insights',    desc: 'Objective analysis for smarter buying.' },
  { icon: '🌐', label: 'Global Platform',     desc: 'Multi-language, multi-currency, worldwide.' },
];

export default async function HomePage() {
  const products = await getProducts(6);
  
  // Use the first real product from Supabase for the Hero card instead of a fake demo
  const heroProduct = products.length > 0 ? products[0] : null;

  const heroScores = heroProduct ? [
    { val: heroProduct.score_camera,      label: 'Camera',       color: '#22d3ee' },
    { val: heroProduct.score_battery,     label: 'Battery',      color: '#a78bfa' },
    { val: heroProduct.score_display,     label: 'Display',      color: '#4ade80' },
    { val: heroProduct.score_performance, label: 'Performance',  color: '#fbbf24' },
    { val: heroProduct.score_value,       label: 'Value',        color: '#6366f1' },
  ] : [];

  return (
    <main>
      {/* ══════════════ HERO ══════════════ */}
      <section className="hero-bg" style={{ borderBottom: '1px solid rgba(124,58,237,.15)', padding: '4rem 2.5rem 3.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>

          {/* Left */}
          <div className="fade-up">
            <div className="tag tag-v" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} /> Structured Product Intelligence Platform
            </div>

            <h1 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: 'clamp(2rem,4vw,3.2rem)', lineHeight: 1.07, letterSpacing: '-.03em', color: '#fff', maxWidth: 540, margin: 0 }}>
              Structured Intelligence for{' '}
              <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Smarter
              </span>{' '}
              Buying Decisions
            </h1>

            <p style={{ marginTop: '1rem', color: 'var(--t2)', fontSize: '.95rem', lineHeight: 1.72, maxWidth: 480 }}>
              We analyze, score, and compare products using structured product intelligence so you can buy the best, with confidence.
            </p>

            {/* Search — form submits to /search */}
            <form action="/search" method="GET" style={{ marginTop: '1.75rem', maxWidth: 500 }}>
              <div className="search-pill" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <Search size={18} color="#a78bfa" style={{ marginLeft: '0.5rem' }} />
                <input 
                  name="q" 
                  placeholder="Search a product, brand, or category..." 
                  style={{ flex: 1, background: 'transparent', border: 'none', color: '#fff', outline: 'none', fontSize: '0.9rem' }}
                />
                <button type="submit" className="btn-primary" style={{ borderRadius: 10, padding: '.5rem 1.2rem', fontSize: '.8rem', border: 'none', cursor: 'pointer' }}>
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              {[['10,000+', 'Products'], ['50+', 'Categories'], ['5', 'Score Metrics'], ['Daily', 'Updated']].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: '.65rem', color: 'var(--t3)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '.7rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/products" className="btn-primary" style={{ padding: '.7rem 1.6rem', borderRadius: 14, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Browse Products <ArrowRight size={14} />
              </Link>
              <Link href="/compare" className="btn-ghost" style={{ padding: '.7rem 1.6rem', borderRadius: 14, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GitCompare size={14} /> Compare Now
              </Link>
            </div>
          </div>

          {/* Right — Hero card (Real Supabase Data) */}
          <div className="fade-up delay-2">
            {heroProduct ? (
              <div className="glass" style={{ borderRadius: 24, padding: '1.25rem' }}>
                {/* Product header */}
                <div style={{ background: 'rgba(13,9,32,.75)', borderRadius: 18, border: '1px solid rgba(124,58,237,.15)', padding: '1.1rem', marginBottom: '.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 80, height: 120, background: 'linear-gradient(160deg,rgba(124,58,237,.3),rgba(99,102,241,.12))', borderRadius: 14, border: '1px solid rgba(124,58,237,.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem' }}>
                      📱
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '.65rem', color: 'var(--t3)', textTransform: 'capitalize' }}>{heroProduct.brand}</div>
                      <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.2rem', color: '#fff', margin: '.2rem 0' }}>
                        {heroProduct.name}
                      </div>
                      <span className="tag tag-v" style={{ fontSize: '.6rem' }}>Top Pick</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '.6rem' }}>
                        <div>
                          <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff' }}>
                            {heroProduct.price ? `€${heroProduct.price}` : 'N/A'}
                          </div>
                          <div style={{ fontSize: '.6rem', color: 'var(--t3)' }}>Price</div>
                        </div>
                        {heroProduct.score_overall && (
                          <>
                            <ScoreRing value={heroProduct.score_overall} size="sm" />
                            <div style={{ fontSize: '.6rem', color: 'var(--t3)', lineHeight: 1.4 }}>Global<br />Score</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score breakdown */}
                <div style={{ marginBottom: '.75rem' }}>
                  <div style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--t3)', fontWeight: 600, marginBottom: '.5rem' }}>
                    Intelligence Breakdown
                  </div>
                  <div className="scores-5" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {heroScores.map(({ val, label, color }) => (
                      <div key={label} className="score-cell" style={{ textAlign: 'center' }}>
                        <div className="sv" style={{ color, fontSize: '1.1rem', fontWeight: 700 }}>{val ?? '-'}</div>
                        <div className="sl" style={{ fontSize: '0.6rem', color: 'var(--t3)' }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '.5rem' }}>
                  <Link href={`/products/${heroProduct.slug}`} className="btn-primary" style={{ flex: 1, display: 'flex', justifyContent: 'center', borderRadius: 10, fontSize: '.75rem', padding: '.5rem' }}>
                    View details
                  </Link>
                  <Link href="/compare" className="btn-ghost" style={{ borderRadius: 10, fontSize: '.75rem', padding: '.5rem .9rem' }}>
                    + Compare
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass" style={{ borderRadius: 24, padding: '2rem', textAlign: 'center', color: 'var(--t3)' }}>
                Loading top products...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════ USE CASES ══════════════ */}
      <section style={{ background: 'var(--surface)', padding: '2.5rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span className="tag tag-v sec-label" style={{ marginBottom: '.4rem' }}>Top Scored</span>
              <div className="sec-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>Top Rated Products</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--vl)' }}>View all →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '.75rem', marginBottom: '1.75rem' }}>
            {USE_CASES.map(({ icon: Icon, label, href, tag }) => (
              <Link key={href} href={href} className="glass gring" style={{ borderRadius: 18, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,rgba(124,58,237,.25),rgba(99,102,241,.12))', border: '1px solid rgba(124,58,237,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="#a78bfa" />
                </div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '.85rem', color: '#fff' }}>{label}</div>
                <div style={{ fontSize: '.68rem', color: 'var(--t3)' }}>Ranked by intelligent scoring.</div>
                <span className="tag tag-v" style={{ alignSelf: 'flex-start', fontSize: '.58rem' }}>{tag}</span>
              </Link>
            ))}
          </div>

          {/* AI Scores strip */}
          <div className="glass" style={{ borderRadius: 20, padding: '1.1rem 1.5rem' }}>
            <div style={{ textAlign: 'center', fontSize: '.62rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--t3)', fontWeight: 600, marginBottom: '.85rem' }}>
              Scores You Can Trust
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.25rem' }}>
              {AI_SCORES.map(({ icon: Icon, label, desc, color }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '.65rem' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: `${color}1a`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} color={color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '.8rem', color: '#fff' }}>{label}</div>
                    <div style={{ fontSize: '.62rem', color: 'var(--t3)', marginTop: 1, lineHeight: 1.35 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ PRODUCTS GRID ══════════════ */}
      <section className="hero-bg" style={{ padding: '2.5rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span className="tag tag-c sec-label" style={{ marginBottom: '.4rem' }}>Live Data</span>
              <div className="sec-title" style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>Live Smartphones from Supabase</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--vl)' }}>View catalog →</Link>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid rgba(124,58,237,.1)', padding: '2.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
          {FEATURES.map(({ icon, label, desc }) => (
            <div key={label} className="feat-card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <div className="feat-icon" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{icon}</div>
              <div className="feat-title" style={{ fontWeight: 'bold', color: '#fff', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{label}</div>
              <div className="feat-desc" style={{ color: 'var(--t3)', fontSize: '0.8rem', lineHeight: 1.5 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
