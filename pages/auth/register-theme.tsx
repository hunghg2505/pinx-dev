import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterThemes = dynamic(() => import('@components/Auth/Register/ThemeStep'));

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
      ...(await serverSideTranslations(locale, ['common', 'auth'])),
      // Will be passed to the page component as props
    },
  };
}

export default RegisterThemesPage;
