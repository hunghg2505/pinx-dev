import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutLoadedProfile from '@layout/LayoutLoadedProfile/LayoutLoadedProfile';
import MainLayout from '@layout/MainLayout';

const DeactivateAccount = dynamic(
  () => import('@components/MenuProfile/ProfileVerification/DeactivateAccont'),
);

const DeactivateAccountPage = () => {
  return (
    <div>
      <DeactivateAccount />
    </div>
  );
};

DeactivateAccountPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LayoutLoadedProfile>{page}</LayoutLoadedProfile>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile', 'setting'])),
      // Will be passed to the page component as props
    },
  };
}

export default DeactivateAccountPage;
