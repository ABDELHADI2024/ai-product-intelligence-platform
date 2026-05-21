import Link from 'next/link'
import {
  ArrowRight,
  BatteryCharging,
  BrainCircuit,
  Camera,
  Cpu,
  Database,
  GitCompare,
  Radar,
  Search,
  ShieldCheck,
  Sparkles,
  Trophy,
  WandSparkles,
} from 'lucide-react'
import PageShell from '@/components/PageShell'
import ProductGrid from '@/components/ProductGrid'
import ScoreRing from '@/components/ScoreRing'
import SectionHeader from '@/components/SectionHeader'
import { formatPrice, getProductName, getProducts, productSlug, safeText } from '@/lib/products'

export const dynamic = 'force-dynamic'

const intelligenceCards = [
  { icon: Search, title: 'Intent search', text: 'Find phones by real needs like camera, battery, gaming, travel, budget, or productivity.' },
  { icon: GitCompare, title: 'Decision comparison', text: 'Compare products by buyer outcomes, not only raw specifications.' },
  { icon: BrainCircuit, title: 'AI-ready scoring', text: 'Turn structured product data into simple, explainable recommendation signals.' },
  { icon: WandSparkles, title: 'SEO content engine', text: 'Build product, brand, category, guide, and comparison pages from clean data.' },
]

const needCards = [
  { icon: Camera, title: 'Best camera phones', text: 'Rank products by camera score, video strength, zoom, and image quality.', href: '/guides/best-camera-phones' },
  { icon: BatteryCharging, title: 'Best battery phones', text: 'Discover devices made for long days, charging speed, and travel use.', href: '/guides/best-battery-phones' },
  { icon: Cpu, title: 'Best gaming phones', text: 'Find phones with strong chips, stable performance, and smooth screens.', href: '/guides/best-gaming-phones' },
  { icon: Trophy, title: 'Best value phones', text: 'Balance price, score, specs, and long-term value before buying.', href: '/guides/best-value-phones' },
]

export default async function HomePage() {
  const products = await getProducts(9)
  const heroProduct = products[0]
  const heroName = getProductName(heroProduct)

  return (
    <PageShell>
      <section className="wf-hero">
        <div className="wf-hero-copy">
          <div className="wf-eyebrow"><Sparkles size={16} /> AI-native product intelligence platform</div>
          <h1>
            Choose the right smartphone with <span>decision intelligence.</span>
          </h1>
          <p>
            Witflag transforms product specs, scores, prices, and buyer intent into fast search, clear comparisons, guided recommendations, and SEO-ready product pages.
          </p>

          <div className="wf-cta-row">
            <Link href="/assistant" className="wf-btn wf-btn-primary">Start AI assistant <ArrowRight size={17} /></Link>
            <Link href="/products" className="wf-btn wf-btn-ghost">Explore products</Link>
          </div>

          <div className="wf-stats-grid" aria-label="Platform statistics">
            <div><strong>{products.length}+</strong><span>Live products</span></div>
            <div><strong>7</strong><span>Score signals</span></div>
            <div><strong>24/7</strong><span>SEO ready</span></div>
            <div><strong>AI</strong><span>Decision layer</span></div>
          </div>
        </div>

        <div className="wf-hero-visual">
          <div className="wf-featured-card">
            <div className="wf-card-topline">
              <span><Database size={14} /> Live from product intelligence</span>
              <b>Featured pick</b>
            </div>

            <div className="wf-featured-main">
              <div>
                <small>{safeText(heroProduct?.brand, 'Smartphone')}</small>
                <h2>{heroName}</h2>
                <p>{safeText(heroProduct?.content_summary_en, 'A premium AI-scored product profile prepared for search, comparison, recommendation, and SEO intelligence.')}</p>
                <div className="wf-price-line">{formatPrice(heroProduct)}</div>
                <Link href={heroProduct ? `/products/${productSlug(heroProduct)}` : '/products'} className="wf-link">View product intelligence <ArrowRight size={15} /></Link>
              </div>

              <div className="wf-phone-stage">
                <div className="wf-orbit wf-orbit-one" />
                <div className="wf-orbit wf-orbit-two" />
                {heroProduct?.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={String(heroProduct.image_url)} alt={heroName} />
                ) : (
                  <div className="wf-big-phone"><BrainCircuit size={62} /></div>
                )}
              </div>
            </div>

            <div className="wf-featured-score">
              <ScoreRing value={heroProduct?.global_score} size="lg" />
              <div>
                <strong>Global intelligence score</strong>
                <span>Camera, battery, gaming, display, performance, and value are normalized for decision search.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wf-intelligence-strip" aria-label="Core product intelligence features">
        {intelligenceCards.map((card) => (
          <article key={card.title}>
            <card.icon size={22} />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </section>

      <section className="wf-section">
        <SectionHeader
          eyebrow="Start by your need"
          title="One UI system for every buying decision."
          text="These cards become reusable page templates later for guides, categories, assistant prompts, and SEO landing pages."
        />
        <div className="wf-need-grid">
          {needCards.map((card) => (
            <Link key={card.title} href={card.href} className="wf-need-card">
              <div><card.icon size={23} /></div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
              <span>Explore guide <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="wf-section">
        <SectionHeader
          eyebrow="Top picks"
          title="Top picks for you"
          text="A clean reusable product grid. We will reuse the same ProductCard on products, guides, search, brand, and category pages."
          href="/products"
          linkLabel="View all products"
        />
        <ProductGrid products={products.slice(0, 6)} />
      </section>

      <section className="wf-seo-panel">
        <div>
          <span className="wf-section-eyebrow">SEO / AEO / GEO foundation</span>
          <h2>Built to become a product intelligence content engine.</h2>
          <p>
            Witflag can scale from product cards to programmatic pages: smartphone detail pages, brand hubs, category pages, buying guides, comparisons, and answer-style pages for search engines and AI answer engines.
          </p>
        </div>
        <div className="wf-seo-points">
          <span><ShieldCheck size={16} /> Stable design system</span>
          <span><Radar size={16} /> Internal linking ready</span>
          <span><Sparkles size={16} /> AI assistant ready</span>
        </div>
      </section>
    </PageShell>
  )
}
