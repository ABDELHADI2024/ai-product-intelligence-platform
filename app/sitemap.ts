import type { MetadataRoute } from 'next'
import { getProducts, productSlug } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://witflag.com'
  const products = await getProducts(200)

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/products',
    '/compare',
    '/search',
    '/assistant',
    '/about',
    '/methodology',
    '/best/best-camera-phones',
    '/best/best-battery-phones',
    '/best/best-gaming-phones',
    '/best/best-value-phones'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' as const : 'weekly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${productSlug(product)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }))

  return [...staticRoutes, ...productRoutes]
}
