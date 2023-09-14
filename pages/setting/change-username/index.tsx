import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@layout/MainLayout';

const ChangeUsername = dynamic(() => import('@components/Setting/ChangeUsername'));

const SettingChangeUsernamePage = () => {
  return (
    <div>
      <ChangeUsername />
    </div>
  );
};

SettingChangeUsernamePage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}

export default SettingChangeUsernamePage;
