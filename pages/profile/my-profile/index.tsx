import { ReactElement } from 'react';

import { parseJwt } from 'brainless-token-manager';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const MyProfile = dynamic(() => import('@components/MyProfile'));
const ProfileLayout = dynamic(() => import('@layout/ProfileLayout'));

const PostDetailPage = (props: any) => {
  return (
    <>
      <SEO title={'Pinex'} />
      <MyProfile {...props} />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <ProfileLayout Layout>{page}</ProfileLayout>;
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
  const decoded = parseJwt(req.cookies?.accessToken);
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
      ...decoded,
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
