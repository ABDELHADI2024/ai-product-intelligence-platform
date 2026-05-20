import Link from 'next/link'
import type { Metadata } from 'next'
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
import ProductCard from '@/components/ProductCard'
import BentoGrid from '@/components/BentoGrid'

export const metadata: Metadata = {
  title: 'Witflag — AI Smartphone Intelligence',
  description:
    'Structured product intelligence for smartphones. Score-based comparison, recommendations, smart search, and buying guides.',
}

export const revalidate = 3600

const GUIDE_CARDS = [
  { slug: 'best-camera-phones', label: 'Best camera phones', sub: 'Ranked by camera and global scores.', icon: Camera, tone: 'cyan' },
  { slug: 'best-battery-phones', label: 'Best battery phones', sub: 'Built for long daily usage.', icon: BatteryCharging, tone: 'green' },
  { slug: 'best-gaming-phones', label: 'Best gaming phones', sub: 'Performance, display, and gaming power.', icon: Zap, tone: 'violet' },
  { slug: 'best-value-phones', label: 'Best value phones', sub: 'Best experience for the money.', icon: BadgeDollarSign, tone: 'amber' },
]

const FEATURE_LIST = [
  { icon: LineChart, title: 'Score-based intelligence', body: '6 decision signals scored using structured data.', tone: 'cyan' },
  { icon: Search, title: 'Smart search', body: 'Natural language search across the smartphone catalog.', tone: 'violet' },
  { icon: Scale, title: 'Product comparison', body: 'Compare products side by side with decision signals.', tone: 'cyan' },
  { icon: Zap, title: 'Data-ready updates', body: 'Built for continuous product and score updates.', tone: 'amber' },
  { icon: ShieldCheck, title: 'Trusted insights', body: 'Objective scoring for smarter buying decisions.', tone: 'rose' },
  { icon: Globe2, title: 'International-ready platform', body: 'Multi-currency-ready structure for global expansion.', tone: 'violet' },
]

function scoreTone(score: number | null) {
  if (score === null) return 'home-score-muted'
  if (score >= 88) return 'home-score-great'
  if (score >= 78) return 'home-score-good'
  if (score >= 68) return 'home-score-mid'
  return 'home-score-low'
}

export default async function HomePage() {
  const products = await getProducts(60)
  const topProducts = products.slice(0, 6)
  const featured = products[0]
  const featuredScore = safeNumber(featured?.global_score)

  return (
    <main className="home-page">
      <div className="home-noise" />

      <section className="home-hero">
        <div className="home-hero-grid">
          <div className="home-hero-copy">
            <div className="home-badge">
              <span className="home-live-dot" />
              Live from Supabase
            </div>

            <h1 className="home-title">
              AI-powered smartphone <span>intelligence</span>
            </h1>

            <p className="home-subtitle">
              We score, rank, and compare smartphones using real product data —
              so you can buy with confidence.
            </p>

            <div className="home-stats">
              <div><strong>{products.length}+</strong><span>Products</span></div>
              <div><strong>6</strong><span>Decision signals</span></div>
              <div><strong>Data-ready</strong><span>Updates</span></div>
              <div><strong>Real</strong><span>Supabase data</span></div>
            </div>

            <div className="home-actions">
              <Link href="/products" className="home-btn home-btn-primary">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/compare" className="home-btn home-btn-ghost">
                Compare Now <LineChart className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {featured ? (
            <Link href={`/products/${featured.slug || ''}`} className="home-featured-card">
              <div className="home-featured-glow" />
              <div className="home-featured-content">
                <div className="home-featured-left">
                  <span className="home-chip">Featured</span>
                  <h2>{getProductName(featured)}</h2>
                  <p className="home-brand">{featured.brand || 'Smartphone'}</p>

                  <div className="home-rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                    <span>4.8</span>
                  </div>

                  <p className="home-price">{formatPrice(featured)}</p>

                  <p className="home-featured-desc">
                    High-ranking smartphone profile with strong decision signals
                    across camera, performance, value, and daily usage.
                  </p>

                  <span className="home-btn home-btn-ghost home-small-btn">
                    View Details <ArrowRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="home-device-stage">
                  <div className="home-device-orbit" />

                  {featured.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={featured.image_url}
                      alt={getProductName(featured)}
                      className="home-device-img"
                    />
                  ) : (
                    <div className="home-device-placeholder">
                      <Smartphone className="h-20 w-20" />
                    </div>
                  )}

                  <div className="home-score-box">
                    <div className={`home-score-ring ${scoreTone(featuredScore)}`}>
                      {featuredScore === null ? '—' : Math.round(featuredScore)}
                    </div>
                    <div>
                      <strong>Global Score</strong>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ) : null}
        </div>
      </section>

      <section className="home-feature-strip">
        {FEATURE_LIST.map((item) => {
          const Icon = item.icon
          return (
            <div key={item.title} className="home-feature-item">
              <div className={`home-icon home-icon-${item.tone}`}>
                <Icon className="h-7 w-7" />
              </div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          )
        })}
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2>Start by your need</h2>
            <p>Browse buying guides to find the perfect phone for what matters most.</p>
          </div>
          <Link href="/best" className="home-section-link">
            View all guides <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="home-guide-grid">
          {GUIDE_CARDS.map((guide) => {
            const Icon = guide.icon
            return (
              <Link key={guide.slug} href={`/best/${guide.slug}`} className={`home-guide-card home-guide-${guide.tone}`}>
                <div className="home-guide-bg" />
                <div className={`home-icon home-icon-${guide.tone}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3>{guide.label}</h3>
                <p>{guide.sub}</p>
                <span>Explore <ArrowRight className="h-4 w-4" /></span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <h2>Top picks for you</h2>
            <p>Discover the highest scoring smartphones from your live product data.</p>
          </div>
          <Link href="/products" className="home-section-link">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <BentoGrid products={topProducts} />
      </section>

      <section className="home-section home-bottom-note">
        <div><Database className="h-5 w-5 text-cyan-300" /><span>Real structured data</span></div>
        <div><Sparkles className="h-5 w-5 text-violet-300" /><span>6 decision signals</span></div>
        <div><Globe2 className="h-5 w-5 text-cyan-300" /><span>International-ready</span></div>
      </section>
    </main>
  )
}
