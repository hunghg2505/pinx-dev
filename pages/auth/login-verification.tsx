import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginVerification from '@components/Auth/Login/OtpVerification';
import LoginLayout from '@layout/LoginLayout';

const LoginVerificationPage = () => {
  return (
    <div>
      <LoginVerification />
    </div>
  );
};

LoginVerificationPage.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default LoginVerificationPage;
