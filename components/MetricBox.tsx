import type { LucideIcon } from 'lucide-react';
import { safeText } from '@/lib/products';

type MetricBoxProps = {
  icon?: LucideIcon;
  label: string;
  value?: string | number | null;
  helper?: string | number | null;
};

export default function MetricBox({
  icon: Icon,
  label,
  value,
  helper,
}: MetricBoxProps) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/20">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">{label}</p>
      </div>

      <p className="mt-4 text-xl font-black text-white">
        {safeText(value, 'Coming soon')}
      </p>

      {helper ? (
        <p className="mt-2 text-sm leading-6 text-slate-400">
          {safeText(helper, '')}
        </p>
      ) : null}
    </div>
  );
}
