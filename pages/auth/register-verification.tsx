import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterVerification from '@components/Auth/Register/OtpVerification';
import LoginLayout from '@layout/LoginLayout';

const RegisterVerificationPage = () => {
  return (
    <div>
      <RegisterVerification />
    </div>
  );
};

RegisterVerificationPage.getLayout = function getLayout(page: ReactElement) {
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

export default RegisterVerificationPage;
