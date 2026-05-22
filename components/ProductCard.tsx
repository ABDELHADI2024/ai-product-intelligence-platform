"use client";

import { motion } from "framer-motion";
import { BatteryCharging, Camera, Gauge, Heart, Star } from "lucide-react";
import { Badge, Button } from "./ui";

export type Product = {
  brand: string;
  model: string;
  category: string;
  score: number;
  price: string;
  tag: string;
  specs: string[];
  color: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="group overflow-hidden rounded-[2rem] border border-border bg-white shadow-sm transition hover:shadow-[0_28px_90px_rgba(17,18,15,0.12)]"
    >
      <div className="relative min-h-48 overflow-hidden bg-surface-2 p-5">
        <div className={`absolute -right-10 -top-10 h-44 w-44 rounded-full blur-2xl ${product.color}`} />
        <div className="relative z-10 flex items-start justify-between">
          <Badge>{product.category}</Badge>
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-foreground shadow-sm transition hover:scale-105" aria-label="Save product">
            <Heart size={17} />
          </button>
        </div>
        <div className="relative z-10 mt-10 flex justify-center">
          <div className="h-32 w-20 rounded-[1.4rem] border border-black/10 bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-950 p-2 shadow-2xl transition group-hover:rotate-3">
            <div className="h-full rounded-[1rem] border border-white/10 bg-gradient-to-br from-white/18 to-transparent" />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-muted">{product.brand}</p>
            <h3 className="mt-1 text-xl font-black tracking-[-0.04em]">{product.model}</h3>
          </div>
          <div className="rounded-2xl bg-primary px-3 py-2 text-center text-primary-foreground">
            <div className="flex items-center gap-1 text-xs font-bold text-accent"><Star size={13} fill="currentColor" /> AI</div>
            <div className="text-lg font-black">{product.score}</div>
          </div>
        </div>

        <div className="mt-4 grid gap-2 text-sm text-muted">
          {product.specs.map((spec, index) => {
            const Icon = index === 0 ? Gauge : index === 1 ? Camera : BatteryCharging;
            return (
              <div key={spec} className="flex items-center gap-2 rounded-2xl bg-surface-2 px-3 py-2">
                <Icon size={15} className="text-foreground" />
                <span>{spec}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">From</p>
            <p className="text-xl font-black">{product.price}</p>
          </div>
          <Button className="px-4 py-2.5">Compare</Button>
        </div>
      </div>
    </motion.article>
  );
}
