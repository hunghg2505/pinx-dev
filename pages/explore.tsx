import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Explore from '@components/Explore';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

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
