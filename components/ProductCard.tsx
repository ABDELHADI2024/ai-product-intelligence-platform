import Link from 'next/link';
import { ArrowUpRight, BatteryCharging, Camera, Cpu, MonitorSmartphone, Sparkles } from 'lucide-react';
import ScoreRing from '@/components/ScoreRing';
import { Product, formatPrice, getBestUseCase, safeText } from '@/lib/products';

type ProductCardProps = { product: Product };

export default function ProductCard({ product }: ProductCardProps) {
  const href = `/products/${product.slug}`;
  const useCase = getBestUseCase(product);

  return (
    <article className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-4 shadow-2xl shadow-black/20 backdrop-blur-xl transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-white/[0.07]">
      <div className="absolute -right-20 -top-20 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl transition group-hover:bg-cyan-300/20" />
      <div className="relative flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-cyan-300">{safeText(product.brand, 'Smartphone')}</p>
          <h3 className="mt-1 line-clamp-2 text-xl font-bold text-white">{safeText(product.full_name || product.model)}</h3>
        </div>
        <ScoreRing score={product.global_score} size="sm" label="score" />
      </div>

      <Link href={href} className="relative mt-5 flex h-56 items-center justify-center rounded-[1.6rem] bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/40 p-5 ring-1 ring-white/10">
        {product.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image_url} alt={safeText(product.full_name, 'Product')} className="max-h-full object-contain drop-shadow-2xl transition duration-300 group-hover:scale-105" />
        ) : (
          <MonitorSmartphone className="h-20 w-20 text-slate-700" />
        )}
      </Link>

      <div className="relative mt-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Estimated price</p>
          <p className="text-2xl font-black text-white">{formatPrice(product.price_eur)}</p>
        </div>
        <div className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
          Best for {useCase}
        </div>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-3 text-sm">
        <Spec icon={BatteryCharging} label="Battery" value={product.battery_mah ? `${product.battery_mah} mAh` : null} />
        <Spec icon={Camera} label="Camera" value={product.rear_camera} />
        <Spec icon={Cpu} label="Chipset" value={product.chipset} />
        <Spec icon={MonitorSmartphone} label="Display" value={product.screen_size} />
      </div>

      <Link href={href} className="relative mt-5 flex items-center justify-center gap-2 rounded-2xl bg-cyan-300 px-4 py-3 font-bold text-slate-950 transition hover:bg-white">
        View intelligence <ArrowUpRight className="h-4 w-4" />
      </Link>

      <div className="relative mt-4 flex items-center gap-2 text-xs text-slate-500">
        <Sparkles className="h-4 w-4 text-cyan-300" /> AI-ready smartphone profile
      </div>
    </article>
  );
}

type SpecProps = {
  icon: typeof BatteryCharging;
  label: string;
  value: string | number | null | undefined;
};

function Spec({ icon: Icon, label, value }: SpecProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-3">
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        <Icon className="h-4 w-4 text-cyan-300" /> {label}
      </div>
      <p className="line-clamp-1 font-semibold text-slate-100">{safeText(value)}</p>
    </div>
  );
}
