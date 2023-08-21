import React from 'react';

import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

import { FILTER_TYPE } from '@components/Home/ModalFilter';
import Influencer from '@components/Home/People/Influencer';
import { ITheme, useGetListNewFeed, useGetTheme } from '@components/Home/service';
import { optionTab } from '@components/PinexTop20';
import { IPost } from '@components/Post/service';
import { ExploreButton } from '@components/UI/Button';
import CustomLink from '@components/UI/CustomLink';
import Text from '@components/UI/Text';
import { ROUTE_PATH } from '@utils/common';

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
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
  // autoplay: true,
  // autoplaySpeed: 1000,
};
const Explore = () => {
  const { t } = useTranslation(['theme', 'explore']);
  const [isShowMoreKeyword, setIsShowMoreKeyword] = React.useState<boolean>(false);
  const refClick: any = React.useRef(null);
  const refSlideTheme: any = React.useRef();
  const refSlidePinex: any = React.useRef();

  const { theme, refresh: refreshTheme } = useGetTheme();
  const { keyWords } = useGetKeyWordsTop();
  const { run, listNewFeed, refresh: refreshTrendingOnPinex } = useGetListNewFeed();
  const { listStock } = useGetTopWatchingStock();
  const { stockIPO } = useGetAllIPO();
  const { listMention } = useGetTopMentionStock();

  const listKeyWords = isShowMoreKeyword ? keyWords : keyWords?.slice(0, 5);
  const maxKeyWords = keyWords && Math.max(...keyWords?.map((item: any) => item.numberHit));
  const maxTopWatchStock = listStock && Math.max(...listStock?.map((item: any) => item.totalCount));
  const maxTopMentionStock =
    listMention && Math.max(...listMention?.map((item: any) => item.totalCount));

  React.useEffect(() => {
    run(FILTER_TYPE.MOST_REACTED);
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
  };
  console.log('123');
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
          {listKeyWords?.map((item: any, index: number) => {
            return (
              <div
                onClick={() => onClickKeyword(item.keyword)}
                key={index}
                className='cursor-pointer'
              >
                <KeywordSearch percen={(item?.numberHit / maxKeyWords) * 100} data={item} />
              </div>
            );
          })}
        </div>

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
            <div className='flex items-center justify-center'>
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

        <CustomLink href={ROUTE_PATH.PEOPLEINSPOTLIGHT}>
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
          className='mb-[16px] galaxy-max:text-[18px] '
        >
          {t('themes')}
        </Text>

        <div className='relative mb-[16px]'>
          <div
            onClick={refSlideTheme?.current?.slickPrev}
            className='absolute -left-[14px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
          >
            <img
              src='/static/icons/iconGrayPrev.svg'
              alt='Icon prev'
              className='h-[16px] w-[7px] object-contain'
            />
          </div>

          <div className='slideTheme max-w-[700px] overflow-hidden'>
            <Slider {...settings} variableWidth ref={refSlideTheme}>
              {theme?.map((theme: ITheme, index: number) => {
                return (
                  <div key={index}>
                    <div className='mr-[16px] w-[161px] mobile-max:mr-[16px]'>
                      <ThemesItem refresh={refreshTheme} theme={theme} />
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>

          <div
            onClick={refSlideTheme?.current?.slickNext}
            className='absolute -right-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
          >
            <img
              src='/static/icons/iconGrayNext.svg'
              alt='Icon next'
              className='h-[16px] w-[7px] object-contain'
            />
          </div>
        </div>

        <CustomLink href={ROUTE_PATH.THEME}>
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
          {listStock &&
            [...listStock]?.slice(0, 5)?.map((item: ITopWatchingStock, index: number) => {
              return (
                <WatchingStock
                  percen={(item.totalCount / maxTopWatchStock) * 100}
                  key={`stock-${index}`}
                  data={item}
                />
              );
            })}
        </div>

        <CustomLink href={ROUTE_PATH.TOP_WATCHING}>
          <ExploreButton>
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_top_watching_stock')}
            </Text>
          </ExploreButton>
        </CustomLink>
      </div>

      <div className='box-shadow card-style'>
        <Text type='body-20-semibold' color='neutral-1' className='mb-[8px] galaxy-max:text-[18px]'>
          {t('top_mention_stock')}
        </Text>

        <Text type='body-14-regular' color='neutral-black' className='mb-[12px]'>
          {t('top_most_mention_stock_pinex')}
        </Text>

        <div className='mb-[16px] flex flex-col gap-y-[12px]'>
          {listMention &&
            [...listMention]?.splice(0, 5)?.map((item: ITopWatchingStock, index: number) => {
              return (
                <WatchingStock
                  percen={(item.totalCount / maxTopMentionStock) * 100}
                  key={`stock-${index}`}
                  data={item}
                  mention
                />
              );
            })}
        </div>

        <CustomLink href={ROUTE_PATH.TOPMENTION}>
          <ExploreButton>
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_top_mention_stock')}
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
          {t('pinex_top_20')}
        </Text>
        <div className='relative mb-[16px]'>
          <div
            onClick={refSlidePinex?.current?.slickPrev}
            className='absolute -left-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
          >
            <img
              src='/static/icons/iconGrayPrev.svg'
              alt='Icon prev'
              className='h-[16px] w-[7px] object-contain'
            />
          </div>

          <div className='pinexTop20 max-w-[700px]  overflow-hidden'>
            <Slider {...settings} variableWidth ref={refSlidePinex}>
              {optionTab?.map((item: any) => (
                <PinexTop label={t(`explore:${item.label}`)} value={item.value} key={item.value} />
              ))}
            </Slider>
          </div>

          <div
            onClick={refSlidePinex?.current?.slickNext}
            className='absolute -right-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
          >
            <img
              src='/static/icons/iconGrayNext.svg'
              alt='Icon next'
              className='h-[16px] w-[7px] object-contain'
            />
          </div>
        </div>

        <CustomLink href={ROUTE_PATH.PINEX_TOP_20}>
          <ExploreButton>
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

        {stockIPO?.length > 0 ? (
          <>
            <div className='mb-[16px] flex flex-col gap-y-[12px]'>
              {stockIPO?.map((ipo: IStockIPO, index: number) => {
                return <IPO data={ipo} key={index} />;
              })}
            </div>
          </>
        ) : (
          <div className='rounded-[12px] border-[1px] border-dashed border-[#CCC] bg-neutral_08 px-[20px] py-[28px] text-center'>
            <Text type='body-20-semibold' className='galaxy-max:text-[16px]' color='neutral-1'>
              {t('new_ipo_stocks')}
            </Text>
            <Text type='body-14-regular' className='galaxy-max:text-[10px]' color='neutral-4'>
              {t('there_is_no_new_ipo_stocks')}
            </Text>
          </div>
        )}
      </div>

      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] galaxy-max:text-[18px]'>
        {t('trending_on_pinex')}
      </Text>

      <div className='relative flex flex-col gap-y-[16px] mobile-max:mt-[16px]'>
        <div className='absolute -top-[2px] left-0 h-[5px] w-full mobile:hidden tablet:block'></div>
        <div className='-mt-[4px]'>
          {listNewFeed?.list?.slice(0, 3)?.map((item: IPost) => {
            return (
              <TrendingOnnPinex
                key={`list-trending-${item.id}`}
                data={item}
                refreshTrendingOnPinex={refreshTrendingOnPinex}
              />
            );
          })}
        </div>
        {/* <div className='-mt-[4px] block mobile-max:hidden'>
          {listNewFeed?.list?.slice(0, 3)?.map((item: IPost) => {
            return <TrendingOnnPinex key={`list-trending-${item.id}`} data={item} />;
          })}
        </div> */}
      </div>

      <CustomLink href={`/${ROUTE_PATH.HOME}?filterType=${FILTER_TYPE?.MOST_REACTED}`}>
        <ExploreButton>
          <Text type='body-14-bold' color='primary-2'>
            {t('explore_hot_topics')}
          </Text>
        </ExploreButton>
      </CustomLink>
    </div>
  );
};
export default Explore;
