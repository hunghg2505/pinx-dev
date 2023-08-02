import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SearchSeo from '@components/SearchSeo';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const SearchBar = () => {
  return (
    <>
      <SEO title={'Search Seo'}/>
      <SearchSeo/>
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
      ...(await serverSideTranslations(locale, ['common', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}
export default SearchBar;
