# HomeHero TypeScript Fix

Vercel now compiles the UI successfully, but TypeScript fails in `components/HomeHero.tsx` because `featured` is optional.

## Replace this line

```ts
const featuredName = getProductName(featured)
```

## With this safe fallback block

```ts
const heroProduct = featured ?? products[0] ?? null
const featuredName = heroProduct ? getProductName(heroProduct) : 'AI product intelligence'
```

## Also replace this line if it exists

```ts
const featuredScore = safeNumber(featured?.global_score)
```

## With

```ts
const featuredScore = safeNumber(heroProduct?.global_score)
```

This keeps the UI safe when Supabase returns no featured product.
