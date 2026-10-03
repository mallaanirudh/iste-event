import type { NextConfig } from "next";

// Baseline security headers. Scoped to the Charge event route so other teams'
// pages (e.g. the homepage, which embeds a Tally iframe) are unaffected.
const chargeSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      { source: "/events/square1_charge", headers: chargeSecurityHeaders },
      { source: "/events/square1_charge/:path*", headers: chargeSecurityHeaders },
    ];
  },
};

export default nextConfig;
