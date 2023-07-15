import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ChangeUsernameVertification from '@components/Setting/ChangeUsername/OtpVerification';
import SettingLayout from '@layout/SettingLayout';

const ChangeUsernameVerificationPage = () => {
  return (
    <div>
      <ChangeUsernameVertification />
    </div>
  );
};

ChangeUsernameVerificationPage.getLayout = function getLayout(page: ReactElement) {
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
export default ChangeUsernameVerificationPage;
