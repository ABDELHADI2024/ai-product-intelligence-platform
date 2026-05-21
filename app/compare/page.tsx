import { Suspense } from 'react'
import CompareClient from '@/components/CompareClient'
import { getProducts } from '@/lib/products'

export const metadata = {
  title: 'Compare Smartphones | Witflag',
  description: 'Compare smartphones by global score, camera, battery, gaming, display, and value.',
}

export default async function ComparePage() {
  let products: Awaited<ReturnType<typeof getProducts>> = []

  try {
    products = await getProducts()
  } catch {
    products = []
  }

  return (
    <Suspense
      fallback={
        <main className="page">
          <div className="empty">
            <div className="empty-icon">⚖️</div>
            <div className="empty-title">Loading comparison engine...</div>
            <p>Preparing smartphone comparison data.</p>
          </div>
        </main>
      }
    >
      <CompareClient allProducts={products} />
    </Suspense>
  )
}
