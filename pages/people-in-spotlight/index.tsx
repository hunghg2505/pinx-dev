import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const PeopleSpotlight = dynamic(() => import('@components/PeopleSpotlight'));

const PeopleSpotLightPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <PeopleSpotlight />
    </>
  );
};

PeopleSpotLightPage.getLayout = function getLayout(page: ReactElement) {
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

export default PeopleSpotLightPage;
