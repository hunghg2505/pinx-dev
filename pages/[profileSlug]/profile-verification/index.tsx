import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutLoadedProfile from '@layout/LayoutLoadedProfile/LayoutLoadedProfile';
import MainLayout from '@layout/MainLayout';

const ProfileVerification = dynamic(() => import('@components/MenuProfile/ProfileVerification'));

const ProfileVerificationPage = () => {
  return (
    <div>
      <ProfileVerification />
    </div>
  );
};

ProfileVerificationPage.getLayout = function getLayout(page: ReactElement) {
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

export default ProfileVerificationPage;
