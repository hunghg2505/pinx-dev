import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import TermsOfService from '@components/Auth/TermsOfService';

const TermsOfServicePage = () => {
  return (
    <div>
      <TermsOfService />
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

export default TermsOfServicePage;
