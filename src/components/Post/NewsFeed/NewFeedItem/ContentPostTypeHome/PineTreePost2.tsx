/* eslint-disable react/prop-types */
import React from 'react';

import classNames from 'classnames';
// import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';

import ModalMedia from './ModalMedia';

// const ImageHeadPost = dynamic(
//   import('@components/Post/NewsFeed/NewFeedItem/ContentPostTypeHome/ImgHeadPost'),
//   {
//     ssr: false,
//     loading: () => (
//       <img
//         src='/static/images/img-blur.png'
//         alt=''
//         width='0'
//         height='0'
//         sizes='100vw'
//         className='absolute left-0 top-0 h-full w-full rounded-[9px] object-cover'
//       />
//     ),
//   },
// );

export const PineTreePost2 = ({
  // onRef,
  // isReadMore,
  // onReadMore,
  // readMore,
  // postDetailUrl,
  postDetail,
  pinned,
  isPostDetailPath,
  messagePostFormat,
  onComment,
}: any) => {
  const { t } = useTranslation();
  const [readMore, setReadMore] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState<boolean>(false);
  const router = useRouter();

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

  const onReadMore = () => {
    setReadMore(!readMore);
  };
  React.useEffect(() => {
    const t = setTimeout(() => {
      const ele = document?.getElementById(`PineTreePost2-${postDetail.id}`);
      if (ele?.clientHeight) {
        if (window.innerWidth > 768) {
          setShowReadMore(ele?.clientHeight > 84);
        } else {
          setShowReadMore(ele?.clientHeight > 84);
        }
      }
      clearTimeout(t);
    }, 400);
  }, []);

  const ShowImage = () => {
    if (postDetail?.post?.urlImages?.length > 0) {
      return (
        <ModalMedia url={postDetail?.post?.urlImages?.[0]}>
          <img
            src={postDetail?.post?.urlImages?.[0]}
            alt=''
            className='absolute left-0 top-0 h-full w-full rounded-[9px]'
            // blurDataURL="data:..." automatically provided
            // placeholder="blur" // Optional blur-up while loading
          />
        </ModalMedia>
      );
    }

    return <></>;
  };

  return (
    <>
      <div
        className={classNames('PineTreePost2 cursor-pointer')}
        onClick={(e: any) => onHandleClick(e)}
        id={`PineTreePost2-${postDetail.id}`}
      >
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[84px] overflow-hidden': !isPostDetailPath && showReadMore,
            '!line-clamp-none !h-auto': isPostDetailPath || readMore,
          })}
        >
          <div
            className='messageFormat messageBody messageBody'
            dangerouslySetInnerHTML={{ __html: messagePostFormat }}
          ></div>
        </Text>
      </div>

      {!isPostDetailPath && (
        <Fade visible={showReadMore}>
          <Text
            type='body-14-regular'
            color='neutral-3'
            className='cursor-pointer'
            onClick={onReadMore}
          >
            {readMore ? t('see_less') : t('see_more')}
          </Text>
        </Fade>
      )}

      <div
        className={classNames(
          'relative flex h-[113px] w-full flex-col justify-end  rounded-[9px]',
          {
            'h-[250px] tablet:h-[360px] ': !!postDetail?.post?.urlImages.length,
            '!h-0': !postDetail?.post?.urlImages.length && isPostDetailPath,
          },
        )}
      >
        {/* {postDetail?.post?.urlImages.length && (
          <CustomLink href={postDetailUrl} className='absolute left-0 top-0 z-[1]  h-full w-full'>
            <ImageHeadPost headImageUrl={postDetail?.post?.urlImages[0]} />
          </CustomLink>
        )} */}

        <ShowImage />

        {!postDetail?.post?.urlImages.length && pinned && (
          <div className='absolute left-0 top-0 z-[1] h-full  w-full rounded-[9px] bg-neutral_07'></div>
        )}
      </div>
    </>
  );
};
