import { ReactElement } from 'react';

import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import PostDetail from '@components/Post/PostDetail';
import MainLayout from '@layout/MainLayout';

const PostDetailPage = () => {
  return (
    <>
      <Head>
        <title>Post detail</title>
      </Head>
      <PostDetail />
    </>
  );
};
PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <>{page}</>
    </MainLayout>
  );
};

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
