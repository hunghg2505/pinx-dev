import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import WatchList from '@components/WatchList';
import MainLayout from '@layout/MainLayout';

const WatchlistPage = () => {
  return (
    <>
      <SEO title={'Pinex WatchList'} />
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

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'watchlist'])),
      // Will be passed to the page component as props
    },
  };
}

export default WatchlistPage;
