# Witflag UI Upgrade

A clean Next.js UI foundation for the AI Product Intelligence Platform.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- shadcn-style local components
- lucide-react icons
- Framer Motion for product-card hover animation

## Install

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main files

```txt
app/page.tsx
app/layout.tsx
app/globals.css
components/Header.tsx
components/Footer.tsx
components/Hero.tsx
components/SearchPanel.tsx
components/ProductCard.tsx
components/BentoGrid.tsx
components/ui.tsx
lib/utils.ts
```

## Next step

Connect `ProductCard` data to Supabase and replace the demo `products` array in `app/page.tsx` with real product records.
