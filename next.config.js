/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}
  },
  output: 'standalone',
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true
  }
};

export default nextConfig;
