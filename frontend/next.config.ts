import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: "/mnt/datos/Documentos/S04-26-Equipo-04-WebAppDevelopment/frontend",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
