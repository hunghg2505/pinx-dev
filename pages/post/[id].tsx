import { ReactElement } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
// import { fetchPostDetailFromServer } from '@components/Post/service';
import { fetchPostDetailFromServer } from '@components/Post/service';
import SEO from '@components/SEO';
// import SkeletonLoading from '@components/UI/Skeleton';
import MainLayout from '@layout/MainLayout';

const PostDetail = dynamic(() => import('@components/Post/PostDetail'), {
  loading: () => <NewsFeedSkeleton showBtnBack />,
});

const PostDetailPage = ({ id, host, postDetail }: any) => {
  const { i18n } = useTranslation();
  const seoMetadata = postDetail?.seoMetadata;

  return (
    <>
      <SEO
        siteUrl={`${host}/post/${id}`}
        title={seoMetadata?.title}
        description={seoMetadata?.metaDescription}
        openGraph={{
          locale: i18n.language,
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
  const postDetail = await fetchPostDetailFromServer(id);

  const url = req?.headers?.referer;
  let host = '';
  if (url) {
    const arr = url?.split('/');
    host = `${arr[0]}//${arr[2]}`;
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      postDetail: postDetail?.data,
      host,
      id,
      // Will be passed to the page component as props
    },
  };
}

export default PostDetailPage;
