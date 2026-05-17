# Witflag Comparison Engine V1

This package adds a real no-cost comparison engine to Witflag.

## Files included

- `app/compare/page.tsx`
- `components/CompareTable.tsx`
- `components/ComparisonProductPicker.tsx`
- `lib/products.ts`

## What it adds

- Compare 2-4 smartphones
- Winner cards
- Score comparison
- Specs comparison
- Final verdict
- Safe handling of string/number/null Supabase values

## No changes

- No database migration
- No OpenAI API
- No Claude API
- No service role key
- No new paid dependency

## Test

After upload and Vercel deployment:

- `/compare`
- `/compare?phones=huawei-nova-15-max,xiaomi-17t-pro-5g,oneplus-nord-ce6-5g`
