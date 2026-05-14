type MetricBoxProps = {
  label: string;
  value: string | number | null | undefined;
};

export default function MetricBox({ label, value }: MetricBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">
        {value ?? 'Coming soon'}
      </p>
    </div>
  );
}
