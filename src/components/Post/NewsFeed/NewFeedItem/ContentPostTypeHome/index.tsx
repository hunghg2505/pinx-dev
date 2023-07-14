import React, { useRef } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IPost, TYPEPOST } from '@components/Post/service';
import Fancybox from '@components/UI/Fancybox';
import Text from '@components/UI/Text';
// import { useContainerDimensions } from '@hooks/useDimensions';
import { postThemeAtom } from '@store/postTheme/theme';
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
  const [isReadMorePost, setIsReadMorePost] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(0);
  const bgTheme = useAtomValue(postThemeAtom);
  const metaData = postDetail?.post?.metadataList?.[0];
  const imageMetaData = metaData?.images?.[0];
  const siteName = metaData?.siteName;
  const url = metaData?.url?.split('/')?.slice(-1);
  const urlImages = postDetail?.post?.urlImages;
  const ref = useRef(null);
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
  React.useEffect(() => {
    const handleClick = (event: any) => {
      const textContent = event?.target?.textContent;
      const classElement = event?.target?.className;
      if (classElement === 'link') {
        router.push({
          pathname: '/redirecting',
          query: { url: textContent },
        });
      }
    };
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);
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
  const renderMetaData = () => {
    if (siteName === 'YouTube' && !urlImages?.[0]) {
      return (
        <iframe
          src={`https://www.youtube.com/embed/${url?.[0]}?rel=0`}
          title='YouTube video player'
          allow='autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          className='mobile:h-[185px] mobile:w-[343px] mobile-max:w-full desktop:h-[309px] desktop:w-[550px]'
        ></iframe>
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
                className='rounded-[8px] object-cover mobile:h-[185px] mobile:w-[343px] mobile-max:w-full desktop:h-[309px] desktop:w-[550px]'
              />
            </a>
          </Fancybox>
        </div>
      );
    }
    return <></>;
  };
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
            {/* {message} */}
            <div
              className='messageFormat messageBody messageBody'
              dangerouslySetInnerHTML={{ __html: message }}
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
          <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] mobile-max:w-full desktop:h-[309px] desktop:w-[550px]'>
            <img
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
                  {postDetail?.post.action === 'SUBSCRIBE' ? 'Subscribe' : 'Unsubscribe'}
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
            {/* <div className='messageFormat messageBody' dangerouslySetInnerHTML={{ __html: message }}></div> */}
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
        <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] mobile-max:w-full desktop:h-[309px] desktop:w-[550px]'>
          <Link href={postDetailUrl}>
            <img
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
            <img
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='h-[18px] w-[18px]'
            />
          </div>
        </div>
      </>
    );
  }

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
            {/* {message} */}
            <div
              className='messageFormat messageBody'
              dangerouslySetInnerHTML={{ __html: message }}
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
          <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] mobile-max:w-full desktop:h-[309px] desktop:w-[550px]'>
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
            {/* {postDetail?.post?.message} */}
            <div
              className='messageFormat messageBody'
              dangerouslySetInnerHTML={{ __html: message }}
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
          <div className='relative rounded-[15px] mobile:h-[204px] mobile:w-[343px] mobile-max:w-full desktop:h-[309px] desktop:w-[550px]'>
            <img
              src={postDetail?.post?.bgImage || '/static/images/postSellStock.png'}
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='absolute right-0 top-0 h-full w-full'
            />
            <div className='absolute rounded-[8px] border-[1px] border-solid border-[rgba(255,255,255,0.44)] bg-[rgba(255,_255,_255,_0.14)] backdrop-blur-[3.4px] backdrop-filter mobile:bottom-[10px] mobile:left-[20px] mobile:h-[168px] mobile:w-[120px] desktop:bottom-[11px] desktop:left-[32px] desktop:h-[269px] desktop:w-[192px]'>
              <img
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
                  <img
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
                  className={classNames(
                    'mb-[4px] mt-[4px] desktop:!text-[20px] desktop:!leading-[28px]',
                    { 'mt-[24px]': postDetail?.post?.type === 'BUY' },
                  )}
                >
                  {postDetail?.post?.type === 'BUY' ? 'Bought' : 'Sell'}
                </Text>
                {postDetail?.post?.type === 'SELL' && (
                  <Text
                    type='body-16-medium'
                    className={classNames('desktop:!text-[24px] desktop:!leading-[32px]', {
                      'text-[#128F63]': pnlRate > 0,
                      'text-[#DB4444]': pnlRate < 0,
                    })}
                  >
                    {pnlRate?.toFixed(2)}%
                  </Text>
                )}

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
              <img
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
          <div className='z-10 min-h-[44px] w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px] bg-[#ffffff] px-[12px] mobile:py-[10px] tablet:py-[16px]'>
            <Link href={postDetailUrl}>
              <Text type='body-16-bold' color='cbblack' className='line-clamp-2'>
                {postDetail?.post?.title}
              </Text>
            </Link>
          </div>
          <div
            onClick={() => onRedirect(url)}
            className='absolute right-[9px] top-[9px] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
          >
            <img
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='h-[18px] w-[18px]'
            />
          </div>
        </div>
      </>
    );
  }
  if ([TYPEPOST.CafeFNews].includes(postDetail?.postType)) {
    const url = postDetail?.post.url ?? '';
    const isReadMore = height > 84;
    return (
      <>
        {postDetail?.post.head && (
          <div
            ref={onRef}
            className={classNames({
              'line-clamp-4 h-[85px] overflow-hidden': isReadMore && !readMore,
              'h-auto': isReadMore && readMore,
            })}
          >
            <Text type='body-14-regular' color='neutral-1' className={classNames('mb-[16px]')}>
              {postDetail?.post.head}
            </Text>
          </div>
        )}

        <div className='relative flex flex-col justify-end rounded-[15px] mobile:h-[204px] mobile:w-[343px] desktop:h-[309px] desktop:w-[550px]'>
          <Link href={postDetailUrl}>
            {postDetail?.post?.headImageUrl && (
              <img
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
          <div className='z-10 min-h-[44px] w-full rounded-bl-none rounded-br-none rounded-tl-[15px] rounded-tr-[15px] bg-[#ffffff] px-[12px] mobile:py-[10px] tablet:py-[16px]'>
            <Link href={postDetailUrl}>
              <Text type='body-16-bold' color='cbblack' className='line-clamp-2'>
                {postDetail?.post?.title}
              </Text>
            </Link>
          </div>
          <div
            onClick={() => onRedirect(url)}
            className='absolute right-[9px] top-[9px] flex h-[36px] w-[36px] cursor-pointer flex-row items-center justify-center rounded-[1000px] bg-[rgba(255,_255,_255,_0.45)]'
          >
            <img
              src='/static/icons/iconLink.svg'
              alt=''
              width='0'
              height='0'
              sizes='100vw'
              className='h-[18px] w-[18px]'
            />
          </div>
        </div>
      </>
    );
  }
  if ([TYPEPOST.POST].includes(postDetail?.postType)) {
    const postThemeId = postDetail?.post?.postThemeId;
    const BgThemePost = bgTheme?.find((item: any) => item.id === postThemeId);
    const color = BgThemePost?.color?.code;
    const urlLink = postDetail?.post?.urlLinks?.[0] || '';
    const onRefHtml = (ele: any) => {
      if (!ele) {
        return;
      }
      const isReadMore = ele?.offsetHeight > 72;
      if (isReadMore) {
        setIsReadMorePost(true);
      }
    };
    return (
      <>
        <div className='1 cursor-pointer'>
          <div onClick={onComment}>
            {postThemeId ? (
              <div
                className='theme relative mobile:-mx-[16px] tablet:mx-0 desktop:!-ml-[63px] desktop:mt-[12px] desktop:w-[660px]'
                onClick={onComment}
              >
                <img
                  src={BgThemePost?.bgImage}
                  alt=''
                  className='pointer-events-none left-0 top-0 w-full object-cover object-top mobile:h-[300px] tablet:rounded-[8px] desktop:h-[393px]'
                />
                {message && (
                  <div>
                    <Text type='body-14-regular' color='neutral-1'>
                      <div
                        className='messageBody desc messageFormat absolute left-2/4 top-2/4 mx-[auto] my-[0] mb-[15px] max-w-[calc(100%_-_20px)] -translate-x-1/2 -translate-y-1/2 transform text-center mobile-max:w-full mobile-max:break-words mobile-max:px-[5px]'
                        dangerouslySetInnerHTML={{ __html: message }}
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
                    onClick={onComment}
                    className={classNames({
                      'line-clamp-4 h-[70px] overflow-hidden': isReadMorePost && !readMore,
                      'h-auto': isReadMorePost && readMore,
                    })}
                  >
                    <Text type='body-14-regular' color='neutral-1'>
                      <div
                        className='desc messageFormat messageBody my-[0] pb-[15px]'
                        style={{ display: '-webkit-box' }}
                        dangerouslySetInnerHTML={{ __html: message }}
                      ></div>
                    </Text>
                    {!message?.includes(urlLink) && urlLink !== '' && (
                      <div className='messageFormat messageBody messageBody -mt-[15px] pb-[15px]'>
                        <Link href='javascript:void(0)' className='link'>
                          {urlLink}
                        </Link>
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
          <div>{renderMetaData()}</div>

          {urlImages?.length > 0 && (
            <Link href={postDetailUrl}>
              <div className='theme'>
                <img
                  src={urlImages?.[0]}
                  alt=''
                  width={326}
                  height={185}
                  className='h-[185px] w-[550px] rounded-[15px] object-cover object-top tablet:h-[309px]'
                />
              </div>
            </Link>
          )}
        </div>
      </>
    );
  }
  return <></>;
};
export default ContentPostTypeHome;
