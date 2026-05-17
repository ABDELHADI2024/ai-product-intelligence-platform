# Witflag Claude UI Clean Safe Package

This package is based on the visual direction from Claude's ZIP, but it is corrected for the current Witflag project.

## Why this is safer than Claude's original ZIP

- Uses your current Supabase `products` table.
- Uses `price_eur`, not `price_from`.
- Uses `gaming_score`, not `performance_score`.
- Uses `ram` and `storage`, not `ram_storage`.
- Keeps smartphone-first focus.
- Adds `/assistant`.
- Uses `app/globals.css`, not `styles/globals.css`.
- Avoids risky required environment variables by keeping demo fallback.
- Uses Next.js dynamic params/searchParams compatible with newer Next versions.
- No paid OpenAI/Claude API.
- No schema replacement.
- No admin panel.
