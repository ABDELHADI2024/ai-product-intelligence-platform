import HomeHero from '@/components/HomeHero'
import FeatureStrip from '@/components/FeatureStrip'
import GuideCards from '@/components/GuideCards'
import TopPicks from '@/components/TopPicks'
import { getProducts } from '@/lib/products'

export const revalidate = 3600

export default async function HomePage() {
  const products = await getProducts(60)
  const featured = products[0]
  const topProducts = products.slice(0, 6)

  return (
    <>
      <HomeHero products={products} featured={featured} />
      <FeatureStrip />
      <GuideCards />
      <TopPicks products={topProducts} />
    </>
  )
}
