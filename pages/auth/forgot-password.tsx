import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StepOne from '@components/Auth/ForgotPassword/StepOne';
import LoginLayout from '@layout/LoginLayout';

const ForgotPasswordPage = () => {
  return (
    <div>
      <StepOne />
    </div>
  );
};

ForgotPasswordPage.getLayout = function getLayout(page: ReactElement) {
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

export default ForgotPasswordPage;
