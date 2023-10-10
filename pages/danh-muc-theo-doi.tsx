import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { ROUTE_PATH, getHostName } from '@utils/common';

const WatchList = dynamic(() => import('@components/WatchList'));

const WatchlistPage = ({ host }: { host: string }) => {
  return (
    <>
      <SEO title={'Pinex WatchList'} siteUrl={`${host}${ROUTE_PATH.WATCHLIST}`} />
      <WatchList />
    </>
  );
};

WatchlistPage.getLayout = function getLayout(page: ReactElement) {
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
      ...(await serverSideTranslations(locale, ['common', 'watchlist'])),
      // Will be passed to the page component as props
      host,
    },
  };
}

export default WatchlistPage;
