import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;

// module.exports = {
//   images: {
//     domains: ["cdn.sanity.io"], // Added Sanity image CDN
//   },
// };
