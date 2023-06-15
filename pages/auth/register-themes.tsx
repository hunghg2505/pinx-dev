import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import RegisterThemes from '@components/Auth/RegisterThemes';

const RegisterThemesPage = () => {
  return (
    <div>
      <RegisterThemes />
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

export default RegisterThemesPage;
