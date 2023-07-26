import classNames from 'classnames';
import dayjs from 'dayjs';
import Link from 'next/link';

import Text from '@components/UI/Text';

export const ActivityWatchlist = ({
  onRef,
  isReadMore,
  onReadMore,
  readMore,
  postDetailUrl,
  postDetail,
  urlStock,
  onComment,
  messagePostFormat,
}: any) => {
  return (
    <div className='ActivityWatchlist'>
      <div className='cursor-pointer' onClick={onComment} ref={onRef}>
        <Text
          type='body-14-regular'
          color='neutral-1'
          className={classNames('mb-[16px] tablet:!text-[16px]', {
            'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
            'h-auto': isReadMore && readMore,
          })}
        >
          {/* {message} */}
          <div
            className='messageFormat messageBody'
            dangerouslySetInnerHTML={{ __html: messagePostFormat }}
          ></div>
        </Text>
      </div>
      {isReadMore && (
        <Text
          type='body-14-regular'
          color='neutral-3'
          className='cursor-pointer'
          onClick={onReadMore}
        >
          {readMore ? 'See less' : 'See more'}
        </Text>
      )}

      <Link href={postDetailUrl}>
        <div className='relative w-full rounded-[10px] mobile:h-[204px]  desktop:h-[309px]'>
          {postDetail?.post?.bgImage && (
            <img
              src={postDetail?.post?.bgImage}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute right-0 top-0 h-full'
            />
          )}

          <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
            <img
              src={urlStock || '/static/icons/logoStock.svg'}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute -top-[14px] left-2/4 mr-[6px] h-[36px] w-[36px] -translate-x-1/2 transform rounded-full object-contain tablet:-top-[24px] tablet:h-[48px] tablet:w-[48px]'
            />
            <div className='mt-[26px] flex flex-col items-center justify-center tablet:mt-[36px]'>
              <Text
                type='body-16-bold'
                color='neutral-1'
                className='mb-[4px] desktop:!text-[24px] desktop:!leading-[32px]'
              >
                {postDetail?.post.stockCode}
              </Text>
              {postDetail?.post.action === 'ADD' ? (
                <img
                  src='/static/icons/iconHeartActive.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-[24px] w-[24px] desktop:h-[32px] desktop:w-[32px]'
                />
              ) : (
                <img
                  src='/static/icons/iconHeart.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-[24px] w-[24px] desktop:h-[32px] desktop:w-[32px]'
                />
              )}
              <Text
                type='body-12-medium'
                color='neutral-1'
                className='mt-[24px] desktop:mt-[36px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {postDetail?.post.action === 'ADD' ? 'Watching' : 'Unwatch'}
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='mb-[2px] mt-[12px] desktop:mt-[19px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                Made on PineX
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {postDetail?.timeString && dayjs(postDetail?.timeString).format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
