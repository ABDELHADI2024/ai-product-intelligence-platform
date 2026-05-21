import FeatureStrip from '@/components/FeatureStrip';
import GuideCards from '@/components/GuideCards';
import HomeHero from '@/components/HomeHero';
import TopPicks from '@/components/TopPicks';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const products = await getProducts(6);
  const featured = products[0];

  return (
    <main className="home-page">
      <div className="home-shell">
        <HomeHero products={products} featured={featured} />
        <FeatureStrip />
        <GuideCards />
        <TopPicks products={products} />
      </div>
    </main>
  );
}
