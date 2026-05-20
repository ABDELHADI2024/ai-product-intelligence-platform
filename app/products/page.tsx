import type { Metadata } from 'next'
import { getProducts } from '@/lib/products'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'All Products',
  description: 'Browse AI-scored products with scores, prices, summaries, and product intelligence signals.',
}

export const revalidate = 3600

export default async function ProductsPage() {
  const products = await getProducts(300)
  return <ProductsClient products={products} />
}
