import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type SEOTopicCardProps = {
  href: string;
  title: string;
  description: string;
  badge?: string;
};

export default function SEOTopicCard({
  href,
  title,
  description,
  badge = 'SEO guide',
}: SEOTopicCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-cyan-300/30"
    >
      <span className="inline-flex rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
        {badge}
      </span>
      <h2 className="mt-5 text-2xl font-black text-white">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
      <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300">
        Open guide
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
