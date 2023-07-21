import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const StockRelated = dynamic(() => import('@components/Stock/CompanyRelated'));
const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));

const StockRelatedPage = () => {
  return <StockRelated />;
};

StockRelatedPage.getLayout = (page: ReactElement) => {
  return <ExploreLayout>{page}</ExploreLayout>;
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default StockRelatedPage;
