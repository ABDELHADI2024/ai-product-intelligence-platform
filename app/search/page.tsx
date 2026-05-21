import ProductGrid from '@/components/ProductGrid'
import { searchProducts } from '@/lib/products'

export const metadata = {
  title: 'Search | Witflag',
  description: 'Search smartphones by brand, model, score, specs, and buying intent.'
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams
  const q = params.q || ''
  const products = await searchProducts(q, 100)

  return (
    <>
      <section className="page-title">
        <h1>Search results</h1>
        <p>{q ? `Results for “${q}”` : 'Type a query in the search bar to discover smartphones.'}</p>
      </section>
      <ProductGrid products={products} />
    </>
  )
}
