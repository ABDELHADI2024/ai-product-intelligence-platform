# Server Component Event Handler Fix

This replaces Header, Footer, and app/not-found with server-safe versions.

It removes onMouseEnter/onMouseLeave handlers from Server Components, which caused the Next.js prerender error on /_not-found.

Upload:
- components/Header.tsx
- components/Footer.tsx
- app/not-found.tsx
