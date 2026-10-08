import type { NextConfig } from "next";

// Baseline security headers. Scoped to the Charge event route so other teams'
// pages (e.g. the homepage, which embeds a Tally iframe) are unaffected.
const chargeSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

// The admin dashboard calls /api/v1 from the browser. Proxying it to the backend keeps
// the API on the same origin, so the backend's httpOnly session cookie works without CORS.
const API_BASE_URL = (process.env.API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/events/square1_charge", headers: chargeSecurityHeaders },
      { source: "/events/square1_charge/:path*", headers: chargeSecurityHeaders },
    ];
  },
  async rewrites() {
    return [{ source: "/api/v1/:path*", destination: `${API_BASE_URL}/api/v1/:path*` }];
  },
};

export default nextConfig;
