import ProductGrid from '@/components/ProductGrid'
import { getProducts } from '@/lib/products'

export const metadata = {
  title: 'Products | Witflag',
  description: 'Browse smartphones ranked by Witflag intelligence scores.'
}

export default async function ProductsPage() {
  const products = await getProducts(100)

  return (
    <>
      <section className="page-title">
        <h1>Smartphone catalog</h1>
        <p>Browse real product data, prices, specs, and AI-ready decision scores.</p>
      </section>
      <ProductGrid products={products} />
    </>
  )
}
