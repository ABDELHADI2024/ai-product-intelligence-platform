import Link from 'next/link';
import { notFound } from 'next/navigation';
import SEOProductRow from '@/components/SEOProductRow';
import { getProducts, Product, safeNumber } from '@/lib/products';

export const dynamic = 'force-dynamic';

type BestPageProps = {
  params: Promise<{ slug: string }>;
};

type Topic = {
  title: string;
  description: string;
  intro: string;
  scoreLabel: string;
  score: keyof Product;
  filter?: (product: Product) => boolean;
};

const topics: Record<string, Topic> = {
  'best-camera-phones': {
    title: 'Best camera phones',
    description: 'AI-ranked camera smartphones based on camera score and global product intelligence.',
    intro: 'This guide ranks smartphones for users who care about photos, video, selfies, social content, and camera reliability.',
    scoreLabel: 'Camera',
    score: 'camera_score',
  },
  'best-battery-phones': {
    title: 'Best battery phones',
    description: 'Smartphones ranked for battery life and daily reliability.',
    intro: 'This guide highlights phones with strong battery scores and practical daily endurance signals.',
    scoreLabel: 'Battery',
    score: 'battery_score',
  },
  'best-gaming-phones': {
    title: 'Best gaming phones',
    description: 'Performance-focused smartphones ranked by gaming score and display/battery balance.',
    intro: 'This guide focuses on smartphones for gaming, performance, smooth displays, and sustained usage.',
    scoreLabel: 'Gaming',
    score: 'gaming_score',
  },
  'best-value-phones': {
    title: 'Best value phones',
    description: 'Smartphones ranked by value score, price, and global balance.',
    intro: 'This guide ranks phones that offer the strongest practical balance between price and product intelligence score.',
    scoreLabel: 'Value',
    score: 'value_score',
  },
  'best-phones-under-500': {
    title: 'Best phones under €500',
    description: 'Smartphones under €500 ranked by value and global product intelligence.',
    intro: 'This guide focuses on phones under €500, prioritizing value, balanced specs, and useful everyday performance.',
    scoreLabel: 'Value',
    score: 'value_score',
    filter: (product) => {
      const price = safeNumber(product.price_eur);
      return price === null || price <= 500;
    },
  },
  'best-foldable-phones': {
    title: 'Best foldable phones',
    description: 'Foldable smartphones ranked by global product intelligence.',
    intro: 'This guide ranks foldable smartphones using global score and key product intelligence signals.',
    scoreLabel: 'Global',
    score: 'global_score',
    filter: (product) => product.normalized_category === 'foldable-smartphones',
  },
};

export async function generateMetadata({ params }: BestPageProps) {
  const { slug } = await params;
  const topic = topics[slug];

  if (!topic) {
    return { title: 'Best Smartphones | Witflag AI' };
  }

  return {
    title: `${topic.title} | Witflag AI`,
    description: topic.description,
  };
}

export default async function BestTopicPage({ params }: BestPageProps) {
  const { slug } = await params;
  const topic = topics[slug];

  if (!topic) notFound();

  const products = await getProducts(300);
  const rankedProducts = products
    .filter((product) => (topic.filter ? topic.filter(product) : true))
    .sort((a, b) => (safeNumber(b[topic.score]) || 0) - (safeNumber(a[topic.score]) || 0))
    .slice(0, 20);

  return (
    <main className="min-h-screen bg-[#020617] text-white">
      <section className="border-b border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_34%),radial-gradient(circle_at_top_right,rgba(79,70,229,0.22),transparent_35%)]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <Link href="/best" className="text-sm font-semibold text-cyan-300">
            ← Best smartphone guides
          </Link>

          <p className="mt-8 text-sm uppercase tracking-[0.35em] text-cyan-300">
            AI-ranked buying guide
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
            {topic.title}
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
            {topic.intro}
          </p>

          <div className="mt-8 rounded-[2rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5">
            <p className="text-sm text-slate-300">
              Ranking signal:{' '}
              <span className="font-semibold text-cyan-200">
                {topic.scoreLabel} score + Witflag product intelligence data
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="space-y-5">
          {rankedProducts.map((product, index) => (
            <SEOProductRow
              key={product.id}
              product={product}
              rank={index + 1}
              scoreLabel={topic.scoreLabel}
              scoreValue={product[topic.score] as string | number | null}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
