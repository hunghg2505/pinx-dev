import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Setting from '@components/Setting';
import MainLayout from '@layout/MainLayout';

const SettingPage = () => {
  return <Setting />;
};

SettingPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}

export default SettingPage;
