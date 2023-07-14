import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const MainLayout = dynamic(() => import('@layout/MainLayout'));
const StockRating = dynamic(() => import('@components/Stock/RatingPage'), {
  ssr: false,
});

const StockRatingPage = () => {
  return (
    <>
      <SEO title='Stock Rating' />
      <StockRating />
    </>
  );
};

StockRatingPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default StockRatingPage;
