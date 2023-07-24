import { ReactElement } from 'react';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import ProfileVerification from '@components/MenuProfile/ProfileVerification';
import MainLayout from '@layout/MainLayout';

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
      ...(await serverSideTranslations(locale, ['common', 'profile'])),
      // Will be passed to the page component as props
    },
  };
}

export default ProfileVerificationPage;
