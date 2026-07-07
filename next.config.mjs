/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/ecosystem", destination: "/platform", permanent: true }];
  },
  compress: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**.cdninstagram.com" }],
  },
};
export default nextConfig;
