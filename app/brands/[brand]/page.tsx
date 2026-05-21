import BentoGrid from '@/components/BentoGrid'
import PageHero from '@/components/PageHero'
import { getProducts } from '@/lib/products'

export const revalidate = 3600

type Props = { params: Promise<{ brand: string }> }

export default async function BrandPage({ params }: Props) {
  const { brand } = await params
  const decoded = decodeURIComponent(brand).replace(/-/g, ' ')
  const products = (await getProducts(60)).filter((p) => String(p.brand || '').toLowerCase() === decoded.toLowerCase())
  const fallback = products.length ? products : await getProducts(12)
  return (
    <>
      <PageHero eyebrow="Brand intelligence" title={`${decoded} smartphone intelligence.`} text="A premium brand page template designed for scalable SEO pages, structured product rankings, and brand-specific AI answers." />
      <BentoGrid products={fallback} columns={3} />
    </>
  )
}
