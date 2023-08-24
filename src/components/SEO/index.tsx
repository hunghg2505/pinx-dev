import { FC } from 'react';

import Head from 'next/head';

import config from 'src/configs/seo_meta.json';

interface Props {
  title?: string;
  description?: string;
  robots?: string;
  siteUrl?: string;
  openGraph?: {
    type?: string;
    locale?: string;
    site_name?: string;
    url?: string;
    images: {
      url: string;
    };
  };
  twitterGraph?: {
    images: {
      url: string;
    };
  };
}

const SEO: FC<Props> = ({ title, siteUrl, description, openGraph, twitterGraph }) => {
  return (
    <Head>
      <title>{title || config.title}</title>
      <meta name='title' content={title || config.title} />
      <meta name='theme-color' content='#ffffff'></meta>
      <meta name='description' content={description || config.description} />
      <meta name='viewport' content='width=device-width, initial-scale=1, maximum-scale=1' />
      {openGraph?.locale && (
        <meta key='og:locale' property='og:locale' content={openGraph?.locale} />
      )}
      <meta
        name='robots'
        content='index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      ></meta>
      <meta property='og:type' content={openGraph?.type ?? config.openGraph.type} />
      <meta property='og:url' content={siteUrl || ''} />
      <meta property='og:title' content={title || config.title} />
      <meta property='og:description' content={description || config.description} />
      <meta
        property='og:image'
        content={
          openGraph?.images?.url || 'https://pinex-sit.agiletech.vn/static/logo/logo_seo.jpg'
        }
      />
      {/* <meta property='og:image:width' content='1200' /> */}
      {/* <meta property='og:image:height' content='630' /> */}
      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={siteUrl || ''} />
      <meta property='twitter:title' content={title || config.title} />
      <meta property='twitter:description' content={description || config.description} />
      <meta
        property='twitter:image'
        content={
          twitterGraph?.images?.url || 'https://pinex-sit.agiletech.vn/static/logo/logo_seo.jpg'
        }
      />
      <meta name='twitter:site' content='@pinex' />
      <meta name='twitter:creator' content='@pinex' />
      <link rel='canonical' href='https://pinetree.vn/%22%3E' />
    </Head>
  );
};

export default SEO;
