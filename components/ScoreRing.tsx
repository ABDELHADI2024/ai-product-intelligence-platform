import { formatScore, safeNumber } from '@/lib/products';

type ScoreRingProps = {
  value: string | number | null | undefined;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({ value, label = 'AI Score', size = 'md' }: ScoreRingProps) {
  const score = safeNumber(value);
  const display = formatScore(value);
  const percentage = score === null ? 0 : Math.max(0, Math.min(100, score));
  const sizeClass = size === 'lg' ? 'h-28 w-28' : size === 'sm' ? 'h-16 w-16' : 'h-20 w-20';
  const textClass = size === 'lg' ? 'text-3xl' : size === 'sm' ? 'text-base' : 'text-2xl';

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClass} grid place-items-center rounded-full p-[3px] shadow-[0_0_35px_rgba(34,211,238,0.18)]`}
        style={{
          background: `conic-gradient(rgb(34 211 238) ${percentage * 3.6}deg, rgba(255,255,255,0.08) 0deg)`,
        }}
      >
        <div className="grid h-full w-full place-items-center rounded-full bg-slate-950">
          <span className={`${textClass} font-black text-white`}>{display}</span>
        </div>
      </div>
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
    </div>
  );
}
