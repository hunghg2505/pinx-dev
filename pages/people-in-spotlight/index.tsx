import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { ROUTE_PATH, getHostName } from '@utils/common';

const PeopleSpotlight = dynamic(() => import('@components/PeopleSpotlight'));

const PeopleSpotLightPage = ({ host }: { host: string }) => {
  return (
    <>
      <SEO title={'Pinex Detail'} siteUrl={`${host}${ROUTE_PATH.PEOPLEINSPOTLIGHT}`} />
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

export async function getServerSideProps({ locale, req }: any) {
  const host = getHostName(req.headers);

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
      host,
    },
  };
}

export default PeopleSpotLightPage;
