import { ArrowRight, BrainCircuit, Database, Search, Sparkles, WandSparkles } from "lucide-react";
import { Badge, Button, StatCard } from "./ui";

export function Hero() {
  return (
    <section className="container-shell grid min-h-[calc(100vh-80px)] gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
      <div>
        <Badge className="mb-5 bg-white/80">
          <Sparkles size={14} className="mr-2" /> AI-native product intelligence
        </Badge>
        <h1 className="max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.07em] md:text-7xl lg:text-8xl">
          Beautiful UI for smarter product decisions.
        </h1>
        <p className="mt-7 max-w-2xl text-lg leading-8 text-muted">
          A controlled Next.js interface for semantic search, AI recommendations, comparison cards, product scoring, and reusable vertical intelligence systems.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button>
            Start AI search <ArrowRight size={17} />
          </Button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white/70 px-5 py-3 text-sm font-bold text-foreground shadow-sm transition hover:bg-white">
            View design system
          </button>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <StatCard value="92" label="AI value score" icon={<BrainCircuit size={18} />} />
          <StatCard value="18k+" label="Product records" icon={<Database size={18} />} />
          <StatCard value="4x" label="Faster decisions" icon={<Search size={18} />} />
        </div>
      </div>

      <div className="glass-card soft-grid relative overflow-hidden rounded-[2.5rem] p-5 md:p-8">
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-accent/70 blur-2xl" />
        <div className="relative rounded-[2rem] bg-primary p-5 text-primary-foreground shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white/54">AI Assistant</p>
              <h2 className="text-2xl font-black tracking-[-0.04em]">Find my best phone</h2>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary">
              <WandSparkles size={22} />
            </div>
          </div>

          <div className="mt-7 rounded-3xl bg-white/10 p-4 text-sm leading-7 text-white/72">
            I need a phone for camera, battery, and travel. Budget under $900. I prefer compact design and strong daylight photos.
          </div>

          <div className="mt-5 grid gap-3">
            {["Prioritize camera score", "Filter weak battery", "Compare with current price"].map((item, index) => (
              <div key={item} className="flex items-center justify-between rounded-2xl bg-white p-4 text-primary">
                <span className="text-sm font-black">{item}</span>
                <span className="rounded-full bg-surface-2 px-3 py-1 text-xs font-black">0{index + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-5 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-white/78 p-5">
            <p className="text-sm font-bold text-muted">Recommended</p>
            <p className="mt-2 text-3xl font-black tracking-[-0.04em]">Pixel 9 Pro</p>
            <div className="mt-5 h-3 rounded-full bg-surface-2">
              <div className="h-3 w-[88%] rounded-full bg-primary" />
            </div>
            <p className="mt-3 text-sm font-bold text-muted">88% match to intent</p>
          </div>
          <div className="rounded-3xl bg-accent p-5 text-primary">
            <p className="text-sm font-bold opacity-70">Decision reason</p>
            <p className="mt-2 text-xl font-black tracking-[-0.04em]">Best camera-to-price balance with strong AI features.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
