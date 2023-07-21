import { ReactElement, ReactNode, useEffect } from 'react';

import { useMount } from 'ahooks';
import { useAtom } from 'jotai';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { appWithTranslation, i18n } from 'next-i18next';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';

import ErrorBoundary from '@components/ErrorBoundary';
import AppLayout from '@layout/AppLayout';
import { useAuth } from '@store/auth/useAuth';
import { openProfileAtom } from '@store/profile/profile';
import { useProfileInitial } from '@store/profile/useProfileInitial';
// eslint-disable-next-line import/order
import { TOAST_LIMIT } from '@utils/constant';
import '../styles/tailwind.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../styles/globals.scss';
import { ENV } from '@utils/env';

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
  const { run } = useProfileInitial();
  const { isLogin } = useAuth();
  const router = useRouter();
  const [, setProfileOpen] = useAtom(openProfileAtom);

  useMount(() => {
    i18n?.changeLanguage(localStorage.getItem('locale')?.replaceAll('"', '') || 'en');
    if (isLogin) {
      run();
    }
    setProfileOpen(false);
  });

  const getLayout = Component.getLayout ?? ((page: any) => page);

  useEffect(() => {
    for (const t of toasts
      .filter((t) => t.visible) // Only consider visible toasts
      .filter((_, i) => i >= TOAST_LIMIT)) {
      toast.dismiss(t.id);
    } // Dismiss – Use toast.remove(t.id) for no exit animation
  }, [toasts]);

  useEffect(() => {
    i18n?.changeLanguage(localStorage.getItem('locale')?.replaceAll('"', '') || 'en');
    // disableSroll();
  }, [router.pathname]);

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
      <GoogleReCaptchaProvider reCaptchaKey={ENV.RECAPTHCHA_SITE_KEY}>
        <ErrorBoundary>
          <Toaster />
          <AppLayout InterFont={InterFont}>{getLayout(<Component {...pageProps} />)}</AppLayout>
        </ErrorBoundary>
      </GoogleReCaptchaProvider>
    </>
  );
}
// @ts-ignore
export default appWithTranslation(MyApp, nextI18nConfig);
