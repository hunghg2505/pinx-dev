import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Login from '@components/Auth/Login';
// import Register from '@components/Auth/Register';

const LoginPage = () => {
  return (
    <div>
      <Login />
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

export default LoginPage;
