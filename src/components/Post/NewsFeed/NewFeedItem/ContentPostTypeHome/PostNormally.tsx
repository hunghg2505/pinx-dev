/* eslint-disable react/prop-types */
import { memo, useLayoutEffect, useMemo, useRef, useState } from 'react';

import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { InView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/youtube';

import ModalMedia from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ModalMedia';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
// import { useFormatMessagePost } from '@hooks/useFormatMessagePost';
import useCheckPineXPost from '@hooks/useCheckPineXPost';
import { postThemeAtom } from '@store/postTheme/theme';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH, formatMessage, formatMsgPost, getVideoId } from '@utils/common';

import useHeight from './useHeight';

const Content = memo(({ postDetail, onComment, messagePostFormat, onTrackingViewTicker }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const [showReadMore, setShowReadMore] = useState<boolean>(isPostDetailPath);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  const messageDefault = postDetail?.post?.message;
  // userLoginInfoAtom

  const [readMore, setReadMore] = useState(false);
  const bgTheme = useAtomValue(postThemeAtom);
  const { message } = useMemo(() => {
    const metaData = postDetail?.post?.metadataList?.[0];

    return {
      imageMetaData: metaData?.images?.[0],
      siteName: `${metaData?.siteName}`.toLowerCase(),
      videoId: getVideoId(metaData?.url, metaData?.siteName),
      message: postDetail?.post?.message && formatMessage(postDetail?.post?.message),
      postDetailUrl: ROUTE_PATH.POST_DETAIL(postDetail?.seoMetadata?.slug),
      post_url: postDetail?.post.url ?? '',
    };
  }, [postDetail]);

  const { color, urlLink, postThemeId, BgThemePost } = useMemo(() => {
    const postThemeId = postDetail?.post?.postThemeId;
    const BgThemePost = bgTheme?.find((item: any) => item.id === postThemeId);

    return {
      color: BgThemePost?.color?.code,
      urlLink: postDetail?.post?.urlLinks?.[0] || '',
      pnlRate: postDetail?.post?.pnlRate,
      postThemeId,
      BgThemePost,
    };
  }, [postDetail, bgTheme]);

  const { isPineXPost, postSlug } = useCheckPineXPost(urlLink);

  // useEffect(() => {
  //   setShowReadMore(false);
  //   const t = setTimeout(() => {
  //     const ele = document?.getElementById(`post-content-${postDetail.id}`);
  //     if (ele?.clientHeight) {
  //       setShowReadMore(ele?.clientHeight > 84);
  //     }
  //     clearTimeout(t);
  //   }, 400);
  // }, [messageDefault, postThemeId]);

  const ref = useRef<HTMLDivElement>(null);
  const height = useHeight(ref);
  useLayoutEffect(() => {
    setShowReadMore(height > 84);
  }, [height, messageDefault, postThemeId]);

  const onHandleClick = (e: any) => {
    const textContent = e?.target?.textContent as string;
    const classElement = e?.target?.className;
    const id = e?.target?.id;
    setSearchSeo(false);
    if (classElement === 'link') {
      return window.open(textContent);
    }
    if (classElement === 'people') {
      const displayName = e?.target?.textContent;
      const url = ROUTE_PATH.PROFILE_V2(displayName, id);
      return router.push(url);
    }
    if (classElement === 'tagStock') {
      onTrackingViewTicker && onTrackingViewTicker(textContent);
      return router.push(ROUTE_PATH.STOCK_DETAIL(textContent));
    }
    if (classElement === 'hashtag') {
      const text = textContent.slice(1);
      return router.push(`${ROUTE_PATH.SEARCHSEO}?keyword=${text}`);
    }
    return onComment();
  };
  const PostContent = () => {
    if (postThemeId) {
      return (
        <div
          className='theme relative flex w-full  flex-col justify-end overflow-hidden rounded-[10px]'
          onClick={(event) => onHandleClick(event)}
        >
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={BgThemePost?.bgImage || ''}
            alt={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.alt)}
            title={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.title)}
            className='pointer-events-none left-0 top-0 w-full object-cover object-top mobile:max-h-[300px] mobile:min-h-[204px] mobile-max:object-bottom tablet:rounded-[8px] desktop:h-[300px]'
          />
          {message && (
            <div>
              <Text type='body-16-bold' color='neutral-1'>
                <div
                  className='messageBody desc messageFormat absolute left-2/4 top-2/4 mx-[auto] my-[0] mb-[15px] max-h-full max-w-[calc(100%_-_20px)] -translate-x-1/2 -translate-y-1/2 transform py-[10px] text-center mobile-max:w-full mobile-max:break-words mobile-max:px-[5px]'
                  dangerouslySetInnerHTML={{ __html: messagePostFormat }}
                  style={{ color }}
                ></div>
              </Text>
            </div>
          )}
        </div>
      );
    }

    if (message) {
      return (
        <div
          id={`post-content-${postDetail.id}`}
          className={classNames('', {
            'h-[84px] overflow-hidden mobile-max:h-[81px] desktop:h-[84px]': showReadMore,
            '!line-clamp-none !h-auto': readMore || isPostDetailPath,
          })}
        >
          <div onClick={(event) => onHandleClick(event)}>
            <Text
              type='body-14-regular'
              color='neutral-1'
              className=' tablet:!text-[16px]'
              // onClick={onComment}
            >
              <div
                ref={ref}
                className='desc messageFormat messageBody'
                dangerouslySetInnerHTML={{ __html: messagePostFormat }}
              ></div>
            </Text>
          </div>
          {!message?.includes(urlLink) && urlLink !== '' && (
            <CustomLink
              target={isPineXPost ? '' : '_blank'}
              href={isPineXPost ? postSlug : urlLink}
            >
              <div className='messageFormat messageBody'>
                <span className='link'>{urlLink}</span>
              </div>
            </CustomLink>
          )}
        </div>
      );
    }

    return <></>;
  };

  return (
    <>
      <PostContent />

      {showReadMore && !postThemeId && !isPostDetailPath ? (
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='w-[75px] cursor-pointer'
          onClick={() => setReadMore(!readMore)}
        >
          {readMore ? t('see_less') : t('see_more')}
        </Text>
      ) : (
        ''
      )}
    </>
  );
});

const MetaContent = ({ metaData }: any) => {
  const data = useMemo(() => {
    if (!metaData?.length) {
      return;
    }

    const url = metaData?.find((it: any) => it?.property === 'og:url')?.content;
    const imageUrl = metaData?.find((it: any) => it?.property === 'og:image')?.content;
    const title = metaData?.find((it: any) => it?.property === 'og:title')?.content;
    const description = metaData?.find((it: any) => it?.property === 'og:description')?.content;

    return {
      url,
      imageUrl,
      title,
      description,
    };
  }, [metaData]);

  const { isPineXPost, postSlug } = useCheckPineXPost(data?.url);

  if (!data) {
    return <></>;
  }

  const { url, imageUrl, title, description } = data;

  return (
    <CustomLink
      target={isPineXPost ? '' : '_blank'}
      href={isPineXPost ? postSlug : url}
      className='mt-4 block'
    >
      <div className='relative '>
        <div className='w-full overflow-hidden rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white'>
          {imageUrl && (
            <div className='overflow-hidden'>
              <Image
                width='0'
                height='0'
                sizes='100vw'
                src={imageUrl}
                alt={title}
                title={title}
                className={classNames(
                  'h-[290px] w-full bg-[#12121239] object-cover mobile-max:h-[190px]',
                  {
                    '-translate-y-[18px] scale-[1.48] !object-contain mobile-max:-translate-y-[12px]':
                      url?.includes('tiktok'),
                  },
                )}
              />
            </div>
          )}

          <div className='bg-[#EBEBEB] p-[10px]'>
            {url && (
              <Text type='body-14-regular' color='neutral-4' className='text-1-line text-left'>
                {url}
              </Text>
            )}

            {title && (
              <Text type='body-16-medium' color='cbblack' className='my-[8px] text-left'>
                {title}
              </Text>
            )}

            {description && (
              <Text type='body-14-regular' color='neutral-4' className='text-1-line text-left'>
                {description}
              </Text>
            )}
          </div>
        </div>
      </div>
    </CustomLink>
  );
};

export const PostNormally = ({ postDetail, onComment, onTrackingViewTicker }: any) => {
  const messagePostFormat = formatMessage(postDetail?.post?.message);
  const [inView, setInView] = useState(false);

  const { imageMetaData, siteName, videoId } = useMemo(() => {
    const metaData = postDetail?.post?.metadataList?.[0];

    return {
      imageMetaData: metaData?.images?.[0],
      siteName: `${metaData?.siteName}`.toLowerCase(),
      videoId: getVideoId(metaData?.url, metaData?.siteName),
      message: postDetail?.post?.message && formatMessage(postDetail?.post?.message),
      postDetailUrl: ROUTE_PATH.POST_DETAIL(postDetail?.seoMetadata?.slug),
      post_url: postDetail?.post.url ?? '',
    };
  }, [postDetail]);

  const MetaData = () => {
    if (siteName === 'youtube' && videoId) {
      return (
        <InView onChange={setInView} threshold={1}>
          {({ ref }) => (
            <div ref={ref} className='mt-4'>
              <div className='iframe-placeholder h-[345px] w-full'>
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${videoId}?rel=0`}
                  playing={inView}
                  muted={true}
                  controls={true}
                  height={'100%'}
                  width={'100%'}
                />
              </div>
            </div>
          )}
        </InView>
      );
    }

    if (postDetail?.post?.metadata?.length) {
      return <MetaContent metaData={JSON.parse(postDetail?.post?.metadata?.[0]) as any} />;
    }

    if (siteName !== 'youtube' && siteName !== 'vimeo' && siteName !== 'tiktok' && imageMetaData) {
      return (
        <ModalMedia url={imageMetaData}>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={imageMetaData}
            alt={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.alt)}
            title={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.title)}
            className='my-[10px] max-h-[300px] w-full rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white object-cover'
          />
        </ModalMedia>
      );
    }

    return <></>;
  };

  const ShowImage = () => {
    if (postDetail?.post?.urlImages?.length > 0) {
      return (
        <ModalMedia url={postDetail?.post?.urlImages?.[0]}>
          <Image
            width='0'
            height='0'
            sizes='100vw'
            src={postDetail?.post?.urlImages?.[0]}
            alt={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.alt)}
            title={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.title)}
            className='my-[10px] h-[300px] max-h-[300px] w-full rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white object-cover  '
          />
        </ModalMedia>
      );
    }

    if (postDetail?.post?.metadataList?.length) {
      return <MetaData />;
    }

    return <></>;
  };

  return (
    <div className='PostNormally cursor-pointer'>
      {messagePostFormat && (
        <Content
          onComment={onComment}
          postDetail={postDetail}
          messagePostFormat={messagePostFormat}
          onTrackingViewTicker={onTrackingViewTicker}
        />
      )}

      <ShowImage />
    </div>
  );
};
