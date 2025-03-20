/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: false, // Disable this for now
  },
  output: 'standalone', // Ensures all necessary files are bundled
};

module.exports = nextConfig;
