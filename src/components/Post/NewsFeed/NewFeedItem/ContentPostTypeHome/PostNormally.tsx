/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import { InView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';

import ModalMedia from '@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ModalMedia';
import Text from '@components/UI/Text';
import { useFormatMessagePost } from '@hooks/useFormatMessagePost';
import { postThemeAtom } from '@store/postTheme/theme';
import { ROUTE_PATH, formatMessage, getVideoId } from '@utils/common';

export const PostNormally = ({ onReadMore, readMore, postDetail, onComment, height }: any) => {
  const [isReadMorePost, setIsReadMorePost] = useState<boolean>(false);
  const [, setInView] = useState(false);
  const bgTheme = useAtomValue(postThemeAtom);

  const messagePostFormat = useFormatMessagePost(postDetail?.post?.message);

  const { imageMetaData, siteName, videoId, message } = useMemo(() => {
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
      isReadMore: height > 84,

      color: BgThemePost?.color?.code,
      urlLink: postDetail?.post?.urlLinks?.[0] || '',
      pnlRate: postDetail?.post?.pnlRate,
      postThemeId,
      BgThemePost,
    };
  }, [height, postDetail, bgTheme]);

  const onRefHtml = (ele: any) => {
    if (!ele) {
      return;
    }
    const isReadMore = ele?.offsetHeight > 72;
    if (isReadMore) {
      setIsReadMorePost(true);
    }
  };

  const MetaData = () => {
    if (siteName !== 'youtube' && siteName !== 'vimeo' && siteName !== 'tiktok' && imageMetaData) {
      return (
        <ModalMedia url={imageMetaData}>
          <img
            src={imageMetaData}
            alt=''
            className='mb-5 mt-[6px] max-h-[300px] w-full rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white object-contain p-[12px] desktop:p-[16px]'
          />
        </ModalMedia>
      );
    }

    if (siteName === 'youtube' && videoId) {
      return (
        <InView onChange={setInView}>
          {({ ref }) => (
            <div ref={ref}>
              <ReactPlayer
                url={`https://www.youtube.com/embed/${videoId}?rel=0`}
                playing={true}
                muted={true}
                controls={true}
                height={300}
                width={'100%'}
              />
            </div>
          )}
        </InView>
      );
    }

    if (siteName === 'vimeo' && videoId) {
      return (
        <InView onChange={setInView}>
          {({ ref }) => (
            <div ref={ref}>
              <iframe
                src={`https://player.vimeo.com/video/${videoId}`}
                allow='encrypted-media;'
                className='h-[345px] w-full'
              ></iframe>
            </div>
          )}
        </InView>
      );
    }

    if (siteName === 'tiktok' && videoId) {
      return (
        <InView onChange={setInView}>
          {({ ref }) => (
            <div ref={ref}>
              <iframe
                src={`https://www.tiktok.com/embed/${videoId}`}
                allow='encrypted-media;'
                className='h-[740px] w-full'
              ></iframe>
            </div>
          )}
        </InView>
      );
    }

    return (
      <>
        AAA {siteName} {videoId}
      </>
    );
  };

  const ShowImage = () => {
    if (postDetail?.post?.urlImages?.length > 0) {
      return (
        <ModalMedia url={postDetail?.post?.urlImages?.[0]}>
          <img
            src={postDetail?.post?.urlImages?.[0]}
            alt=''
            className='mb-5 mt-[6px] max-h-[300px] w-full rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-white object-contain p-[12px] desktop:p-[16px]'
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
      <div>
        {postThemeId && postDetail?.post?.message?.length < 254 ? (
          <div
            className='theme relative flex w-full  flex-col justify-end rounded-[10px] '
            onClick={onComment}
          >
            <img
              src={BgThemePost?.bgImage}
              alt=''
              className='pointer-events-none left-0 top-0 w-full object-cover object-top mobile:h-[300px] tablet:rounded-[8px] desktop:h-[393px]'
            />
            {message && (
              <div>
                <Text type='body-14-bold' color='neutral-1'>
                  <div
                    className='messageBody desc messageFormat absolute left-2/4 top-2/4 mx-[auto] my-[0] mb-[15px] max-w-[calc(100%_-_20px)] -translate-x-1/2 -translate-y-1/2 transform text-center mobile-max:w-full mobile-max:break-words mobile-max:px-[5px]'
                    dangerouslySetInnerHTML={{ __html: messagePostFormat }}
                    style={{ color }}
                  ></div>
                </Text>
              </div>
            )}
          </div>
        ) : (
          <>
            {message && (
              <div
                ref={onRefHtml}
                className={classNames({
                  'line-clamp-4 h-[70px] overflow-hidden tablet:h-[80px]':
                    isReadMorePost && !readMore,
                  'h-auto': isReadMorePost && readMore,
                })}
              >
                <Text
                  type='body-14-regular'
                  color='neutral-1'
                  className='tablet:!text-[16px]'
                  onClick={onComment}
                >
                  <div
                    className='desc messageFormat messageBody my-[0] pb-[15px]'
                    dangerouslySetInnerHTML={{ __html: messagePostFormat }}
                  ></div>
                </Text>
                {!message?.includes(urlLink) && urlLink !== '' && (
                  <div className='messageFormat messageBody messageBody -mt-[15px] pb-[15px]'>
                    <span className='link'>{urlLink}</span>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {isReadMorePost && (
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='w-[75px] cursor-pointer'
          onClick={onReadMore}
        >
          {readMore ? 'See less' : 'See more'}
        </Text>
      )}

      <ShowImage />
    </div>
  );
};
