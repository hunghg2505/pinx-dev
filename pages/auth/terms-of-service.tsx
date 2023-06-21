import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TermsOfService from '@components/Auth/TermsOfService';
import LoginLayout from '@layout/LoginLayout';

const TermsOfServicePage = () => {
  return (
    <div>
      <TermsOfService />
    </div>
  );
};

TermsOfServicePage.getLayout = function getLayout(page: ReactElement) {
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

export default TermsOfServicePage;
