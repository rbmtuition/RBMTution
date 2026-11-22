import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif"],
    qualities: [55, 75],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/about-us/",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/terms-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-conditions/",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-and-conditions",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/terms-and-conditions/",
        destination: "/terms",
        permanent: true,
      },
      {
        source: "/privacy-policy-2",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/privacy-policy-2/",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/library",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/library/",
        destination: "/services",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
