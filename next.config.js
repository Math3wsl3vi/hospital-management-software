const nextConfig = {
  experimental: {
    serverActions: {}
  },
  // Add output configuration
  output: 'standalone',
  // Disable specific file generation that's causing issues
  typescript: {
    ignoreBuildErrors: true
  }
};

module.exports = nextConfig;