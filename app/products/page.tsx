import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import BentoGrid from '@/components/BentoGrid'
import PageHero from '@/components/PageHero'
import { getProducts } from '@/lib/products'

export const metadata = { title: 'Products', description: 'Browse AI-scored smartphones with real product data.' }
export const revalidate = 3600

export default async function ProductsPage() {
  const products = await getProducts(60)
  return (
    <>
      <PageHero eyebrow="Product catalog" title="Explore AI-scored smartphones." text="A fast, premium catalog designed for SEO pages, smart filters, comparisons, and future AI recommendations." />
      <div className="wf-filter-bar">
        <Link className="wf-input" href="/search"><Search size={15} /> Search by need, brand, camera, battery, gaming...</Link>
        <Link className="wf-btn wf-btn-ghost" href="/best/best-value-phones"><Filter size={15} /> Best value</Link>
        <Link className="wf-btn wf-btn-primary" href="/compare">Compare <ArrowRight size={15} /></Link>
      </div>
      <BentoGrid products={products} columns={3} />
    </>
  )
}
