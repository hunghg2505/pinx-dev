const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n
  i18n,
  swcMinify: true,

  // config env
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
    URL_API_COMMUNITY: process.env.URL_API_COMMUNITY,
    URL_SOCKET: process.env.URL_SOCKET,
    URL_API_PIST: process.env.URL_API_PIST,
    RECAPTHCHA_SITE_KEY: process.env.RECAPTHCHA_SITE_KEY,
  },
  images: {
    minimumCacheTTL: 60,
    domains: ['static.pinetree.com.vn', 'cdn.pixabay.com', 'pinetree.vn', 'image.vietstock.vn'],
  },
  httpAgentOptions: {
    keepAlive: false,
  },
  headers: async function headers() {
    if (process.env.NODE_ENV === 'development') return [];
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|otf|ttf)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=9999999999, must-revalidate',
          },
        ],
      },
    ];
  },
  output: 'standalone',
};

module.exports = withBundleAnalyzer(nextConfig);
