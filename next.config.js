/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dkbzczkwhyboywsayupo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/product-images/**',
      },
      {
        protocol: 'https',
        hostname: 'dkbzczkwhyboywsayupo.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/category-images/**',
      },
    ],
  },
};

module.exports = nextConfig;