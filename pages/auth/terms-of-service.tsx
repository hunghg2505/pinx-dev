import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const TermsOfService = dynamic(() => import('@components/Auth/TermsOfService'), {
  ssr: false,
});

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
