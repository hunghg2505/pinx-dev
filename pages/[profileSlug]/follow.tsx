import React, { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import MainLayout from '@layout/MainLayout';
import { checkProfilePath } from '@utils/common';

const UserDetailFollow = dynamic(() => import('@components/ProfileFollow'));
const MyProfileFollow = dynamic(() => import('@components/MyProfileFollow'));

interface ProfileFollowPageProps {
  isMyProfile: boolean;
}

const ProfileFollowPage = ({ isMyProfile }: ProfileFollowPageProps) => {
  if (isMyProfile) {
    return <MyProfileFollow />;
  }

  return <UserDetailFollow />;
};

ProfileFollowPage.getLayout = (page: ReactElement) => {
  return <MainLayout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale, params, req, res }: GetServerSidePropsContext) {
  const { isMyProfile } = checkProfilePath(params, req, res);

  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
      // Will be passed to the page component as props
      isMyProfile,
    },
  };
}

export default ProfileFollowPage;
