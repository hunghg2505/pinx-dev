import React, { useLayoutEffect, useRef } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { formatMsgPost, setCurClickedHomePostId } from '@utils/common';
import { POST_DETAIL_PATH, PROFILE_V2, SEARCHSEO, STOCK_DETAIL } from 'src/constant/route';

import useHeight from './useHeight';

const ActivityTheme = ({
  // onRef,
  onComment,
  // isReadMore,
  // onReadMore,
  // readMore,
  postDetailUrl,
  postDetail,
  iconPost,
  messagePostFormat,
  onTrackingViewTicker,
}: any) => {
  const { t } = useTranslation();
  const router = useRouter();
  const isPostDetailPath = router.pathname.startsWith(POST_DETAIL_PATH);
  const [readMore, setReadMore] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState<boolean>(false);
  const [, setSearchSeo] = useAtom(searchSeoAtom);
  // const isReadMore = height > 85;
  const onHandleClick = (e: any) => {
    const textContent = e?.target?.textContent;
    const classElement = e?.target?.className;
    const id = e?.target?.id;
    setSearchSeo(false);
    if (classElement === 'link') {
      // return router.push({
      //   pathname: '/redirecting',
      //   query: { url: textContent },
      // });
      return window.open(textContent);
    }
    if (classElement === 'people') {
      const url = PROFILE_V2(textContent, id);
      return router.push(url);
    }
    if (classElement === 'tagStock') {
      onTrackingViewTicker && onTrackingViewTicker(textContent);
      return router.push(STOCK_DETAIL(textContent));
    }
    if (classElement === 'hashtag') {
      const text = textContent.slice(1);
      return router.push(`${SEARCHSEO}?keyword=${text}`);
    }
    return onComment();
  };
  const onReadMore = () => {
    setReadMore(!readMore);
  };

  const ref = useRef<HTMLDivElement>(null);
  const height = useHeight(ref);
  useLayoutEffect(() => {
    setShowReadMore(height > 84);
  }, [height]);

  return (
    <>
      <div
        className={classNames('ActivityTheme cursor-pointer')}
        onClick={(e: any) => onHandleClick(e)}
        id={`activityTheme-${postDetail.id}`}
      >
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[84px] overflow-hidden': showReadMore,
            '!line-clamp-none !h-auto': isPostDetailPath || readMore,
          })}
        >
          <div
            ref={ref}
            className='messageFormat messageBody'
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

      <CustomLink
        href={postDetailUrl}
        onClick={() => {
          setSearchSeo(false);
          setCurClickedHomePostId(postDetail?.id);
        }}
      >
        <div className='relative w-full  rounded-[9px] mobile:h-[204px] desktop:h-[309px]'>
          <Image
            // width='0'
            // height='0'
            // sizes='100vw'
            fill
            sizes='(min-width: 1400px) 642px, (min-width: 1200px) calc(86.11vw - 546px), (min-width: 800px) calc(100vw - 399px), calc(104.17vw - 58px)'
            src={postDetail?.post.bgImage || postDetail?.post.headImageUrl}
            alt={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.alt)}
            title={formatMsgPost(postDetail?.seoMetadata?.imageSeo?.title)}
            className='absolute right-0 top-0 h-full w-full rounded-[9px] object-cover'
          />
          <div className='absolute bottom-[19px] left-[19px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] mobile:h-[168px] mobile:w-[120px] desktop:h-[269px] desktop:w-[192px]'>
            <div className='flex flex-col items-center justify-center'>
              {iconPost && (
                <Image
                  width={22}
                  height={22}
                  src={iconPost}
                  alt=''
                  className='mobile:mt-[19px] mobile:h-[22px] mobile:w-[22px] desktop:mt-[30px] desktop:h-[32px] desktop:w-[32px]'
                />
              )}

              <Text
                type='body-12-medium'
                color='primary-5'
                className='mobile:mt-[27px] desktop:mt-[45px] desktop:!text-[20px]'
              >
                {postDetail?.post.action === 'SUBSCRIBE' ? t('subscribe') : t('unsubscribe')}
              </Text>
              <Text
                type='body-12-bold'
                color='neutral-2'
                className='text-center mobile:mt-[25px] desktop:mt-[39px] desktop:!text-[20px] desktop:!leading-[24px]'
              >
                {postDetail?.post.themeName}
              </Text>
            </div>
          </div>
        </div>
      </CustomLink>
      {/* </div> */}
    </>
  );
};

export default ActivityTheme;
