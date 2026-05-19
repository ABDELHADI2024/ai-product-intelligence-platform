# ScoreRing string/number fix

Replace `components/ScoreRing.tsx` with this file. It accepts `string | number | null`, so values from Supabase such as `global_score` will not break TypeScript.
