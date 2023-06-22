import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterCompanyStep from '@components/Auth/Register/CompanyStep';

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
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default RegisterCompanyStepPage;
