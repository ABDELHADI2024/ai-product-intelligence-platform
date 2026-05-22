import { BentoGrid } from "@/components/BentoGrid";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard, type Product } from "@/components/ProductCard";
import { SearchPanel } from "@/components/SearchPanel";
import { Badge, SectionHeader } from "@/components/ui";
import { ArrowRight, CheckCircle2, Cpu, LineChart, Sparkles } from "lucide-react";

const products: Product[] = [
  {
    brand: "Google",
    model: "Pixel 9 Pro",
    category: "Smartphone",
    score: 92,
    price: "$899",
    tag: "Best AI camera",
    specs: ["Tensor G4 AI chip", "Pro camera system", "All-day battery"],
    color: "bg-accent/80"
  },
  {
    brand: "Apple",
    model: "iPhone 16 Pro",
    category: "Smartphone",
    score: 91,
    price: "$999",
    tag: "Best ecosystem",
    specs: ["A18 Pro performance", "48MP camera", "Premium build"],
    color: "bg-accent-2/80"
  },
  {
    brand: "Samsung",
    model: "Galaxy S25 Ultra",
    category: "Smartphone",
    score: 94,
    price: "$1,099",
    tag: "Best power user",
    specs: ["Snapdragon flagship", "Ultra zoom camera", "Long battery"],
    color: "bg-violet-200"
  }
];

const process = [
  "Data ingestion",
  "Cleaning and normalization",
  "Scoring layer",
  "Semantic search",
  "AI recommendations",
  "Comparison UI"
];

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <SearchPanel />

      <section className="container-shell py-16">
        <SectionHeader
          eyebrow="Top picks for you"
          title="Premium product cards with controlled structure."
          description="Each card is isolated, reusable, responsive, and ready to connect to Supabase product data later."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.model} product={product} />
          ))}
        </div>
      </section>

      <BentoGrid />

      <section id="compare" className="container-shell py-20">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="mb-5 bg-accent/70">
              <LineChart size={14} className="mr-2" /> Comparison engine
            </Badge>
            <h2 className="text-4xl font-black tracking-[-0.05em] md:text-6xl">Compare by intent, not only specs.</h2>
            <p className="mt-5 text-base leading-8 text-muted">
              The UI is prepared for dynamic comparison: camera, value, performance, battery, release age, availability, and user-specific priorities.
            </p>
            <a href="#" className="mt-7 inline-flex items-center gap-2 text-sm font-black">
              Open comparison model <ArrowRight size={16} />
            </a>
          </div>

          <div className="glass-card rounded-[2.2rem] p-5">
            <div className="grid gap-3">
              {["Camera", "Battery", "Performance", "Price value", "AI features"].map((row, index) => (
                <div key={row} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-3xl bg-white p-4">
                  <div>
                    <p className="text-sm font-black">{row}</p>
                    <div className="mt-3 h-2 rounded-full bg-surface-2">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${92 - index * 7}%` }} />
                    </div>
                  </div>
                  <div className="rounded-2xl bg-surface-2 px-4 py-2 text-sm font-black">{92 - index * 7}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="rounded-[2.5rem] bg-accent p-6 text-primary md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                <Cpu size={25} />
              </div>
              <h2 className="mt-6 text-4xl font-black tracking-[-0.05em] md:text-6xl">The UI upgrade is modular by design.</h2>
              <p className="mt-5 text-base leading-8 opacity-75">
                We can now edit one part without breaking everything: Header, Footer, ProductCard, BentoGrid, SearchPanel, Hero, and the comparison block.
              </p>
            </div>
            <div className="grid gap-3">
              {process.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/65 p-4 text-sm font-black shadow-sm">
                  <CheckCircle2 size={19} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell py-12">
        <div className="glass-card rounded-[2.5rem] p-7 text-center md:p-12">
          <Sparkles className="mx-auto text-foreground" size={32} />
          <h2 className="mt-5 text-4xl font-black tracking-[-0.05em] md:text-6xl">Ready for Supabase data connection.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted">
            The current ZIP is a UI foundation. The next step is connecting the product cards and search panel to your existing Supabase product schema.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
