import React, { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import LayoutLoadedProfile from '@layout/LayoutLoadedProfile/LayoutLoadedProfile';
import MainLayout from '@layout/MainLayout';
import { checkProfilePath } from '@utils/common';

const UserDetail = dynamic(() => import('@components/Profile'), { ssr: false });
const MyProfile = dynamic(() => import('@components/MyProfile'), { ssr: false });

interface ProfilePageProps {
  isMyProfile: boolean;
  userId: number;
}

const ProfilePage = ({ isMyProfile, userId }: ProfilePageProps) => {
  if (isMyProfile) {
    return (
      <LayoutLoadedProfile>
        <MyProfile />
      </LayoutLoadedProfile>
    );
  }

  return <UserDetail userId={userId} />;
};

ProfilePage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale, params, req, res }: GetServerSidePropsContext) {
  const { isMyProfile, userId } = checkProfilePath(params, req, res);

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
      // Will be passed to the page component as props
      isMyProfile,
      userId,
    },
  };
}

export default ProfilePage;
