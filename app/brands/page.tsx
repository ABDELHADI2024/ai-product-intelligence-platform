import Link from 'next/link';
import { getProducts } from '@/lib/products';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Smartphone Brands | Witflag AI' };

function slugifyBrand(brand: string) { return brand.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''); }

export default async function BrandsPage() {
  const products = await getProducts(300);
  const map = new Map<string, number>();
  products.forEach(p => { if (p.brand) map.set(p.brand, (map.get(p.brand) || 0) + 1); });
  const brands = Array.from(map.entries()).map(([brand,count]) => ({ brand, count })).sort((a,b) => b.count - a.count);
  return <main className="surface-bg"><section className="page-hero"><div className="content-shell"><p className="ph-eyebrow">Brand intelligence</p><h1 className="ph-title">Explore smartphone brands.</h1><p className="ph-sub">Browse your smartphone catalog by manufacturer.</p></div></section><section className="section content-shell"><div className="brand-grid">{brands.map(({brand,count}) => <Link href={`/brands/${slugifyBrand(brand)}`} key={brand} className="brand-card"><p className="pcard-brand">Brand</p><h2 className="mt-4 text-3xl font-black">{brand}</h2><p className="mt-3 text-slate-400">{count} smartphones</p></Link>)}</div></section></main>;
}
