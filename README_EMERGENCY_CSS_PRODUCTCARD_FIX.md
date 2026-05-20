# Emergency CSS + ProductCard Fix

Fixes the Vercel build errors:

1. `app/globals.css` contained invalid CSS, likely literal `...` at line 168.
2. `components/ProductCard.tsx` contained CSS code starting with `@import`, but `.tsx` must contain React code.

Upload only:
- `app/globals.css`
- `components/ProductCard.tsx`

Commit message:
`Fix globals CSS and ProductCard build error`
