/* eslint-disable react/prop-types */
import { memo, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { InView } from 'react-intersection-observer';
import ReactPlayer from 'react-player/youtube';

import ModalMedia from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ModalMedia';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
// import { useFormatMessagePost } from '@hooks/useFormatMessagePost';
import { postThemeAtom } from '@store/postTheme/theme';
import { ROUTE_PATH, formatMessage, getVideoId } from '@utils/common';

const Content = memo(({ postDetail, onComment, messagePostFormat }: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const [showReadMore, setShowReadMore] = useState<boolean>(isPostDetailPath);
  const [readMore, setReadMore] = useState(false);
  const bgTheme = useAtomValue(postThemeAtom);
  const { message } = useMemo(() => {
    const metaData = postDetail?.post?.metadataList?.[0];

    return {
      imageMetaData: metaData?.images?.[0],
      siteName: `${metaData?.siteName}`.toLowerCase(),
      videoId: getVideoId(metaData?.url, metaData?.siteName),
      message:
        postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post),
      postDetailUrl: ROUTE_PATH.POST_DETAIL(postDetail.id),
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

  useEffect(() => {
    const t = setTimeout(() => {
      const ele = document?.getElementById(`post-content-${postDetail.id}`);

      if (ele?.clientHeight) {
        if (window.innerWidth > 768) {
          setShowReadMore(ele?.clientHeight > 78);
        } else {
          setShowReadMore(ele?.clientHeight > 74);
        }
      }
      clearTimeout(t);
    }, 400);
  }, []);
  const onHandleClick = (e: any) => {
    const textContent = e?.target?.textContent;
    const classElement = e?.target?.className;
    if (classElement === 'link') {
      router.push({
        pathname: '/redirecting',
        query: { url: textContent },
      });
    } else {
      onComment();
    }
  };
  const PostContent = () => {
    if (postThemeId) {
      return (
        <div
          className='theme relative flex w-full  flex-col justify-end rounded-[10px] '
          onClick={(event) => onHandleClick(event)}
        >
          <img
            src={BgThemePost?.bgImage}
            alt=''
            className='pointer-events-none left-0 top-0 w-full object-cover object-top mobile:h-[204px] tablet:rounded-[8px] desktop:h-[300px]'
          />
          {message && (
            <div>
              <Text type='body-16-bold' color='neutral-1'>
                <div
                  className='messageBody desc messageFormat absolute left-2/4 top-2/4 mx-[auto] my-[0] mb-[15px] max-w-[calc(100%_-_20px)] -translate-x-1/2 -translate-y-1/2 transform text-center mobile-max:w-full mobile-max:break-words mobile-max:px-[5px]'
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
          className={classNames('line-clamp-4', {
            'h-[74px] overflow-hidden mobile-max:h-[81px] desktop:h-[80px]': showReadMore,
            '!line-clamp-none !h-auto': readMore || isPostDetailPath,
          })}
          onClick={(event) => onHandleClick(event)}
        >
          <Text
            type='body-14-regular'
            color='neutral-1'
            className='tablet:!text-[16px]'
            // onClick={onComment}
          >
            <div
              className='desc messageFormat messageBody'
              dangerouslySetInnerHTML={{ __html: messagePostFormat }}
            ></div>
          </Text>

          {!message?.includes(urlLink) && urlLink !== '' && (
            <CustomLink href={`/redirecting?url=${urlLink}`}>
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

  if (!data) {
    return <></>;
  }

  const { url, imageUrl, title, description } = data;

  return (
    <CustomLink href={`/redirecting?url=${url}`} className='mt-4 block'>
      <div className='relative '>
        <div className='w-full overflow-hidden rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white'>
          {imageUrl && (
            <div className='overflow-hidden'>
              <img
                src={imageUrl}
                alt=''
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

export const PostNormally = ({ postDetail, onComment }: any) => {
  const messagePostFormat = formatMessage(postDetail?.post?.message, postDetail?.post);
  const [inView, setInView] = useState(false);

  const { imageMetaData, siteName, videoId } = useMemo(() => {
    const metaData = postDetail?.post?.metadataList?.[0];

    return {
      imageMetaData: metaData?.images?.[0],
      siteName: `${metaData?.siteName}`.toLowerCase(),
      videoId: getVideoId(metaData?.url, metaData?.siteName),
      message:
        postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post),
      postDetailUrl: ROUTE_PATH.POST_DETAIL(postDetail.id),
      post_url: postDetail?.post.url ?? '',
    };
  }, [postDetail]);

  const MetaData = () => {
    if (siteName === 'youtube' && videoId) {
      return (
        <InView onChange={setInView} threshold={1}>
          {({ ref }) => (
            <div ref={ref} className='mt-4'>
              {/* <iframe
                className='iframe-placeholder h-[345px] w-full'
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                title='YouTube video player'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                scrolling='no'
              ></iframe> */}
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
          <img
            src={imageMetaData}
            alt=''
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
          <img
            src={postDetail?.post?.urlImages?.[0]}
            alt=''
            className='my-[10px]  max-h-[300px] w-full rounded-[9px] border-[1px] border-solid border-[#EBEBEB] bg-white object-cover  '
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
        />
      )}

      <ShowImage />
    </div>
  );
};
