import { ReactElement } from 'react';

import { useMount, useUnmount } from 'ahooks';
import { useHydrateAtoms } from 'jotai/utils';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { atomHeaderSearch, useHeaderSearch } from '@store/headerSearch/headerSearch';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { ROUTE_PATH, getHostName } from '@utils/common';

const Explore = dynamic(() => import('@components/Explore'));

const ExplorePage = ({ host }: { host: string }) => {
  useHydrateAtoms([[atomHeaderSearch, false]]);
  const [, setShowSearch] = useHeaderSearch();

  useMount(() => {
    setShowSearch(false);
  });

  useUnmount(() => {
    setShowSearch(true);
  });

  return (
    <>
      <SEO title={'Pinex Explore'} siteUrl={`${host}${ROUTE_PATH.EXPLORE}`} />
      <Explore />
    </>
  );
};
ExplorePage.getLayout = function getLayout(page: ReactElement) {
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
      ...(await serverSideTranslations(locale, ['common', 'theme', 'explore'])),
      // Will be passed to the page component as props
      host,
    },
  };
}

export default ExplorePage;
