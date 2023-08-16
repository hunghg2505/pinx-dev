import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

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
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'search-seo'])),
      // Will be passed to the page component as props
    },
  };
}
export default SearchBar;
