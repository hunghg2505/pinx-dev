import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import Head from 'next/head';
import Script from 'next/script';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginLayout from '@layout/LoginLayout';
import { ENV } from '@utils/env';

const Auth = dynamic(() => import('@components/Auth'));

const LoginPage = () => {
  return (
    <>
      <Script src={`https://www.google.com/recaptcha/api.js?render=${ENV.RECAPTHCHA_SITE_KEY}`} />

      <Head>
        <title>Log In</title>
      </Head>
      <Auth />
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default LoginPage;
