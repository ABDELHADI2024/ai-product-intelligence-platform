import type { Metadata } from 'next'
import { Suspense } from 'react'
import { getProducts } from '@/lib/products'
import CompareClient from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Smartphones — Witflag',
  description: 'Compare smartphones by global, camera, battery, display, gaming, and value scores.',
}

export const revalidate = 3600

export default async function ComparePage() {
  const products = await getProducts(300)

  return (
    <Suspense fallback={<div className="page">Loading comparison…</div>}>
      <CompareClient allProducts={products} />
    </Suspense>
  )
}
