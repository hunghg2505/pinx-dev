import React from 'react';

import classNames from 'classnames';
import { useAtom, useAtomValue } from 'jotai';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import CustomLink from '@components/UI/CustomLink';
import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';
import { userLoginInfoAtom } from '@hooks/useUserLoginInfo';
import { searchSeoAtom } from '@store/searchSeo/searchSeo';
import { ROUTE_PATH } from '@utils/common';

export const ActivityTheme = ({
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
  const isPostDetailPath = router.pathname.startsWith(ROUTE_PATH.POST_DETAIL_PATH);
  const [readMore, setReadMore] = React.useState(false);
  const [showReadMore, setShowReadMore] = React.useState<boolean>(false);
  const userDetail = useAtomValue(userLoginInfoAtom);
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
      const url =
        Number(userDetail?.id) === Number(id)
          ? ROUTE_PATH.MY_PROFILE
          : ROUTE_PATH.PROFILE_DETAIL(id);
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
  const onReadMore = () => {
    setReadMore(!readMore);
  };
  React.useEffect(() => {
    const t = setTimeout(() => {
      const ele = document?.getElementById(`activityTheme-${postDetail.id}`);

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
  // console.log('isReadMore', isReadMore);
  // const onRef = useCallback((ele: any) => {
  //   if (!ele) {
  //     return;
  //   }
  //   // console.log('ele', ele?.offsetHeight);
  //   setHeight(ele?.offsetHeight);
  // }, []);
  return (
    <>
      {/* <div className='ActivityTheme'> */}
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

      <CustomLink href={postDetailUrl} onClick={() => setSearchSeo(false)}>
        <div className='relative w-full  rounded-[9px] mobile:h-[204px] desktop:h-[309px]'>
          <img
            src={postDetail?.post.bgImage || postDetail?.post.headImageUrl}
            alt=''
            className='absolute right-0 top-0 h-full w-full rounded-[9px] object-cover'
          />
          <div className='absolute bottom-[19px] left-[19px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] mobile:h-[168px] mobile:w-[120px] desktop:h-[269px] desktop:w-[192px]'>
            <div className='flex flex-col items-center justify-center'>
              {iconPost && (
                <img
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
