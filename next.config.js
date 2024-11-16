
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['github.com'],  // 外部画像用
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
}

module.exports = nextConfig