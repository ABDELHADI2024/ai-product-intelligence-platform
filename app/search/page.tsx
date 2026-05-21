import Link from 'next/link'
import { ArrowRight, Search, Sparkles } from 'lucide-react'
import BentoGrid from '@/components/BentoGrid'
import PageHero from '@/components/PageHero'
import { searchProducts } from '@/lib/products'

export const metadata = { title: 'Smart Search', description: 'Search smartphones by brand, need, specs, and AI decision signals.' }
export const revalidate = 3600

type Props = { searchParams?: Promise<{ q?: string }> }

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams
  const q = params?.q || ''
  const products = await searchProducts(q, 60)
  return (
    <>
      <PageHero eyebrow="Smart search" title="Search by need, not only by name." text="Use this page as the future base for semantic search, embeddings, RAG answers, and guided product discovery." />
      <form className="wf-filter-bar" action="/search">
        <input className="wf-input" name="q" defaultValue={q} placeholder="Try: best camera phone, gaming, battery, Samsung..." />
        <button className="wf-btn wf-btn-primary" type="submit"><Search size={15} /> Search</button>
        <Link className="wf-btn wf-btn-ghost" href="/assistant"><Sparkles size={15} /> Guided AI</Link>
      </form>
      <div className="wf-section-head"><div><h2>{q ? `Results for “${q}”` : 'Recommended products'}</h2><p>{products.length} product profiles ready for discovery.</p></div><Link className="wf-link" href="/products">All products <ArrowRight size={14} /></Link></div>
      <BentoGrid products={products} columns={3} />
    </>
  )
}
