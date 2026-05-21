import { Suspense } from 'react'
import CompareClient from '@/components/CompareClient'
import { getProducts } from '@/lib/products'

export const metadata = {
  title: 'Compare Smartphones | Witflag',
  description: 'Compare smartphones by global score, camera, battery, display, gaming, and value.'
}

export default async function ComparePage() {
  const products = await getProducts(60)

  return (
    <>
      <section className="page-title">
        <h1>Compare smartphones</h1>
        <p>Select 2 to 4 smartphones and compare decision scores side by side.</p>
      </section>
      <Suspense fallback={<div className="empty">Loading comparison engine...</div>}>
        <CompareClient products={products} />
      </Suspense>
    </>
  )
}
