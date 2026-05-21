import type { MetadataRoute } from 'next'
import { getProducts, productSlug } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://witflag.com'
  const products = await getProducts(100)
  const staticRoutes = ['', '/products', '/compare', '/search', '/assistant', '/best/best-camera-phones', '/best/best-battery-phones', '/best/best-gaming-phones', '/best/best-value-phones']
  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: new Date() })),
    ...products.map((product) => ({ url: `${base}/products/${productSlug(product)}`, lastModified: product.created_at ? new Date(product.created_at) : new Date() }))
  ]
}
