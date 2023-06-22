import { ReactElement } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StepTwo from '@components/Auth/ForgotPassword/StepTwo';
import LoginLayout from '@layout/LoginLayout';

const UpdateUserProfilePage = () => {
  return (
    <div>
      <StepTwo />
    </div>
  );
};

UpdateUserProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginLayout>
      {page}
    </LoginLayout>
  );
};


export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default UpdateUserProfilePage;
