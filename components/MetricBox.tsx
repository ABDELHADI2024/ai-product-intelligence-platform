export default function MetricBox({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-white">{value || 'Coming soon'}</p>
    </div>
  );
}
