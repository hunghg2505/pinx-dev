import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
import { fetchPostDetailFromServer } from '@components/Post/service';
import SEO from '@components/SEO';
// import SkeletonLoading from '@components/UI/Skeleton';
import MainLayout from '@layout/MainLayout';

const PostDetail = dynamic(() => import('@components/Post/PostDetail'), {
  loading: () => <NewsFeedSkeleton showBtnBack />,
});

const PostDetailPage = ({ postDetail, host }: any) => {
  const seoMetadata = postDetail?.post?.seoMetadata;

  return (
    <>
      <SEO
        title={seoMetadata?.title}
        description={seoMetadata?.metaDescription}
        siteUrl={host}
        openGraph={{
          images: {
            url: seoMetadata?.imageSeo?.urlImage,
          },
        }}
        twitterGraph={{
          images: {
            url: seoMetadata?.imageSeo?.urlImage,
          },
        }}
      />
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

export async function getServerSideProps({ locale, params, req }: any) {
  const id = params?.id;
  // const cookies = getCookie('accessToken', { req, res });
  const postDetail = await fetchPostDetailFromServer(id);
  const host = req.headers.referer;
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      postDetail: postDetail?.data,
      host,
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
