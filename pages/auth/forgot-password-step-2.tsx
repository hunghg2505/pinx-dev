import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StepTwo from '@components/Auth/ForgotPassword/StepTwo';

const ForgotPasswordStepTwoPage = () => {
  return (
    <div>
      <StepTwo />
    </div>
  );
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'login'])),
      // Will be passed to the page component as props
    },
  };
}

export default ForgotPasswordStepTwoPage;
