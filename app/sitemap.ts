import type { MetadataRoute } from 'next'
import { getProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://witflag.com'

  let products: Awaited<ReturnType<typeof getProducts>> = []

  try {
    products = await getProducts()
  } catch {
    products = []
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((product) => Boolean(product?.slug))
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }))

  return [...staticRoutes, ...productRoutes]
}
