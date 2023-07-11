import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import Community from '@components/Themes/ThemesDetail/Community';
import LandingPageDetailThemes from '@components/Themes/ThemesDetail/LandingPage';

const MainLayout = dynamic(() => import('@layout/MainLayout'));
const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
      <LandingPageDetailThemes />
      <Community />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
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

export default PostDetailPage;
