/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    disableStaticImages: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif|svg|webp)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[contenthash][ext]',
      },
    });
    return config;
  },
};

module.exports = nextConfig;
