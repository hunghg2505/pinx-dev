import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { createSearchSeoFromServer } from '@components/SearchSeo/service';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { removeSpecialCharacter } from '@utils/removeSpecialChar';

const SearchSeo = dynamic(() => import('@components/SearchSeo'));

const SearchBar = () => {
  return (
    <>
      <SEO title={'Search Seo'} />
      <SearchSeo />
    </>
  );
};
SearchBar.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};
export async function getServerSideProps({ locale, query }: any) {
  const keyword = query?.keyword;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const response = await createSearchSeoFromServer(removeSpecialCharacter(keyword));

  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'search-seo'])),
      // Will be passed to the page component as props
    },
  };
}
export default SearchBar;
