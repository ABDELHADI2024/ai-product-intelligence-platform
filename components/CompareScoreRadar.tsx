import { getProductName, Product, safeNumber } from '@/lib/products';

type CompareScoreRadarProps = {
  products: Product[];
};

const signals: {
  key: keyof Product;
  label: string;
  short: string;
}[] = [
  { key: 'camera_score', label: 'Camera', short: 'CAM' },
  { key: 'battery_score', label: 'Battery', short: 'BAT' },
  { key: 'display_score', label: 'Display', short: 'DSP' },
  { key: 'gaming_score', label: 'Gaming', short: 'GMG' },
  { key: 'value_score', label: 'Value', short: 'VAL' },
  { key: 'global_score', label: 'Global AI', short: 'AI' },
];

function score(product: Product, key: keyof Product) {
  return safeNumber(product[key]) || 0;
}

function color(index: number) {
  const colors = [
    'bg-cyan-300',
    'bg-violet-300',
    'bg-emerald-300',
    'bg-amber-300',
  ];
  return colors[index % colors.length];
}

export default function CompareScoreRadar({ products }: CompareScoreRadarProps) {
  const selected = products.slice(0, 4);

  if (!selected.length) {
    return null;
  }

  return (
    <section className="rounded-[2.5rem] border border-white/10 bg-[#09090B]/80 p-6 shadow-2xl shadow-black/30">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">
            AI performance overlap
          </p>
          <h2 className="mt-2 text-3xl font-black text-white">
            Score radar, without extra dependencies.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
            A radar-inspired comparison built from real Witflag score columns:
            camera, battery, display, gaming, value, and global score.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {selected.map((product, index) => (
            <span
              key={product.id}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-semibold text-slate-300"
            >
              <span className={`h-2.5 w-2.5 rounded-full ${color(index)}`} />
              {getProductName(product)}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {signals.map((signal) => {
          const rowWinner = [...selected].sort(
            (a, b) => score(b, signal.key) - score(a, signal.key)
          )[0];

          return (
            <div
              key={signal.label}
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-4"
            >
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-white">{signal.label}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    {signal.short}
                  </p>
                </div>

                <p className="text-xs text-slate-500">
                  Winner:{' '}
                  <span className="font-semibold text-cyan-200">
                    {rowWinner ? getProductName(rowWinner) : '—'}
                  </span>
                </p>
              </div>

              <div className="grid gap-3">
                {selected.map((product, index) => {
                  const value = score(product, signal.key);
                  const isWinner = rowWinner?.id === product.id;

                  return (
                    <div key={product.id}>
                      <div className="mb-1 flex items-center justify-between gap-3 text-xs">
                        <span className="line-clamp-1 text-slate-300">
                          {getProductName(product)}
                        </span>
                        <span
                          className={
                            isWinner
                              ? 'font-black text-cyan-200'
                              : 'font-semibold text-slate-400'
                          }
                        >
                          {Math.round(value)}/100
                        </span>
                      </div>

                      <div className="h-3 overflow-hidden rounded-full bg-white/[0.07]">
                        <div
                          className={`h-full rounded-full ${color(index)}`}
                          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
