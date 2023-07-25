import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@layout/MainLayout';

const Setting = dynamic(() => import('@components/Setting'), {
  ssr: false,
});

const SettingPage = () => {
  return (
    <div>
      <Setting />
    </div>
  );
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
