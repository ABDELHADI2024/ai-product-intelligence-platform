# Witflag Stable Type Compatibility V1

This package fixes the repeated Vercel TypeScript errors caused by Supabase numeric fields being typed as:

`string | number | null`

while UI components expected only:

`number | null`

## Files included

- `components/ScoreRing.tsx`
- `components/ProductCard.tsx`
- `components/MetricBox.tsx`
- `components/SEOProductRow.tsx`
- `components/RecommendationCard.tsx`
- `components/SearchResultCard.tsx`

## Important

This package does not touch:

- `lib/products.ts`
- Supabase connection
- database schema
- Vercel environment variables

## Upload

Upload the `components/` folder to the GitHub repo root.

Commit message:

`Apply stable type compatibility v1`
