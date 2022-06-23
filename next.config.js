/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
    webpack5: false,
  },
};

module.exports = nextConfig;
