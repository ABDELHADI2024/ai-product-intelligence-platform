import Link from 'next/link';
import { BatteryCharging, Cpu, MonitorSmartphone, Sparkles } from 'lucide-react';
import { Product, formatPrice, formatScore, safeText } from '@/lib/products';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const href = product.slug ? `/products/${product.slug}` : '/products';

  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] shadow-2xl shadow-black/20 backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]"
    >
      <div className="relative h-60 overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/30">
        <div className="absolute left-4 top-4 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          Smartphone
        </div>
        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-bold text-violet-200">
          <Sparkles className="h-3.5 w-3.5" /> {formatScore(product.global_score)}
        </div>
        <div className="flex h-full items-center justify-center p-8">
          {product.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image_url}
              alt={product.full_name || 'Smartphone'}
              className="max-h-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)] transition duration-500 group-hover:scale-105"
            />
          ) : (
            <MonitorSmartphone className="h-20 w-20 text-slate-700" />
          )}
        </div>
      </div>

      <div className="p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{safeText(product.brand, 'Brand')}</p>
        <h3 className="mt-2 text-2xl font-black tracking-tight text-white">{safeText(product.full_name || product.model, 'Unnamed product')}</h3>
        <p className="mt-2 text-lg font-bold text-cyan-100">{formatPrice(product.price_eur)}</p>

        <div className="mt-5 grid gap-3 text-sm text-slate-300">
          <div className="flex items-center gap-2"><MonitorSmartphone className="h-4 w-4 text-cyan-300" /> {safeText(product.screen_size, 'Display coming soon')}</div>
          <div className="flex items-center gap-2"><Cpu className="h-4 w-4 text-violet-300" /> {safeText(product.chipset, 'Chipset coming soon')}</div>
          <div className="flex items-center gap-2"><BatteryCharging className="h-4 w-4 text-emerald-300" /> {product.battery_mah ? `${product.battery_mah}mAh` : 'Battery coming soon'}</div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">AI verdict</p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-300">
            {product.expert_opinion_en || 'AI product intelligence is ready to enrich this smartphone with scores, recommendations, and comparison insights.'}
          </p>
        </div>
      </div>
    </Link>
  );
}
