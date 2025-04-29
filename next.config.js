const nextConfig = {
  output: 'standalone',
  experimental: {
    serverActions: {}, 
    appDir: true,
  },
  transpilePackages: [
    // Add any npm packages that need transpilation here
  ],
  async rewrites() {
    return [
      // Add any URL rewrites if needed
    ];
  }
};

module.exports = nextConfig;
