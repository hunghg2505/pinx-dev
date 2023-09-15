import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Explore = dynamic(() => import('@components/Explore'));

const ExplorePage = () => {
  return (
    <>
      <SEO title={'Pinex Explore'} />
      <Explore />
    </>
  );
};
ExplorePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme', 'explore'])),
      // Will be passed to the page component as props
    },
  };
}

export default ExplorePage;
