import { ReactElement } from 'react';

import { parseJwt } from 'brainless-token-manager';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import MainLayout from '@layout/MainLayout';
import { ROUTE_PATH } from '@utils/common';

const Profile = dynamic(() => import('@components/Profile'));

const PostDetailPage = (props: any) => {
  return (
    <>
      <SEO title={'Pinex'} />
      <Profile {...props} />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout Layout>{page}</MainLayout>;
};

export async function getServerSideProps({ locale, req, query }: GetServerSidePropsContext) {
  if (typeof req.cookies?.accessToken !== 'string') {
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
        // Will be passed to the page component as props
      },
    };
  }
  const decoded = parseJwt(req.cookies?.accessToken);
  if (Number(decoded?.userId) === Number(query?.id)) {
    return {
      redirect: {
        destination: ROUTE_PATH.MY_PROFILE,
        permanent: false,
      },
    };
  }
  return {
    props: {
      ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
      ...decoded,
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
