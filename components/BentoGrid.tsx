import { ArrowRight, Bot, DatabaseZap, Gauge, Globe2, Layers3, Search, ShieldCheck } from "lucide-react";
import { Badge, SectionHeader } from "./ui";

const features = [
  {
    icon: Search,
    title: "Semantic product search",
    description: "Users can ask natural questions like best phone for camera under $700 and get structured product matches.",
    className: "lg:col-span-2"
  },
  {
    icon: Gauge,
    title: "AI scoring engine",
    description: "Normalize specs, benchmarks, prices, release age, and value into explainable scores.",
    className: ""
  },
  {
    icon: Bot,
    title: "Guided assistant",
    description: "A decision assistant that asks smart questions before recommending products.",
    className: ""
  },
  {
    icon: Layers3,
    title: "Dynamic comparison",
    description: "Compare models by user intent, not only by raw specifications.",
    className: "lg:col-span-2"
  }
];

export function BentoGrid() {
  return (
    <section id="ai-guide" className="container-shell py-20">
      <SectionHeader
        eyebrow="Platform Architecture"
        title="Every UI block maps to a real intelligence feature."
        description="This design system is not decoration. It is built around the product-intelligence workflow: search, scoring, comparison, recommendations, RAG, and SEO pages."
      />

      <div className="grid gap-5 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className={`glass-card rounded-[2rem] p-6 ${feature.className}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Icon size={22} />
              </div>
              <h3 className="mt-6 text-2xl font-black tracking-[-0.04em]">{feature.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-muted">{feature.description}</p>
              <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-black">
                Explore block <ArrowRight size={16} />
              </a>
            </article>
          );
        })}

        <article className="rounded-[2rem] bg-primary p-6 text-primary-foreground lg:col-span-3">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
              <Badge className="border-white/10 bg-white/10 text-white">Reusable vertical model</Badge>
              <h3 className="mt-5 text-3xl font-black tracking-[-0.04em] md:text-5xl">One design system, many future markets.</h3>
              <p className="mt-4 text-sm leading-7 text-white/64 md:text-base">
                The same controlled UI logic can later support cars, travel, real estate, laptops, software tools, hotels, local services, or financial products.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { icon: DatabaseZap, label: "Clean data" },
                { icon: ShieldCheck, label: "Trusted logic" },
                { icon: Globe2, label: "SEO scale" }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/8 p-5">
                    <Icon size={24} className="text-accent" />
                    <p className="mt-10 text-lg font-black">{item.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
