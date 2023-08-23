/* eslint-disable react/no-unknown-property */
import '../styles/globals.scss';
import '../styles/tailwind.css';

import { ReactElement, ReactNode, useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Barlow, Inter } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import ErrorBoundary from '@components/ErrorBoundary';
import { socket } from '@components/Home/service';
import AppLayout from '@layout/AppLayout';

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
  const timerRef = useRef<any>(null);

  useEffect(() => {
    socket.on('disconnect', () => {
      console.log('Socket disconnect at', dayjs().format('DD/MM/YYYY HH:mm:ss'));
      console.log('Status socket connect', socket.connected);
    });

    timerRef.current = setInterval(() => {
      console.log('Is socket connected', socket.connected, dayjs().format('HH:mm:ss'));
    }, 1000);

    return () => {
      socket.off('disconnect');
      clearInterval(timerRef.current);
    };
  }, []);

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
        <link rel='alternate' href='https://pinetree.vn/' hrefLang='vi' />
        <link rel='alternate' href='https://pinetree.vn/en' hrefLang='en' />
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
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </ErrorBoundary>
    </>
  );
}
// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
