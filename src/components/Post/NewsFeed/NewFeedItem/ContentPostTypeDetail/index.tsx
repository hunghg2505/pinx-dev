import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { IPost, TYPEPOST } from '@components/Post/service';
import Text from '@components/UI/Text';
import { formatMessage } from '@utils/common';

const IconHeart = () => (
  <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0.5' width='24' height='24' rx='12' fill='white' />
    <rect x='6.5' y='6' width='12' height='12' rx='6' fill='#FF5757' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.4978 9.71856C11.8251 8.93218 10.7034 8.72064 9.86065 9.44073C9.01787 10.1608 8.89922 11.3648 9.56106 12.2164C10.1113 12.9245 11.7767 14.4179 12.3225 14.9013C12.3835 14.9554 12.4141 14.9824 12.4497 14.993C12.4808 15.0023 12.5148 15.0023 12.5459 14.993C12.5815 14.9824 12.612 14.9554 12.6731 14.9013C13.2189 14.4179 14.8842 12.9245 15.4345 12.2164C16.0963 11.3648 15.9921 10.1532 15.1349 9.44073C14.2776 8.72822 13.1704 8.93218 12.4978 9.71856Z'
      fill='white'
    />
  </svg>
);
const IconHeartAction = () => (
  <svg width='25' height='24' viewBox='0 0 25 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='0.5' width='24' height='24' rx='12' fill='white' />
    <rect x='6.5' y='6' width='12' height='12' rx='6' fill='#989898' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12.4978 9.71856C11.8251 8.93218 10.7034 8.72064 9.86065 9.44073C9.01787 10.1608 8.89922 11.3648 9.56106 12.2164C10.1113 12.9245 11.7767 14.4179 12.3225 14.9013C12.3835 14.9554 12.4141 14.9824 12.4497 14.993C12.4808 15.0023 12.5148 15.0023 12.5459 14.993C12.5815 14.9824 12.612 14.9554 12.6731 14.9013C13.2189 14.4179 14.8842 12.9245 15.4345 12.2164C16.0963 11.3648 15.9921 10.1532 15.1349 9.44073C14.2776 8.72822 13.1704 8.93218 12.4978 9.71856Z'
      fill='white'
    />
  </svg>
);
interface IProps {
  postDetail: IPost;
  onNavigate?: () => void;
}
const ContentPostTypeDetail = (props: IProps) => {
  const { postDetail, onNavigate } = props;

  const message =
    postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post);
  const onComment = () => {
    onNavigate && onNavigate();
  };
  const iconPost =
    postDetail?.post.action === 'SUBSCRIBE'
      ? '/static/icons/iconSubcribe.svg'
      : '/static/icons/iconUnSubcribe.svg';
  if (postDetail?.postType === TYPEPOST.ActivityTheme) {
    return (
      <>
        <div className='cursor-pointer' onClick={onComment}>
          <Text type='body-14-regular' color='neutral-1' className='my-[16px]'>
            {message}
          </Text>
        </div>
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-full desktop:pr-[88px]'>
          <Image
            src={postDetail?.post.bgImage}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute right-0 top-0 h-full desktop:pr-[88px]'
          />
          <div className='absolute bottom-[19px] left-[19px] h-[168px] w-[120px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter'>
            <div className='flex flex-col items-center justify-center'>
              <Image
                src={iconPost}
                alt=''
                width='0'
                height='0'
                className='mt-[19px] h-[22px] w-[22px]'
              />
              <Text type='body-12-medium' color='primary-5' className='mt-[27px]'>
                {postDetail?.post.action === 'SUBSCRIBE' ? 'Subcribe' : 'unSubcribe'}
              </Text>
              <Text type='body-12-bold' color='neutral-2' className='mt-[25px] text-center'>
                {postDetail?.post.themeName}
              </Text>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (
    [
      TYPEPOST.PinetreeDailyNews,
      TYPEPOST.PinetreeMorningBrief,
      TYPEPOST.PinetreeMarketBrief,
    ].includes(postDetail?.postType)
  ) {
    const url = postDetail?.post.url ?? '';
    return (
      <>
        <div className='cursor-pointer' onClick={onComment}>
          <Text type='body-14-regular' color='neutral-1' className='my-[16px]'>
            {postDetail?.post.head}
          </Text>
        </div>
        <Link className='mb-[13px] flex items-center justify-end text-right' href={url}>
          <Text type='body-14-regular' color='primary-1' className='mr-[5px]'>
            Read more
          </Text>
          <Image
            src='/static/icons/iconNext.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='w-[5px]'
          />
        </Link>
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-full desktop:pr-[88px]'>
          <Image
            src={postDetail?.post.headImageUrl}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='h-full w-full'
          />
          <Link
            href={url}
            className='absolute left-2/4 top-2/4 flex h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
          >
            <Image
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='w-[18px]'
            />
          </Link>
        </div>
      </>
    );
  }
  if (
    [
      TYPEPOST.VietstockLatestNews,
      TYPEPOST.VietstockNews,
      TYPEPOST.VietstockStockNews,
      TYPEPOST.TNCKNews,
      TYPEPOST.CafeFNews,
    ].includes(postDetail?.postType)
  ) {
    return (
      <>
        <div className='cursor-pointer' onClick={onComment}>
          <Text type='body-14-regular' color='neutral-1' className='my-[16px]'>
            {postDetail?.post.head}
          </Text>
        </div>
        <Link
          className='mb-[13px] flex items-center justify-end text-right'
          href={postDetail?.post.url || ''}
        >
          <Text type='body-14-regular' color='primary-1' className='mr-[5px]'>
            Read more
          </Text>
          <Image
            src='/static/icons/iconNext.svg'
            alt=''
            width={0}
            height={0}
            sizes='100vw'
            className='w-[5px]'
          />
        </Link>
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-full desktop:pr-[88px]'>
          <Image
            src={postDetail?.post.headImageUrl || ''}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='h-full w-full'
          />
          <Link
            href={postDetail?.post.url || ''}
            className='absolute left-2/4 top-2/4 flex h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 transform flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
          >
            <Image
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='w-[18px]'
            />
          </Link>
        </div>
      </>
    );
  }
  if ([TYPEPOST.ActivityWatchlist].includes(postDetail?.postType)) {
    const stockCode = postDetail.post?.stockCode;
    const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
    const url = `${imageCompanyUrl}${
      stockCode?.length === 3 || stockCode?.[0] !== 'C' ? stockCode : stockCode?.slice(1, 4)
    }.png`;
    return (
      <>
        <div className='cursor-pointer' onClick={onComment}>
          <Text type='body-14-regular' color='neutral-1' className='my-[16px]'>
            {message}
          </Text>
        </div>
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-full desktop:pr-[88px]'>
          <Image
            src={postDetail?.post.bgImage}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute right-0 top-0 h-full desktop:pr-[88px]'
          />
          <div className='absolute bottom-[9px] left-[19px] h-[168px] w-[120px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter'>
            <Image
              src={url || '/static/icons/logoStock.svg'}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute -top-[14px] left-2/4 mr-[6px] w-[36px] -translate-x-1/2 transform'
            />
            <div className='mt-[26px] flex flex-col items-center justify-center'>
              <Text type='body-16-bold' color='neutral-1' className='mb-[4px]'>
                {postDetail?.post.stockCode}
              </Text>
              {postDetail?.post.action === 'ADD' ? <IconHeart /> : <IconHeartAction />}
              <Text type='body-12-medium' color='primary-5' className='mt-[24px]'>
                {postDetail?.post.action === 'ADD' ? 'Watching' : 'Unwatch'}
              </Text>
              <Text type='body-12-medium' color='neutral-9' className='mb-[2px] mt-[12px]'>
                Made on PineX
              </Text>
              <Text type='body-12-medium' color='neutral-7'>
                {postDetail?.timeString && dayjs(postDetail?.timeString).format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (postDetail?.postType === TYPEPOST.ActivityMatchOrder) {
    const pnlRate = postDetail?.post?.pnlRate;
    return (
      <>
        <div className='cursor-pointer' onClick={onComment}>
          <Text type='body-14-regular' color='neutral-1' className='my-[16px]'>
            {postDetail?.post?.message}
          </Text>
        </div>
        <div className='relative rounded-[15px]  mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-full desktop:pr-[88px]'>
          <Image
            src={postDetail?.post?.bgImage || '/static/images/postSellStock.png'}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute right-0 top-0 h-full w-full desktop:pr-[88px]'
          />
          <div className='absolute bottom-[9px] left-[19px] h-[168px] w-[120px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter'>
            <Image
              src='/static/icons/logoStock.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute -top-[14px] left-2/4 mr-[6px] w-[36px] -translate-x-1/2 transform'
            />
            <div className='mt-[25px] flex flex-col items-center justify-center'>
              <Text type='body-16-bold' color='neutral-1'>
                {postDetail?.post?.stockCode}
              </Text>
              <div className='flex h-[24px] w-[24px] flex-col items-center justify-center rounded-[10000px] bg-[#FFFFFF]'>
                <Image
                  src='/static/icons/iconPostBuy.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-[12px]'
                />
              </div>
              <Text type='body-12-medium' color='neutral-1' className='mb-[4px] mt-[4px]'>
                Sell
              </Text>
              <Text
                type='body-16-medium'
                className={classNames({
                  'text-[#128F63]': pnlRate > 0,
                  'text-[#DB4444]': pnlRate < 0,
                })}
              >
                {pnlRate.toFixed(2)}%
              </Text>
              <Text type='body-12-medium' color='neutral-4' className='mb-[2px] mt-[10px]'>
                Made on PineX
              </Text>
              <Text type='body-12-medium' color='neutral-4'>
                {dayjs(postDetail?.post?.tradingDate).format('DD/MM/YYYY')}
              </Text>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className='cursor-pointer' onClick={onComment}>
        {message && (
          <div
            className='desc messageFormat mb-[15px] mt-[18px]'
            dangerouslySetInnerHTML={{ __html: message }}
          ></div>
        )}
        {postDetail?.post?.urlImages?.length > 0 && (
          <div className='theme'>
            <Image src='/static/images/theme.jpg' alt='' width={326} height={185} />
          </div>
        )}
      </div>
    </>
  );
};
export default ContentPostTypeDetail;
