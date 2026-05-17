import { Product, formatPrice, formatScore, safeText } from '@/lib/products';

type CompareTableProps = {
  products: Product[];
};

const rows = [
  { label: 'Global Score', value: (p: Product) => formatScore(p.global_score) },
  { label: 'Camera', value: (p: Product) => formatScore(p.camera_score) },
  { label: 'Battery', value: (p: Product) => formatScore(p.battery_score) },
  { label: 'Display', value: (p: Product) => formatScore(p.display_score) },
  { label: 'Gaming', value: (p: Product) => formatScore(p.gaming_score) },
  { label: 'Value', value: (p: Product) => formatScore(p.value_score) },
  { label: 'Price', value: (p: Product) => formatPrice(p.price_eur) },
  { label: 'Screen', value: (p: Product) => safeText(p.screen_size, '—') },
  { label: 'Chipset', value: (p: Product) => safeText(p.chipset, '—') },
  { label: 'RAM', value: (p: Product) => safeText(p.ram, '—') },
  { label: 'Storage', value: (p: Product) => safeText(p.storage, '—') },
  { label: 'Battery', value: (p: Product) => p.battery_mah ? `${p.battery_mah}mAh` : '—' },
];

export default function CompareTable({ products }: CompareTableProps) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl shadow-black/20">
      <div className="grid" style={{ gridTemplateColumns: `190px repeat(${products.length}, minmax(150px, 1fr))` }}>
        <div className="border-b border-r border-white/10 bg-slate-950/70 p-4 text-sm uppercase tracking-[0.22em] text-slate-500">
          Compare
        </div>
        {products.map((product) => (
          <div key={product.id} className="border-b border-r border-white/10 bg-slate-950/50 p-4 text-center last:border-r-0">
            <div className="mx-auto flex h-24 items-center justify-center rounded-2xl bg-white/[0.04] p-2">
              {product.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={product.image_url} alt={safeText(product.full_name)} className="max-h-full object-contain" />
              ) : null}
            </div>
            <p className="mt-3 text-sm font-bold text-white">{safeText(product.model, 'Smartphone')}</p>
            <p className="text-xs text-cyan-300">{safeText(product.brand, '')}</p>
          </div>
        ))}
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <div className="border-b border-r border-white/10 bg-slate-950/40 p-4 text-sm font-semibold text-slate-300">
              {row.label}
            </div>
            {products.map((product) => (
              <div key={`${row.label}-${product.id}`} className="border-b border-r border-white/10 p-4 text-center text-sm text-white last:border-r-0">
                {row.value(product)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
