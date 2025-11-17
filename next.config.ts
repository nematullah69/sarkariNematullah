import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack configuration
  turbopack: {
    root: import.meta.dirname,
  },

  // Image domains allowed
  images: {
    domains: ["i.ibb.co", "ibb.co"], // Add more domains if needed
  },
};

export default nextConfig;
