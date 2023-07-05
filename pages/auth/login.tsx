import { ReactElement } from 'react';

import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Auth from '@components/Auth';
import LoginLayout from '@layout/LoginLayout';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Log In</title>
      </Head>
      <Auth />
    </>
  );
};

LoginPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  );
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
