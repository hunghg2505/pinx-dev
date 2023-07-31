import React, { useEffect, useRef, useState } from 'react';

import classNames from 'classnames';
import { useAtom } from 'jotai';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';

import Notification from '@components/UI/Notification';
import NotificationFollowStock from '@components/UI/Notification/FollowStock';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { ROUTE_PATH, formatNumber, imageStock } from '@utils/common';
import { USERTYPE } from '@utils/constant';
import { PRODUCT_COMPANY_IMAGE } from 'src/constant';

import ActivityItem from './ActivityItem';
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
import EmptyData from '../EmptyData';
import styles from '../index.module.scss';
import PopupConfirmReview from '../Popup/PopupConfirmReview';
import PopupFollowStock from '../Popup/PopupFollowStock';
import PopupReview from '../Popup/PopupReview';
import Rating from '../Rating';
import {
  useCompanyTaggingInfo,
  useFinancialCalendar,
  useFinancialIndex,
  useFollowOrUnfollowStock,
  useHoldingRatio,
  useMyListStock,
  useReviewStock,
  useShareholder,
  useStockActivities,
  useStockDetail,
  useStockDetailsExtra,
  useStockNews,
  useThemesOfStock,
} from '../service';
import { CompanyRelatedType, FinancialIndexKey, IFinancialIndex, IResponseMyStocks } from '../type';

const MAX_LINE = 4;
const LINE_HEIGHT = 16;
const MAX_HEIGHT = MAX_LINE * LINE_HEIGHT;
const STOCK_EVENT_ITEM_LIMIT = 4;
const WATCHING_INVESTING_ITEM_LIMIT = 5;
const HIGHLIGH_ROW_LIMIT = 3;
const ALSO_ITEM_LIMIT = 2;
const NEWS_ITEM_LIMIT = 3;
const ACTIVITIES_ITEM_LIMIT = 5;
const STOCK_REVIEW_LIMIT = 1;
const STOCK_FOLLOW_BG = 'https://static.pinetree.com.vn/upload/images/watch.png';
const STOCK_UN_FOLLOW_BG = 'https://static.pinetree.com.vn/upload/images/unwatch.png';

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

const convertFinancialIndexData = (data?: IFinancialIndex) => {
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

const StockDetail = () => {
  const { t, i18n } = useTranslation(['stock', 'common']);
  const [showSeeMore, setShowSeeMore] = useState(false);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const [openPopupConfirmReview, setOpenPopupConfirmReview] = useState(false);
  const [openPopupReview, setOpenPopupReview] = useState(false);
  const [openPopupFollowStock, setOpenPopupFollowStock] = useState(false);
  const [isFollowedStock, setIsFollowedStock] = useState(false);
  const introDescRef = useRef<HTMLDivElement | null>(null);
  const { isMobile } = useResponsive();
  const { isLogin, statusUser, userId } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const refSlide = useRef<any>(null);

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
  const { stockDetails, refreshStockDetails } = useStockDetailsExtra(stockCode);
  const { taggingInfo } = useCompanyTaggingInfo(stockCode);
  const { stockNews, refreshStockNews } = useStockNews(stockCode);
  const { stockActivities, refreshStockActivities } = useStockActivities(stockCode, {
    limit: ACTIVITIES_ITEM_LIMIT,
  });

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

      const title = isFollowedStock
        ? `Tell people the reason you unwatched ${stockCode}?`
        : `Tell people the reason you watched for ${stockCode}?`;

      toast((t) => (
        <NotificationFollowStock
          title={title}
          onClickShare={() => {
            toast.dismiss(t.id);
            setOpenPopupFollowStock(true);
          }}
        />
      ));
    },
  });

  const requestReviewStock = useReviewStock(stockCode, {
    onSuccess: () => {
      refreshStockDetails();
      setOpenPopupConfirmReview(true);
    },
  });

  const handleBack = () => {
    router.back();
  };

  const goToListCompanyPage = (type: CompanyRelatedType, hashtagId: string) => {
    router.push({
      pathname: ROUTE_PATH.STOCK_RELATED(stockCode, hashtagId),
      query: {
        type,
      },
    });
  };

  // follow or unfollow stock
  const handleFollowOrUnfollowStock = () => {
    if (isLogin) {
      requestFollowOrUnfollowStock.run(isFollowedStock, stockCode);
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  const handleRating = (star: number) => {
    requestReviewStock.run({
      rateValue: star,
      message: stockDetails?.data.customerReview?.message,
    });
  };

  // review stock
  const checkUserTypeReview = (callback: () => void) => {
    if (isLogin) {
      if (statusUser === USERTYPE.PENDING_TO_CLOSE) {
        toast(() => (
          <Notification type='error' message={t('common:message_account_pending_to_close')} />
        ));
      } else if (statusUser === USERTYPE.VSD) {
        callback();
      } else {
        setPopupStatus({
          ...popupStatus,
          popupEkyc: true,
        });
      }
    } else {
      setPopupStatus({
        ...popupStatus,
        popupAccessLinmit: true,
      });
    }
  };

  // after send review in popup
  const handleReviewSuccess = () => {
    refreshStockDetails();
    setOpenPopupReview(false);
  };

  return (
    <div className='rounded-[8px] bg-[#fff] shadow-[0px_1px_2px_0px_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
      <PopupConfirmReview
        visible={openPopupConfirmReview}
        onClose={() => {
          setOpenPopupConfirmReview(false);
        }}
        onOpenPopupReview={() => {
          setOpenPopupReview(true);
          setOpenPopupConfirmReview(false);
        }}
      />

      <PopupReview
        visible={openPopupReview}
        star={stockDetails?.data.customerReview?.rateValue || 0}
        message={stockDetails?.data.customerReview?.message}
        onClose={() => {
          setOpenPopupReview(false);
        }}
        stockCode={stockCode}
        onReviewSuccess={handleReviewSuccess}
      />

      <PopupFollowStock
        visible={openPopupFollowStock}
        onClose={() => {
          setOpenPopupFollowStock(false);
        }}
        isFollowedStock={isFollowedStock}
        stockCode={stockCode}
        background={isFollowedStock ? STOCK_FOLLOW_BG : STOCK_UN_FOLLOW_BG}
        onRefreshStockActivities={refreshStockActivities}
      />

      <div className='flex h-[44px] w-full items-center justify-between px-[16px] tablet:h-[72px] tablet:border-b tablet:border-solid tablet:border-[#EEF5F9] tablet:px-[24px]'>
        <div
          className='-ml-[16px] flex h-full cursor-pointer items-center px-[16px] tablet:px-[24px]'
          onClick={handleBack}
        >
          <img
            src='/static/icons/back_icon.svg'
            alt=''
            className='h-[28px] w-[28px] object-contain'
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
                {t('follow_stock')}
              </Text>
            </>
          )}
        </button>
      </div>

      <div className='mt-[12px] flex items-center justify-between px-[16px]'>
        <div className='flex flex-col gap-y-[8px] tablet:flex-row tablet:gap-x-[12px]'>
          <div className='flex h-[44px] w-[44px] items-center rounded-[12px] border border-solid border-[#EEF5F9] bg-white px-[5px] shadow-[0_1px_2px_0_rgba(88,102,126,0.12),0px_4px_24px_0px_rgba(88,102,126,0.08)]'>
            <img
              src={imageStock(stockCode)}
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
      <div className='mt-[8px] border-b border-solid border-[#EBEBEB] px-[16px] pb-[8px] tablet:px-[24px]'>
        <iframe
          src={`https://price.pinetree.vn/chart-index/stock-chart?code=${stockCode}&lang=${i18n.language}&ref=1000`}
          frameBorder='0'
          className='h-[350px] w-full'
        ></iframe>
      </div>

      {/* tab */}
      <Tabs className={styles.tabs} defaultActiveKey='1'>
        <TabPane tab={t('tab.movements')} tabKey='1'>
          <MovementsTab />
        </TabPane>

        <TabPane tab={t('tab.matchings')} key='2'>
          <MatchingsTab />
        </TabPane>

        <TabPane tab={t('tab.intraday')} key='3'>
          <IntradayTab />
        </TabPane>
      </Tabs>

      {/* intro */}
      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          {t('intro')}
        </Text>

        <div>
          <div
            style={{ lineHeight: `${LINE_HEIGHT}px`, maxHeight: `${MAX_HEIGHT}px` }}
            className={classNames('overflow-hidden', {
              '!max-h-max': isSeeMore,
            })}
          >
            <div ref={introDescRef} className='leading-[inherit]'>
              <Text type='body-12-regular' className='whitespace-pre-line !leading-[inherit]'>
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
                {isSeeMore ? t('common:see_less') : t('common:see_more') + '...'}
              </Text>
            </button>
          )}
        </div>
      </div>

      <div>
        <div className='mb-[16px] mt-[28px] px-[16px] tablet:px-[24px]'>
          <Text type='body-20-semibold'>{t('brand_awareness')}</Text>
        </div>

        <div className='relative'>
          <div
            onClick={() => refSlide.current.slickPrev()}
            className='absolute left-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
          >
            <img
              src='/static/icons/iconGrayPrev.svg'
              alt='Icon prev'
              className='h-[16px] w-[7px] object-contain'
            />
          </div>

          <div className='max-w-[700px] overflow-hidden pl-[16px]  tablet:pl-[24px] '>
            <Slider {...settings} variableWidth ref={refSlide}>
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

          <div
            onClick={() => refSlide.current.slickNext()}
            className='absolute right-0 top-1/2 z-10 flex h-[40px] w-[40px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
          >
            <img
              src='/static/icons/iconGrayNext.svg'
              alt='Icon next'
              className='h-[16px] w-[7px] object-contain'
            />
          </div>
        </div>
      </div>

      {/* main business */}
      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <div className='mb-[4px]'>
          <Text type='body-20-semibold'>{t('main_business')}</Text>
        </div>

        {taggingInfo?.data?.industries.map((item, index) => (
          <div
            className='flex cursor-pointer items-center border-b border-solid border-[var(--neutral-7)] py-[12px]'
            key={index}
            onClick={() => goToListCompanyPage(CompanyRelatedType.INDUSTRY, item.id)}
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

            <Text type='body-14-regular' className='ml-[8px] text-[#0D0D0D]'>
              {item.tagName}
            </Text>

            <div className='ml-auto px-[6px]'>
              <img
                src='/static/icons/iconBlackRight.svg'
                alt='Icon right'
                className='h-[12px] w-[8px] object-contain'
              />
            </div>
          </div>
        ))}
      </div>

      {/* revenue */}
      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          {t('revenue_sources')}
        </Text>

        <div className='tablet:flex tablet:items-center tablet:justify-between tablet:gap-x-[63px]'>
          <div className='flex justify-center'>
            <PieChart
              width={319}
              height={296}
              data={taggingInfo?.data?.revenues.map((item) => ({ value: item.percentage })) || []}
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
          {t('highlights')}
        </Text>

        {taggingInfo?.data?.highlights && taggingInfo.data.highlights.length > 6 && isMobile ? (
          <div className={classNames('flex gap-x-[12px] overflow-x-auto', styles.noScrollbar)}>
            {Array.from({ length: totalColumnHighligh }, (_, index) => index).map((_, index) => (
              <div key={index} className='flex flex-col gap-y-[12px]'>
                {taggingInfo?.data?.highlights
                  .slice(index * HIGHLIGH_ROW_LIMIT, HIGHLIGH_ROW_LIMIT * (index + 1))
                  .map((highlight, highlighIndex) => (
                    <HighlighItem
                      onGoToCompaniesRelatedPage={goToListCompanyPage}
                      data={highlight}
                      key={highlighIndex}
                    />
                  ))}
              </div>
            ))}
          </div>
        ) : (
          <div className='flex flex-wrap gap-[12px]'>
            {taggingInfo?.data?.highlights.map((item, index) => (
              <HighlighItem
                onGoToCompaniesRelatedPage={goToListCompanyPage}
                data={item}
                key={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* also own */}
      {taggingInfo?.data?.subsidiaries && taggingInfo.data.subsidiaries.length > 0 && (
        <div className='mb-[28px] pt-[28px]'>
          <div className='px-[16px] tablet:px-[24px]'>
            <Text type='body-20-semibold' className='mb-[8px]'>
              {t('also_own')}
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
                    {t('common:see_more')}
                  </Text>
                </button>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* rating */}
      <div className='pt-[28px]'>
        <div className='px-[16px] tablet:px-[24px]'>
          <Text type='body-20-semibold' className='mb-[16px]'>
            {t('rating.title')}
          </Text>
          <Text type='body-14-regular' className='mb-[12px]'>
            {t('rating.description')}
          </Text>

          <div className='mb-[28px] flex flex-col gap-y-[12px] tablet:flex-row tablet:justify-between'>
            <Rating
              star={stockDetails?.data.customerReview?.rateValue || 0}
              onChange={(star) => checkUserTypeReview(() => handleRating(star))}
            />

            <div className='flex gap-x-[52px]'>
              <div>
                <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                  {t('rating.avg_score')}
                </Text>
                <Text type='body-20-medium' color='semantic-2-1'>
                  {stockDetails?.data.details.rate.rateAverage.toFixed(2)}
                </Text>
              </div>

              <div>
                <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                  {t('rating.votes')}
                </Text>
                <Text type='body-20-medium' className='text-[#0D0D0D]'>
                  {stockDetails?.data.details.rate.totalRates}
                </Text>
              </div>

              <div>
                <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                  {t('rating.reviews')}
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
              <ReviewItem
                isMyReview={userId === stockDetails.data.details.children[0].customerId}
                data={stockDetails.data.details.children[0]}
                isLatestReview
                onEditReviewSuccess={handleReviewSuccess}
              />

              {stockDetails.data.details.totalReviews > STOCK_REVIEW_LIMIT && (
                <Link href={ROUTE_PATH.STOCK_REVIEW(stockCode)}>
                  <button className='mt-[20px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'>
                    <Text type='body-14-bold' color='primary-2'>
                      {t('rating.see_more')}
                    </Text>
                  </button>
                </Link>
              )}
            </>
          ) : (
            <EmptyData
              title={t('rating.empty_title')}
              description={t('rating.empty_description')}
              textHasAction={t('rating.empty_action')}
              onClickTextHasAct={() => checkUserTypeReview(() => setOpenPopupReview(true))}
            />
          )}
        </div>
      </div>

      {/* community */}
      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <Text type='body-20-semibold'>{t('community')}</Text>
        <Text type='body-14-regular' className='mt-[16px]'>
          {t('community_description')}
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

                  {item.isInvesting ? (
                    <img
                      src='/static/icons/iconTree.svg'
                      alt='Icon tree'
                      className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
                    />
                  ) : (
                    <img
                      src='/static/icons/iconHeartActive.svg'
                      alt='Icon tree'
                      className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain'
                    />
                  )}
                </div>
              ))}
          </div>

          <div
            onClick={() => router.push(ROUTE_PATH.STOCK_SUBSCRIBER(stockCode))}
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
          <Text type='body-20-semibold'>{t('recent_news')}</Text>
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
                      {t('more_news', {
                        stockCode: stockDetail?.data?.stockCode,
                      })}
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
            <Text type='body-20-semibold'>{t('featured_in_themes')}</Text>
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
          {t('financial_calendar_title')}
        </Text>

        <Text type='body-14-regular' className='mb-[12px]'>
          {t('financial_calendar_desc')}
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
                {t('more_events', {
                  stockCode: stockDetail?.data?.stockCode,
                })}
              </Text>
            </button>
          </Link>
        )}
      </div>

      {/* financial */}
      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          {t('financial_indicator_title')}
        </Text>

        <div className='tablet:hidden'>
          <Tabs className={styles.financialTab} defaultActiveKey='1'>
            <TabPane tab={t('financial_indicator_quarters')} tabKey='1'>
              <FinancialQuartersTab />
            </TabPane>

            <TabPane tab={t('financial_indicator_annual')} key='2'>
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
        <Text type='body-20-bold'>{t('shareholders_title')}</Text>

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
                  {formatNumber(item.value)}
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
        <Text type='body-20-semibold'>{t('holding_ratio_title')}</Text>

        <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
          {holdingRatio?.data.map((item, index) => (
            <HoldingRatioItem key={index} label={item.name} value={`${item.rate}%`} />
          ))}
        </div>
      </div>

      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <Text type='body-20-semibold'>{t('financial_index_title')}</Text>

        <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
          {convertFinancialIndexData(financialIndex?.data).map((item, index) => (
            <HoldingRatioItem key={index} label={item.label} value={item.value} />
          ))}
        </div>
      </div>

      {/* activities */}
      <div className='mt-[28px] px-[16px] tablet:px-[24px]'>
        <Text type='body-20-semibold'>{t('activities_title')}</Text>

        <div className='flex flex-col gap-y-[16px] py-[20px]'>
          {stockActivities?.data.list.map((item, index) => (
            <ActivityItem data={item} key={index} refreshStockActivities={refreshStockActivities} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
