type MetricBoxProps = {
  label: string;
  value: string | number | null | undefined;
  helper?: string | number | null;
};

export default function MetricBox({ label, value, helper }: MetricBoxProps) {
  return (
    <div className="metric-box">
      <p>{label}</p>
      <strong>{value ?? 'Coming soon'}</strong>
      {helper ? <span>{helper}</span> : null}
    </div>
  );
}
