import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ChangePasswordVertification from '@components/Setting/ChangePassword/OtpVerification';
import SettingLayout from '@layout/SettingLayout';

const ChangePasswordVerificationPage = () => {
  return (
    <div>
      <ChangePasswordVertification />
    </div>
  );
};

ChangePasswordVerificationPage.getLayout = function getLayout(page: ReactElement) {
  return <SettingLayout>{page}</SettingLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}
export default ChangePasswordVerificationPage;
