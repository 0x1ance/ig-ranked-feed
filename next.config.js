/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "scontent-hkg4-2.cdninstagram.com",
      "scontent-hkg4-1.cdninstagram.com",
    ],
  },
  serverRuntimeConfig: {
    REDIS_URL: "",
  },
  publicRuntimeConfig: {},
};

module.exports = nextConfig;
