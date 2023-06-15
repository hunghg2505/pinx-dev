import { ReactElement } from 'react';

import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@components/Home';
import MainLayout from '@layout/MainLayout';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <Home />
    </>
  );
};

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
