/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental : {
    newNextLinkBehavior : false
  },
  images: {
    domains: ['images.unsplash.com' , 'fastly.4sqi.net'],
  },
  
}
module.exports = nextConfig
