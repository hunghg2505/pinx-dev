import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ChangeUsername from '@components/Setting/ChangeUsername';
import SettingLayout from '@layout/SettingLayout';

const SettingChangeUsernamePage = () => {
  return (
    <div>
      <ChangeUsername />
    </div>
  );
};

SettingChangeUsernamePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SettingLayout>
      {page}
    </SettingLayout>
  );
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
