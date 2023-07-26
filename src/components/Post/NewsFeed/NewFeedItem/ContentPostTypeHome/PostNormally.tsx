import { useMemo, useState } from 'react';

import classNames from 'classnames';
import { useAtomValue } from 'jotai';
import Link from 'next/link';
import { InView } from 'react-intersection-observer';
import ReactPlayer from 'react-player';

import Fancybox from '@components/UI/Fancybox';
import Text from '@components/UI/Text';
import { useFormatMessagePost } from '@hooks/useFormatMessagePost';
import { postThemeAtom } from '@store/postTheme/theme';
import { ROUTE_PATH, formatMessage, getYoutubeVideoId } from '@utils/common';

export const PostNormally = ({ onReadMore, readMore, postDetail, onComment, height }: any) => {
  const [isReadMorePost, setIsReadMorePost] = useState<boolean>(false);
  const [, setInView] = useState(false);
  const bgTheme = useAtomValue(postThemeAtom);

  const messagePostFormat = useFormatMessagePost(postDetail?.post?.message);

  const { imageMetaData, siteName, videoYoutubeId, urlImages, message, postDetailUrl } =
    useMemo(() => {
      const metaData = postDetail?.post?.metadataList?.[0];

      return {
        imageMetaData: metaData?.images?.[0],
        siteName: metaData?.siteName,
        videoYoutubeId: getYoutubeVideoId(metaData?.url),
        urlImages: postDetail?.post?.urlImages,
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
    if (siteName === 'YouTube' && !urlImages?.[0] && videoYoutubeId) {
      return (
        <>
          <InView onChange={setInView}>
            {({ ref }) => (
              <div ref={ref}>
                <ReactPlayer
                  url={`https://www.youtube.com/embed/${videoYoutubeId}?rel=0`}
                  playing={true}
                  muted={true}
                  controls={true}
                  height={300}
                  width={'100%'}
                />
              </div>
            )}
          </InView>
        </>
      );
    }

    if (imageMetaData) {
      return (
        <div className='theme'>
          <Fancybox
            options={{
              closeButton: true,
            }}
          >
            <a data-fancybox='gallery' href={imageMetaData}>
              <img
                src={imageMetaData}
                alt=''
                className='mobile:h-[185px]desktop:h-[309px] w-full rounded-[8px] object-cover  '
              />
            </a>
          </Fancybox>
        </div>
      );
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

      {!postThemeId && (
        <div>
          <MetaData />
        </div>
      )}

      {urlImages?.length > 0 && (
        <Link href={postDetailUrl}>
          <div className='theme'>
            <img
              src={urlImages?.[0]}
              alt=''
              width={326}
              height={185}
              className='h-[185px] w-full rounded-[10px] object-cover object-top tablet:h-[309px]'
            />
          </div>
        </Link>
      )}
    </div>
  );
};
