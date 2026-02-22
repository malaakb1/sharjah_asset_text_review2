const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Allow Next/Image to optimize images served from the Railway backend origin.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sharjahassettextreview2-production.up.railway.app",
      },
    ],
  },

  async rewrites() {
    // IMPORTANT: must always be a valid absolute URL.
    // Set NEXT_PUBLIC_BACKEND_ORIGIN in Vercel environment variables for production.
    const backend =
      process.env.NEXT_PUBLIC_BACKEND_ORIGIN?.trim() || "http://localhost:8000";

    return [
      // Explicit rule for /api/v1/... (more specific, matched first)
      {
        source: "/api/v1/:path*",
        destination: `${backend}/api/v1/:path*`,
      },
      // General rule for /api/... (catches anything else under /api)
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);