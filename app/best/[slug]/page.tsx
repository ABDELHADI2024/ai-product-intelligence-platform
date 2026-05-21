import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import BentoGrid from '@/components/BentoGrid'
import PageHero from '@/components/PageHero'
import { getBestProducts, getProducts } from '@/lib/products'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

const guideCopy: Record<string, { title: string; text: string }> = {
  'best-camera-phones': { title: 'Best camera phones ranked by AI signals.', text: 'A SEO-ready buying guide ranked by camera score, global score, price, and overall product balance.' },
  'best-battery-phones': { title: 'Best battery phones for endurance.', text: 'Phones ranked by battery score, capacity, value, and global intelligence signals.' },
  'best-gaming-phones': { title: 'Best gaming phones for performance.', text: 'Devices ranked for gaming, chipset power, display quality, battery, and value.' },
  'best-value-phones': { title: 'Best value phones right now.', text: 'A ranked guide for users who want the strongest product for the money.' }
}

export default async function BestGuidePage({ params }: Props) {
  const { slug } = await params
  const products = getBestProducts(await getProducts(60), slug)
  const copy = guideCopy[slug] || { title: 'Best smartphones ranked by Witflag.', text: 'AI-ready buying guide built from structured product data and score signals.' }
  return (
    <>
      <PageHero eyebrow="Buying guide" title={copy.title} text={copy.text} />
      <div className="wf-section-head"><div><h2>Ranked recommendations</h2><p>Reusable guide template for SEO, AEO snippets, and AI answer pages.</p></div><Link className="wf-link" href="/products">All products <ArrowRight size={14} /></Link></div>
      <BentoGrid products={products.slice(0, 12)} columns={3} />
    </>
  )
}
