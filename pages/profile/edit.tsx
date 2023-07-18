import { ReactElement } from 'react';

import { parseJwt } from 'brainless-token-manager';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';

const ProfileEdit = dynamic(() => import('@components/ProfileEdit'));
// const ProfileLayout = dynamic(() => import('@layout/ProfileLayout'));

const PostDetailPage = (props: any) => {
  return (
    <>
      <SEO title={'Pinex'} />
      <ProfileEdit {...props} />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      {/* <ProfileLayout Layout>
    </ProfileLayout>; */}
      {page}
    </>
  );
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
      ...(await serverSideTranslations(locale || 'en', ['common', 'editProfile'])),
      ...decoded,
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
