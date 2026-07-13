import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
    cssChunking: 'strict'
  }
};

export default nextConfig;
