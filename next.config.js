/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'fdn2.gsmarena.com' },
      { protocol: 'https', hostname: 'fdn.gsmarena.com' },
      { protocol: 'https', hostname: '**.supabase.co' }
    ]
  }
};

module.exports = nextConfig;
