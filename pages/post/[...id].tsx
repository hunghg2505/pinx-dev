import { ReactElement, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import NewsFeedSkeleton from '@components/Post/NewsFeed/NewsFeedSkeleton';
// import { fetchPostDetailFromServer } from '@components/Post/service';
import { fetchPostDetailFromServer } from '@components/Post/service';
import SEO from '@components/SEO';
// import SkeletonLoading from '@components/UI/Skeleton';
import MainLayout from '@layout/MainLayout';
import { formatMsgPost, getHostName } from '@utils/common';

const PostDetail = dynamic(() => import('@components/Post/PostDetail'), {
  loading: () => <NewsFeedSkeleton showBtnBack />,
});

const PostDetailPage = ({ host, postDetail }: any) => {
  const { i18n } = useTranslation();
  const { title, description, seoMetadata } = useMemo(() => {
    const seoMetadata = postDetail?.seoMetadata;
    let title = seoMetadata?.title;
    let description = seoMetadata?.metaDescription;

    if (
      !postDetail?.post?.urlImages?.length &&
      !postDetail?.post?.headImageUrl &&
      postDetail?.post?.metadataList?.length
    ) {
      title = postDetail?.post?.metadataList?.[0]?.title;
      description = postDetail?.post?.metadataList?.[0]?.description;
    }

    return {
      title: formatMsgPost(title),
      description: formatMsgPost(description),
      seoMetadata,
    };
  }, [postDetail]);

  return (
    <>
      <SEO
        siteUrl={`${host}/${postDetail?.seoMetadata?.slug}`}
        title={title}
        description={description}
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
        isNoFollow={!seoMetadata?.follow}
        isNoIndex={!seoMetadata?.index}
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
  const id = params?.id?.length > 1 ? params?.id[1]?.split('-').pop() : params?.id[0];
  // const id = params?.id[1]?.split('-').pop();
  const postDetail = await fetchPostDetailFromServer(id);
  if (!postDetail.data) {
    return {
      notFound: true,
    };
  }

  // const url = req?.headers?.referer;
  // let host = '';
  // if (url) {
  // const arr = url?.split('/');
  // host = `${arr[0]}//${arr[2]}`;
  // }

  const host = getHostName(req.headers);
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
