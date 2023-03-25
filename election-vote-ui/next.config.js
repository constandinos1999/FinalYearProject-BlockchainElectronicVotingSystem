/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REST_API: "http://localhost:3001",
    IPFS_TOKEN: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlGRDRhNGQ1MTVGNkVmMzA0Yzg1NmUwM2ZlNDdDMjc5QjE4ODM2RGQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzY0NzA0NTU0NzQsIm5hbWUiOiJiaWRpZnkifQ.dktDvBYF65I5ujHwfvO5-c8dOCJjA-kQMMyjotSjlHs",
    // HTTP_RPC: "https://avalanche-fuji.infura.io/v3/9278c04944064d5a8f9ad13e549e550c",
    HTTP_RPC: "https://data-seed-prebsc-1-s1.binance.org:8545/",
    BIT_API_KEY: "BQYtZ8iGYH5RsnLCf4yAr0egHd1pjk1N"
  },
  async redirects() {
    return [
      {
        source: "/admin",
        destination: "/admin/elections",
        permanent: true
      },
      {
        source: "/voter",
        destination: "/voter/elections",
        permanent: true
      }
    ]
  }
}

module.exports = nextConfig
