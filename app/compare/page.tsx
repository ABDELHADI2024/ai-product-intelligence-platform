import { GitCompare } from 'lucide-react';

export default function ComparePage() {
  return (
    <main className="mx-auto max-w-7xl px-5 py-16">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 card-glow">
        <GitCompare className="h-10 w-10 text-cyan-300" />
        <h1 className="mt-5 text-4xl font-bold text-white">Dynamic comparison engine</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          This page is ready for the next step: selecting two products from Supabase and comparing display, performance, camera, battery, price, scores, and AI recommendation verdicts.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl bg-slate-900 p-5"><h3 className="font-semibold">Spec comparison</h3><p className="mt-2 text-sm text-slate-400">Display, chipset, RAM, storage, camera, battery.</p></div>
          <div className="rounded-2xl bg-slate-900 p-5"><h3 className="font-semibold">Score comparison</h3><p className="mt-2 text-sm text-slate-400">Gaming, battery, camera, display, value, global score.</p></div>
          <div className="rounded-2xl bg-slate-900 p-5"><h3 className="font-semibold">AI verdict</h3><p className="mt-2 text-sm text-slate-400">Best for students, creators, gaming, photos, and value.</p></div>
        </div>
      </div>
    </main>
  );
}
