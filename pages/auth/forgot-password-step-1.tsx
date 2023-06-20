import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import StepOne from '@components/Auth/ForgotPassword/StepOne';

const ForgotPasswordStepOnePage = () => {
  return (
    <div>
      <StepOne />
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

export default ForgotPasswordStepOnePage;
