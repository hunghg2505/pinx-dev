import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import Themes from '@components/Themes';
import MainLayout from '@layout/MainLayout';

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

export default ThemesPage;
