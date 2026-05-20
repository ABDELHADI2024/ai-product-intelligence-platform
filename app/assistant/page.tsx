import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, rankProductsForUseCase, normalizeUseCase } from '@/lib/products';

export const dynamic = 'force-dynamic';

type AssistantPageProps = { searchParams?: Promise<{ use?: string; budget?: string }> };
const uses = [['balanced','Balanced'], ['camera','Camera'], ['battery','Battery'], ['gaming','Gaming'], ['value','Value']];
const budgets = [['','Any budget'], ['300','Under €300'], ['500','Under €500'], ['800','Under €800'], ['1200','Premium']];

export default async function AssistantPage({ searchParams }: AssistantPageProps) {
  const sp = searchParams ? await searchParams : {};
  const use = normalizeUseCase(sp.use || 'balanced');
  const budget = sp.budget ? Number(sp.budget) : undefined;
  const products = await getProducts(300);
  const recommendations = rankProductsForUseCase(products, use, budget, 6);
  const makeHref = (nextUse = use, nextBudget = sp.budget || '') => `/assistant?use=${nextUse}${nextBudget ? `&budget=${nextBudget}` : ''}`;

  return (
    <main className="surface-bg">
      <section className="page-hero"><div className="content-shell"><p className="ph-eyebrow">Guided assistant</p><h1 className="ph-title">Find the right phone by answering simple needs.</h1><p className="ph-sub">Choose priority and budget. Witflag ranks phones using your real product scores.</p><div className="filter-row">{uses.map(([id,label]) => <Link key={id} href={makeHref(id, sp.budget || '')} className={`filter-link ${use === id ? 'active' : ''}`}>{label}</Link>)}</div><div className="filter-row">{budgets.map(([value,label]) => <Link key={label} href={makeHref(use, value)} className={`filter-link ${(sp.budget || '') === value ? 'active' : ''}`}>{label}</Link>)}</div></div></section>
      <section className="section content-shell"><div className="section-head"><div><p className="ph-eyebrow">Top recommendations</p><h2 className="section-title">Best matches for you.</h2></div></div><div className="pgrid">{recommendations.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>
    </main>
  );
}
