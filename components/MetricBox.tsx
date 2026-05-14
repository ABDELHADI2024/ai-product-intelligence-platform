import type { LucideIcon } from 'lucide-react';

type MetricBoxProps = {
  icon?: LucideIcon;
  label: string;
  value: string | number | null | undefined;
  helper?: string | number | null;
};

export default function MetricBox({
  icon: Icon,
  label,
  value,
  helper,
}: MetricBoxProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/10">
      <div className="flex items-center gap-3">
        {Icon ? (
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300">
            <Icon className="h-5 w-5" />
          </div>
        ) : null}

        <div>
          <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <p className="mt-1 text-lg font-semibold text-white">
            {value ?? 'Coming soon'}
          </p>
        </div>
      </div>

      {helper ? (
        <p className="mt-4 text-sm leading-6 text-slate-400">{helper}</p>
      ) : null}
    </div>
  );
}
