import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import ThemeDetail from '@components/Themes/ThemeDetail';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <ThemeDetail />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
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

export default PostDetailPage;
