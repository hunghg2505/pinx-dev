import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ChangePassword from '@components/Setting/ChangePassword';
import MainLayout from '@layout/MainLayout';

const SettingChangePasswordPage = () => {
  return (
    <div>
      <ChangePassword />
    </div>
  );
};

SettingChangePasswordPage.getLayout = function getLayout(page: ReactElement) {
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

export default SettingChangePasswordPage;
