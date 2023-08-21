/* eslint-disable unicorn/no-useless-spread */
import { useCallback, useEffect, useMemo, useState } from 'react';

import classNames from 'classnames';
import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import { useAtom } from 'jotai';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Tabs, { TabPane } from 'rc-tabs';
import { toast } from 'react-hot-toast';

import { requestJoinChannel, requestLeaveChannel, socket } from '@components/Home/service';
import CustomLink from '@components/UI/CustomLink';
import Notification from '@components/UI/Notification';
import NotificationFollowStock from '@components/UI/Notification/FollowStock';
import { Skeleton } from '@components/UI/Skeleton';
import Text from '@components/UI/Text';
import { useResponsive } from '@hooks/useResponsive';
import { useUserType } from '@hooks/useUserType';
import { popupStatusAtom } from '@store/popup/popup';
import { postDetailStatusAtom } from '@store/postDetail/postDetail';
import { ROUTE_PATH, formatNumber, getStockColor } from '@utils/common';
import { USERTYPE } from '@utils/constant';

import ActivityItem from './ActivityItem';
import StockAlsoOwnSkeleton from './AlsoOwn/skeleton';
import CalendarItem from './CalendarItem';
import { DonutChart } from './Chart';
import ChartIframe from './ChartIframe';
import FinancialAnnualTab from './FinancialAnnualTab';
import FinancialQuartersTab from './FinancialQuartersTab';
import StockHighlightsSkeleton from './Highlights/skeleton';
import HoldingRatioItem from './HoldingRatioItem';
import IntradayTab from './IntradayTab';
import IntroSkeleton from './Intro/skeleton';
import MainBusinessSkeleton from './MainBusiness/skeleton';
import MatchingsTab from './MatchingsTab';
import MovementsTab from './MovementsTab';
import NewsItem from './NewsItem';
import StockProductSkeleton from './Products/skeleton';
import StockRevenueSkeleton from './Revenue/skeleton';
import ReviewItem from './ReviewItem';
import FakeStockHeading from './StockHeading/fakeHeading';
import ThemeItem from './ThemeItem';
import { SHARE_HOLDER_COLOR } from '../const';
import EmptyData from '../EmptyData';
import styles from '../index.module.scss';
import PopupConfirmReview from '../Popup/PopupConfirmReview';
import PopupFollowStock from '../Popup/PopupFollowStock';
import PopupReview from '../Popup/PopupReview';
import PopupZoomChart from '../Popup/PopupZoomChart';
import Rating from '../Rating';
import {
  useCompanyTaggingInfo,
  useFinancialCalendar,
  useFinancialIndex,
  useFollowOrUnfollowStock,
  useGetStockData,
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
import {
  FinancialIndexKey,
  IFinancialIndex,
  IResponseMyStocks,
  IStockData,
  TabType,
} from '../type';

const STOCK_EVENT_ITEM_LIMIT = 4;
const WATCHING_INVESTING_ITEM_LIMIT = 4;
const NEWS_ITEM_LIMIT = 3;
const ACTIVITIES_ITEM_LIMIT = 5;
const STOCK_REVIEW_LIMIT = 1;
const STOCK_FOLLOW_BG = 'https://static.pinetree.com.vn/upload/images/watch.png';
const STOCK_UN_FOLLOW_BG = 'https://static.pinetree.com.vn/upload/images/unwatch.png';

const StockHeading = dynamic(() => import('@components/Stock/StockDetail/StockHeading'), {
  ssr: false,
  loading: () => <FakeStockHeading />,
});

const Intro = dynamic(() => import('@components/Stock/StockDetail/Intro'), {
  ssr: false,
  loading: () => <IntroSkeleton />,
});

const StockProducts = dynamic(() => import('@components/Stock/StockDetail/Products'), {
  ssr: false,
  loading: () => <StockProductSkeleton />,
});

const StockMainBusiness = dynamic(() => import('@components/Stock/StockDetail/MainBusiness'), {
  ssr: false,
  loading: () => <MainBusinessSkeleton />,
});

const StockRevenue = dynamic(() => import('@components/Stock/StockDetail/Revenue'), {
  ssr: false,
  loading: () => <StockRevenueSkeleton />,
});

const StockHighlights = dynamic(() => import('@components/Stock/StockDetail/Highlights'), {
  ssr: false,
  loading: () => <StockHighlightsSkeleton />,
});

const StockAlsoOwn = dynamic(() => import('@components/Stock/StockDetail/AlsoOwn'), {
  ssr: false,
  loading: () => <StockAlsoOwnSkeleton />,
});

dayjs.extend(quarterOfYear);
dayjs.extend(minMax);
const StockDetail = () => {
  const { t } = useTranslation(['stock', 'common']);
  const [currentTab, setCurrentTab] = useState<string>(TabType.MOVEMENTS);

  const [openPopupConfirmReview, setOpenPopupConfirmReview] = useState(false);
  const [openPopupReview, setOpenPopupReview] = useState(false);
  const [openPopupFollowStock, setOpenPopupFollowStock] = useState(false);
  const [openPopupZoomChart, setOpenPopupZoomChart] = useState(false);
  const [isFollowedStock, setIsFollowedStock] = useState(false);

  const { isMobile } = useResponsive();
  const { isLogin, statusUser, userId } = useUserType();
  const [popupStatus, setPopupStatus] = useAtom(popupStatusAtom);
  const [postDetailStatus, setPostDetailStatus] = useAtom(postDetailStatusAtom);
  const [dataStock, setDataStock] = useState<IStockData>();
  const [preDataStock, setPreDataStock] = useState<IStockData>();

  const router = useRouter();
  const { stockCode }: any = router.query;

  const { stockDetail } = useStockDetail(stockCode, {
    onError: () => {
      router.push(ROUTE_PATH.NOT_FOUND);
    },
  });
  const { shareholder, loading: loadingShareHolder } = useShareholder(stockCode);
  const { refreshMyStocks } = useMyListStock({
    onSuccess: (res: null | IResponseMyStocks) => {
      const isFollowed = !!(res && res.data[0].stocks.some((item) => item.stockCode === stockCode));
      setIsFollowedStock(isFollowed);
    },
  });
  const { financialIndex, loading: loadingFinancialIndex } = useFinancialIndex(stockCode);
  const { holdingRatio, loading: loadingHoldingRatio } = useHoldingRatio(stockCode);
  const { stockEvents, loading: loadingStockEvents } = useFinancialCalendar(stockCode);
  const { stockThemes, loading: loadingTheme } = useThemesOfStock(stockCode);
  const {
    stockDetails,
    refreshStockDetails,
    loading: loadingStockDetails,
  } = useStockDetailsExtra(stockCode);
  const { taggingInfo } = useCompanyTaggingInfo(stockCode, {
    onError: (e) => {
      if (e.errorCode === 'error.company.not.found') {
        router.push(ROUTE_PATH.NOT_FOUND);
      }
    },
  });
  const { stockNews, refreshStockNews, loading: loadingStockNews } = useStockNews(stockCode);
  const { stockActivities, refreshStockActivities } = useStockActivities(stockCode, {
    limit: ACTIVITIES_ITEM_LIMIT,
  });
  useGetStockData(stockCode, {
    onSuccess: (res) => {
      setDataStock((prev) => ({ ...prev, ...res.data }));
      setPreDataStock((prev) => ({ ...prev, ...res.data }));
    },
  });

  const { shareholderChartData } = useMemo(() => {
    const shareholderChartData =
      shareholder?.data?.map((item) => ({ ...item, value: item.ratio })) || [];

    return {
      shareholderChartData,
    };
  }, [shareholder]);

  useEffect(() => {
    socket.on('public', (message: any) => {
      const data = message.data;
      if (!dataStock || !stockCode || (data.sym !== stockCode && stockCode !== data.symbol)) {
        return;
      }

      // 3220
      if (
        data?.id === 3220 &&
        (data.lastPrice !== dataStock.lastPrice ||
          data.changePc !== dataStock.changePc ||
          dataStock.lot !== data.totalVol ||
          dataStock.ot !== data.change)
      ) {
        setPreDataStock(dataStock);
        setDataStock((prev: any) => ({
          ...prev,
          lastPrice: data.lastPrice,
          changePc: data.changePc,
          lot: data.totalVol,
          ot: data.change,
        }));
      }

      // 3250
      if (
        data?.id === 3250 &&
        (data.fBVol !== dataStock.fBVol ||
          data.fSVolume !== dataStock.fSVolume ||
          dataStock.fRoom !== data.fRoom)
      ) {
        setPreDataStock(dataStock);
        setDataStock((prev: any) => ({
          ...prev,
          fBVol: data.fBVol,
          fSVolume: data.fSVolume,
          fRoom: data.fRoom,
        }));
      }

      // sell
      if (
        data.side === 'S' &&
        (data.g1 !== dataStock.g4 || data.g2 !== dataStock.g5 || data.g3 !== dataStock.g6)
      ) {
        setPreDataStock(dataStock);
        setDataStock((prev: any) => ({
          ...prev,
          g4: data.g1,
          g5: data.g2,
          g6: data.g3,
        }));
      }

      // buy
      if (
        data.side === 'B' &&
        (data.g1 !== dataStock.g1 || data.g2 !== dataStock.g2 || data.g3 !== dataStock.g3)
      ) {
        setPreDataStock(dataStock);
        setDataStock((prev: any) => ({
          ...prev,
          g1: data.g1,
          g2: data.g2,
          g3: data.g3,
        }));
      }
    });

    return () => {
      socket.off('public');
    };
  }, [stockCode, dataStock]);

  useEffect(() => {
    requestJoinChannel(stockCode);

    return () => {
      setCurrentTab(TabType.MOVEMENTS);
      requestLeaveChannel(stockCode);
    };
  }, [stockCode]);

  const requestFollowOrUnfollowStock = useFollowOrUnfollowStock({
    onSuccess: () => {
      refreshMyStocks();
      refreshStockDetails();
      setPostDetailStatus({ ...postDetailStatus, isChangeStockWatchList: true });
      if (![USERTYPE.NEW, USERTYPE.PENDING_TO_CLOSE].includes(statusUser)) {
        const title = isFollowedStock
          ? t('tell_people_reason_unwatched', {
              stockCode,
            })
          : t('tell_people_reason_watched', {
              stockCode,
            });

        toast(
          (t) => (
            <NotificationFollowStock
              title={title}
              onClickShare={() => {
                toast.dismiss(t.id);
                setOpenPopupFollowStock(true);
              }}
            />
          ),
          {
            duration: 5000,
            style: {
              maxWidth: '90vw',
            },
          },
        );
      }
    },
  });

  const requestReviewStock = useReviewStock(stockCode, {
    onSuccess: () => {
      refreshStockDetails();
      setOpenPopupConfirmReview(true);
    },
  });

  const handleBack = useCallback(() => {
    router.back();
  }, [router]);

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

  const manualTranslate = (value: string) => {
    switch (value) {
      case FinancialIndexKey.marketCap: {
        return t('financial_index.market_cap');
      }
      case FinancialIndexKey.volume: {
        return t('financial_index.volume');
      }
      case FinancialIndexKey.pe: {
        return t('financial_index.p/e');
      }
      case FinancialIndexKey.roe: {
        return t('financial_index.roe');
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
          label: manualTranslate(item),
          value: formatNumber(data[item as keyof IFinancialIndex] || 0).toString(),
        }));
    }

    return [];
  };

  const { chartColorFormat } = useMemo(() => {
    const chartColor = getStockColor(
      dataStock?.lastPrice || 0,
      dataStock?.c || 0,
      dataStock?.f || 0,
      dataStock?.r || 0,
    );
    const chartColorFormat = chartColor.slice(1);

    return {
      chartColorFormat,
    };
  }, [dataStock]);

  const handleOpenPopupZoom = () => {
    setOpenPopupZoomChart(true);
  };

  return (
    <div>
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

      <PopupZoomChart
        visible={openPopupZoomChart}
        onClose={() => {
          setOpenPopupZoomChart(false);
        }}
        stockCode={stockCode}
        refPrice={dataStock?.r}
        color={chartColorFormat}
      />

      <div className='box-shadow card-style'>
        <div className='flex h-[44px] w-full items-center justify-between tablet:h-[48px]'>
          <div className='flex h-full cursor-pointer items-center' onClick={handleBack}>
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

        <StockHeading
          stockCode={stockCode}
          stockDetails={stockDetails}
          stockDetail={stockDetail}
          dataStock={dataStock}
          preDataStock={preDataStock}
        />

        {/* chart */}
        <div className='relative mt-[8px] border-b border-solid border-[#EBEBEB] pb-[8px] pt-[36px]'>
          <ChartIframe stockCode={stockCode} refPrice={dataStock?.r} color={chartColorFormat} />

          {/* icon maximize */}
          <div
            onClick={handleOpenPopupZoom}
            className='absolute right-[22px] top-[8px] flex cursor-pointer items-center justify-center'
          >
            <img
              src='/static/icons/icon_maximize.svg'
              alt='Icon maximize'
              className='h-[18px] w-[18px] object-contain'
            />
          </div>
        </div>

        {/* tab */}
        <Tabs
          className={styles.tabs}
          activeKey={currentTab}
          onChange={(tabKey) => {
            setCurrentTab(tabKey);
          }}
        >
          <TabPane tab={t('tab.movements')} key={TabType.MOVEMENTS}>
            <MovementsTab stockData={dataStock} preDataStock={preDataStock} />
          </TabPane>

          <TabPane tab={t('tab.matchings')} key={TabType.MATCHINGS}>
            <MatchingsTab stockCode={stockCode} stockRefPrice={dataStock?.r || 0} />
          </TabPane>

          <TabPane tab={t('tab.intraday')} key={TabType.INTRADAY}>
            <IntradayTab stockCode={stockCode} stockData={dataStock} />
          </TabPane>
        </Tabs>
      </div>

      {/* intro */}
      <Intro stockDetail={stockDetail} />

      {/* brand awareness */}
      <StockProducts stockDetail={stockDetail} />

      {/* main business */}
      <StockMainBusiness stockCode={stockCode} taggingInfo={taggingInfo} />

      {/* revenue */}
      <StockRevenue taggingInfo={taggingInfo} />

      {/* highlights */}
      <StockHighlights taggingInfo={taggingInfo} stockCode={stockCode} />

      {/* also own */}
      <StockAlsoOwn taggingInfo={taggingInfo} stockCode={stockCode} />

      {/* rating */}
      <div className='box-shadow card-style'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          {t('rating.title')}
        </Text>
        <Text type='body-14-regular' className='mb-[12px] galaxy-max:text-[12px]'>
          {t('rating.description')}
        </Text>

        <div className='mb-[28px] flex flex-col gap-y-[12px] tablet:flex-row tablet:justify-between'>
          <Rating
            star={stockDetails?.data.customerReview?.rateValue || 0}
            onChange={(star) => checkUserTypeReview(() => handleRating(star))}
          />

          <div className='flex gap-x-[52px] galaxy-max:gap-[32px]'>
            <div className='text-center'>
              <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                {t('rating.avg_score')}
              </Text>
              <Text type='body-20-medium' className='text-[#F1BA09]'>
                {stockDetails?.data.details.rate.rateAverage.toFixed(2)}
              </Text>
            </div>

            <div className='text-center'>
              <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                {t('rating.votes')}
              </Text>
              <Text type='body-20-medium' className='text-[#0D0D0D]'>
                {stockDetails?.data.details.rate.totalRates}
              </Text>
            </div>

            <div className='text-center'>
              <Text type='body-12-regular' className='mb-[4px] text-[#0D0D0D]'>
                {t('rating.reviews')}
              </Text>

              <CustomLink href={ROUTE_PATH.STOCK_REVIEW(stockCode)}>
                <div className='flex items-center justify-center'>
                  <Text type='body-20-medium' color='primary-1'>
                    {stockDetails?.data.details.totalReviews}
                  </Text>

                  <img
                    src='/static/icons/iconPrimaryRight.svg'
                    alt='Icon primary right'
                    className='ml-[10px] h-[8px] w-[4px] object-contain'
                  />
                </div>
              </CustomLink>
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
              <CustomLink href={ROUTE_PATH.STOCK_REVIEW(stockCode)}>
                <button className='mt-[20px] flex h-[46px] w-full items-center justify-center rounded-[8px] bg-[#EEF5F9]'>
                  <Text type='body-14-bold' color='primary-2'>
                    {t('rating.see_more')}
                  </Text>
                </button>
              </CustomLink>
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

      {/* community */}
      {(loadingStockDetails ||
        (stockDetails?.data.watchingInvestingList &&
          stockDetails?.data.watchingInvestingList.length > 0)) && (
        <div className='box-shadow card-style'>
          <Text type='body-20-semibold'>{t('community')}</Text>
          <Text type='body-14-regular' className='mt-[16px] galaxy-max:text-[12px]'>
            {t('community_description')}
          </Text>

          <div className='mb-[8px] mt-[16px] flex items-center justify-between tablet:justify-start'>
            {loadingStockDetails ? (
              <>
                <Skeleton
                  rows={4}
                  wrapClassName='!flex-row !gap-x-[10px] mr-[16px]'
                  width={40}
                  height={40}
                  avatar
                />

                <Skeleton round height={34} />
              </>
            ) : (
              <>
                <CustomLink
                  href={ROUTE_PATH.STOCK_SUBSCRIBER(stockCode)}
                  className='flex gap-x-[10px] galaxy-max:gap-[6px]'
                >
                  {stockDetails?.data.watchingInvestingList
                    .slice(0, WATCHING_INVESTING_ITEM_LIMIT)
                    .map((item, index) => (
                      <div className='relative' key={index}>
                        <img
                          src={item.avatar}
                          alt='Avatar'
                          className='h-[40px] w-[40px] rounded-full border border-solid border-[#EEF5F9] object-cover galaxy-max:h-[30px] galaxy-max:w-[30px]'
                        />

                        {item.isInvesting ? (
                          <img
                            src='/static/icons/iconTree.svg'
                            alt='Icon tree'
                            className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain galaxy-max:h-[20px] galaxy-max:w-[20px]'
                          />
                        ) : (
                          <img
                            src='/static/icons/iconHeartActive.svg'
                            alt='Icon tree'
                            className='absolute bottom-0 left-1/2 h-[24px] w-[24px] -translate-x-1/2 translate-y-1/2 object-contain galaxy-max:h-[20px] galaxy-max:w-[20px]'
                          />
                        )}
                      </div>
                    ))}
                </CustomLink>

                <div
                  onClick={() => router.push(ROUTE_PATH.STOCK_SUBSCRIBER(stockCode))}
                  className='ml-[10px] flex h-[34px] min-w-[90px] cursor-pointer items-center justify-center rounded-full bg-[#F7F6F8] px-[16px] galaxy-max:px-[12px]'
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
              </>
            )}
          </div>
        </div>
      )}

      {/* recent news */}
      {(loadingStockNews || (stockNews?.data.list && stockNews.data.list.length > 0)) && (
        <div className='box-shadow card-style'>
          <div className='mb-[4px]'>
            <Text type='body-20-semibold'>{t('recent_news')}</Text>
          </div>

          {loadingStockNews && (
            <div>
              {[...new Array(3)].map((_, index) => (
                <div
                  key={index}
                  className='flex items-center gap-x-[12px] border-solid border-[#EBEBEB] py-[12px] [&:not(:last-child)]:border-b'
                >
                  <div className='flex-1'>
                    <div className='mb-[12px] flex items-center gap-x-[8px]'>
                      <Skeleton width={24} height={24} round />
                      <Skeleton round height={12} />
                    </div>

                    <Skeleton height={12} rows={2} className='!w-full' wrapClassName='w-full' />
                  </div>

                  <Skeleton width={73} height={73} className='!rounded-[12px]' />
                </div>
              ))}
            </div>
          )}

          {stockNews?.data?.list.slice(0, NEWS_ITEM_LIMIT).map((item, index) => (
            <NewsItem key={index} data={item} onRefreshNews={refreshStockNews} />
          ))}

          {stockNews?.data?.list.length > NEWS_ITEM_LIMIT && (
            <CustomLink href={ROUTE_PATH.STOCK_NEWS(stockCode)}>
              <button className='mt-[12px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
                <Text type='body-14-bold' color='primary-2'>
                  {t('more_news', {
                    stockCode: stockDetail?.data?.stockCode,
                  })}
                </Text>
              </button>
            </CustomLink>
          )}
        </div>
      )}

      {/* featured in themes */}
      {(loadingTheme || (stockThemes && stockThemes.data.length > 0)) && (
        <div className='box-shadow card-style'>
          <div className='mb-[16px]'>
            <Text type='body-20-semibold'>{t('featured_in_themes')}</Text>
          </div>

          <div className={classNames('flex gap-x-[12px] overflow-x-auto', styles.noScrollbar)}>
            {loadingTheme ? (
              <Skeleton
                width={149}
                height={214}
                rows={10}
                wrapClassName='!flex-row gap-x-[12px]'
                className='!rounded-[12px]'
              />
            ) : (
              stockThemes?.data.map((item, index) => <ThemeItem key={index} data={item} />)
            )}
          </div>
        </div>
      )}

      {/* calendar */}
      {(loadingStockEvents || (stockEvents?.data.list && stockEvents?.data.list.length > 0)) && (
        <div className='box-shadow card-style'>
          <Text type='body-20-semibold' className='mb-[16px]'>
            {t('financial_calendar_title')}
          </Text>

          <Text type='body-14-regular' className='mb-[12px] galaxy-max:text-[12px]'>
            {t('financial_calendar_desc')}
          </Text>

          <div className='grid grid-cols-1 gap-x-[15px] gap-y-[12px] tablet:grid-cols-2'>
            {loadingStockEvents
              ? [...new Array(4)].map((_, index) => (
                  <Skeleton
                    key={index}
                    height={89}
                    wrapClassName='w-full'
                    className='!w-full !rounded-[8px]'
                  />
                ))
              : stockEvents?.data.list
                  .slice(0, STOCK_EVENT_ITEM_LIMIT)
                  .map((item, index) => <CalendarItem key={index} data={item.post} />)}
          </div>

          {stockEvents?.data && stockEvents.data.list.length > STOCK_EVENT_ITEM_LIMIT && (
            <CustomLink href={ROUTE_PATH.STOCK_EVENT(stockCode)}>
              <button className='mt-[16px] h-[46px] w-full rounded-[8px] bg-[#EEF5F9]'>
                <Text type='body-14-bold' color='primary-2'>
                  {t('more_events', {
                    stockCode: stockDetail?.data?.stockCode,
                  })}
                </Text>
              </button>
            </CustomLink>
          )}
        </div>
      )}

      {/* financial */}
      <div className='box-shadow card-style'>
        <Text type='body-20-semibold' className='mb-[16px]'>
          {t('financial_indicator_title')}
        </Text>

        <div className='tablet:hidden'>
          <Tabs className={styles.financialTab} defaultActiveKey='1'>
            <TabPane tab={t('financial_indicator_quarters')} tabKey='1'>
              <FinancialQuartersTab stockCode={stockCode} />
            </TabPane>

            <TabPane tab={t('financial_indicator_annual')} key='2'>
              <FinancialAnnualTab stockCode={stockCode} />
            </TabPane>
          </Tabs>
        </div>

        <div className='hidden gap-x-[15px] tablet:flex'>
          <FinancialQuartersTab stockCode={stockCode} />
          <FinancialAnnualTab stockCode={stockCode} />
        </div>
      </div>

      {/* shareholders */}
      {(loadingShareHolder || (shareholder?.data && shareholder.data.length > 0)) && (
        <div className='box-shadow card-style'>
          <Text type='body-20-bold'>{t('shareholders_title')}</Text>

          {/* chart */}
          <div className='mt-[28px] flex flex-col-reverse justify-between gap-x-[12px] gap-y-[28px] tablet:flex-row tablet:items-center'>
            {loadingShareHolder ? (
              <>
                <div className='grid flex-1 grid-cols-1 gap-x-[12px] gap-y-[24px] self-start tablet:grid-cols-2 tablet:self-center'>
                  {[...new Array(6)].map((_, index) => (
                    <div className='self-start' key={index}>
                      <Skeleton height={15} round width={80} />
                      <Skeleton height={15} width={130} wrapClassName='mt-[8px]' round />
                    </div>
                  ))}
                </div>

                <div className='mx-auto'>
                  <Skeleton width={183} height={183} round />
                </div>
              </>
            ) : (
              <>
                <div className='grid flex-1 grid-cols-1 gap-x-[12px] gap-y-[24px] self-start tablet:grid-cols-2 tablet:self-center'>
                  {shareholder?.data?.map((item, index) => (
                    <div key={index} className='self-start'>
                      <div className='mb-[6px] flex items-center'>
                        <div
                          className='h-[10px] w-[35px] rounded-full'
                          style={{
                            backgroundColor:
                              SHARE_HOLDER_COLOR[
                                index %
                                  (shareholder?.data && shareholder?.data.length > 0
                                    ? shareholder.data.length
                                    : 0)
                              ],
                          }}
                        ></div>
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

                <div className='mx-auto'>
                  <DonutChart
                    strokeWidth={isMobile ? 16 : 27}
                    width={isMobile ? 183 : 318}
                    height={isMobile ? 183 : 318}
                    data={shareholderChartData}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* holding ratio */}
      {(loadingHoldingRatio || (holdingRatio?.data && holdingRatio?.data.length > 0)) && (
        <div className='box-shadow card-style'>
          <Text type='body-20-semibold'>{t('holding_ratio_title')}</Text>

          {loadingHoldingRatio ? (
            <div className='mt-[16px]'>
              {[...new Array(6)].map((_, index) => (
                <div
                  className='flex items-center justify-between border-solid border-[#E6E6E6] py-[12px] [&:not(:last-child)]:border-b'
                  key={index}
                >
                  <Skeleton />
                  <Skeleton width={50} />
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
              {holdingRatio?.data.map((item, index) => (
                <HoldingRatioItem key={index} label={item.name} value={`${item.rate}%`} />
              ))}
            </div>
          )}
        </div>
      )}

      {(loadingFinancialIndex || financialIndex?.data) && (
        <div className='box-shadow card-style'>
          <Text type='body-20-semibold'>{t('financial_index_title')}</Text>

          {loadingFinancialIndex ? (
            <div className='mt-[16px]'>
              {[...new Array(4)].map((_, index) => (
                <div
                  className='flex items-center justify-between border-solid border-[#E6E6E6] py-[12px] [&:not(:last-child)]:border-b'
                  key={index}
                >
                  <Skeleton />
                  <Skeleton width={50} />
                </div>
              ))}
            </div>
          ) : (
            <div className='mt-[16px] rounded-[12px] bg-[#F7F6F8]'>
              {convertFinancialIndexData(financialIndex?.data).map((item, index) => (
                <HoldingRatioItem key={index} label={item.label} value={item.value} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* activities */}
      <div className='box-shadow card-style'>
        <Text type='body-20-semibold'>{t('activities_title')}</Text>

        {stockActivities?.data?.list && stockActivities.data?.list.length > 0 ? (
          <div className='flex flex-col gap-y-[16px] pt-[20px]'>
            {stockActivities?.data.list.map((item, index) => (
              <ActivityItem
                data={item}
                key={index}
                refreshStockActivities={refreshStockActivities}
              />
            ))}
          </div>
        ) : (
          <div className='mt-[20px]'>
            <EmptyData
              title={t('empty_activities.title')}
              description={t('empty_activities.description')}
              textHasAction={
                isFollowedStock
                  ? t('empty_activities.text_action_share_act')
                  : t('empty_activities.text_action_not_follow')
              }
              onClickTextHasAct={
                isFollowedStock
                  ? () => {
                      setOpenPopupFollowStock(true);
                    }
                  : handleFollowOrUnfollowStock
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDetail;
