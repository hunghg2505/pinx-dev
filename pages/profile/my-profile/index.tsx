import { ReactElement } from 'react';

import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';

const MyProfile = dynamic(() => import('@components/MyProfile'));

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex'} />
      <MyProfile />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout Layout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale, req }: GetServerSidePropsContext) {
  if (typeof req.cookies?.accessToken !== 'string') {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
