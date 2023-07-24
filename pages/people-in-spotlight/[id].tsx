import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const PeopleDetail = dynamic(() => import('@components/PeopleSpotlight/PeopleDetail'));

const PeopleSpotLightDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <PeopleDetail />
    </>
  );
};
PeopleSpotLightDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default PeopleSpotLightDetailPage;
