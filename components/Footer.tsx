import { Cpu } from "lucide-react";

const columns = [
  { title: "Platform", links: ["Semantic Search", "AI Recommendations", "Product Compare", "RAG Assistant"] },
  { title: "Categories", links: ["Smartphones", "Laptops", "Wearables", "AI Devices"] },
  { title: "Company", links: ["About", "Roadmap", "Contact", "Privacy"] }
];

const socialLinks = ["X", "GH", "IN"];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-primary">
                <Cpu size={21} />
              </div>
              <div>
                <div className="text-xl font-black tracking-[-0.04em]">Witflag</div>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">AI Product Intel</div>
              </div>
            </div>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/64">
              A reusable AI-native vertical intelligence platform for product search, comparison, recommendations, and SEO-scale content automation.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((label) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-xs font-black text-white/72 transition hover:bg-white/16 hover:text-white"
                  aria-label={`${label} social link`}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-sm font-black uppercase tracking-[0.18em] text-white/72">{column.title}</h3>
                <div className="mt-4 grid gap-3">
                  {column.links.map((link) => (
                    <a key={link} href="#" className="text-sm text-white/58 transition hover:text-white">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-7 text-sm text-white/46 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Witflag. Built for intelligent product decisions.</p>
          <p>Next.js · Tailwind CSS · shadcn-style components</p>
        </div>
      </div>
    </footer>
  );
}
