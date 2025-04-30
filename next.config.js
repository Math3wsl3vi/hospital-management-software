const nextConfig = {
  experimental: {
    serverActions: {}
  },
  // Add output configuration
  output: 'standalone',
    output: 'standalone',
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;