import { useEffect, useMemo, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

// import lazyLoadHydrate from '@components/LazyComp/LazyComp';
import ActivityMatchOrder from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityMatchOrder';
import ActivityTheme from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityTheme';
import ActivityWatchlist from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityWatchlist';
import CafeFNews from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/CafeFNews';
import PineTreePost from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PineTreePost';
import PineTreePost2 from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PineTreePost2';
import PostNormally from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PostNormally';
import VietStockNews from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/VietStockNews';
import { IPost, TYPEPOST } from '@components/Post/service';
import { useFormatMessagePost } from '@hooks/useFormatMessagePost';
import { postThemeAtom } from '@store/postTheme/theme';
import { ROUTE_PATH, formatMessage, imageStock, toNonAccentVietnamese } from '@utils/common';

// const ActivityMatchOrder = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityMatchOrder'),
//   true,
// );
// const ActivityTheme = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityTheme'),
//   true,
// );
// const ActivityWatchlist = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityWatchlist'),
//   true,
// );
// const CafeFNews = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/CafeFNews'),
//   true,
// );
// const PineTreePost = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PineTreePost'),
//   true,
// );
// const PineTreePost2 = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PineTreePost2'),
//   true,
// );
// const PostNormally = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PostNormally'),
//   true,
// );
// const VietStockNews = lazyLoadHydrate(
//   () => import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/VietStockNews'),
//   true,
// );

interface IProps {
  postDetail: IPost;
  onNavigate?: () => void;
  pinned?: boolean;
  isPostDetailPath: boolean;
  onTrackingViewTicker?: (stockCode: string) => void;
}

const ContentPostTypeHome = (props: IProps) => {
  const router = useRouter();
  const { postDetail, onNavigate, pinned, isPostDetailPath, onTrackingViewTicker } = props;
  const [readMore, setReadMore] = useState(false);
  const [height, setHeight] = useState<number>(0);
  const bgTheme = useAtomValue(postThemeAtom);
  const ref = useRef(null);

  const messagePostFormat = useFormatMessagePost(postDetail?.post?.message);
  const { postDetailUrl, iconPost, urlStock, post_url } = useMemo(() => {
    const metaData = postDetail?.post?.metadataList?.[0];

    const stockCode = postDetail.post?.stockCode;

    const iconPost =
      postDetail?.post.action === 'SUBSCRIBE'
        ? '/static/icons/iconSubcribe.svg'
        : '/static/icons/iconUnSubcribe.svg';
    let postDetailUrl = postDetail?.seoMetadata
      ? '/' + postDetail?.seoMetadata?.slug
      : postDetail?.id;

    if (postDetail?.postType === TYPEPOST.ActivityTheme) {
      const url =
        postDetail?.post.themeCode +
        '-chu-de-' +
        toNonAccentVietnamese(postDetail?.post.themeName).toLowerCase().replaceAll(' ', '-');
      postDetailUrl = ROUTE_PATH.THEME_DETAIL(url);
    }
    if ([TYPEPOST.ActivityWatchlist, TYPEPOST.ActivityMatchOrder].includes(postDetail?.postType)) {
      postDetailUrl = ROUTE_PATH.STOCK_DETAIL(postDetail?.post?.stockCode);
    }
    // console.log('b', postDetailUrl);
    return {
      imageMetaData: metaData?.images?.[0],
      siteName: metaData?.siteName,
      url: metaData?.url?.split('/')?.slice(-1),
      urlImages: postDetail?.post?.urlImages,
      message: postDetail?.post?.message && formatMessage(postDetail?.post?.message),
      urlStock: imageStock(stockCode),
      iconPost,
      postDetailUrl,
      post_url: postDetail?.post.url ?? '',
    };
  }, [postDetail]);

  const { isReadMore, pnlRate } = useMemo(() => {
    const postThemeId = postDetail?.post?.postThemeId;
    const BgThemePost = bgTheme?.find((item: any) => item.id === postThemeId);

    return {
      isReadMore: height > 84,

      color: BgThemePost?.color?.code,
      urlLink: postDetail?.post?.urlLinks?.[0] || '',
      pnlRate: postDetail?.post?.pnlRate,
      postThemeId,
      BgThemePost,
    };
  }, [height, postDetail]);

  useEffect(() => {
    const handleClick = (event: any) => {
      const textContent = event?.target?.textContent;
      const classElement = event?.target?.className;
      if (classElement === 'link') {
        router.push({
          pathname: '/redirecting',
          query: { url: textContent },
        });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  const onComment = () => {
    onNavigate && onNavigate();
  };
  const onReadMore = () => {
    setReadMore(!readMore);
  };

  const onRef = (ele: any) => {
    if (!ele) {
      return;
    }

    setHeight(ele?.offsetHeight);
  };

  if (postDetail?.postType === TYPEPOST.ActivityTheme) {
    return (
      <ActivityTheme
        onRef={ref}
        onComment={onComment}
        isReadMore={isReadMore}
        onReadMor={onReadMore}
        readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        iconPost={iconPost}
        messagePostFormat={messagePostFormat}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  if (
    [
      TYPEPOST.PinetreeDailyNews,
      TYPEPOST.PinetreeMorningBrief,
      TYPEPOST.PinetreeMarketBrief,
      TYPEPOST.PinetreeWeeklyNews,
      // TYPEPOST.PinetreePost,
    ].includes(postDetail?.postType)
  ) {
    return (
      <PineTreePost
        onRef={onRef}
        isReadMore={isReadMore}
        onReadMore={onReadMore}
        readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        post_url={post_url}
        pinned={pinned}
        isPostDetailPath={isPostDetailPath}
      />
    );
  }

  if ([TYPEPOST.PinetreePost].includes(postDetail?.postType)) {
    return (
      <PineTreePost2
        // onRef={onRef}
        onComment={onComment}
        // isReadMore={isReadMore}
        // onReadMore={onReadMore}
        // readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        pinned={pinned}
        isPostDetailPath={isPostDetailPath}
        messagePostFormat={messagePostFormat}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  if ([TYPEPOST.ActivityWatchlist].includes(postDetail?.postType)) {
    return (
      <ActivityWatchlist
        onRef={onRef}
        isReadMore={isReadMore}
        onReadMore={onReadMore}
        readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        urlStock={urlStock}
        onComment={onComment}
        messagePostFormat={messagePostFormat}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  if (postDetail?.postType === TYPEPOST.ActivityMatchOrder) {
    return (
      <ActivityMatchOrder
        isReadMore={isReadMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        urlStock={urlStock}
        onComment={onComment}
        messagePostFormat={messagePostFormat}
        pnlRate={pnlRate}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  if (
    [
      TYPEPOST.VietstockLatestNews,
      TYPEPOST.VietstockNews,
      TYPEPOST.VietstockStockNews,
      TYPEPOST.TNCKNews,
    ].includes(postDetail?.postType)
  ) {
    return (
      <VietStockNews
        onRef={onRef}
        isReadMore={isReadMore}
        onReadMore={onReadMore}
        readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        post_url={post_url}
        pinned={pinned}
        isPostDetailPath={isPostDetailPath}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  if ([TYPEPOST.CafeFNews].includes(postDetail?.postType)) {
    return (
      <CafeFNews
        onRef={onRef}
        isReadMore={isReadMore}
        onReadMore={onReadMore}
        readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        post_url={post_url}
        pinned={pinned}
        isPostDetailPath={isPostDetailPath}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  if ([TYPEPOST.POST].includes(postDetail?.postType)) {
    return (
      <PostNormally
        onReadMore={onReadMore}
        readMore={readMore}
        postDetail={postDetail}
        onComment={onComment}
        height={height}
        onTrackingViewTicker={onTrackingViewTicker}
      />
    );
  }

  return <></>;
};

export default ContentPostTypeHome;
