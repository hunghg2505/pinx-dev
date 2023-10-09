/* eslint-disable react/no-unknown-property */
import { ReactElement, ReactNode } from 'react';
import '../styles/globals.scss';
import '../styles/tailwind.css';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Barlow, Inter } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import ErrorBoundary from '@components/ErrorBoundary';
import AppLayout from '@layout/AppLayout';

import nextI18nConfig from '../next-i18next.config';

import 'dayjs/locale/en';
import 'dayjs/locale/vi';

const AppInitialData = dynamic(() => import('@layout/AppLayout/AppInitialData'), {
  ssr: false,
});
const InitialSocket = dynamic(() => import('@layout/AppLayout/InitialSocket'), {
  ssr: false,
});
const InitialNotification = dynamic(() => import('@layout/AppLayout/InitialNotification'), {
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
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap',
});
const BarlowFont = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  display: 'swap',
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: any) => page);

  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='theme-color' content={'#FFFFFF'} />
        <meta name='title' content='pinex' />
        <meta name='description' content='pinex' />
        <link rel='shortcut icon' href='/static/favicon2.ico' />
        <link rel='alternate' href='https://pinex.vn/' hrefLang='vi' />
        <link rel='alternate' href='https://pinex.vn/en' hrefLang='en' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no'
        />
      </Head>

      <style jsx global>{`
        :root {
          --fontInter: ${InterFont.style.fontFamily};
          --fontBarlow: ${BarlowFont.style.fontFamily};
        }
      `}</style>

      <ErrorBoundary>
        <AppInitialData />
        <InitialSocket />
        <InitialNotification />
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </ErrorBoundary>
    </>
  );
}
// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
