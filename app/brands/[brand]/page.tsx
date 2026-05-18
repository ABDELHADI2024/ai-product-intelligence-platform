import Link from 'next/link';
import { notFound } from 'next/navigation';
import SEOProductRow from '@/components/SEOProductRow';
import { getProducts, safeNumber } from '@/lib/products';

export const dynamic = 'force-dynamic';

type BrandPageProps = {
  params: Promise<{ brand: string }>;
};

function slugifyBrand(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function brandTitleFromSlug(slug: string) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { brand } = await params;
  const title = brandTitleFromSlug(brand);

  return {
    title: `${title} Smartphones | Witflag AI`,
    description: `Explore ${title} smartphones ranked by AI product intelligence scores.`,
  };
}

export default async function BrandDetailPage({ params }: BrandPageProps) {
  const { brand } = await params;
  const products = await getProducts(300);

  const matchingProducts = products
    .filter((product) => product.brand && slugifyBrand(product.brand) === brand)
    .sort((a, b) => (safeNumber(b.global_score) || 0) - (safeNumber(a.global_score) || 0));

  if (!matchingProducts.length) notFound();

  const brandName = matchingProducts[0].brand || brandTitleFromSlug(brand);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.22),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Link href="/brands" className="text-sm font-semibold text-cyan-300">
            ← Smartphone brands
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.35em] text-cyan-300">
            Brand page
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            {brandName} smartphones
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            Explore {brandName} phones ranked by global score, camera, battery, gaming, display, and value signals.
          </p>

          <div className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <p className="text-sm text-slate-300">
              {matchingProducts.length} products found for{' '}
              <span className="font-semibold text-cyan-200">{brandName}</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="space-y-5">
          {matchingProducts.map((product, index) => (
            <SEOProductRow
              key={product.id}
              product={product}
              rank={index + 1}
              scoreLabel="Global"
              scoreValue={product.global_score}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
