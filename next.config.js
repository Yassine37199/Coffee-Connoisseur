/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental : {
    newNextLinkBehavior : false
  },
  images: {
    domains: ['media-cdn.tripadvisor.com', 'themoviedb.org'],
  },
  
}
module.exports = nextConfig
