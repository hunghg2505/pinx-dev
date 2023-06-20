import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterCompanyStep from '@components/Auth/RegisterCompanyStep';

const RegisterCompanyStepPage = () => {
  return (
    <div>
      <RegisterCompanyStep />
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

export default RegisterCompanyStepPage;
