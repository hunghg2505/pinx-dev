/* eslint-disable react/no-unknown-property */
import '../styles/globals.scss';
import '../styles/tailwind.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ReactElement, ReactNode, useEffect } from 'react';

import { useAtomValue } from 'jotai';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { Barlow, Inter } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';

import 'dayjs/locale/vi';
import 'dayjs/locale/en';
import ErrorBoundary from '@components/ErrorBoundary';
import { requestJoinChannel, requestJoinIndex, socket } from '@components/Home/service';
import AppLayout from '@layout/AppLayout';
import { stockSocketAtom } from '@store/stockStocket';

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
  const stockSocket = useAtomValue(stockSocketAtom);

  useEffect(() => {
    socket.on('connect', () => {
      const listStockCodes = [];
      for (const item of stockSocket) {
        listStockCodes.push(...item.stocks);
      }
      const uniqueStockCodes: string[] = [];
      for (const code of listStockCodes) {
        if (!uniqueStockCodes.includes(code)) {
          uniqueStockCodes.push(code);
        }
      }
      if (uniqueStockCodes.length > 0) {
        requestJoinChannel(uniqueStockCodes.toString());
      }

      // join index
      requestJoinIndex();
    });

    return () => {
      socket.off('connect');
    };
  }, [stockSocket]);

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
        <AppLayout>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </ErrorBoundary>
    </>
  );
}
// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
