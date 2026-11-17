import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // Eski statik sitenin adresleri yeni sayfalara yönlensin.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/staj.html", destination: "/staj", permanent: true },
    ];
  },
};

export default nextConfig;
