import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import TopWatching from '@components/TopWatching';
import MainLayout from '@layout/MainLayout';

const TopWatchingPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <TopWatching />
    </>
  );
};
TopWatchingPage.getLayout = function getLayout(page: ReactElement) {
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

export default TopWatchingPage;
