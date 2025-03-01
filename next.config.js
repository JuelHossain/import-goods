/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // For GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '/import-goods' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/import-goods/' : '',
};

module.exports = nextConfig;
