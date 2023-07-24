/* eslint-disable react/no-unknown-property */
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import '../styles/globals.scss';
import '../styles/tailwind.css';

import { ReactElement, ReactNode } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import ErrorBoundary from '@components/ErrorBoundary';
import AppLayout from '@layout/AppLayout';
import { ENV } from '@utils/env';

import nextI18nConfig from '../next-i18next.config';

const AppInitialData = dynamic(() => import('@layout/AppLayout/AppInitialData'), {
  ssr: false,
});

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const InterFont = Inter({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content={'index,follow'} />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#FFFFFF' />
        <meta name='title' content='pinex' />
        <meta name='description' content='pinex' />
        <link rel='shortcut icon' href='/static/favicon.svg' />

        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no'
        />
      </Head>

      <style jsx global>{`
        :root {
          --fontInter: ${InterFont.style.fontFamily};
        }
      `}</style>

      <GoogleReCaptchaProvider reCaptchaKey={ENV.RECAPTHCHA_SITE_KEY}>
        <ErrorBoundary>
          <>
            <AppInitialData />
            <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
          </>
        </ErrorBoundary>
      </GoogleReCaptchaProvider>
    </>
  );
}
// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
