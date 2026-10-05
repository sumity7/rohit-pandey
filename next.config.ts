import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      // The journey now lives on the about page
      { source: "/:lang(en|hi)/journey", destination: "/:lang/about#journey", permanent: true },
    ];
  },
};

export default nextConfig;
