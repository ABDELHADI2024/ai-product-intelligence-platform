import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#020617] px-5 py-20 text-white">
      <div className="mx-auto max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center shadow-2xl shadow-black/20">
        <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">
          404
        </p>

        <h1 className="mt-4 text-4xl font-black">Page not found</h1>

        <p className="mt-4 text-slate-400">
          This page does not exist yet, or the URL is incorrect.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-cyan-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-cyan-300"
        >
          Go home
        </Link>
      </div>
    </main>
  );
}
