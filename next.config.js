/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'zenix.dexignzone.com',
      'www.eluniversal.com.mx'
    ]
  }
}

module.exports = nextConfig
