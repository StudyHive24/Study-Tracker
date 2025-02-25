import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'cdn.pixabay.com'], // Allow Cloudinary images
  },
};

export default nextConfig;
