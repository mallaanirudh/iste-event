import type { NextConfig } from "next";

// The Fastify backend (backend/index.ts) listens on port 3000 and sets an httpOnly
// session cookie. Proxying /api/v1 through Next keeps the frontend and API on one
// origin, so the cookie works without CORS.
const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_URL}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
