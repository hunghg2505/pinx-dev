import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterVerification from '@components/Auth/RegisterVerification';

const RegisterVerificationPage = () => {
  return (
    <div>
      <RegisterVerification />
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

export default RegisterVerificationPage;
