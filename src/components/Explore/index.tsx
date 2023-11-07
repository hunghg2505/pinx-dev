import React from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import { FILTER_TYPE } from '@components/Home/ModalFilter/modal-filter';
import Influencer from '@components/Home/People/Influencer';
import { ITheme, useGetListNewFeed, useGetTheme } from '@components/Home/service';
import { optionTab } from '@components/PinexTop20';
import { IPost } from '@components/Post/service';
import { ExploreButton } from '@components/UI/Button';
import CustomLink from '@components/UI/CustomLink';
import { Skeleton } from '@components/UI/Skeleton';
import { SplideCustomWrap } from '@components/UI/Splide/Splide';
import { SplideSlide } from '@components/UI/Splide/SplideSlide/SplideSlide';
import Text from '@components/UI/Text';
import useSpildeOptions from '@hooks/useSplideOptions';
import {
  HOME,
  PEOPLEINSPOTLIGHT,
  PINEX_TOP_20,
  THEME,
  TOP_WATCHING,
  TOPMENTION,
} from 'src/constant/route';
import {
  getMoreInfoTracking,
  viewStockListTracking,
  viewTickerInfoTracking,
} from 'src/mixpanel/mixpanel';

import IPO from './IPO';
import KeywordSearch from './KeywordSearch';
import PinexTop from './PinexTop';
import Search from './Search';
import {
  IStockIPO,
  ITopWatchingStock,
  useGetAllIPO,
  useGetKeyWordsTop,
  useGetTopMentionStock,
  useGetTopWatchingStock,
} from './service';
import SuggestionPeople from './SuggestionPeople';
import TrendingOnnPinex from './TrendingOnPinex/inndex';
import WatchingStock from './WatchingStock';

const ThemesItem = dynamic(() => import('@components/Themes/ThemesItem'), {
  ssr: false,
});

const handleTrackingViewListStock = (presetName: string, presetGroup = '') => {
  viewStockListTracking(presetName, presetGroup, 'Basic category', 'Explore screen');
};

// tracking event view ticker info
const handleTrackingViewTickerInfo = (stockCode: string, location: string) => {
  viewTickerInfoTracking(stockCode, 'Explore screen', location, 'Stock');
};

// tracking event get more info
const handleTrackingGetMoreInfo = (infoGroup: string, infoDetail: string) => {
  getMoreInfoTracking('Explore screen', infoGroup, infoDetail);
};

const Explore = () => {
  const { defaultSplideOptions } = useSpildeOptions();
  const { t } = useTranslation(['theme', 'explore']);
  const [isShowMoreKeyword, setIsShowMoreKeyword] = React.useState<boolean>(false);
  const refClick: any = React.useRef(null);

  const { theme, refresh: refreshTheme, fetchTheme } = useGetTheme();
  const { keyWords, loading: loadingKeywords, mutate } = useGetKeyWordsTop();
  const {
    run,
    listNewFeed,
    loading: loadingTrendingOnPinex,
    refresh: refreshTrendingOnPinex,
  } = useGetListNewFeed();
  const { listStock, loading: loadingTopWatchingStock } = useGetTopWatchingStock();
  const { stockIPO, loading: loadingIPO } = useGetAllIPO();
  const { listMention, loading: loadingTopMentionStock } = useGetTopMentionStock();

  const listKeyWords = isShowMoreKeyword ? keyWords : keyWords?.slice(0, 5);
  const maxKeyWords = keyWords && Math.max(...keyWords?.map((item: any) => item.numberHit));
  const maxTopWatchStock = listStock && Math.max(...listStock?.map((item: any) => item.totalCount));
  const maxTopMentionStock =
    listMention && Math.max(...listMention?.map((item: any) => item.totalCount));

  React.useEffect(() => {
    run(FILTER_TYPE.MOST_REACTED);
    fetchTheme();
  }, []);

  React.useEffect(() => {
    const t = setTimeout(() => {
      // const prevPath = sessionStorage.getItem('prevPath');
      // if (prevPath && prevPath.includes('/post/')) {
      const position = sessionStorage.getItem('scrollPosition');
      if (position) {
        window.scrollTo({ top: +position, left: 0, behavior: 'auto' });
      }
      // }
      sessionStorage.removeItem('scrollPosition');
      clearTimeout(t);
    }, 300);
  }, []);

  const onShowMoreKeyWords = () => {
    setIsShowMoreKeyword(!isShowMoreKeyword);
  };
  const onClickKeyword = (value: any) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    if (refClick?.current) {
      refClick?.current?.onKeyDown(value);
    }
    const newList = keyWords.map((item: any) =>
      item.keyword === value ? { ...item, numberHit: item.numberHit + 1 } : item,
    );
    mutate({ data: newList });
  };

  return (
    <div className='w-full rounded-[8px] text-left desktop:-mt-[16px] desktop:py-[16px]'>
      <div className='box-shadow mb-[18px] rounded-[12px] border-[1px] border-solid border-[#EBEBEB] bg-[white] p-[12px] desktop:p-[16px]'>
        <Text
          type='body-24-semibold'
          color='cbblack'
          className='tablet:!text-[28px] tablet:!font-bold'
        >
          {t('discovery')}
        </Text>

        <Search ref={refClick} />
      </div>

      <div className='box-shadow card-style'>
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='mb-[16px] galaxy-max:text-[18px]'
        >
          {t('top_keyword_search')}
        </Text>

        <div className='mb-[16px] flex flex-col gap-y-[12px]'>
          {loadingKeywords || !listKeyWords ? (
            <Skeleton
              className='!h-[51px] !w-full !rounded-[15px]'
              rows={5}
              wrapClassName='!gap-y-[12px]'
            />
          ) : (
            listKeyWords?.map((item: any, index: number) => {
              return (
                <div
                  onClick={() => onClickKeyword(item.keyword)}
                  key={index}
                  className='cursor-pointer'
                >
                  <KeywordSearch percen={(item?.numberHit / maxKeyWords) * 100} data={item} />
                </div>
              );
            })
          )}
        </div>

        {loadingKeywords || !listKeyWords ? (
          <Skeleton className='!h-[52px] !w-full !rounded-[8px]' />
        ) : (
          <ExploreButton onClick={onShowMoreKeyWords}>
            {isShowMoreKeyword ? (
              <div className='flex items-center justify-center'>
                <Text type='body-14-bold' color='primary-2'>
                  {t('hide')}
                </Text>
                <img
                  loading='lazy'
                  src='/static/icons/explore/iconUp.svg'
                  className='h-[24px] w-[24px]'
                  alt=''
                />
              </div>
            ) : (
              <div
                className='flex items-center justify-center'
                onClick={() => handleTrackingGetMoreInfo('Keywords', 'Top keywords search')}
              >
                <Text type='body-14-bold' color='primary-2'>
                  {t('explore_top_search')}
                </Text>
                <img
                  loading='lazy'
                  src='/static/icons/explore/iconDown.svg'
                  className='h-[24px] w-[24px]'
                  alt=''
                />
              </div>
            )}
          </ExploreButton>
        )}
      </div>

      <div className='box-shadow card-style'>
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='mb-[16px] galaxy-max:text-[18px]'
        >
          {t('people_in_spotlight')}
        </Text>

        <div className='mb-[16px]'>
          <Influencer />
        </div>

        <CustomLink
          href={PEOPLEINSPOTLIGHT}
          onClick={() => handleTrackingGetMoreInfo('User', 'List people in spotlight')}
        >
          <ExploreButton>
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_influencer')}
            </Text>
          </ExploreButton>
        </CustomLink>
      </div>

      <SuggestionPeople />

      <div className='box-shadow card-style'>
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='mb-[16px] galaxy-max:text-[18px]'
        >
          {t('themes')}
        </Text>

        <div className='relative mb-[16px]'>
          <SplideCustomWrap options={defaultSplideOptions}>
            {theme?.map((theme: ITheme, index: number) => {
              return (
                <SplideSlide key={index}>
                  <div className='mr-[16px] w-[161px] mobile-max:mr-[16px]'>
                    <ThemesItem refresh={refreshTheme} theme={theme} />
                  </div>
                </SplideSlide>
              );
            })}
          </SplideCustomWrap>
        </div>
        <CustomLink href={THEME} onClick={() => handleTrackingGetMoreInfo('Theme', 'List theme')}>
          <ExploreButton>
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_themes')}
            </Text>
          </ExploreButton>
        </CustomLink>
      </div>

      <div className='box-shadow card-style'>
        <Text type='body-20-semibold' color='neutral-1' className='mb-[8px] galaxy-max:text-[18px]'>
          {t('top_watching_stock')}
        </Text>
        <Text type='body-14-regular' color='neutral-black' className='mb-[12px]'>
          {t('top_watching_stock_pinex')}
        </Text>
        <div className='mb-[16px] flex flex-col gap-y-[12px]'>
          {loadingTopWatchingStock ? (
            <Skeleton
              className='!h-[51px] !w-full !rounded-[15px]'
              rows={5}
              wrapClassName='!gap-y-[12px]'
            />
          ) : (
            listStock &&
            [...listStock]?.slice(0, 5)?.map((item: ITopWatchingStock, index: number) => {
              return (
                <WatchingStock
                  percen={(item.totalCount / maxTopWatchStock) * 100}
                  key={`stock-${index}`}
                  data={item}
                  onTrackingViewTickerInfo={() =>
                    handleTrackingViewTickerInfo(item?.stockCode, 'Top watching stock')
                  }
                />
              );
            })
          )}
        </div>

        {loadingTopWatchingStock ? (
          <Skeleton className='mt-[16px] !h-[45px] !w-full !rounded-[8px]' />
        ) : (
          <CustomLink href={TOP_WATCHING}>
            <ExploreButton
              onClick={() => {
                handleTrackingViewListStock('Top watching stock');
                handleTrackingGetMoreInfo('Stock', 'Top watching stock');
              }}
            >
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_top_watching_stock')}
              </Text>
            </ExploreButton>
          </CustomLink>
        )}
      </div>

      <div className='box-shadow card-style'>
        <Text type='body-20-semibold' color='neutral-1' className='mb-[8px] galaxy-max:text-[18px]'>
          {t('top_mention_stock')}
        </Text>

        <Text type='body-14-regular' color='neutral-black' className='mb-[12px]'>
          {t('top_most_mention_stock_pinex')}
        </Text>

        <div className='mb-[16px] flex flex-col gap-y-[12px]'>
          {loadingTopMentionStock ? (
            <Skeleton
              className='!h-[51px] !w-full !rounded-[15px]'
              rows={5}
              wrapClassName='!gap-y-[12px]'
            />
          ) : (
            listMention &&
            [...listMention]?.splice(0, 5)?.map((item: ITopWatchingStock, index: number) => {
              return (
                <WatchingStock
                  percen={(item.totalCount / maxTopMentionStock) * 100}
                  key={`stock-${index}`}
                  data={item}
                  mention
                  onTrackingViewTickerInfo={() =>
                    handleTrackingViewTickerInfo(item?.stockCode, 'Top mention stock')
                  }
                />
              );
            })
          )}
        </div>

        {loadingTopMentionStock ? (
          <Skeleton className='mt-[16px] !h-[45px] !w-full !rounded-[8px]' />
        ) : (
          <CustomLink href={TOPMENTION}>
            <ExploreButton
              onClick={() => {
                handleTrackingViewListStock('Top mention stock');
                handleTrackingGetMoreInfo('Stock', 'Top mention stock');
              }}
            >
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_top_mention_stock')}
              </Text>
            </ExploreButton>
          </CustomLink>
        )}
      </div>

      <div className='box-shadow card-style'>
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='mb-[16px] galaxy-max:text-[18px]'
        >
          {t('pinex_top_20')}
        </Text>
        <div className='relative mb-[16px]'>
          <SplideCustomWrap options={defaultSplideOptions}>
            {optionTab?.map((item: any) => (
              <SplideSlide key={item.value}>
                <PinexTop
                  onClick={() =>
                    handleTrackingViewListStock(t(`explore:${item.label}`), 'Top 20 pinex')
                  }
                  label={t(`explore:${item.label}`)}
                  value={item.value}
                />
              </SplideSlide>
            ))}
          </SplideCustomWrap>
        </div>

        <CustomLink href={PINEX_TOP_20}>
          <ExploreButton
            onClick={() => {
              handleTrackingViewListStock('Top 20 pinex');
              handleTrackingGetMoreInfo('Stock', 'Pinex top 20');
            }}
          >
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_more')}
            </Text>
          </ExploreButton>
        </CustomLink>
      </div>

      <div className='box-shadow card-style'>
        <Text
          type='body-20-semibold'
          color='neutral-1'
          className='mb-[16px] galaxy-max:text-[18px]'
        >
          {t('new_ipo')}
        </Text>

        {loadingIPO && (
          <div className='mb-[16px] flex flex-col gap-y-[12px]'>
            <Skeleton className='!h-[51px] !w-full !rounded-[15px]' rows={1} />
          </div>
        )}

        {!loadingIPO && stockIPO && stockIPO?.length > 0 ? (
          <div className='mb-[16px] flex flex-col gap-y-[12px]'>
            {stockIPO?.map((ipo: IStockIPO, index: number) => {
              return (
                <IPO
                  onTrackingViewTickerInfo={() =>
                    handleTrackingViewTickerInfo(ipo?.stockCode, 'New IPO')
                  }
                  data={ipo}
                  key={index}
                />
              );
            })}
          </div>
        ) : (
          !loadingIPO && (
            <div className='rounded-[12px] border-[1px] border-dashed border-[#CCC] bg-neutral_08 px-[20px] py-[28px] text-center'>
              <Text type='body-20-semibold' className='galaxy-max:text-[16px]' color='neutral-1'>
                {t('new_ipo_stocks')}
              </Text>
              <Text type='body-14-regular' className='galaxy-max:text-[10px]' color='neutral-4'>
                {t('there_is_no_new_ipo_stocks')}
              </Text>
            </div>
          )
        )}
      </div>

      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] galaxy-max:text-[18px]'>
        {t('trending_on_pinex')}
      </Text>

      <div className='relative flex flex-col gap-y-[16px] mobile-max:mt-[16px]'>
        <div className='absolute -top-[2px] left-0 h-[5px] w-full mobile:hidden tablet:block'></div>
        <div className='-mt-[4px]'>
          {loadingTrendingOnPinex ? (
            <>
              <div className='card-style box-shadow'>
                <div className='flex items-center'>
                  <Skeleton
                    avatar
                    className='!h-[44px] !w-[44px] tablet:!h-[56px] tablet:!w-[56px]'
                  />

                  <Skeleton height={10} rows={2} wrapClassName='ml-[4px]' />
                </div>

                <div className='mt-[14px] desktop:ml-[60px] desktop:mt-0'>
                  <Skeleton rows={4} className='!w-full' height={15} />

                  <Skeleton className='mt-[12px] !w-full !rounded-[9px]' height={240} />
                </div>
              </div>

              <div className='card-style box-shadow'>
                <div className='flex items-center'>
                  <Skeleton
                    avatar
                    className='!h-[44px] !w-[44px] tablet:!h-[56px] tablet:!w-[56px]'
                  />

                  <Skeleton height={10} rows={2} wrapClassName='ml-[4px]' />
                </div>

                <div className='mt-[14px] desktop:ml-[60px] desktop:mt-0'>
                  <Skeleton rows={4} className='!w-full' height={15} />

                  <Skeleton className='mt-[12px] !w-full !rounded-[9px]' height={240} />
                </div>
              </div>

              <div className='card-style box-shadow'>
                <div className='flex items-center'>
                  <Skeleton
                    avatar
                    className='!h-[44px] !w-[44px] tablet:!h-[56px] tablet:!w-[56px]'
                  />

                  <Skeleton height={10} rows={2} wrapClassName='ml-[4px]' />
                </div>

                <div className='mt-[14px] desktop:ml-[60px] desktop:mt-0'>
                  <Skeleton rows={4} className='!w-full' height={15} />

                  <Skeleton className='mt-[12px] !w-full !rounded-[9px]' height={240} />
                </div>
              </div>
            </>
          ) : (
            listNewFeed?.list?.slice(0, 3)?.map((item: IPost) => {
              return (
                <TrendingOnnPinex
                  refreshTrendingOnPinex={refreshTrendingOnPinex}
                  key={`list-trending-${item.id}`}
                  data={item}
                />
              );
            })
          )}
        </div>
        {/* <div className='-mt-[4px] block mobile-max:hidden'>
          {listNewFeed?.list?.slice(0, 3)?.map((item: IPost) => {
            return <TrendingOnnPinex key={`list-trending-${item.id}`} data={item} />;
          })}
        </div> */}
      </div>

      {!loadingTrendingOnPinex && (
        <CustomLink href={`${HOME}?filterType=${FILTER_TYPE.MOST_REACTED}`}>
          <ExploreButton onClick={() => handleTrackingGetMoreInfo('Post', 'Hot topics')}>
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_hot_topics')}
            </Text>
          </ExploreButton>
        </CustomLink>
      )}
    </div>
  );
};
export default Explore;
