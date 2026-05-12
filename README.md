# Witflag — AI Product Intelligence Platform

A clean Next.js starter for an AI-native consumer tech intelligence website.

## What is included

- Next.js App Router website
- Homepage
- Products page
- Product detail page
- Search page
- Compare page placeholder
- Supabase client
- Demo fallback product so Vercel never shows a blank/404 website
- Docs for deployment and Supabase setup

## Deploy to Vercel

1. Upload this project to GitHub.
2. In Vercel, import the GitHub repository.
3. Root Directory: leave empty or `./` because the Next.js app is at the root.
4. Add environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_public_key
```

5. Deploy.
6. Add your domain `witflag.com` and `www.witflag.com` in Vercel.

## Supabase

The website reads from the `products` table.

Main fields used:

- id
- brand
- model
- slug
- full_name
- product_type
- normalized_category
- image_url
- screen_size
- chipset
- battery_mah
- rear_camera
- global_score
- camera_score
- battery_score
- gaming_score
- value_score
- content_summary_en
- created_at

## Important security

Use only the Supabase anon public key in Vercel frontend environment variables.
Never use the Supabase service role key in a frontend project.
