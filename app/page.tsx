import Link from 'next/link'
import { ArrowRight, BadgeDollarSign, BatteryCharging, Camera, Globe2, LineChart, Search, ShieldCheck, Sparkles, Star, Zap, Scale } from 'lucide-react'
import { formatPrice, getProductName, getProducts, safeNumber, scoreLabel } from '@/lib/products'
import BentoGrid from '@/components/BentoGrid'
import ScoreRing from '@/components/ScoreRing'

export const revalidate = 3600

const guides = [
  { href: '/best/best-camera-phones', title: 'Best camera phones', text: 'Ranked by camera intelligence.', icon: Camera },
  { href: '/best/best-battery-phones', title: 'Best battery phones', text: 'Ranked by endurance signals.', icon: BatteryCharging },
  { href: '/best/best-gaming-phones', title: 'Best gaming phones', text: 'Ranked by performance power.', icon: Zap },
  { href: '/best/best-value-phones', title: 'Best value phones', text: 'Ranked by price-to-score value.', icon: BadgeDollarSign }
]

const features = [
  { icon: LineChart, title: 'Score-based intelligence', text: 'Decision signals scored from structured product data.' },
  { icon: Search, title: 'Smart search', text: 'Natural language discovery across the catalog.' },
  { icon: Scale, title: 'Product comparison', text: 'Compare devices side by side with clarity.' },
  { icon: Zap, title: 'Data-ready updates', text: 'New products and signals prepared for daily updates.' },
  { icon: ShieldCheck, title: 'Trusted insights', text: 'Objective analysis for smarter buying.' },
  { icon: Globe2, title: 'International-ready platform', text: 'Multi-currency structure for global users.' }
]

export default async function HomePage() {
  const products = await getProducts(60)
  const topProducts = products.slice(0, 6)
  const featured = products[0]
  const featuredName = featured ? getProductName(featured) : 'Featured smartphone'
  const featuredScore = safeNumber(featured?.global_score)

  return (
    <>
      <section className="wf-hero">
        <div>
          <div className="wf-eyebrow"><Zap size={16} /> Live from Supabase</div>
          <h1 className="wf-title">AI-powered smartphone <span className="wf-gradient-text">intelligence</span></h1>
          <p className="wf-lead">We score, rank, and compare smartphones using real product data — so users can search faster, decide smarter, and buy with confidence.</p>

          <div className="wf-stats">
            <div className="wf-stat"><strong>{products.length}+</strong><span>Products</span></div>
            <div className="wf-stat"><strong>6</strong><span>Decision signals</span></div>
            <div className="wf-stat"><strong>Data-ready</strong><span>Updates</span></div>
            <div className="wf-stat"><strong>Real</strong><span>Supabase data</span></div>
          </div>

          <div className="wf-cta-row">
            <Link className="wf-btn wf-btn-primary" href="/products">Browse Products <ArrowRight size={16} /></Link>
            <Link className="wf-btn wf-btn-ghost" href="/compare">Compare Now <Scale size={15} /></Link>
          </div>
        </div>

        {featured ? (
          <article className="wf-panel wf-featured">
            <div className="wf-featured-copy">
              <div className="wf-chip">Featured</div>
              <h2>{featuredName}</h2>
              <Link className="wf-brand-link" href={`/brands/${String(featured.brand || 'smartphone').toLowerCase()}`}>{featured.brand || 'Smartphone'}</Link>
              <div className="wf-stars">{[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)} <span>4.8</span></div>
              <div className="wf-price">{formatPrice(featured)}</div>
              <p>{featured.content_summary_en || 'The most complete flagship profile with strong camera, performance, battery, and display signals.'}</p>
              <div className="wf-cta-row"><Link className="wf-btn wf-btn-ghost" href={`/products/${featured.slug || ''}`}>View Details <ArrowRight size={15} /></Link></div>
            </div>
            <div className="wf-featured-visual">
              <div className="wf-orbit" />
              {featured.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img className="wf-phone-img" src={featured.image_url} alt={featuredName} />
              ) : <div className="wf-phone-placeholder" />}
              <div className="wf-score-block">
                <ScoreRing value={featuredScore} />
                <div className="wf-score-label"><strong>Global Score</strong><span>{scoreLabel(featuredScore)}</span></div>
              </div>
            </div>
          </article>
        ) : null}
      </section>

      <section className="wf-feature-strip">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div className="wf-feature-item" key={feature.title}>
              <div className="wf-feature-icon"><Icon size={34} /></div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          )
        })}
      </section>

      <section className="wf-section">
        <div className="wf-section-head">
          <div><h2>Start by your need ✨</h2><p>Browse buying guides to find the perfect phone for what matters most.</p></div>
          <Link className="wf-link" href="/best/best-camera-phones">View all guides <ArrowRight size={14} /></Link>
        </div>
        <div className="wf-guide-grid">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Link className="wf-guide-card" href={guide.href} key={guide.href}>
                <div className="wf-guide-icon"><Icon size={22} /></div>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <span className="wf-link">Explore <ArrowRight size={13} /></span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="wf-section">
        <div className="wf-section-head">
          <div><h2>Top picks for you ✨</h2><p>Discover the highest scoring smartphones right now.</p></div>
          <Link className="wf-link" href="/products">View all products <ArrowRight size={14} /></Link>
        </div>
        <BentoGrid products={topProducts} columns={6} />
      </section>
    </>
  )
}
