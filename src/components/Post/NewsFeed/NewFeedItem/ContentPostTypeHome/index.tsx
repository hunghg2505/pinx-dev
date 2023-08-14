import { memo, useEffect, useMemo, useRef, useState } from 'react';

import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';

import { ActivityMatchOrder } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityMatchOrder';
import { ActivityTheme } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityTheme';
import { ActivityWatchlist } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ActivityWatchlist';
import { CafeFNews } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/CafeFNews';
import { PineTreePost } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PineTreePost';
import { PineTreePost2 } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PineTreePost2';
import { PostNormally } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/PostNormally';
import { VietStockNews } from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/VietStockNews';
import { IPost, TYPEPOST } from '@components/Post/service';
import { useFormatMessagePost } from '@hooks/useFormatMessagePost';
import { useUserLoginInfo } from '@hooks/useUserLoginInfo';
import { postThemeAtom } from '@store/postTheme/theme';
import { ROUTE_PATH, formatMessage } from '@utils/common';

interface IProps {
  postDetail: IPost;
  onNavigate?: () => void;
  pinned?: boolean;
  isPostDetailPath: boolean;
}

const IMAGE_COMPANY_URL = 'https://static.pinetree.com.vn/upload/images/companies/';

const ContentPostTypeHome = (props: IProps) => {
  const router = useRouter();
  const { userLoginInfo } = useUserLoginInfo();
  const { postDetail, onNavigate, pinned, isPostDetailPath } = props;
  const [readMore, setReadMore] = useState(false);

  const [height, setHeight] = useState<number>(0);
  const bgTheme = useAtomValue(postThemeAtom);

  const ref = useRef(null);

  const messagePostFormat = useFormatMessagePost(postDetail?.post?.message, postDetail?.post);

  const { postDetailUrl, iconPost, urlStock, post_url } = useMemo(() => {
    const metaData = postDetail?.post?.metadataList?.[0];

    const stockCode = postDetail.post?.stockCode;

    const urlStock = `${IMAGE_COMPANY_URL}${
      stockCode?.length === 3 || stockCode?.[0] !== 'C' ? stockCode : stockCode?.slice(1, 4)
    }.png`;

    const iconPost =
      postDetail?.post.action === 'SUBSCRIBE'
        ? '/static/icons/iconSubcribe.svg'
        : '/static/icons/iconUnSubcribe.svg';
    let postDetailUrl = ROUTE_PATH.POST_DETAIL(postDetail?.id);
    if (postDetail?.postType === TYPEPOST.ActivityTheme) {
      postDetailUrl = ROUTE_PATH.THEME_DETAIL(postDetail?.post.themeCode);
    }
    if ([TYPEPOST.ActivityWatchlist, TYPEPOST.ActivityMatchOrder].includes(postDetail?.postType)) {
      postDetailUrl = ROUTE_PATH.STOCK_DETAIL(postDetail?.post?.stockCode);
    }

    return {
      imageMetaData: metaData?.images?.[0],
      siteName: metaData?.siteName,
      url: metaData?.url?.split('/')?.slice(-1),
      urlImages: postDetail?.post?.urlImages,
      message:
        postDetail?.post?.message &&
        formatMessage(postDetail?.post?.message, postDetail?.post, userLoginInfo?.id),
      urlStock,
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
    // console.log(`${postDetail?.postType} - ${ele?.offsetHeight}`);
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
      />
    );
  }

  if (postDetail?.postType === TYPEPOST.ActivityMatchOrder) {
    return (
      <ActivityMatchOrder
        isReadMore={isReadMore}
        onReadMore={onReadMore}
        readMore={readMore}
        postDetailUrl={postDetailUrl}
        postDetail={postDetail}
        urlStock={urlStock}
        onComment={onComment}
        messagePostFormat={messagePostFormat}
        pnlRate={pnlRate}
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
      />
    );
  }

  return <></>;
};

export default memo(ContentPostTypeHome);
