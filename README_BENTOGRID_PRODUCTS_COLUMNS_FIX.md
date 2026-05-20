# BentoGrid Products + Columns Fix

This fixes the Vercel TypeScript error where `app/page.tsx` passes `products={topProducts}` to BentoGrid.

The new BentoGrid supports both:

```tsx
<BentoGrid products={topProducts} />
```

and:

```tsx
<BentoGrid columns={3}>...</BentoGrid>
```

Upload only:
- `components/BentoGrid.tsx`

Commit message:
`Fix BentoGrid products and columns props`
