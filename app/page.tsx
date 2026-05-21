import Link from 'next/link'
import {
  ArrowRight,
  BadgeDollarSign,
  BatteryCharging,
  Camera,
  Database,
  Globe2,
  LineChart,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Zap,
  Scale,
} from 'lucide-react'
import { getProducts, safeNumber, formatPrice, getProductName } from '@/lib/products'

export const revalidate = 3600

const guides = [
  { href: '/best/best-camera-phones', title: 'Best camera phones', text: 'Ranked by Witflag scores.', icon: Camera, tone: 'cyan' },
  { href: '/best/best-battery-phones', title: 'Best battery phones', text: 'Ranked by Witflag scores.', icon: BatteryCharging, tone: 'green' },
  { href: '/best/best-gaming-phones', title: 'Best gaming phones', text: 'Ranked by Witflag scores.', icon: Zap, tone: 'violet' },
  { href: '/best/best-value-phones', title: 'Best value phones', text: 'Ranked by Witflag scores.', icon: BadgeDollarSign, tone: 'amber' },
]

const features = [
  { icon: LineChart, title: 'Score-based intelligence', text: '6 decision signals scored using structured data.', tone: 'cyan' },
  { icon: Search, title: 'Smart search', text: 'Natural language search across the full catalog.', tone: 'violet' },
  { icon: Scale, title: 'Product comparison', text: 'Compare up to 4 products side by side with ease.', tone: 'cyan' },
  { icon: Zap, title: 'Data-ready updates', text: 'New products and data updated every day.', tone: 'amber' },
  { icon: ShieldCheck, title: 'Trusted insights', text: 'Objective analysis for smarter buying.', tone: 'rose' },
  { icon: Globe2, title: 'International-ready platform', text: 'Multi-currency-ready structure for global users.', tone: 'violet' },
]

function scoreTone(value: string | number | null | undefined) {
  const score = safeNumber(value)
  if (score === null) return 'wf-score-muted'
  if (score >= 88) return 'wf-score-great'
  if (score >= 78) return 'wf-score-good'
  if (score >= 68) return 'wf-score-mid'
  return 'wf-score-low'
}

function ProductMiniCard({ product, rank }: { product: any; rank: number }) {
  const score = safeNumber(product.global_score)
  const name = getProductName(product)

  return (
    <article className="wf-mini-card">
      <span className="wf-rank">{rank}</span>
      <div className="wf-mini-image">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={name} />
        ) : (
          <Smartphone className="h-12 w-12 text-cyan-300" />
        )}
      </div>

      <div className="wf-mini-info">
        <p>{product.brand || 'Smartphone'}</p>
        <h3>{name}</h3>
        <strong>{formatPrice(product)}</strong>
      </div>

      <div className={`wf-mini-score ${scoreTone(product.global_score)}`}>
        {score === null ? '—' : Math.round(score)}
      </div>
    </article>
  )
}

export default async function HomePage() {
  const products = await getProducts(60)
  const topProducts = products.slice(0, 6)
  const featured = products[0]
  const featuredScore = safeNumber(featured?.global_score)
  const featuredName = featured ? getProductName(featured) : 'Featured smartphone'

  return (
    <main className="wf-page">
      <div className="wf-bg-grid" />

      <section className="wf-hero-wrap">
        <div className="wf-hero">
          <div className="wf-hero-left">
            <div className="wf-live-pill">
              <Zap className="h-4 w-4" />
              Live from Supabase
            </div>

            <h1>
              AI-powered smartphone <span>intelligence</span>
            </h1>

            <p className="wf-hero-sub">
              We score, rank, and compare smartphones using real product data —
              so you can buy with confidence.
            </p>

            <div className="wf-stats">
              <div><strong>{products.length}+</strong><span>Products</span></div>
              <div><strong>6</strong><span>Decision signals</span></div>
              <div><strong>Data-ready</strong><span>Updates</span></div>
              <div><strong>Real</strong><span>Supabase data</span></div>
            </div>

            <div className="wf-actions">
              <Link href="/products" className="wf-btn wf-btn-primary">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/compare" className="wf-btn wf-btn-ghost">
                Compare Now <LineChart className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {featured ? (
            <Link href={`/products/${featured.slug || ''}`} className="wf-featured">
              <div className="wf-featured-copy">
                <span>Featured</span>
                <h2>{featuredName}</h2>
                <p className="wf-featured-brand">{featured.brand || 'Smartphone'}</p>

                <div className="wf-stars">
                  {[1,2,3,4,5].map((item) => (
                    <Star key={item} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                  <b>4.8</b>
                </div>

                <p className="wf-price">{formatPrice(featured)}</p>
                <p className="wf-desc">
                  High-ranking smartphone profile with best-in-class camera,
                  performance, and display signals.
                </p>

                <div className="wf-btn wf-btn-small wf-btn-ghost">
                  View Details <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              <div className="wf-phone-stage">
                <div className="wf-orbit" />
                <div className="wf-phone-glow" />

                {featured.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.image_url} alt={featuredName} />
                ) : (
                  <Smartphone className="h-24 w-24 text-cyan-300" />
                )}

                <div className="wf-global">
                  <div className={`wf-global-ring ${scoreTone(featured.global_score)}`}>
                    {featuredScore === null ? '—' : Math.round(featuredScore)}
                  </div>
                  <div>
                    <strong>Global Score</strong>
                    <span>Excellent</span>
                  </div>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="wf-feature-bar">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div key={feature.title} className="wf-feature">
              <div className={`wf-feature-icon wf-icon-${feature.tone}`}>
                <Icon className="h-8 w-8" />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </div>
          )
        })}
      </section>

      <section className="wf-section">
        <div className="wf-section-head">
          <div>
            <h2>Start by your need <Sparkles className="inline h-4 w-4 text-cyan-300" /></h2>
            <p>Browse our buying guides to find the perfect phone for what matters most.</p>
          </div>
          <Link href="/best">View all guides <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="wf-guides">
          {guides.map((guide) => {
            const Icon = guide.icon
            return (
              <Link key={guide.href} href={guide.href} className={`wf-guide wf-guide-${guide.tone}`}>
                <div className="wf-guide-bg" />
                <div className={`wf-guide-icon wf-icon-${guide.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3>{guide.title}</h3>
                <p>{guide.text}</p>
                <span>Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="wf-section wf-top-section">
        <div className="wf-section-head">
          <div>
            <h2>Top picks for you <Sparkles className="inline h-4 w-4 text-cyan-300" /></h2>
            <p>Discover the highest scoring smartphones right now.</p>
          </div>
          <Link href="/products">View all products <ArrowRight className="h-4 w-4" /></Link>
        </div>

        <div className="wf-mini-grid">
          {topProducts.map((product, index) => (
            <ProductMiniCard key={product.id} product={product} rank={index + 1} />
          ))}
        </div>
      </section>

      <div className="wf-home-foot">
        <Database className="h-4 w-4" />
        Real data. Smarter decisions.
        <span>♡</span>
      </div>
    </main>
  )
}
