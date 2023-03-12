/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REST_API: "http://localhost:5050"
  }
}

module.exports = nextConfig
