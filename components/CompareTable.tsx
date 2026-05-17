import Link from 'next/link';
import { Award, BatteryCharging, Camera, Cpu, Gem, MonitorSmartphone, Trophy } from 'lucide-react';
import {
  formatPrice,
  formatScore,
  getComparisonVerdict,
  getComparisonWinners,
  getProductName,
  Product,
  safeText,
} from '@/lib/products';
import ScoreRing from './ScoreRing';

type CompareTableProps = {
  products: Product[];
};

const scoreRows = [
  { label: 'Global score', key: 'global_score' as const },
  { label: 'Camera score', key: 'camera_score' as const },
  { label: 'Battery score', key: 'battery_score' as const },
  { label: 'Display score', key: 'display_score' as const },
  { label: 'Gaming score', key: 'gaming_score' as const },
  { label: 'Value score', key: 'value_score' as const },
];

const specRows = [
  { label: 'Price', render: (p: Product) => formatPrice(p) },
  { label: 'Display', render: (p: Product) => safeText(p.screen_size) },
  { label: 'Panel type', render: (p: Product) => safeText(p.screen_type) },
  { label: 'Refresh rate', render: (p: Product) => safeText(p.refresh_rate) },
  { label: 'Chipset', render: (p: Product) => safeText(p.chipset) },
  { label: 'RAM', render: (p: Product) => safeText(p.ram) },
  { label: 'Storage', render: (p: Product) => safeText(p.storage) },
  { label: 'Battery', render: (p: Product) => p.battery_mah ? `${p.battery_mah}mAh` : 'Coming soon' },
  { label: 'Rear camera', render: (p: Product) => safeText(p.rear_camera) },
  { label: 'Front camera', render: (p: Product) => safeText(p.front_camera) },
];

const winnerIcons = [Trophy, Camera, BatteryCharging, MonitorSmartphone, Cpu, Gem];

export default function CompareTable({ products }: CompareTableProps) {
  const winners = getComparisonWinners(products);
  const verdict = getComparisonVerdict(products);

  if (products.length === 0) {
    return (
      <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 text-center">
        <h2 className="text-2xl font-bold text-white">No smartphones selected</h2>
        <p className="mt-3 text-slate-400">
          Select smartphones from the catalog to start a comparison.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950"
        >
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {winners.map((winner, index) => {
          const Icon = winnerIcons[index] || Award;
          return (
            <div
              key={winner.key}
              className="rounded-[1.75rem] border border-cyan-300/15 bg-cyan-300/[0.06] p-5 shadow-2xl shadow-cyan-950/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                    {winner.label}
                  </p>
                  <p className="mt-1 font-semibold text-white">
                    {winner.winner ? getProductName(winner.winner) : 'Pending'}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-400">
                Score: {winner.value !== null ? `${Math.round(winner.value)}/100` : 'Pending'}
              </p>
            </div>
          );
        })}
      </section>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">
          AI comparison verdict
        </p>
        <h2 className="mt-3 text-3xl font-black text-white">
          Which smartphone should you choose?
        </h2>
        <p className="mt-4 max-w-4xl text-lg leading-8 text-slate-300">
          {verdict.summary}
        </p>
      </section>

      <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
        <div className="grid border-b border-white/10 bg-white/[0.03]" style={{ gridTemplateColumns: `220px repeat(${products.length}, minmax(180px, 1fr))` }}>
          <div className="p-5 text-sm uppercase tracking-[0.25em] text-slate-500">
            Smartphone
          </div>
          {products.map((product) => (
            <div key={product.id} className="border-l border-white/10 p-5">
              <div className="flex h-36 items-center justify-center rounded-3xl bg-slate-950/80 p-4">
                {product.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={product.image_url} alt={getProductName(product)} className="max-h-full object-contain" />
                ) : (
                  <span className="text-slate-600">No image</span>
                )}
              </div>
              <h3 className="mt-4 font-bold text-white">{getProductName(product)}</h3>
              <p className="mt-1 text-sm text-slate-400">{safeText(product.brand)}</p>
              <div className="mt-4">
                <ScoreRing value={product.global_score} label="Global" size="sm" />
              </div>
            </div>
          ))}
        </div>

        {scoreRows.map((row) => (
          <div
            key={row.key}
            className="grid border-b border-white/10 last:border-b-0"
            style={{ gridTemplateColumns: `220px repeat(${products.length}, minmax(180px, 1fr))` }}
          >
            <div className="p-5 font-semibold text-slate-300">{row.label}</div>
            {products.map((product) => (
              <div key={product.id} className="border-l border-white/10 p-5 font-bold text-white">
                {formatScore(product[row.key])}
              </div>
            ))}
          </div>
        ))}

        {specRows.map((row) => (
          <div
            key={row.label}
            className="grid border-b border-white/10 last:border-b-0"
            style={{ gridTemplateColumns: `220px repeat(${products.length}, minmax(180px, 1fr))` }}
          >
            <div className="p-5 font-semibold text-slate-300">{row.label}</div>
            {products.map((product) => (
              <div key={product.id} className="border-l border-white/10 p-5 text-sm leading-6 text-slate-300">
                {row.render(product)}
              </div>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}
