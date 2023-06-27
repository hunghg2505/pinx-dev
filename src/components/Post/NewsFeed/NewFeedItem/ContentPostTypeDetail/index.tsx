import React from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import { IPost, TYPEPOST } from '@components/Post/service';
import Text from '@components/UI/Text';
import { formatMessage } from '@utils/common';

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
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const urlStock = `${imageCompanyUrl}${
    postDetail?.post?.stockCode?.length === 3 || postDetail?.post?.stockCode?.[0] !== 'C'
      ? postDetail?.post?.stockCode
      : postDetail?.post?.stockCode?.slice(1, 4)
  }.png`;
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
          <Image
            src={postDetail?.post.bgImage}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute right-0 top-0 h-full'
          />
          <div className='absolute bottom-[19px] left-[19px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:h-[168px] mobile:w-[120px] tablet:bottom-[11px] tablet:left-[32px] tablet:h-[269px] tablet:w-[192px]'>
            <div className='flex flex-col items-center justify-center'>
              <Image
                src={iconPost}
                alt=''
                width='0'
                height='0'
                className='mobile:mt-[19px] mobile:h-[22px] mobile:w-[22px] tablet:mt-[30px] tablet:h-[32px] tablet:w-[32px]'
              />
              <Text
                type='body-12-medium'
                color='primary-5'
                className='mobile:mt-[27px] tablet:mt-[45px] tablet:!text-[20px]'
              >
                {postDetail?.post.action === 'SUBSCRIBE' ? 'Subcribe' : 'unSubcribe'}
              </Text>
              <Text
                type='body-12-bold'
                color='neutral-2'
                className='text-center mobile:mt-[25px] tablet:mt-[39px] tablet:!text-[20px]'
              >
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
      TYPEPOST.PinetreeWeeklyNews,
      TYPEPOST.PinetreePost,
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
          <Image
            src={postDetail?.post.bgImage}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute right-0 top-0 h-full'
          />
          <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[9px] mobile:left-[19px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
            <Image
              src={url || '/static/icons/logoStock.svg'}
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
                <Image
                  src='/static/icons/iconHeartActive.svg'
                  alt=''
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-[24px] w-[24px] desktop:h-[32px] desktop:w-[32px]'
                />
              ) : (
                <Image
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
                color='primary-5'
                className='mt-[24px] desktop:mt-[36px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                {postDetail?.post.action === 'ADD' ? 'Watching' : 'Unwatch'}
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-9'
                className='mb-[2px] mt-[12px] desktop:mt-[19px] desktop:!text-[20px] desktop:!leading-[28px]'
              >
                Made on PineX
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-7'
                className='desktop:!text-[20px] desktop:!leading-[28px]'
              >
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
          <Image
            src={postDetail?.post?.bgImage || '/static/images/postSellStock.png'}
            alt=''
            width='0'
            height='0'
            sizes='100vw'
            className='absolute right-0 top-0 h-full w-full'
          />
          <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[9px] mobile:left-[19px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
            <Image
              src={urlStock || '/static/icons/logoStock.svg'}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute -top-[14px] left-2/4 mr-[6px] h-[36px] w-[36px] -translate-x-1/2 transform rounded-full object-contain tablet:h-[48px] tablet:w-[48px]'
            />
            <div className='mt-[25px] flex flex-col items-center justify-center tablet:mt-[36px]'>
              <Text
                type='body-16-bold'
                color='neutral-1'
                className='tablet:!text-[24px] tablet:!leading-[32px]'
              >
                {postDetail?.post?.stockCode}
              </Text>
              <div className='flex h-[24px] w-[24px] flex-col items-center justify-center rounded-[10000px] bg-[#FFFFFF] tablet:my-[7px] tablet:h-[32px] tablet:w-[32px]'>
                <Image
                  src='/static/icons/iconPostBuy.svg'
                  alt=''
                  width='0'
                  height='0'
                  sizes='100vw'
                  className='w-[12px] tablet:w-[20px]'
                />
              </div>
              <Text
                type='body-12-medium'
                color='neutral-1'
                className='mb-[4px] mt-[4px] tablet:!text-[20px] tablet:!leading-[28px]'
              >
                Sell
              </Text>
              <Text
                type='body-16-medium'
                className={classNames('tablet:!text-[24px] tablet:!leading-[32px]', {
                  'text-[#128F63]': pnlRate > 0,
                  'text-[#DB4444]': pnlRate < 0,
                })}
              >
                {pnlRate.toFixed(2)}%
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='mb-[2px] mt-[10px] tablet:mt-[24px] tablet:!text-[20px] tablet:!leading-[28px]'
              >
                Made on PineX
              </Text>
              <Text
                type='body-12-medium'
                color='neutral-3'
                className='tablet:!text-[20px] tablet:!leading-[28px]'
              >
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
