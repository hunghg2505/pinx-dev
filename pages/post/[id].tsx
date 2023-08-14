import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import SEO from '@components/SEO';
import SkeletonLoading from '@components/UI/Skeleton';
import MainLayout from '@layout/MainLayout';

const PostDetail = dynamic(() => import('@components/Post/PostDetail'), {
  ssr: false,
  loading: () => <SkeletonLoading />,
});

const PostDetailPage = () => {
  return (
    <>
      <SEO title={'Pinex Detail'} />
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
