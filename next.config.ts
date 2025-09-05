import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      {
        source:
          "/:path((?!en|cs|ru|api|_next|favicon\\.ico|.*\\..+).*)/:subpath*",
        destination: "/en/:path/:subpath*",
        permanent: false,
      },
      {
        source: "/:path((?!en|cs|ru|api|_next|favicon\\.ico|.*\\..+).*)",
        destination: "/en/:path",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
