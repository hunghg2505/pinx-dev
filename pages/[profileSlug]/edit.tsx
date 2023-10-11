import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import LayoutLoadedProfile from '@layout/LayoutLoadedProfile/LayoutLoadedProfile';
import MainLayout from '@layout/MainLayout';

const ProfileEdit = dynamic(() => import('@components/ProfileEdit'));

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex'} />
      <ProfileEdit />
    </>
  );
};
PostDetailPage.getLayout = (page: ReactElement) => {
  return (
    <>
      <MainLayout>
        <LayoutLoadedProfile>{page}</LayoutLoadedProfile>
      </MainLayout>
    </>
  );
};

export async function getServerSideProps({ locale }: GetServerSidePropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'editProfile'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
