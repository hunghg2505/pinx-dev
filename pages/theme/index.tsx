import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import Themes from '@components/Themes';

const ExploreLayout = dynamic(() => import('@layout/ExploreLayout'));
// const MainLayout = dynamic(() => import('@layout/MainLayout'));
const ThemesPage = () => {
  return (
    <>
      <SEO title={'Pinex Theme'} />
      <Themes />
    </>
  );
};
ThemesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <ExploreLayout>
      <>{page}</>
    </ExploreLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'theme'])),
      // Will be passed to the page component as props
    },
  };
}

export default ThemesPage;
