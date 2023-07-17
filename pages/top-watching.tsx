import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import TopWatching from '@components/TopWatching';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));
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
    <ExploreLayout>
      <>{page}</>
    </ExploreLayout>
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
