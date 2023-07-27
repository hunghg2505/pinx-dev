import { ReactElement } from 'react';

import { parseJwt } from 'brainless-token-manager';
import { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { API_PATH } from '@api/constant';
import { PREFIX_API_PIST } from '@api/request';
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
  if (!Number(query.id)) {
    return {
      redirect: {
        destination: ROUTE_PATH.NOT_FOUND,
        permanent: false,
      },
    };
  }
  if (typeof req.cookies?.accessToken === 'string') {
    const decoded = parseJwt(req.cookies?.accessToken);
    if (Number(decoded?.userId) === Number(query?.id)) {
      return {
        redirect: {
          destination: ROUTE_PATH.MY_PROFILE,
          permanent: false,
        },
      };
    }
  }

  const res = await fetch(
    PREFIX_API_PIST + API_PATH.PUBLIC_GET_OTHER_USER_PROFILE(Number(query.id)),
  );  

  if (res.status === 200) {
    const data = await res.json();
    return {
      props: {
        ...(await serverSideTranslations(locale || 'en', ['common', 'profile'])),
        data,
        // Will be passed to the page component as props
      },
    };
  }
  return {
    redirect: {
      destination: ROUTE_PATH.NOT_FOUND,
      permanent: false,
    },
  };
}

export default PostDetailPage;
