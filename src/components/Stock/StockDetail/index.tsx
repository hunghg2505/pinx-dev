import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tabs, { TabPane } from 'rc-tabs';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';

import ContentRight from '@components/Home/ContentRight';
import Notification from '@components/UI/Notification';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH, formatNumber } from '@utils/common';
import { IMAGE_COMPANY_URL, USERTYPE } from '@utils/constant';
import PopupComponent from '@utils/PopupComponent';
import { PRODUCT_COMPANY_IMAGE } from 'src/constant';

import CalendarItem from './CalendarItem';
import { DonutChart, PieChart } from './Chart';
import FinancialAnnualTab from './FinancialAnnualTab';
import FinancialQuartersTab from './FinancialQuartersTab';
import HighlighItem from './HighlighItem';
import HoldingRatioItem from './HoldingRatioItem';
import IntradayTab from './IntradayTab';
import MatchingsTab from './MatchingsTab';
import MovementsTab from './MovementsTab';
import NewsItem from './NewsItem';
import RevenueItem from './RevenueItem';
import ReviewItem from './ReviewItem';
import ThemeItem from './ThemeItem';
import AlsoOwnItem from '../AlsoOwnItem';
import styles from '../index.module.scss';
import PopupConfirmReview from '../Popup/PopupConfirmReview';
import PopupHoldingRatio from '../Popup/PopupHoldingRatio';
import PopupReview from '../Popup/PopupReview';
import Rating from '../Rating';
import {
  useCompanyTaggingInfo,
  useFinancialCalendar,
  useFinancialIndex,
  useFollowOrUnfollowStock,
  useHoldingRatio,
  useMyListStock,
  useShareholder,
  useStockDetail,
  useStockDetailsExtra,
  useStockNews,
  useThemesOfStock,
} from '../service';
import { FinancialIndexKey, IFinancialIndex, IResponseMyStocks } from '../type';

const MAX_LINE = 4;
const LINE_HEIGHT = 16;
const MAX_HEIGHT = MAX_LINE * LINE_HEIGHT;
const STOCK_EVENT_ITEM_LIMIT = 4;
const WATCHING_INVESTING_ITEM_LIMIT = 5;
const HIGHLIGH_ROW_LIMIT = 3;
const ALSO_ITEM_LIMIT = 2;
const NEWS_ITEM_LIMIT = 3;

const settings = {
  dots: false,
  // infinite: true,
  speed: 500,
  slidesToShow: 1,
  // slidesToScroll: 1,
  swipeToSlide: true,
  // autoplay: true,
  // autoplaySpeed: 1000,
};

const StockDetail = () => {
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [openPopupConfirmReview, setOpenPopupConfirmReview] = useState(false);
  const [openPopupReview, setOpenPopupReview] = useState(false);
  const [openPopupHoldingRatio, setOpenPopupHoldingRatio] = useState(false);
  const [rating, setRating] = useState(0);
  const [isFollowedStock, setIsFollowedStock] = useState(false);
  const introDescRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useResponsive();
  const { isLogin, statusUser } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);

  const router = useRouter();
  const { stockCode }: any = router.query;

  const { stockDetail } = useStockDetail(stockCode);
  const { shareholder } = useShareholder(stockCode);
  const { refreshMyStocks } = useMyListStock({
    onSuccess: (res: null | IResponseMyStocks) => {
      const isFollowed = !!(res && res.data[0].stocks.some((item) => item.stockCode === stockCode));
      setIsFollowedStock(isFollowed);
    },
  });
  const { financialIndex } = useFinancialIndex(stockCode);
  const { holdingRatio } = useHoldingRatio(stockCode);
  const { stockEvents } = useFinancialCalendar(stockCode);
  const { stockThemes } = useThemesOfStock(stockCode);
  const { stockDetails } = useStockDetailsExtra(stockCode);
  const { taggingInfo } = useCompanyTaggingInfo(stockCode);
  const { stockNews, refreshStockNews } = useStockNews(stockCode);

  const urlImageCompany = `${
    stockDetail?.data?.stockCode?.length === 3 || stockDetail?.data?.stockCode[0] !== 'C'
      ? stockDetail?.data?.stockCode
      : stockDetail?.data?.stockCode?.slice(1, 4)
  }.png`;

  const totalColumnHighligh = Math.ceil(
    (taggingInfo?.data?.highlights.length || 0) / HIGHLIGH_ROW_LIMIT,
  );

  useEffect(() => {
    const introDescHeight = introDescRef.current?.clientHeight || 0;
    introDescHeight && setShowSeeMore(introDescHeight > MAX_HEIGHT);
  }, [stockDetail]);

  const requestFollowOrUnfollowStock = useFollowOrUnfollowStock({
    onSuccess: () => {
      refreshMyStocks();
    },
  });

  const handleBack = () => {
    router.back();
  };

  const goToListCompanyPage = () => {
    router.push({
      pathname: '/stock/business/123',
    });
  };

  const goToSubscriberPage = () => {
    router.push({
      pathname: '/stock/123/subscriber',
    });
  };

  // follow or unfollow stock
  const handleFollowOrUnfollowStock = () => {
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => (
          <Notification
            type='error'
            message='Your account has been pending to close. You cannot perform this action'
          />
        ));
      } else if (statusUser === USERTYPE.VSD) {
        requestFollowOrUnfollowStock.run(isFollowedStock, stockCode);
      } else {
        PopupComponent.openEKYC();
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const convertFinancialIndexData = (data?: IFinancialIndex) => {
    // eslint-disable-next-line unicorn/consistent-function-scoping
    const fakeMultipleLanguage = (value: string) => {
      switch (value) {
        case FinancialIndexKey.marketCap: {
          return 'MARKET CAP';
        }
        case FinancialIndexKey.volume: {
          return 'VOLUME';
        }
        case FinancialIndexKey.pe: {
          return 'P/E';
        }
        case FinancialIndexKey.roe: {
          return 'ROE';
        }
        default: {
          return '';
        }
      }
    };

    if (data) {
      const onlyKeys = new Set([
        FinancialIndexKey.marketCap,
        FinancialIndexKey.volume,
        FinancialIndexKey.pe,
        FinancialIndexKey.roe,
      ]);

      const arr = Object.keys(data);
      arr.push(arr.splice(arr.indexOf(FinancialIndexKey.roe), 1)[0]);

      return arr
        .filter((item) => onlyKeys.has(item))
        .map((item) => ({
          label: fakeMultipleLanguage(item),
          value: formatNumber(data[item as keyof IFinancialIndex] || 0).toString(),
        }));
    }

    return [];
  };

  return (
    <>
      <div className='flex items-start'>
        <div className='rounded-[8px] mobile:w-[375px] tablet:mr-[15px] tablet:w-[calc(100%_-_265px)] desktop:mr-[24px] desktop:w-[749px] desktop:bg-[#FFF] desktop:[box-shadow:0px_1px_2px_0px_rgba(88,_102,_126,_0.12),_0px_4px_24px_0px_rgba(88,_102,_126,_0.08)]'>
          <PopupConfirmReview
            visible={openPopupConfirmReview}
            onClose={() => {
              setOpenPopupConfirmReview(false);
            }}
          />

          <PopupReview
            visible={openPopupReview}
            onClose={() => {
              setOpenPopupReview(false);
            }}
          />

          <div className='flex h-[44px] w-full items-center justify-between px-[16px] tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9] tablet:px-[24px]'>
            <div
              className='-ml-[16px] flex h-full cursor-pointer items-center px-[16px] tablet:px-[24px]'
              onClick={handleBack}
            >
              <img
                src='/static/icons/icon_back_header.svg'
                alt=''
                className='h-[12px] w-[6px] object-contain mobile:block tablet:hidden'
              />

              <img
                src='/static/icons/iconBack.svg'
                alt=''
                className='hidden h-[19px] w-[19px] object-contain tablet:block'
              />
            </div>

            <button
              onClick={handleFollowOrUnfollowStock}
              className='flex h-[32px] items-center justify-center rounded-full bg-[#F7F6F8] px-[10px]'
            >
              {isFollowedStock ? (
                <img
                  src='/static/icons/iconHeartActiveNoShadow.svg'
                  alt='Icon heart'
                  className='h-[16px] w-[16px] object-contain'
                />
              ) : (
                <>
                  <img
                    src='/static/icons/iconHeart2.svg'
                    alt='Icon heart'
                    className='h-[16px] w-[16px] object-contain'
                  />
                  <Text type='body-12-regular' className='ml-[8px] text-[#0D0D0D]'>
                    Follow stock
                  </Text>
                </>
              )}
            </button>
          </div>

          <div className='mt-[12px] flex items-center justify-between px-[16px]'>
            <div className='flex flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[12px]'>
              <div className='flex h-[44px] w-[44px] items-center rounded-[12px] border border-solid border-[#EEF5F9] bg-white px-[5px] shadow-[0_1px_2px_0_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                <img
                  src={IMAGE_COMPANY_URL + urlImageCompany}
                  alt={`Logo ${stockDetail?.data?.name}`}
                  className='block'
                />
              </div>

              <div>
                <div className='flex items-center'>
                  <Text type='body-24-semibold' className='text-[#0D0D0D]'>
                    {stockDetail?.data?.stockCode}
                  </Text>

                  <button className='ml-[8px] h-[20px] min-w-[48px] cursor-text rounded-[4px] border border-solid border-[var(--neutral-7)] px-[10px]'>
                    <Text type='body-10-regular' className='text-[#808A9D]'>
                      {stockDetail?.data?.stockExchange}
                    </Text>
                  </button>
                </div>

                <Text type='body-10-regular' className='primary-5'>
                  {stockDetail?.data?.name}
                </Text>
              </div>
            </div>

            <div className='flex flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[24px]'>
              <div className='flex items-center'>
                <Text type='body-12-regular' className='primary-5 mr-[4px]'>
                  {stockDetails?.data.watchingNo}+
                </Text>

                <div className='flex items-center'>
                  {stockDetails?.data.watchingList
                    .slice(0, 3)
                    .reverse()
                    .map((item, index) => (
                      <img
                        key={index}
                        src={item.avatar}
                        alt='Subscriber user'
                        className='block h-[28px] w-[28px] rounded-full border border-solid border-[#EEF5F9] object-cover [&:not(:first-child)]:-ml-[8px]'
                      />
                    ))}
                </div>
              </div>

              <div className='text-right'>
                <Text type='body-16-medium' className='semantic-2-1'>
                  23,000
                </Text>
                <Text type='body-12-regular' className='semantic-2-1'>
                  +2.3 / 0.02%
                </Text>
              </div>
            </div>
          </div>

          {/* chart */}
          <div className='mt-[8px] px-[16px]'></div>

          {/* tab */}
          <Tabs className={styles.tabs} defaultActiveKey='1'>
            <TabPane tab='Movements' tabKey='1'>
              <MovementsTab />
            </TabPane>

            <TabPane tab='Matchings' key='2'>
              <MatchingsTab />
            </TabPane>

            <TabPane tab='Intraday' key='3'>
              <IntradayTab />
            </TabPane>
          </Tabs>

          {/* intro */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold' className='mb-[16px]'>
              Intro
            </Text>

            <div>
              <div
                style={{ lineHeight: `${LINE_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px` }}
                className={classNames('overflow-hidden', {
                  '!max-h-max': isSeeMore,
                })}
              >
                <div ref={introDescRef} className='leading-[inherit]'>
                  <Text type='body-12-regular' className='!leading-[inherit]'>
                    {stockDetail?.data?.introduction}
                  </Text>
                </div>
              </div>

              {showSeeMore && (
                <button
                  onClick={() => setIsSeeMore((prev) => !prev)}
                  className='mt-[4px] h-[24px] min-w-[65px] rounded-full bg-[#EEF5F9] px-[12px]'
                >
                  <Text type='body-12-semibold' color='primary-2'>
                    {isSeeMore ? 'Less' : 'More'}
                  </Text>
                </button>
              )}
            </div>
          </div>

          <div>
            <div className='mb-[16px] mt-[28px] px-[16px] tablet:px-[24px]'>
              <Text type='body-20-semibold'>Brand awareness</Text>
            </div>

            <div className='overflow-hidden pl-[16px] tablet:pl-[24px]'>
              <Slider {...settings} variableWidth>
                {stockDetail?.data?.products.map((item, index) => (
                  <div key={index} className='mr-[28px] !w-[112px]'>
                    <img
                      src={PRODUCT_COMPANY_IMAGE(item.imageUrl)}
                      alt={item.name}
                      className='h-[112px] w-full rounded-[4px] object-cover'
                    />

                    <Text className='mt-[12px] text-center' type='body-12-regular'>
                      {item.name}
                    </Text>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* main business */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <div className='mb-[4px]'>
              <Text type='body-20-semibold'>Main business</Text>
            </div>

            {taggingInfo?.data?.industries.map((item, index) => (
              <div
                className='flex cursor-pointer items-center border-b border-solid border-[var(--neutral-7)] py-[12px]'
                key={index}
                onClick={goToListCompanyPage}
              >
                {index === 0 ? (
                  <img
                    src='/static/icons/crown.svg'
                    alt='Crown'
                    className='h-[24px] w-[24px] object-contain'
                  />
                ) : (
                  <div className='flex h-[24px] w-[24px] items-center justify-center rounded-[2px] border border-solid border-[var(--primary-5)]'>
                    <Text type='body-10-regular' color='primary-5'>
                      {index + 1}
                    </Text>
                  </div>
                )}

                <Text type='body-12-regular' className='ml-[8px] text-[#0D0D0D]'>
                  {item.tagName}
                </Text>

                <div className='ml-auto px-[6px]'>
                  <img
                    src='/static/icons/iconBlackRight.svg'
                    alt='Icon right'
                    className='h-[6px] w-[4px] object-contain'
                  />
                </div>
              </div>
            ))}
          </div>

          {/* revenue */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold' className='mb-[16px]'>
              Revenue Sources
            </Text>

            <div className='tablet:flex tablet:items-center tablet:justify-between tablet:gap-x-[63px]'>
              <div className='flex justify-center'>
                <PieChart
                  width={319}
                  height={296}
                  data={
                    taggingInfo?.data?.revenues.map((item) => ({ value: item.percentage })) || []
                  }
                />
              </div>

              <div className='mt-[28px] tablet:flex-1'>
                <Text
                  type='body-10-regular'
                  color='primary-5'
                  className='text-center tablet:text-right'
                >
                  Last updated: The 4th quarter year 2022
                </Text>

                <div className='mt-[8px]'>
                  {taggingInfo?.data?.revenues.map((item, index) => (
                    <RevenueItem
                      key={index}
                      value={+item.percentage.toFixed(2)}
                      label={item.sourceVi}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* highlights */}
          <div className='mt-[28px] px-[16px] pb-[28px] tablet:px-[24px]'>
            <Text type='body-20-semibold' className='mb-[16px]'>
              Highlights
            </Text>

            {taggingInfo?.data?.highlights && taggingInfo.data.highlights.length > 6 && isMobile ? (
              <div
                className={classNames(
                  'flex max-w-[375px] gap-x-[12px] overflow-x-auto',
                  styles.noScrollbar,
                )}
              >
                {Array.from({ length: totalColumnHighligh }, (_, index) => index).map(
                  (_, index) => (
                    <div key={index} className='flex flex-col gap-y-[12px]'>
                      {taggingInfo?.data?.highlights
                        .slice(index * HIGHLIGH_ROW_LIMIT, HIGHLIGH_ROW_LIMIT * (index + 1))
                        .map((highlight, highlighIndex) => (
                          <HighlighItem value={highlight.tagName} key={highlighIndex} />
                        ))}
                    </div>
                  ),
                )}
              </div>
            ) : (
              <div className='flex flex-wrap gap-[12px]'>
                {taggingInfo?.data?.highlights.map((item, index) => (
                  <HighlighItem value={item.tagName} key={index} />
                ))}
              </div>
            )}
          </div>

          {/* also own */}
          {taggingInfo?.data?.subsidiaries && taggingInfo.data.subsidiaries.length > 0 && (
            <div className='mb-[28px] border-t border-solid border-[var(--neutral-7)] pt-[28px]'>
              <div className='px-[16px] tablet:px-[24px]'>
                <Text type='body-20-semibold' className='mb-[8px]'>
                  Also Own
                </Text>

                <div className='flex flex-col gap-y-[12px]'>
                  {taggingInfo.data.subsidiaries.slice(0, ALSO_ITEM_LIMIT).map((item, index) => (
                    <AlsoOwnItem data={item} key={index} />
                  ))}
                </div>

                {taggingInfo.data.subsidiaries.length > ALSO_ITEM_LIMIT && (
                  <Link href={ROUTE_PATH.STOCK_ALSO_OWN(stockCode)}>
                    <button className='mt-[8px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'>
                      <Text type='body-14-bold' color='primary-2'>
                        See more
                      </Text>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}

          {/* rating */}
          <div className='border-t-[8px] border-solid border-[#F7F6F8] pt-[28px] tablet:border-t-[1px]'>
            <div className='px-[16px] tablet:px-[24px]'>
              <Text type='body-20-semibold' className='mb-[16px]'>
                Rating
              </Text>
              <Text type='body-14-regular' className='mb-[12px]'>
                How do you like this stock? Let’s spread to the world of investors
              </Text>

              <div className='mb-[28px] flex flex-col gap-y-[12px] tablet:flex-row tablet:justify-between'>
                <Rating star={rating} onChange={(star) => setRating(star)} />

                <div className='flex gap-x-[52px]'>
                  <div>
                    <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                      Avg. score
                    </Text>
                    <Text type='body-20-medium' color='semantic-2-1'>
                      {stockDetails?.data.details.rate.rateAverage.toFixed(2)}
                    </Text>
                  </div>

                  <div>
                    <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                      Votes
                    </Text>
                    <Text type='body-20-medium' className='text-[#0D0D0D]'>
                      {stockDetails?.data.details.rate.totalRates}
                    </Text>
                  </div>

                  <div>
                    <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                      Reviews
                    </Text>

                    <Link href={ROUTE_PATH.STOCK_REVIEW(stockCode)}>
                      <div className='flex items-center'>
                        <Text type='body-20-medium' color='primary-1'>
                          {stockDetails?.data.details.totalReviews}
                        </Text>

                        <img
                          src='/static/icons/iconPrimaryRight.svg'
                          alt='Icon primary right'
                          className='ml-[10px] h-[8px] w-[4px] object-contain'
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {stockDetails?.data.details.children.length ? (
                <>
                  <ReviewItem data={stockDetails.data.details.children[0]} isLatestReview />
                  <Link href={ROUTE_PATH.STOCK_REVIEW(stockCode)}>
                    <button className='mt-[20px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'>
                      <Text type='body-14-bold' color='primary-2'>
                        See more review
                      </Text>
                    </button>
                  </Link>
                </>
              ) : (
                <div className='rounded-[12px] bg-[#F7F6F8] px-[36px] py-[28px] text-center'>
                  <Text type='body-16-semibold' className='text-[#0D0D0D]'>
                    No recent review
                  </Text>

                  <Text type='body-12-regular' className='mb-[28px] mt-[16px] text-[#999999]'>
                    Recent review will show up here,so you can easily view them here later
                  </Text>

                  <Text
                    type='body-14-bold'
                    color='primary-2'
                    className='inline-block cursor-pointer'
                  >
                    Review now
                  </Text>
                </div>
              )}
            </div>
          </div>

          {/* community */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold'>Community</Text>
            <Text type='body-14-regular' className='mt-[16px]'>
              Who is subcribed or investing in this company
            </Text>

            <div className='mt-[16px] flex items-center justify-between tablet:justify-start'>
              <div className='flex gap-x-[10px]'>
                {stockDetails?.data.watchingInvestingList
                  .slice(0, WATCHING_INVESTING_ITEM_LIMIT)
                  .map((item, index) => (
                    <div className='relative' key={index}>
                      <img
                        src={item.avatar}
                        alt='Avatar'
                        className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover'
                      />

                      <img
                        src='/static/icons/iconTree.svg'
                        alt='Icon tree'
                        className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
                      />

                      {/* <img
                        src='/static/icons/iconHeartActive.svg'
                        alt='Icon tree'
                        className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
                      /> */}
                    </div>
                  ))}
              </div>

              <div
                onClick={goToSubscriberPage}
                className='ml-[10px] flex h-[34px] min-w-[90px] cursor-pointer items-center justify-center rounded-full bg-[#F7F6F8] px-[16px]'
              >
                <Text type='body-14-regular' className='text-[#0D0D0D]'>
                  {stockDetails?.data.watchingInvestingNo}
                </Text>
                <img
                  src='/static/icons/iconBlackRight.svg'
                  alt='Icon right'
                  className='ml-[10px] h-[8px] w-[4px]'
                />
              </div>
            </div>
          </div>

          {/* recent news */}
          <div className='mt-[28px]'>
            <div className='mb-[4px] px-[16px] tablet:px-[24px]'>
              <Text type='body-20-semibold'>Recent news</Text>
            </div>

            {stockNews?.data.list && stockNews.data.list.length > 0 && (
              <>
                {stockNews.data.list.slice(0, NEWS_ITEM_LIMIT).map((item, index) => (
                  <NewsItem key={index} data={item} onRefreshNews={refreshStockNews} />
                ))}

                {stockNews.data.list.length > NEWS_ITEM_LIMIT && (
                  <div className='px-[16px] tablet:px-[24px]'>
                    <Link href={ROUTE_PATH.STOCK_NEWS(stockCode)}>
                      <button className='mt-[12px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
                        <Text type='body-14-bold' color='primary-2'>
                          More {stockDetail?.data?.stockCode} news
                        </Text>
                      </button>
                    </Link>
                  </div>
                )}
              </>
            )}
          </div>

          {/* featured in themes */}
          {stockThemes && stockThemes.data.length > 0 && (
            <div className='mt-[28px]'>
              <div className='mb-[16px] px-[16px] tablet:px-[24px]'>
                <Text type='body-20-semibold'>Featured in themes</Text>
              </div>

              <div className='flex gap-x-[12px] px-[16px] tablet:px-[24px]'>
                {stockThemes.data.map((item, index) => (
                  <ThemeItem key={index} data={item} />
                ))}
              </div>
            </div>
          )}

          {/* calendar */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold' className='mb-[16px]'>
              Financial calendar
            </Text>

            <Text type='body-14-regular' className='mb-[12px]'>
              Most recent & upcoming events
            </Text>

            <div className='grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:grid-cols-2'>
              {stockEvents?.data.list.slice(0, STOCK_EVENT_ITEM_LIMIT).map((item, index) => (
                <CalendarItem key={index} data={item.post} />
              ))}
            </div>

            {stockEvents?.data && stockEvents.data.list.length > STOCK_EVENT_ITEM_LIMIT && (
              <Link href={ROUTE_PATH.STOCK_EVENT(stockCode)}>
                <button className='mt-[16px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
                  <Text type='body-14-bold' color='primary-2'>
                    More {stockDetail?.data?.stockCode} events
                  </Text>
                </button>
              </Link>
            )}
          </div>

          {/* financial */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold' className='mb-[16px]'>
              Financial indicator
            </Text>

            <div className='tablet:hidden'>
              <Tabs className={styles.financialTab} defaultActiveKey='1'>
                <TabPane tab='Quarters' tabKey='1'>
                  <FinancialQuartersTab />
                </TabPane>

                <TabPane tab='Annual' key='2'>
                  <FinancialAnnualTab />
                </TabPane>
              </Tabs>
            </div>

            <div className='hidden gap-x-[15px] tablet:flex'>
              <FinancialQuartersTab />
              <FinancialAnnualTab />
            </div>
          </div>

          {/* shareholders */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-bold'>Shareholders</Text>

            {/* chart */}
            <div className='mt-[28px] flex justify-between gap-x-[12px] tablet:items-center'>
              <div className='grid flex-1 grid-cols-1 gap-x-[12px] gap-y-[24px] self-start tablet:grid-cols-2 tablet:self-center'>
                {shareholder?.data?.map((item, index) => (
                  <div key={index} className='self-start'>
                    <div className='mb-[6px] flex items-center'>
                      <div className='h-[10px] w-[35px] rounded-full bg-[linear-gradient(180deg,#ABE898_0%,#72CD5F_100%)]'></div>
                      <Text type='body-14-semibold' className='ml-[4px]'>
                        {item.ratio}%
                      </Text>
                    </div>

                    <Text type='body-12-regular' className='!leading-[16px] text-[#808A9D]'>
                      {item.name}
                    </Text>
                    <Text type='body-12-regular' color='primary-5' className='!leading-[16px]'>
                      {item.value}
                    </Text>
                  </div>
                ))}
              </div>

              <DonutChart
                strokeWidth={isMobile ? 16 : 27}
                width={isMobile ? 183 : 318}
                height={isMobile ? 183 : 318}
                data={shareholder?.data?.map((item) => ({ ...item, value: item.ratio })) || []}
              />
            </div>
          </div>

          {/* holding ratio */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold'>Holding ratio</Text>

            <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
              {holdingRatio?.data.map((item, index) => (
                <HoldingRatioItem key={index} label={item.name} value={`${item.rate}%`} />
              ))}
            </div>
          </div>

          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold'>Financial index</Text>

            <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
              {convertFinancialIndexData(financialIndex?.data).map((item, index) => (
                <HoldingRatioItem key={index} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* activities */}
          <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold'>Activities</Text>

            <div className='my-[20px] flex flex-col gap-y-[16px]'>
              <div className='flex'>
                <img
                  src='https://picsum.photos/200/300'
                  alt='Avatar user'
                  className='h-[28px] w-[28px] rounded-full object-cover'
                />

                <div className='ml-[12px] flex-1'>
                  <div className='relative rounded-[12px] bg-[#F7F6F8] px-[16px] pb-[16px] pt-[12px]'>
                    <div className='flex items-center justify-between'>
                      <Text type='body-14-semibold'>Robbin Klevar</Text>

                      <Text type='body-12-regular' className='text-[#999999]'>
                        3 days ago
                      </Text>
                    </div>

                    <div className='mt-[12px] flex items-center'>
                      <div className='flex h-[24px] w-[24px] items-center justify-center'>
                        <img
                          src='/static/icons/iconHeartActiveNoShadow.svg'
                          alt='Icon heart'
                          className='h-[16px] w-[16px] object-contain'
                        />
                      </div>

                      <Text type='body-14-regular' className='ml-[8px]'>
                        Interested in HPG
                      </Text>
                    </div>

                    <div className='absolute bottom-0 right-[6px] flex h-[24px] translate-y-1/2 items-center justify-center rounded-full bg-[#F0F7FC] px-[10px] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                      <img
                        src='/static/icons/iconLike.svg'
                        alt='Icon like active'
                        className='h-[14px] w-[16px] object-contain'
                      />
                      <Text type='body-12-regular' className='ml-[4px]' color='primary-1'>
                        31
                      </Text>
                    </div>
                  </div>

                  <div className='mt-[8px] flex gap-x-[38px]'>
                    <Text type='body-12-regular' className='text-[#999999]'>
                      Like
                    </Text>

                    <Text type='body-12-regular' className='text-[#999999]'>
                      32 Comment
                    </Text>
                  </div>
                </div>
              </div>

              <div className='flex'>
                <img
                  src='https://picsum.photos/200/300'
                  alt='Avatar user'
                  className='h-[28px] w-[28px] rounded-full object-cover'
                />

                <div className='ml-[12px] flex-1'>
                  <div className='relative rounded-[12px] bg-[#E3F6E2] px-[16px] pb-[16px] pt-[12px]'>
                    <div className='flex items-center justify-between'>
                      <Text type='body-14-semibold'>Robbin Klevar</Text>

                      <Text type='body-12-regular' className='text-[#999999]'>
                        3 days ago
                      </Text>
                    </div>

                    <div className='mt-[12px] flex items-center'>
                      <div className='flex h-[24px] w-[24px] items-center justify-center'>
                        <img
                          src='/static/icons/iconTrading.svg'
                          alt='Icon trading'
                          className='h-[20px] w-[14px] object-contain'
                        />
                      </div>

                      <Text type='body-14-regular' className='ml-[8px]'>
                        Sold HPG
                      </Text>

                      <div className='ml-auto flex h-[25px] items-center justify-center rounded-full bg-[#B9E18E] px-[8px]'>
                        <img
                          src='/static/icons/iconTradingUp.svg'
                          alt='Icon up'
                          className='h-[20px] w-[20px] object-contain'
                        />

                        <Text type='body-16-regular' className='ml-[4px]' color='semantic-2-1'>
                          14.95%
                        </Text>
                      </div>
                    </div>

                    <div className='absolute bottom-0 right-[6px] flex h-[24px] translate-y-1/2 items-center justify-center rounded-full bg-[#F0F7FC] px-[10px] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                      <img
                        src='/static/icons/iconLike.svg'
                        alt='Icon like active'
                        className='h-[14px] w-[16px] object-contain'
                      />
                      <Text type='body-12-regular' className='ml-[4px]' color='primary-1'>
                        31
                      </Text>
                    </div>
                  </div>

                  <div className='mt-[8px] flex gap-x-[38px]'>
                    <Text type='body-12-regular' className='text-[#999999]'>
                      Like
                    </Text>

                    <Text type='body-12-regular' className='text-[#999999]'>
                      32 Comment
                    </Text>
                  </div>
                </div>
              </div>

              <div className='flex'>
                <img
                  src='https://picsum.photos/200/300'
                  alt='Avatar user'
                  className='h-[28px] w-[28px] rounded-full object-cover'
                />

                <div className='ml-[12px] flex-1'>
                  <div className='relative rounded-[12px] bg-[#FBF4F5] px-[16px] pb-[16px] pt-[12px]'>
                    <div className='flex items-center justify-between'>
                      <Text type='body-14-semibold'>Robbin Klevar</Text>

                      <Text type='body-12-regular' className='text-[#999999]'>
                        3 days ago
                      </Text>
                    </div>

                    <div className='mt-[12px] flex items-center'>
                      <div className='flex h-[24px] w-[24px] items-center justify-center'>
                        <img
                          src='/static/icons/iconTrading.svg'
                          alt='Icon trading'
                          className='h-[20px] w-[14px] object-contain'
                        />
                      </div>

                      <Text type='body-14-regular' className='ml-[8px]'>
                        Sold HPG
                      </Text>

                      <div className='ml-auto flex h-[25px] items-center justify-center rounded-full bg-[#F5E4E7] px-[8px]'>
                        <img
                          src='/static/icons/iconTradingDown.svg'
                          alt='Icon up'
                          className='h-[20px] w-[20px] object-contain'
                        />

                        <Text type='body-16-regular' className='ml-[4px] text-[#DA314F]'>
                          14.95%
                        </Text>
                      </div>
                    </div>

                    <div className='absolute bottom-0 right-[6px] flex h-[24px] translate-y-1/2 items-center justify-center rounded-full bg-[#F0F7FC] px-[10px] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                      <img
                        src='/static/icons/iconLike.svg'
                        alt='Icon like active'
                        className='h-[14px] w-[16px] object-contain'
                      />
                      <Text type='body-12-regular' className='ml-[4px]' color='primary-1'>
                        31
                      </Text>
                    </div>
                  </div>

                  <div className='mt-[8px] flex gap-x-[38px]'>
                    <Text type='body-12-regular' className='text-[#999999]'>
                      Like
                    </Text>

                    <Text type='body-12-regular' className='text-[#999999]'>
                      32 Comment
                    </Text>
                  </div>
                </div>
              </div>

              <div className='flex'>
                <img
                  src='https://picsum.photos/200/300'
                  alt='Avatar user'
                  className='h-[28px] w-[28px] rounded-full object-cover'
                />

                <div className='ml-[12px] flex-1'>
                  <div className='relative rounded-[12px] bg-[#F7F6F8] px-[16px] pb-[16px] pt-[12px]'>
                    <div className='flex items-center justify-between'>
                      <Text type='body-14-semibold'>Robbin Klevar</Text>

                      <Text type='body-12-regular' className='text-[#999999]'>
                        3 days ago
                      </Text>
                    </div>

                    <div className='mt-[12px] flex items-center'>
                      <div className='flex h-[24px] w-[24px] items-center justify-center'>
                        <img
                          src='/static/icons/iconTreeNoShadow.svg'
                          alt='Icon heart'
                          className='h-[18px] w-[21px] object-contain'
                        />
                      </div>

                      <Text type='body-14-regular' className='ml-[8px]'>
                        Invested in HPG
                      </Text>
                    </div>

                    <div className='absolute bottom-0 right-[6px] flex h-[24px] translate-y-1/2 items-center justify-center rounded-full bg-[#F0F7FC] px-[10px] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                      <img
                        src='/static/icons/iconLike.svg'
                        alt='Icon like active'
                        className='h-[14px] w-[16px] object-contain'
                      />
                      <Text type='body-12-regular' className='ml-[4px]' color='primary-1'>
                        31
                      </Text>
                    </div>
                  </div>

                  <div className='mt-[8px] flex gap-x-[38px]'>
                    <Text type='body-12-regular' className='text-[#999999]'>
                      Like
                    </Text>

                    <Text type='body-12-regular' className='text-[#999999]'>
                      32 Comment
                    </Text>
                  </div>
                </div>
              </div>

              <div className='flex'>
                <img
                  src='https://picsum.photos/200/300'
                  alt='Avatar user'
                  className='h-[28px] w-[28px] rounded-full object-cover'
                />

                <div className='ml-[12px] flex-1'>
                  <div className='relative rounded-[12px] bg-[#E3F6E2] px-[16px] pb-[16px] pt-[12px]'>
                    <div className='flex items-center justify-between'>
                      <Text type='body-14-semibold'>Robbin Klevar</Text>

                      <Text type='body-12-regular' className='text-[#999999]'>
                        3 days ago
                      </Text>
                    </div>

                    <div className='mt-[12px] flex items-center'>
                      <div className='flex h-[24px] w-[24px] items-center justify-center'>
                        <img
                          src='/static/icons/iconTrading.svg'
                          alt='Icon trading'
                          className='h-[20px] w-[14px] object-contain'
                        />
                      </div>

                      <Text type='body-14-regular' className='ml-[8px]'>
                        Sold HPG
                      </Text>

                      <div className='ml-auto flex h-[25px] items-center justify-center rounded-full bg-[#B9E18E] px-[8px]'>
                        <img
                          src='/static/icons/iconTradingUp.svg'
                          alt='Icon up'
                          className='h-[20px] w-[20px] object-contain'
                        />

                        <Text type='body-16-regular' className='ml-[4px]' color='semantic-2-1'>
                          14.95%
                        </Text>
                      </div>
                    </div>

                    <div className='absolute bottom-0 right-[6px] flex h-[24px] translate-y-1/2 items-center justify-center rounded-full bg-[#F0F7FC] px-[10px] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
                      <img
                        src='/static/icons/iconLike.svg'
                        alt='Icon like active'
                        className='h-[14px] w-[16px] object-contain'
                      />
                      <Text type='body-12-regular' className='ml-[4px]' color='primary-1'>
                        31
                      </Text>
                    </div>
                  </div>

                  <div className='mt-[8px] flex gap-x-[38px]'>
                    <Text type='body-12-regular' className='text-[#999999]'>
                      Like
                    </Text>

                    <Text type='body-12-regular' className='text-[#999999]'>
                      32 Comment
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ContentRight />
      </div>

      <PopupHoldingRatio
        visible={openPopupHoldingRatio}
        onClose={() => {
          setOpenPopupHoldingRatio(false);
        }}
      />
    </>
  );
};

export default StockDetail;
