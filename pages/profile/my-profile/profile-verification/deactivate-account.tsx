import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import DeactivateAccount from '@components/MenuProfile/ProfileVerification/DeactivateAccont';
import MainLayout from '@layout/MainLayout';

const DeactivateAccountPage = () => {
  return (
    <div>
      <DeactivateAccount />
    </div>
  );
};

DeactivateAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'profile', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}

export default DeactivateAccountPage;
