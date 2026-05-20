import type { Metadata } from 'next'
import { getProducts, safeNumber } from '@/lib/products'
import type { Product } from '@/lib/products'
import ProductGrid from '@/components/ProductGrid'
import Link from 'next/link'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

const GUIDE_CONFIG: Record<string, {
  title: string
  sub: string
  icon: string
  scoreKey: keyof Product
  description: string
  faqItems: { q: string; a: string }[]
}> = {
  'best-camera-phones': {
    title: 'Best Camera Phones',
    sub: 'Ranked by Witflag camera scores.',
    icon: '📸',
    scoreKey: 'camera_score',
    description: 'These smartphones rank highest for camera quality based on Witflag structured product intelligence scores.',
    faqItems: [
      { q: 'What makes a good camera phone?', a: 'High megapixel count, optical zoom, night mode, and video stabilization all contribute to camera quality.' },
      { q: 'How are camera scores calculated?', a: 'Witflag camera scores are derived from structured product data including sensor specs, software capabilities, and lens configurations.' },
    ],
  },
  'best-battery-phones': {
    title: 'Best Battery Phones',
    sub: 'Ranked by Witflag battery scores.',
    icon: '🔋',
    scoreKey: 'battery_score',
    description: 'Top smartphones for all-day battery life, ranked by Witflag battery scores.',
    faqItems: [
      { q: 'What is a good battery capacity?', a: 'Generally 5000 mAh or above provides all-day usage for most users.' },
      { q: 'Does fast charging affect battery health?', a: 'Modern fast charging is designed to minimize degradation, but very high wattage charging can affect long-term battery health.' },
    ],
  },
  'best-gaming-phones': {
    title: 'Best Gaming Phones',
    sub: 'Ranked by Witflag gaming scores.',
    icon: '🎮',
    scoreKey: 'gaming_score',
    description: 'Top smartphones for mobile gaming, ranked by processing power, display refresh rate, and thermal performance.',
    faqItems: [
      { q: 'What specs matter for gaming phones?', a: 'Chipset performance, high refresh rate displays (120Hz+), cooling systems, and RAM are the key factors.' },
      { q: 'Are gaming phones good for everyday use?', a: 'Yes — the performance advantages of gaming phones benefit all tasks, not just games.' },
    ],
  },
  'best-value-phones': {
    title: 'Best Value Phones',
    sub: 'Best overall experience per euro.',
    icon: '💰',
    scoreKey: 'value_score',
    description: 'These smartphones offer the best balance of features, performance, and price according to Witflag value scores.',
    faqItems: [
      { q: 'What does value score mean?', a: "Witflag's value score reflects the ratio of overall capabilities to price — a high value score means you're getting a lot for the money." },
    ],
  },
  'best-phones-under-500': {
    title: 'Best Phones Under €500',
    sub: 'Top-scored smartphones under €500.',
    icon: '🏷️',
    scoreKey: 'global_score',
    description: 'The best smartphones available for under €500, ranked by Witflag global scores.',
    faqItems: [
      { q: 'Can budget phones compete with flagships?', a: 'Mid-range phones under €500 have improved dramatically and now offer excellent cameras, displays, and performance.' },
    ],
  },
  'best-foldable-phones': {
    title: 'Best Foldable Phones',
    sub: 'Ranked foldable smartphones.',
    icon: '📲',
    scoreKey: 'global_score',
    description: 'The best foldable smartphones, ranked by Witflag global score.',
    faqItems: [
      { q: 'Are foldable phones durable?', a: 'Modern foldables use reinforced polymer displays and have improved significantly in durability, though they remain more delicate than traditional phones.' },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const config = GUIDE_CONFIG[slug]
  if (!config) return { title: 'Guide not found' }
  return {
    title: config.title,
    description: config.description,
  }
}

export default async function BestSlugPage({ params }: Props) {
  const { slug } = await params
  const config = GUIDE_CONFIG[slug] ?? {
    title: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
    sub: 'Ranked by Witflag scores.',
    icon: '📱',
    scoreKey: 'global_score' as keyof Product,
    description: 'Top smartphones ranked by Witflag product intelligence scores.',
    faqItems: [],
  }

  const allProducts = await getProducts(300)

  let products = [...allProducts]

  // Filter for specific guides
  if (slug === 'best-phones-under-500') {
    products = products.filter(p => { const price = safeNumber(p.price_eur); return price !== null && price < 500 })
  } else if (slug === 'best-foldable-phones') {
    products = products.filter(p => {
      const cat = (p.normalized_category ?? '').toLowerCase()
      const type = (p.product_type ?? '').toLowerCase()
      return cat.includes('fold') || type.includes('fold') || (p.full_name ?? '').toLowerCase().includes('fold') || (p.full_name ?? '').toLowerCase().includes('flip')
    })
  }

  // Sort by relevant score
  products.sort((a, b) => {
    const va = safeNumber((a as Record<string, unknown>)[config.scoreKey as string] as string | number | null) ?? 0
    const vb = safeNumber((b as Record<string, unknown>)[config.scoreKey as string] as string | number | null) ?? 0
    return vb - va
  })

  const top20 = products.slice(0, 20)

  return (
    <div className="page">
      <div style={{ marginBottom: 8, fontSize: 13, color: 'var(--text-3)', display: 'flex', gap: 6 }}>
        <Link href="/best" style={{ color: 'var(--accent)' }}>Guides</Link>
        <span>›</span>
        <span>{config.title}</span>
      </div>

      <div className="page-hero">
        <div className="page-hero-label">Buying Guide</div>
        <h1 className="page-hero-title">{config.icon} {config.title}</h1>
        <p className="page-hero-sub">{config.description}</p>
        <div className="stat-row" style={{ marginTop: 16 }}>
          <div className="stat-pill"><strong>{top20.length}</strong> Products</div>
          <div className="stat-pill">Ranked by <strong>{String(config.scoreKey).replace('_score', '').replace('_', ' ')}</strong> score</div>
        </div>
      </div>

      <ProductGrid products={top20} />

      {/* FAQ */}
      {config.faqItems.length > 0 && (
        <section style={{ marginTop: 60 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 20 }}>Frequently Asked Questions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {config.faqItems.map(f => (
              <div key={f.q} style={{ background: 'var(--bg-2)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '18px 20px' }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--text)', marginBottom: 8 }}>{f.q}</div>
                <div style={{ fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>{f.a}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: config.title,
            description: config.description,
            numberOfItems: top20.length,
          })
        }}
      />
    </div>
  )
}
