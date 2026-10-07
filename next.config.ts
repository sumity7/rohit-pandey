import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" }],
  },
  experimental: {
    globalNotFound: true,
  },
  async redirects() {
    return [
      { source: "/", destination: "/en", permanent: false },
      // Public Life and Updates are one page now
      { source: "/:lang(en|hi)/updates", destination: "/:lang/public-life", permanent: true },
      // The journey now lives on the about page
      { source: "/:lang(en|hi)/journey", destination: "/:lang/about#journey", permanent: true },
      // The Akhilesh Yadav update no longer refers to joining the party
      {
        source: "/:lang(en|hi)/updates/joins-samajwadi-party",
        destination: "/:lang/updates/with-akhilesh-yadav",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
