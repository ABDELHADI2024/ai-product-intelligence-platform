import { safeText } from '@/lib/products';

type MetricBoxProps = {
  label: string;
  value?: string | number | null;
  helper?: string | number | null;
};

export default function MetricBox({ label, value, helper }: MetricBoxProps) {
  return (
    <div className="metric-box">
      <p>{label}</p>
      <strong>{safeText(value, 'N/A')}</strong>
      {helper != null && <span>{safeText(helper, '')}</span>}
    </div>
  );
}
