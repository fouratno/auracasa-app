/** @type {import('next').NextConfig} */
const withNextIntl = require('next-intl/plugin')();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
];

const cacheHeaders = [
  { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
];

const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compression
  compress: true,

  // Production optimizations
  swcMinify: true,
  reactStrictMode: true,

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@sanity/client', '@sanity/image-url'],
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/images/:path*",
        headers: cacheHeaders,
      },
      {
        source: "/_next/static/:path*",
        headers: cacheHeaders,
      },
    ];
  },
};

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
