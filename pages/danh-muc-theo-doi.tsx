import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { getHostName } from '@utils/common';
import { WATCHLIST } from 'src/constant/route';

const WatchList = dynamic(() => import('@components/WatchList'));

const WatchlistPage = ({ host }: { host: string }) => {
  return (
    <>
      <SEO title={'Pinex WatchList'} siteUrl={`${host}${WATCHLIST}`} />
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
