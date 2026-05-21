import ProductGrid from '@/components/ProductGrid'
import { getBestProducts, getProducts } from '@/lib/products'

export const metadata = {
  title: 'Best gaming phones | Witflag',
  description: 'Ranked smartphones using Witflag product intelligence scores.'
}

export default async function BestPage() {
  const products = await getProducts(100)
  const ranked = getBestProducts(products, 'gaming')

  return (
    <>
      <section className="page-title">
        <h1>Best gaming phones</h1>
        <p>Ranked by Witflag intelligence scores and real product data.</p>
      </section>
      <ProductGrid products={ranked.slice(0, 24)} />
    </>
  )
}
