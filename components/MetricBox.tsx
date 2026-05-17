import type { LucideIcon } from 'lucide-react';

type MetricBoxProps = {
  icon?: LucideIcon;
  label: string;
  value: string | number | null | undefined;
  helper?: string | number | null;
};

export default function MetricBox({ icon: Icon, label, value, helper }: MetricBoxProps) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10 transition hover:border-cyan-300/30 hover:bg-white/[0.07]">
      <div className="flex items-start gap-3">
        {Icon ? (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/10 text-cyan-300 ring-1 ring-cyan-300/20">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}
        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
          <p className="mt-2 text-base font-bold text-white">{value ?? 'Coming soon'}</p>
          {helper ? <p className="mt-2 text-sm leading-6 text-slate-400">{helper}</p> : null}
        </div>
      </div>
    </div>
  );
}
