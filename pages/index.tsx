import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const Home = dynamic(() => import('@components/Home'), {
  ssr: false,
});

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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home', 'profile', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default HomePage;
