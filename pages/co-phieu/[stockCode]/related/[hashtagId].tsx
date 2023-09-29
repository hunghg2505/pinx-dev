import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@layout/MainLayout';

const StockRelated = dynamic(() => import('@components/Stock/CompanyRelated'));

const StockRelatedPage = () => {
  return <StockRelated />;
};

StockRelatedPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'stock'])),
      // Will be passed to the page component as props
    },
  };
}

export default StockRelatedPage;
