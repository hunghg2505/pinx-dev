import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const StockDetail = dynamic(() => import('@components/Stock/StockDetail'), {
  ssr: false,
});

const StockDetailPage = () => {
  return (
    <>
      <SEO title='Stock Detail'></SEO>
      <StockDetail />
    </>
  );
};

StockDetailPage.getLayout = (page: ReactElement) => {
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

export default StockDetailPage;
