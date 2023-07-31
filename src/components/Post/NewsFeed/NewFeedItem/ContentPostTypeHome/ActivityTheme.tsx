import React, { useMemo } from 'react';

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

import Fade from '@components/UI/Fade';
import Text from '@components/UI/Text';

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
}: any) => {
  const { t } = useTranslation();
  const [height, setHeight] = React.useState(0);
  const [readMore, setReadMore] = React.useState(false);
  // const isReadMore = height > 85;
  const { isReadMore } = useMemo(() => {
    const isReadMore = height > 84;

    return {
      isReadMore,
    };
  }, [postDetail]);

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
  const onRef = (ele: any) => {
    if (!ele) {
      return;
    }
    if (ele?.offsetHeight > 0) {
      setHeight(ele?.offsetHeight);
    }
  };
  const onReadMore = () => {
    setReadMore(!readMore);
  };
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
        ref={onRef}
      >
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] line-clamp-4 tablet:!text-[16px]', {
            'line-clamp-4 h-[80px] overflow-hidden': isReadMore && !readMore,
            'h-auto': isReadMore && readMore,
          })}
        >
          <div
            className='messageFormat messageBody messageBody'
            dangerouslySetInnerHTML={{ __html: messagePostFormat }}
          ></div>
        </Text>
      </div>
      <Fade visible={isReadMore}>
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='cursor-pointer'
          onClick={onReadMore}
        >
          {readMore ? t('see_less') : t('see_more')}
        </Text>
      </Fade>
      <Link href={postDetailUrl}>
        <div className='relative w-full  rounded-[9px] mobile:h-[204px] desktop:h-[309px]'>
          <img
            src={postDetail?.post.bgImage || postDetail?.post.headImageUrl}
            alt=''
            className='absolute right-0 top-0 h-full w-full'
          />
          <div className='absolute bottom-[19px] left-[19px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:h-[168px] mobile:w-[120px] desktop:h-[269px] desktop:w-[192px]'>
            <div className='flex flex-col items-center justify-center'>
              {iconPost && (
                <img
                  src={iconPost}
                  alt=''
                  width='0'
                  height='0'
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
      </Link>
      {/* </div> */}
    </>
  );
};
