import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Use system TLS certificates (helps when proxy/antivirus causes "self-signed certificate" errors)
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;