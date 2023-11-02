const { i18n } = require('./next-i18next.config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const compiler =
  process.env.NODE_ENV === 'development'
    ? {}
    : {
        removeConsole: {
          exclude: ['error'],
        },
      };

/** @type {import('next').NextConfig} */
const nextConfig = {
  // i18n
  i18n,
  swcMinify: true,
  output: 'standalone',
  compress: true,
  // React Strict Mode is off
  reactStrictMode: false,
  // Back scroll postion
  experimental: {
    scrollRestoration: true,
    optimizePackageImports: [
      'next-i18next',
      'react-easy-crop',
      'react-hot-toast',
      'tippy.js',
      'react-cropper',
      'react-beautiful-dnd',
      'react-intersection-observer',
      'react-lazy-load-image-component',
      'react-player',
      'ahooks',
    ],
  },
  compiler,
  // config env
  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    APP_API_URL: process.env.NEXT_PUBLIC_APP_API_URL,
    URL_API_COMMUNITY: process.env.URL_API_COMMUNITY,
    URL_SOCKET: process.env.URL_SOCKET,
    URL_API_PIST: process.env.URL_API_PIST,
    URL_API_MARKET: process.env.URL_API_MARKET,
    URL_IP_API_COMMUNITY: process.env.URL_IP_API_COMMUNITY,
    URL_IP_API_PIST: process.env.URL_IP_API_PIST,
    URL_IP_API_MARKET: process.env.URL_IP_API_MARKET,
    RECAPTHCHA_SITE_KEY: process.env.RECAPTHCHA_SITE_KEY,
    URL_UPLOADPHOTO: process.env.URL_UPLOADPHOTO,
    URL_API_NOTIFICATION: process.env.URL_API_NOTIFICATION,
    MIXPANEL_PROJECT_TOKEN: process.env.MIXPANEL_PROJECT_TOKEN,
    FIREBASE_VAPIDKEY: process.env.FIREBASE_VAPIDKEY,
    GOOGLE_TAG_MANAGER_ID: process.env.GOOGLE_TAG_MANAGER_ID,
  },
  images: {
    minimumCacheTTL: 60,
    // domains: [
    //   'static.pinetree.com.vn',
    //   'cdn.pixabay.com',
    //   'pinetree.vn',
    //   'image.vietstock.vn',
    //   'cafefcdn.com',
    //   'photo-cms-tinnhanhchungkhoan.epicdn.me',
    //   'i.pinimg.com',
    //   'pinex.vn',
    //   'i2-vnexpress.vnecdn.net',
    //   'i.ytimg.com',
    //   'icdn.dantri.com.vn',
    //   'pinex-sit.agiletech.vn',
    // ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/webp'],
  },
  headers: async function headers() {
    if (process.env.NODE_ENV === 'development') return [];
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|otf|ttf|woff|woff2|css)',
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
};

module.exports = withBundleAnalyzer(nextConfig);
