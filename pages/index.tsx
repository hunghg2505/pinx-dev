import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Home from '@components/Home';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const HomePage = () => {
  return (
    <>
      <SEO title={'Pinex'} />
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

export async function getStaticProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
