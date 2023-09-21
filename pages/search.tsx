import { ReactElement } from 'react';

import { useMount, useUnmount } from 'ahooks';
import { useHydrateAtoms } from 'jotai/utils';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { atomHeaderSearch, useHeaderSearch } from '@store/headerSearch/headerSearch';

const Search = dynamic(() => import('@components/Search'));

const SearchPage = () => {
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
      <SEO title={'Pinex Detail'} />
      <Search />
    </>
  );
};
SearchPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default SearchPage;
