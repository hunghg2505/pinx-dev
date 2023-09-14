import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LoginLayout from '@layout/LoginLayout';

const LoginVerification = dynamic(() => import('@components/Auth/Login/OtpVerification'));

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
