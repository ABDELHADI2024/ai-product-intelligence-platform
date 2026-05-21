import Link from 'next/link'
import { ArrowRight, BarChart3, Star, Zap } from 'lucide-react'
import { formatPrice, getProductName, Product, productSlug, safeNumber, scoreLabel } from '@/lib/products'

export default function HomeHero({ products, featured }: { products: Product[]; featured?: Product }) {
  const featuredName = getProductName(featured)
  const featuredScore = safeNumber(featured?.global_score)
  const productCount = Math.max(products.length, 50)

  return (
    <section className="hero-grid">
      <div>
        <div className="badge"><Zap size={16} /> Live from Supabase</div>
        <h1 className="hero-title">
          AI-powered smartphone <span className="gradient-text">intelligence</span>
        </h1>
        <p className="hero-copy">
          We score, rank, and compare smartphones using real product data — so you can buy with confidence.
        </p>

        <div className="stats-row">
          <div className="stat"><strong>{productCount}+</strong><span>Products</span></div>
          <div className="stat"><strong>6</strong><span>Decision signals</span></div>
          <div className="stat"><strong>Data-ready</strong><span>Updates</span></div>
          <div className="stat"><strong>Real</strong><span>Supabase data</span></div>
        </div>

        <div className="cta-row">
          <Link className="btn btn-primary" href="/products">Browse Products <ArrowRight size={16} /></Link>
          <Link className="btn" href="/compare">Compare Now <BarChart3 size={15} /></Link>
        </div>
      </div>

      {featured ? (
        <article className="featured-card">
          <div className="featured-info">
            <span className="featured-label">Featured</span>
            <h2>{featuredName}</h2>
            <Link href={`/search?q=${encodeURIComponent(String(featured.brand || ''))}`} className="brand-link">
              {featured.brand || 'Smartphone'}
            </Link>
            <div className="stars" aria-label="Rating 4.8 out of 5">
              {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={15} fill="currentColor" />)}
              <span>4.8</span>
            </div>
            <div className="price">{formatPrice(featured)}</div>
            <p>{featured.content_summary_en || 'The most complete flagship profile with strong camera, performance, battery, and display signals.'}</p>
            <Link className="btn" href={`/products/${productSlug(featured)}`}>View Details <ArrowRight size={15} /></Link>
          </div>

          <div className="featured-visual">
            <div className="phone-platform" />
            {featured.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="featured-img" src={featured.image_url} alt={featuredName} />
            ) : (
              <div className="phone-mock" />
            )}
          </div>

          <div className="score-card">
            <div className="score-ring">{featuredScore ?? '—'}</div>
            <div><span>Global Score</span><strong>{scoreLabel(featuredScore)}</strong></div>
          </div>
        </article>
      ) : null}
    </section>
  )
}
