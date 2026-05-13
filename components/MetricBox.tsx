type MetricBoxProps = {
  label: string;
  value: string | number | null | undefined;
};

export default function MetricBox({ label, value }: MetricBoxProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-950">{value ?? 'Coming soon'}</p>
    </div>
  );
}
