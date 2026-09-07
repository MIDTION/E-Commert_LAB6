import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow Ngrok and Localtunnel hosts in dev mode
  devIndicators: {
    buildActivity: true,
  },
  // To allow any host, or specifically ngrok and loca.lt
  // Next 15+ allows array of strings. We can't use wildcard easily if it's strict, but we can try.
  // Actually, we can use `experimental` if it fails, but the warning said top level.
};

// Next.js 15+ Host header validation
// It recommends setting it at the root of the config object.
nextConfig.allowedDevOrigins = [
  'warm-months-repeat.loca.lt',
  'localhost:3000',
  'localhost:8081',
  'sniff-remnant-dubiously.ngrok-free.dev',
  'lucky-papayas-unite.loca.lt',
];

export default nextConfig;
