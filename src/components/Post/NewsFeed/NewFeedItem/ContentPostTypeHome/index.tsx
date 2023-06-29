import React, { useRef } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IPost, TYPEPOST } from '@components/Post/service';
import Text from '@components/UI/Text';
// import { useContainerDimensions } from '@hooks/useDimensions';
import { ROUTE_PATH, formatMessage } from '@utils/common';

const ListStock = dynamic(import('./ListStock'), {
  ssr: false,
});
interface IProps {
  postDetail: IPost;
  onNavigate?: () => void;
}
const ContentPostTypeHome = (props: IProps) => {
  const router = useRouter();
  const { postDetail, onNavigate } = props;
  const [readMore, setReadMore] = React.useState(false);
  const ref = useRef(null);
  const [height, setHeight] = React.useState<number>(0);
  const message =
    postDetail?.post?.message && formatMessage(postDetail?.post?.message, postDetail?.post);
  const onComment = () => {
    onNavigate && onNavigate();
  };
  const onReadMore = () => {
    setReadMore(!readMore);
  };
  const onRedirect = (url: string) => {
    router.push({
      pathname: '/redirecting',
      query: { url },
    });
  };
  const onRef = (ele: any) => {
    if (!ele) {
      return;
    }
    setHeight(ele?.offsetHeight);
  };
  const stockCode = postDetail.post?.stockCode;
  const imageCompanyUrl = 'https://static.pinetree.com.vn/upload/images/companies/';
  const urlStock = `${imageCompanyUrl}${
    stockCode?.length === 3 || stockCode?.[0] !== 'C' ? stockCode : stockCode?.slice(1, 4)
  }.png`;
  const iconPost =
    postDetail?.post.action === 'SUBSCRIBE'
      ? '/static/icons/iconSubcribe.svg'
      : '/static/icons/iconUnSubcribe.svg';
  const postDetailUrl = ROUTE_PATH.POST_DETAIL(postDetail.id);
  if (postDetail?.postType === TYPEPOST.ActivityTheme) {
    const isReadMore = height > 84;
    return (
      <>
        <div className={classNames('cursor-pointer')} onClick={onComment} ref={ref}>
          <Text
            type='body-14-regular'
            color='neutral-1'
            className={classNames('mb-[16px]', {
              'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
              'h-auto': isReadMore && readMore,
            })}
          >
            {message}
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
          <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
            <Image
              src={postDetail?.post.bgImage || postDetail?.post.headImageUrl}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute right-0 top-0 h-full w-full'
            />
            <div className='absolute bottom-[19px] left-[19px] rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:h-[168px] mobile:w-[120px] desktop:h-[269px] desktop:w-[192px]'>
              <div className='flex flex-col items-center justify-center'>
                {iconPost && (
                  <Image
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
                  {postDetail?.post.action === 'SUBSCRIBE' ? 'Subcribe' : 'unSubcribe'}
                </Text>
                <Text
                  type='body-12-bold'
                  color='neutral-2'
                  className='text-center mobile:mt-[25px] desktop:mt-[39px] desktop:!text-[20px]'
                >
                  {postDetail?.post.themeName}
                </Text>
              </div>
            </div>
          </div>
        </Link>
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
    const isReadMore = height > 84;
    return (
      <>
        <div ref={onRef}>
          <Text
            type='body-14-regular'
            color='neutral-1'
            className={classNames('mb-[16px]', {
              'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
              'h-auto': isReadMore && readMore,
            })}
          >
            {postDetail?.post.head}
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
          <Link href={postDetailUrl}>
            <Image
              src={
                postDetail?.post.headImageUrl ||
                'https://image.vietstock.vn/2023/06/21/ca-map-ava-20230504_1743152.jpg'
              }
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='h-full w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px]'
            />
          </Link>
          <div className='absolute bottom-0 left-0 line-clamp-2 min-h-[44px] w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px] bg-[#ffffff] px-[12px] mobile:py-[10px] tablet:py-[16px]'>
            <Link href={postDetailUrl}>
              <Text type='body-16-bold' color='cbblack'>
                {postDetail?.post?.title}
              </Text>
            </Link>
          </div>
          <div
            onClick={() => onRedirect(url)}
            // href={url}
            className=' absolute right-[9px] top-[9px] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
          >
            <Image
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='w-[18px]'
            />
          </div>
        </div>
      </>
    );
  }
  // if (
  //   [
  //     TYPEPOST.VietstockLatestNews,
  //     TYPEPOST.VietstockNews,
  //     TYPEPOST.VietstockStockNews,
  //     TYPEPOST.TNCKNews,
  //   ].includes(postDetail?.postType)
  // ) {
  //   return (
  //     <>
  //       <div ref={ref}>
  //         <Text
  //           type='body-14-regular'
  //           color='neutral-1'
  //           className={classNames('mb-[16px] ', {
  //             'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
  //             'h-auto': isReadMore && readMore,
  //           })}
  //         >
  //           {postDetail?.post.head}
  //         </Text>
  //       </div>
  //       {isReadMore && (
  //         <Text
  //           type='body-14-regular'
  //           color='neutral-3'
  //           className='cursor-pointer'
  //           onClick={onReadMore}
  //         >
  //           {readMore ? 'See less' : 'See more'}
  //         </Text>
  //       )}
  //       {/* <Link
  //         className='mb-[13px] flex items-center justify-end text-right'
  //         href={postDetail?.post.url || ''}
  //       >
  //         <Text type='body-14-regular' color='primary-1' className='mr-[5px]'>
  //           Read more
  //         </Text>
  //         <Image
  //           src='/static/icons/iconNext.svg'
  //           alt=''
  //           width={0}
  //           height={0}
  //           sizes='100vw'
  //           className='w-[5px]'
  //         />
  //       </Link> */}
  //       <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
  //         <Link href={postDetailUrl}>
  //           <Image
  //             src={postDetail?.post.headImageUrl || ''}
  //             alt=''
  //             width='0'
  //             height='0'
  //             sizes='100vw'
  //             className='h-full w-full'
  //           />
  //         </Link>
  //         <div
  //           onClick={() => onRedirect(postDetail?.post.url)}
  //           // href={postDetail?.post.url || ''}
  //           className='absolute left-2/4 top-2/4 flex h-[36px] w-[36px] -translate-x-1/2 -translate-y-1/2 transform cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
  //         >
  //           <Image
  //             src='/static/icons/iconLink.svg'
  //             alt=''
  //             width='0'
  //             height='0'
  //             sizes='100vw'
  //             className='w-[18px]'
  //           />
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  if ([TYPEPOST.ActivityWatchlist].includes(postDetail?.postType)) {
    const isReadMore = height > 84;
    return (
      <>
        <div className='cursor-pointer' onClick={onComment} ref={onRef}>
          <Text
            type='body-14-regular'
            color='neutral-1'
            className={classNames('mb-[16px]', {
              'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
              'h-auto': isReadMore && readMore,
            })}
          >
            {message}
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
          <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
            {postDetail?.post?.bgImage && (
              <Image
                src={postDetail?.post?.bgImage}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='absolute right-0 top-0 h-full'
              />
            )}

            <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
              <Image
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
      </>
    );
  }
  if (postDetail?.postType === TYPEPOST.ActivityMatchOrder) {
    const pnlRate = postDetail?.post?.pnlRate;
    const isReadMore = height > 84;
    return (
      <>
        <div className='cursor-pointer' onClick={onComment}>
          <Text
            type='body-14-regular'
            color='neutral-1'
            className={classNames('mb-[16px]', {
              'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
              'h-auto': isReadMore && readMore,
            })}
          >
            {postDetail?.post?.message}
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
          <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
            <Image
              src={postDetail?.post?.bgImage || '/static/images/postSellStock.png'}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute right-0 top-0 h-full w-full'
            />
            <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
              <Image
                src={urlStock || '/static/icons/logoStock.svg'}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='absolute -top-[14px] left-2/4 mr-[6px] h-[36px] w-[36px] -translate-x-1/2 transform rounded-full object-contain desktop:-top-[24px] desktop:h-[48px] desktop:w-[48px]'
              />
              <div className='mt-[25px] flex flex-col items-center justify-center desktop:mt-[36px]'>
                <Text
                  type='body-16-bold'
                  color='neutral-1'
                  className='desktop:!text-[24px] desktop:!leading-[32px]'
                >
                  {postDetail?.post?.stockCode}
                </Text>
                <div className='flex h-[24px] w-[24px] flex-col items-center justify-center rounded-[10000px] bg-[#FFFFFF] desktop:my-[7px] desktop:h-[32px] desktop:w-[32px]'>
                  <Image
                    src='/static/icons/iconPostBuy.svg'
                    alt=''
                    width='0'
                    height='0'
                    sizes='100vw'
                    className='w-[12px] desktop:w-[20px]'
                  />
                </div>
                <Text
                  type='body-12-medium'
                  color='neutral-1'
                  className='mb-[4px] mt-[4px] desktop:!text-[20px] desktop:!leading-[28px]'
                >
                  Sell
                </Text>
                <Text
                  type='body-16-medium'
                  className={classNames('desktop:!text-[24px] desktop:!leading-[32px]', {
                    'text-[#128F63]': pnlRate > 0,
                    'text-[#DB4444]': pnlRate < 0,
                  })}
                >
                  {pnlRate.toFixed(2)}%
                </Text>
                <Text
                  type='body-12-medium'
                  color='neutral-3'
                  className='mb-[2px] mt-[10px] desktop:mt-[24px] desktop:!text-[20px] desktop:!leading-[28px]'
                >
                  Made on PineX
                </Text>
                <Text
                  type='body-12-medium'
                  color='neutral-3'
                  className='desktop:!text-[20px] desktop:!leading-[28px]'
                >
                  {dayjs(postDetail?.post?.tradingDate).format('DD/MM/YYYY')}
                </Text>
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  }
  if (
    [
      TYPEPOST.CafeFNews,
      TYPEPOST.VietstockLatestNews,
      TYPEPOST.VietstockNews,
      TYPEPOST.VietstockStockNews,
      TYPEPOST.TNCKNews,
    ].includes(postDetail?.postType)
  ) {
    const url = postDetail?.post.url ?? '';
    const isReadMore = height > 84;
    return (
      <>
        {(postDetail?.post.head || postDetail?.post?.contentText) && (
          <div
            ref={onRef}
            className={classNames({
              'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
              'h-auto': isReadMore && readMore,
            })}
          >
            <Text type='body-14-regular' color='neutral-1' className={classNames('mb-[16px]')}>
              {postDetail?.post.head || postDetail?.post?.contentText}
            </Text>
          </div>
        )}
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
        <div className='relative flex flex-col justify-end rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
          <Link href={postDetailUrl}>
            {postDetail?.post?.headImageUrl && (
              <Image
                src={postDetail?.post?.headImageUrl}
                alt=''
                width='0'
                height='0'
                sizes='100vw'
                className='absolute left-0 top-0 h-full w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px]'
              />
            )}
          </Link>
          <div className='mb-[10px] w-full overflow-hidden pl-[8px]'>
            <ListStock listStock={postDetail?.post?.tagStocks} />
          </div>
          <div className='z-10 line-clamp-2 min-h-[44px] w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px] bg-[#ffffff] px-[12px] mobile:py-[10px] tablet:py-[16px]'>
            <Link href={postDetailUrl}>
              <Text type='body-16-bold' color='cbblack'>
                {postDetail?.post?.title}
              </Text>
            </Link>
          </div>
          <div
            onClick={() => onRedirect(url)}
            className='absolute right-[9px] top-[9px] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
          >
            <Image
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='w-[18px]'
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className='cursor-pointer' onClick={onComment} ref={onRef}>
        {message && (
          <div
            className='desc messageFormat mb-[15px]'
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
export default ContentPostTypeHome;
