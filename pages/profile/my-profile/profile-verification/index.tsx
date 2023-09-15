import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

export default ProfileVerificationPage;
