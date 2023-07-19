import React, { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));
const Company = dynamic(() => import('@components/Stock/Company'), {
  ssr: false,
});
const BusinessPage = () => {
  return (
    <>
      <SEO title='Company' />
      <Company />
    </>
  );
};

BusinessPage.getLayout = (page: ReactElement) => {
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

export default BusinessPage;
