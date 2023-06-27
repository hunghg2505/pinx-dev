import { ReactElement, ReactNode, useEffect } from 'react';

import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import ErrorBoundary from '@components/ErrorBoundary';
import AppLayout from '@layout/AppLayout';
import { TOAST_LIMIT } from '@utils/constant';

import '../styles/tailwind.css';
import '../styles/globals.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import nextI18nConfig from '../next-i18next.config';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const InterFont = Inter({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { toasts } = useToasterStore();
  const getLayout = Component.getLayout ?? ((page: any) => page);

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) { toast.dismiss(t.id); } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);


  return (
    <>
      <Head>
        <meta name='robots' content='index, follow' />
        <meta name='googlebot' content={'index,follow'} />
        <meta charSet='utf-8' />
        <meta name='theme-color' content='#476055' />
        <meta name='title' content='Maby Client' />
        <meta name='description' content='Maby Client' />
        <link rel='shortcut icon' href='/static/favicon.ico' />

        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,maximum-scale=2,shrink-to-fit=no'
        />
      </Head>

      <ErrorBoundary>
        <Toaster />
        <AppLayout InterFont={InterFont}>{getLayout(<Component {...pageProps} />)}</AppLayout>
      </ErrorBoundary>
    </>
  );
}

export default appWithTranslation(MyApp, nextI18nConfig);
