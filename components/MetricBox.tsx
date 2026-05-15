import type { LucideIcon } from 'lucide-react';
import { safeText } from '@/lib/products';

type MetricBoxProps = {
  icon?: LucideIcon;
  label: string;
  value: string | number | null | undefined;
  helper?: string | number | null;
};

export default function MetricBox({ icon: Icon, label, value, helper }: MetricBoxProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-2xl shadow-black/10 backdrop-blur">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 ring-1 ring-cyan-300/15">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{safeText(value)}</p>
        </div>
      </div>
      {helper ? <p className="mt-4 text-sm leading-6 text-slate-400">{helper}</p> : null}
    </div>
  );
}
