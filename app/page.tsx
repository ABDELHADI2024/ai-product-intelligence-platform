import Link from 'next/link';
import {
  ArrowRight, BatteryCharging, Bot, Camera, CheckCircle2, Cpu,
  GitCompare, Search, Shield, Sparkles, Star, Trophy, Zap,
} from 'lucide-react';
import ProductGrid from '@/components/ProductGrid';
import ScoreRing from '@/components/ScoreRing';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

/* ─── static data ─────────────────────────────────────────── */

const USE_CASES = [
  { icon: Camera,          label: 'Best Camera Phones',  href: '/best/best-camera-phones',  tag: 'Camera'   },
  { icon: BatteryCharging, label: 'Best Battery Life',   href: '/best/best-battery-phones', tag: 'Battery'  },
  { icon: Cpu,             label: 'Best Gaming Phones',  href: '/best/best-gaming-phones',  tag: 'Gaming'   },
  { icon: Trophy,          label: 'Best Value Phones',   href: '/best/best-value-phones',   tag: 'Value'    },
];

const AI_SCORES = [
  { icon: Zap,             label: 'Performance', desc: 'Raw power & speed',             color: '#7c3aed' },
  { icon: Sparkles,        label: 'Display',     desc: 'Screen quality & refresh rate', color: '#22d3ee' },
  { icon: Camera,          label: 'Camera',      desc: 'Photo and video quality',       color: '#6366f1' },
  { icon: BatteryCharging, label: 'Battery',     desc: 'Battery life & charging',       color: '#4ade80' },
  { icon: Shield,          label: 'Value',       desc: 'Best experience for money',     color: '#fbbf24' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'We collect',
    desc: 'Specs, pricing, and real-world data gathered from thousands of sources daily.',
    color: '#7c3aed',
  },
  {
    step: '02',
    title: 'AI scores',
    desc: 'Five independent AI models evaluate each product across performance, display, camera, battery, and value.',
    color: '#22d3ee',
  },
  {
    step: '03',
    title: 'You decide',
    desc: 'Browse ranked results, compare side-by-side, or ask our AI assistant anything.',
    color: '#4ade80',
  },
];

const TESTIMONIALS = [
  { name: 'Sarah K.',   role: 'Tech reviewer',      text: 'Finally a platform that explains WHY a phone scores well, not just what score it got.', stars: 5 },
  { name: 'Marco B.',   role: 'Gadget enthusiast',  text: 'The comparison tool alone is worth it. I compared 4 phones in under 2 minutes.',        stars: 5 },
  { name: 'Priya N.',   role: 'Casual buyer',       text: 'I asked the AI assistant for "best camera under €400" and it gave me exactly that.',      stars: 5 },
];

const FEATURES = [
  { icon: '🤖', label: 'AI-Powered Scoring',  desc: '5 metrics scored using structured product intelligence.' },
  { icon: '🔍', label: 'Smart Search',        desc: 'Natural language search with AI understanding.'         },
  { icon: '⚖️', label: 'Side-by-Side Compare',desc: 'Compare up to 4 products at once.'                     },
  { icon: '🔄', label: 'Daily Updates',       desc: 'New products and data refreshed every day.'             },
  { icon: '🛡️', label: 'Trusted Insights',    desc: 'Objective analysis, zero brand bias.'                   },
  { icon: '🌐', label: 'Global Platform',     desc: 'Multi-language, multi-currency, worldwide.'             },
];

const DEMO_SCORES = [
  { val: 82, label: 'Camera',  color: '#22d3ee' },
  { val: 86, label: 'Battery', color: '#a78bfa' },
  { val: 88, label: 'Display', color: '#4ade80' },
  { val: 78, label: 'Gaming',  color: '#fbbf24' },
  { val: 84, label: 'Value',   color: '#6366f1' },
];

/* ─── page ────────────────────────────────────────────────── */

export default async function HomePage() {
  const products = await getProducts(6);

  return (
    <main>

      {/* ══════════════ HERO ══════════════ */}
      <section
        className="hero-bg"
        style={{ borderBottom: '1px solid rgba(124,58,237,.15)', padding: '4rem 2.5rem 3.5rem' }}
      >
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center',
        }}>

          {/* Left */}
          <div className="fade-up">
            <div className="tag tag-v" style={{ marginBottom: '1.25rem' }}>
              <Sparkles size={12} /> AI-Powered Product Intelligence Platform
            </div>

            <h1 style={{
              fontFamily: 'Syne,sans-serif', fontWeight: 900,
              fontSize: 'clamp(2rem,4vw,3.2rem)', lineHeight: 1.07,
              letterSpacing: '-.03em', color: '#fff', maxWidth: 540, margin: 0,
            }}>
              AI-Powered Intelligence for{' '}
              <span style={{
                background: 'linear-gradient(90deg,#a78bfa,#22d3ee)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>
                Smarter
              </span>{' '}
              Buying Decisions
            </h1>

            <p style={{ marginTop: '1rem', color: 'var(--t2)', fontSize: '.95rem', lineHeight: 1.72, maxWidth: 480 }}>
              We analyze, score and compare smartphones using advanced AI — so you can buy the best, with confidence.
            </p>

            {/* Search */}
            <form action="/search" method="GET" style={{ marginTop: '1.75rem', maxWidth: 500 }}>
              <div className="search-pill">
                <Search size={15} color="#a78bfa" />
                <input name="q" placeholder="Search a product, brand, or category..." />
                <button type="submit" className="btn-primary" style={{ borderRadius: 10, padding: '.5rem 1.2rem', fontSize: '.8rem', border: 'none' }}>
                  Search
                </button>
              </div>
            </form>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.75rem', flexWrap: 'wrap' }}>
              {[
                ['10,000+', 'Products tracked'],
                ['50+',     'Categories'],
                ['5',       'AI score metrics'],
                ['Daily',   'Data updates'],
              ].map(([v, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.4rem', color: '#fff' }}>{v}</div>
                  <div style={{ fontSize: '.65rem', color: 'var(--t3)', marginTop: 2 }}>{l}</div>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '.7rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <Link href="/products" className="btn-primary" style={{ padding: '.7rem 1.6rem', borderRadius: 14 }}>
                Browse Products <ArrowRight size={14} />
              </Link>
              <Link href="/assistant" className="btn-ghost" style={{ padding: '.7rem 1.6rem', borderRadius: 14 }}>
                <Bot size={14} /> Try AI Assistant
              </Link>
              <Link href="/compare" className="btn-ghost" style={{ padding: '.7rem 1.6rem', borderRadius: 14 }}>
                <GitCompare size={14} /> Compare Now
              </Link>
            </div>
          </div>

          {/* Right — hero card (dynamic top product) */}
          <div className="fade-up delay-2">
            <div className="glass" style={{ borderRadius: 24, padding: '1.25rem' }}>
              {products[0] ? (
                <>
                  <div style={{ background: 'rgba(13,9,32,.75)', borderRadius: 18, border: '1px solid rgba(124,58,237,.15)', padding: '1.1rem', marginBottom: '.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 80, height: 120, background: 'linear-gradient(160deg,rgba(124,58,237,.3),rgba(99,102,241,.12))', borderRadius: 14, border: '1px solid rgba(124,58,237,.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem' }}>
                        📱
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '.65rem', color: 'var(--t3)' }}>{products[0].brand ?? 'Featured'}</div>
                        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.2rem', color: '#fff', margin: '.2rem 0' }}>
                          {products[0].name}
                        </div>
                        <span className="tag tag-v" style={{ fontSize: '.6rem' }}>Top Rated</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '.6rem' }}>
                          {products[0].price_eur && (
                            <div>
                              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.6rem', color: '#fff' }}>
                                €{products[0].price_eur}
                              </div>
                              <div style={{ fontSize: '.6rem', color: 'var(--t3)' }}>Price</div>
                            </div>
                          )}
                          <ScoreRing value={products[0].score_global ?? 84} size="sm" />
                          <div style={{ fontSize: '.6rem', color: 'var(--t3)', lineHeight: 1.4 }}>Global<br />Score</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '.75rem' }}>
                    <div style={{ fontSize: '.6rem', letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--t3)', fontWeight: 600, marginBottom: '.5rem' }}>
                      AI Scores Breakdown
                    </div>
                    <div className="scores-5">
                      {DEMO_SCORES.map(({ val, label, color }) => (
                        <div key={label} className="score-cell">
                          <div className="sv" style={{ color }}>{val}</div>
                          <div className="sl">{label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                /* Fallback when no products loaded */
                <div style={{ marginBottom: '.75rem' }}>
                  <div style={{ background: 'rgba(13,9,32,.75)', borderRadius: 18, border: '1px solid rgba(124,58,237,.15)', padding: '1.1rem', marginBottom: '.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: 80, height: 120, background: 'linear-gradient(160deg,rgba(124,58,237,.3),rgba(99,102,241,.12))', borderRadius: 14, border: '1px solid rgba(124,58,237,.25)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.4rem' }}>📱</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#fff' }}>Top Rated Smartphone</div>
                        <span className="tag tag-v" style={{ fontSize: '.6rem', marginTop: '.4rem' }}>Live from catalog</span>
                      </div>
                    </div>
                  </div>
                  <div className="scores-5">
                    {DEMO_SCORES.map(({ val, label, color }) => (
                      <div key={label} className="score-cell">
                        <div className="sv" style={{ color }}>{val}</div>
                        <div className="sl">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '.5rem' }}>
                <Link href="/compare" className="btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: 10, fontSize: '.75rem', padding: '.5rem' }}>
                  + Add to compare
                </Link>
                <Link href="/search" className="btn-ghost" style={{ borderRadius: 10, fontSize: '.75rem', padding: '.5rem .9rem' }}>
                  Search
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ HOW IT WORKS ══════════════ */}
      <section style={{ background: 'var(--surface)', padding: '3rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="tag tag-v" style={{ marginBottom: '.6rem' }}>Transparent by design</span>
            <div className="sec-title">How Witflag Works</div>
            <p style={{ color: 'var(--t2)', fontSize: '.88rem', marginTop: '.5rem', maxWidth: 480, margin: '.5rem auto 0' }}>
              No black boxes. No sponsored rankings. Just structured AI intelligence.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {HOW_IT_WORKS.map(({ step, title, desc, color }) => (
              <div key={step} className="glass" style={{ borderRadius: 20, padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                {/* step number watermark */}
                <div style={{ position: 'absolute', top: '-10px', right: '12px', fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '4.5rem', color, opacity: .07, lineHeight: 1, pointerEvents: 'none' }}>
                  {step}
                </div>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: `${color}1a`, border: `1px solid ${color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '.85rem' }}>
                  <span style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: '.75rem', color }}>{step}</span>
                </div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '1rem', color: '#fff', marginBottom: '.4rem' }}>{title}</div>
                <div style={{ fontSize: '.8rem', color: 'var(--t2)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ USE CASES ══════════════ */}
      <section style={{ background: 'var(--bg)', padding: '2.5rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span className="tag tag-v sec-label" style={{ marginBottom: '.4rem' }}>Browse by need</span>
              <div className="sec-title">Find the Right Phone for You</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--vl)' }}>View all →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '.75rem', marginBottom: '1.75rem' }}>
            {USE_CASES.map(({ icon: Icon, label, href, tag }) => (
              <Link key={href} href={href} className="glass gring" style={{ borderRadius: 18, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '.4rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg,rgba(124,58,237,.25),rgba(99,102,241,.12))', border: '1px solid rgba(124,58,237,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} color="#a78bfa" />
                </div>
                <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '.85rem', color: '#fff' }}>{label}</div>
                <div style={{ fontSize: '.68rem', color: 'var(--t3)' }}>Ranked by Witflag AI scores.</div>
                <span className="tag tag-v" style={{ alignSelf: 'flex-start', fontSize: '.58rem' }}>{tag}</span>
              </Link>
            ))}
          </div>

          {/* AI Scores strip */}
          <div className="glass" style={{ borderRadius: 20, padding: '1.1rem 1.5rem' }}>
            <div style={{ textAlign: 'center', fontSize: '.62rem', letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--t3)', fontWeight: 600, marginBottom: '.85rem' }}>
              5 AI Scores — Independently Calculated
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: '1.25rem' }}>
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

      {/* ══════════════ AI ASSISTANT PROMO ══════════════ */}
      <section style={{ background: 'var(--surface)', padding: '2.5rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div className="glass gring" style={{ borderRadius: 24, padding: '2rem 2.5rem', display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center', background: 'linear-gradient(135deg,rgba(124,58,237,.1),rgba(34,211,238,.05))' }}>
            <div>
              <div className="tag tag-c" style={{ marginBottom: '.75rem' }}>
                <Bot size={12} /> AI Assistant
              </div>
              <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: 'clamp(1.2rem,2.5vw,1.8rem)', color: '#fff', marginBottom: '.6rem' }}>
                Not sure where to start? Just ask.
              </div>
              <p style={{ color: 'var(--t2)', fontSize: '.88rem', lineHeight: 1.65, maxWidth: 520, margin: 0 }}>
                Our AI assistant understands plain language. Ask things like <em style={{ color: 'var(--vl)' }}>"best camera phone under €500"</em> or <em style={{ color: 'var(--c)' }}>"compare Samsung vs iPhone battery"</em> and get instant, scored answers.
              </p>
              <div style={{ display: 'flex', gap: '.5rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
                {['"Best camera under €400"', '"Gaming phone vs battery life"', '"Top 3 value phones 2025"'].map(q => (
                  <Link key={q} href={`/assistant?q=${encodeURIComponent(q)}`} style={{ fontSize: '.72rem', padding: '.35rem .8rem', borderRadius: 999, border: '1px solid rgba(124,58,237,.35)', color: 'var(--vl)', background: 'rgba(124,58,237,.08)', transition: 'all .2s' }}>
                    {q}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/assistant" className="btn-primary" style={{ padding: '1rem 2rem', borderRadius: 16, fontSize: '.9rem', whiteSpace: 'nowrap', flexShrink: 0 }}>
              <Sparkles size={16} /> Try Assistant <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════ PRODUCTS GRID ══════════════ */}
      <section className="hero-bg" style={{ padding: '2.5rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <div>
              <span className="tag tag-c sec-label" style={{ marginBottom: '.4rem' }}>Live AI Data</span>
              <div className="sec-title">Top Smartphones Right Now</div>
            </div>
            <Link href="/products" style={{ fontSize: '.8rem', fontWeight: 600, color: 'var(--vl)' }}>View catalog →</Link>
          </div>
          <ProductGrid products={products} />
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section style={{ background: 'var(--surface)', padding: '2.5rem 2.5rem', borderBottom: '1px solid rgba(124,58,237,.1)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
            <span className="tag tag-v" style={{ marginBottom: '.5rem' }}>Trusted by buyers</span>
            <div className="sec-title">What People Are Saying</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem' }}>
            {TESTIMONIALS.map(({ name, role, text, stars }) => (
              <div key={name} className="glass" style={{ borderRadius: 20, padding: '1.4rem' }}>
                <div style={{ display: 'flex', gap: '.2rem', marginBottom: '.75rem' }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={13} fill="#fbbf24" color="#fbbf24" />
                  ))}
                </div>
                <p style={{ fontSize: '.83rem', color: 'var(--t1)', lineHeight: 1.65, margin: 0, marginBottom: '1rem' }}>"{text}"</p>
                <div>
                  <div style={{ fontFamily: 'Syne,sans-serif', fontWeight: 800, fontSize: '.82rem', color: '#fff' }}>{name}</div>
                  <div style={{ fontSize: '.68rem', color: 'var(--t3)', marginTop: 2 }}>{role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FEATURES ══════════════ */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid rgba(124,58,237,.1)', padding: '2.5rem 2.5rem' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '.75rem' }}>
          {FEATURES.map(({ icon, label, desc }) => (
            <div key={label} className="feat-card">
              <div className="feat-icon">{icon}</div>
              <div className="feat-title">{label}</div>
              <div className="feat-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ CLOSING CTA ══════════════ */}
      <section className="hero-bg" style={{ padding: '3.5rem 2.5rem', borderTop: '1px solid rgba(124,58,237,.12)' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '.4rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            {['No ads', 'No sponsored rankings', 'Objective AI scores'].map(t => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '.3rem', fontSize: '.72rem', color: 'var(--t2)' }}>
                <CheckCircle2 size={12} color="#4ade80" /> {t}
              </span>
            ))}
          </div>
          <h2 style={{ fontFamily: 'Syne,sans-serif', fontWeight: 900, fontSize: 'clamp(1.6rem,3vw,2.4rem)', color: '#fff', margin: '0 0 .75rem', letterSpacing: '-.02em' }}>
            Ready to find your{' '}
            <span style={{ background: 'linear-gradient(90deg,#a78bfa,#22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              perfect phone?
            </span>
          </h2>
          <p style={{ color: 'var(--t2)', fontSize: '.9rem', lineHeight: 1.65, marginBottom: '1.75rem' }}>
            Browse 10,000+ phones, compare specs side-by-side, or let our AI guide you to the best pick.
          </p>
          <div style={{ display: 'flex', gap: '.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/products" className="btn-primary" style={{ padding: '.8rem 2rem', borderRadius: 14, fontSize: '.9rem' }}>
              Browse All Phones <ArrowRight size={15} />
            </Link>
            <Link href="/assistant" className="btn-ghost" style={{ padding: '.8rem 2rem', borderRadius: 14, fontSize: '.9rem' }}>
              <Bot size={15} /> Ask the AI
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
