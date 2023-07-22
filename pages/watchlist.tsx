import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import WatchList from '@components/WatchList';
import SettingLayout from '@layout/SettingLayout';

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
    <SettingLayout>
      <>{page}</>
    </SettingLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common','watchlist'])),
      // Will be passed to the page component as props
    },
  };
}

export default WatchlistPage;
