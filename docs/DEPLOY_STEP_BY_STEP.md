# Deploy Step by Step

## 1. Upload to GitHub

Upload all files in this folder to your GitHub repository.

## 2. Import in Vercel

Go to Vercel → Add New Project → Import GitHub repo.

Use:

```txt
Root Directory: ./
Framework: Next.js
Build Command: npm run build
Output: default
```

## 3. Add Supabase variables

Vercel → Project → Settings → Environment Variables

Add:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Get them from Supabase → Project Settings → API.

Use anon public key only. Do not use service role key.

## 4. Deploy

Click Deploy.

Open:

```txt
https://your-project.vercel.app
```

You should see the Witflag homepage.

## 5. Connect domain

In Vercel → Project → Settings → Domains, add:

```txt
witflag.com
www.witflag.com
```

In LWS DNS Zone:

```txt
witflag.com.        A       76.76.21.21
www.witflag.com.    CNAME   cname.vercel-dns.com
```

Keep LWS nameservers. Do not change to Vercel nameservers.
