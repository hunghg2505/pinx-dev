import { ReactElement } from 'react';

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

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'home', 'profile', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
