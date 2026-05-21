import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/debug-data'] },
    sitemap: 'https://witflag.com/sitemap.xml'
  }
}
