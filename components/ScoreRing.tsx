import { formatScore, safeNumber } from '@/lib/products';

type ScoreRingProps = {
  score: string | number | null | undefined;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
};

export default function ScoreRing({ score, label = 'AI score', size = 'md' }: ScoreRingProps) {
  const value = safeNumber(score, 0);
  const degree = Math.min(360, Math.max(0, (value / 100) * 360));
  const dimensions = size === 'lg' ? 'h-32 w-32' : size === 'sm' ? 'h-20 w-20' : 'h-24 w-24';
  const text = size === 'lg' ? 'text-4xl' : size === 'sm' ? 'text-xl' : 'text-2xl';

  return (
    <div className={`relative ${dimensions} rounded-full p-[3px]`} style={{ background: `conic-gradient(rgb(34 211 238) ${degree}deg, rgba(255,255,255,0.12) 0deg)` }}>
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-slate-950 text-center shadow-inner shadow-black">
        <span className={`${text} font-black text-white`}>{formatScore(score)}</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-cyan-300">{label}</span>
      </div>
    </div>
  );
}
