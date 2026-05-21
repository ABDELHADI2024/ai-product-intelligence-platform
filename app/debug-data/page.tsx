import { getProducts } from '@/lib/products'

export default async function DebugDataPage() {
  const products = await getProducts(20)

  return (
    <section className="page-title">
      <h1>Debug data</h1>
      <p>{products.length} products loaded.</p>
      <pre className="content-card" style={{ overflowX: 'auto' }}>{JSON.stringify(products.slice(0, 3), null, 2)}</pre>
    </section>
  )
}
