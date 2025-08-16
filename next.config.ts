/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      {
        source: "/:locale((?!en|cs|ru|api|_next|favicon.ico)[^/.]+)/:path*",
        destination: "/en/:path*",
        permanent: false,
      },
      {
        source: "/:locale((?!en|cs|ru|api|_next|favicon.ico)[^/.]+)",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
*/

/*
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
          "/:locale((?!en|cs|ru|api|_next|favicon\\.ico)[a-z]{2,3})/:path*",
        destination: "/en/:path*",
        permanent: false,
        has: [
          {
            type: "header",
            key: "accept",
            value: "(?!.*\\.(svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf)$).*",
          },
        ],
      },
      // Redirect neplatných locales bez cesty - ale jen pro skutečné jazykové kódy
      {
        source:
          "/:locale((?!en|cs|ru|api|_next|favicon\\.ico|.*\\..+)[a-z]{2,3})$",
        destination: "/en",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;*/

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // Root redirect
      {
        source: "/",
        destination: "/en",
        permanent: false,
      },
      // Redirect VŠEHO co není platný locale nebo systémový path
      // Nejdříve zachyť cesty s více segmenty: /neco/dalsi -> /en/neco/dalsi
      {
        source:
          "/:path((?!en|cs|ru|api|_next|favicon\\.ico|.*\\..+).*)/:subpath*",
        destination: "/en/:path/:subpath*",
        permanent: false,
      },
      // Pak zachyť jednotlivé cesty: /neco -> /en/neco
      {
        source: "/:path((?!en|cs|ru|api|_next|favicon\\.ico|.*\\..+).*)",
        destination: "/en/:path",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
