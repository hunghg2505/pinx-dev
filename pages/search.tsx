import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Search from '@components/Search';
import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const SearchPage = () => {
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

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default SearchPage;
