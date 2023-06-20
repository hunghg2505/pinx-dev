import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import CreateUsername from '@components/Auth/Register/CreateUsername';
import LoginLayout from '@layout/LoginLayout';

const CreateUsernamePage = () => {
  return (
    <div>
      <CreateUsername />
    </div>
  );
};

CreateUsernamePage.getLayout = function getLayout(page: ReactElement) {
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

export default CreateUsernamePage;
