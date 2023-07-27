import React from 'react';

import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Slider from 'react-slick';

import { FILTER_TYPE } from '@components/Home/ModalFilter';
import Influencer from '@components/Home/People/Influencer';
import PeopleList from '@components/Home/People/PeopleList';
import { ITheme, useGetListNewFeed, useGetTheme, useSuggestPeople } from '@components/Home/service';
import { optionTab } from '@components/PinexTop20';
import { IPost } from '@components/Post/service';
import ThemesItem from '@components/Themes/ThemesItem';
import { ExploreButton } from '@components/UI/Button';
import Text from '@components/UI/Text';
import { getAccessToken } from '@store/auth';
import { ROUTE_PATH } from '@utils/common';

import IPO from './IPO';
import KeywordSearch from './KeywordSearch';
import ModalPeopleYouKnow from './ModalPeopleYouKnow';
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
import TrendingOnnPinex from './TrendingOnPinex/inndex';
import WatchingStock from './WatchingStock';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 4,
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
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  const isLogin = !!getAccessToken();
  const router = useRouter();
  const { theme, refresh: refreshTheme } = useGetTheme();
  const { keyWords } = useGetKeyWordsTop();
  const { run, listNewFeed } = useGetListNewFeed();
  const { listStock } = useGetTopWatchingStock();
  const { stockIPO } = useGetAllIPO();
  const { listMention } = useGetTopMentionStock();

  const listKeyWords = isShowMoreKeyword ? keyWords : keyWords?.slice(0, 5);
  const maxKeyWords = keyWords && Math.max(...keyWords?.map((item: any) => item.numberHit));
  const maxTopWatchStock = listStock && Math.max(...listStock?.map((item: any) => item.totalCount));
  const maxTopMentionStock =
    listMention && Math.max(...listMention?.map((item: any) => item.totalCount));
  const onExplorePost = () => {
    router.push({
      pathname: ROUTE_PATH.HOME,
      query: { filterType: FILTER_TYPE?.MOST_REACTED },
    });
  };
  React.useEffect(() => {
    run(FILTER_TYPE.MOST_REACTED);
    if (isLogin) {
      getSuggestFriend();
    }
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
  return (
    <div className='w-full rounded-[8px] bg-white p-[10px] text-left mobile-max:mt-[24px] desktop:p-[16px] '>
      <Text
        type='body-24-semibold'
        color='cbblack'
        className='tablet:!text-[28px] tablet:!font-bold'
      >
        {t('discovery')}
      </Text>
      <Search ref={refClick} />

      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
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
            <img src='/static/icons/explore/iconUp.svg' className='h-[24px] w-[24px]' alt='' />
          </div>
        ) : (
          <div className='flex items-center justify-center'>
            <Text type='body-14-bold' color='primary-2'>
              {t('explore_top_search')}
            </Text>
            <img src='/static/icons/explore/iconDown.svg' className='h-[24px] w-[24px]' alt='' />
          </div>
        )}
      </ExploreButton>

      {/* key word search */}
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      {/* Explore influencer */}

      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        {t('people_in_spotlight')}
      </Text>

      <div className='mb-[16px]'>
        <Influencer />
      </div>

      <ExploreButton onClick={() => router.push(ROUTE_PATH.PEOPLEINSPOTLIGHT)}>
        <Text type='body-14-bold' color='primary-2'>
          {t('explore_influencer')}
        </Text>
      </ExploreButton>
      {/* Explore influencer */}
      {/* <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div> */}

      {/* People you may know */}

      {suggestionPeople && (
        <>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
          <div className='mr-[16px] mt-[32px] flex-row items-center mobile:flex desktop:hidden'>
            <img
              src='/static/icons/iconPeople.svg'
              alt=''
              width={20}
              height={20}
              className='mr-[8px] h-[20px] w-[20px] object-contain'
            />
            <Text type='body-16-bold' color='neutral-2'>
              {t('people_you_may_know')}
            </Text>
          </div>
        </>
      )}
      {suggestionPeople && (
        <div className='mobile:block desktop:hidden'>
          <div className='mb-[16px] bg-[#ffffff] pt-[15px]'>
            <PeopleList data={suggestionPeople} refresh={refreshList} />
          </div>
          <ModalPeopleYouKnow refreshList={refreshList}>
            <ExploreButton>
              <Text type='body-14-bold' color='primary-2'>
                {t('explore_people')}
              </Text>
            </ExploreButton>
          </ModalPeopleYouKnow>
          <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
        </div>
      )}
      {/* People you may know */}
      {!suggestionPeople && <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>}
      {/* theme */}
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] '>
        {t('themes')}
      </Text>

      <div className='relative mb-[16px]'>
        <div
          onClick={() => refSlideTheme?.current?.slickPrev()}
          className='absolute -left-[14px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
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
          onClick={() => refSlideTheme?.current?.slickNext()}
          className='absolute -right-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayNext.svg'
            alt='Icon next'
            className='h-[16px] w-[7px] object-contain'
          />
        </div>
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.THEME)}>
        <Text type='body-14-bold' color='primary-2'>
          {t('explore_themes')}
        </Text>
      </ExploreButton>
      {/* theme */}

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
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
      <ExploreButton onClick={() => router.push(ROUTE_PATH.TOP_WATCHING)}>
        <Text type='body-14-bold' color='primary-2'>
          {t('explore_top_watching_stock')}
        </Text>
      </ExploreButton>

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
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
      <ExploreButton onClick={() => router.push(ROUTE_PATH.TOPMENTION)}>
        <Text type='body-14-bold' color='primary-2'>
          {t('explore_top_mention_stock')}
        </Text>
      </ExploreButton>

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        {t('pinex_top_20')}
      </Text>
      <div className='relative mb-[16px]'>
        <div
          onClick={() => refSlidePinex.current.slickPrev()}
          className='absolute -left-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayPrev.svg'
            alt='Icon prev'
            className='h-[16px] w-[7px] object-contain'
          />
        </div>
        <div className='pinexTop20 max-w-[700px]  overflow-hidden'>
          <Slider {...settings} variableWidth ref={refSlidePinex}>
            {optionTab?.map((item: any, index: number) => (
              <PinexTop label={t(`explore:${item.label}`)} value={item.value} key={index} />
            ))}
          </Slider>
        </div>
        <div
          onClick={() => refSlidePinex.current.slickNext()}
          className='absolute -right-[12px] top-2/4 z-10 flex h-[38px] w-[38px] -translate-y-2/4 transform cursor-pointer select-none items-center justify-center rounded-full border border-solid border-primary_blue_light bg-white tablet-max:hidden'
        >
          <img
            src='/static/icons/iconGrayNext.svg'
            alt='Icon next'
            className='h-[16px] w-[7px] object-contain'
          />
        </div>
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.PINEX_TOP_20)}>
        <Text type='body-14-bold' color='primary-2'>
          {t('explore_more')}
        </Text>
      </ExploreButton>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
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
          <Text type='body-20-semibold' color='neutral-1'>
            {t('new_ipo_stocks')}
          </Text>
          <Text type='body-14-regular' color='neutral-4'>
            {t('there_is_no_new_ipo_stocks')}
          </Text>
        </div>
      )}

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1'>
        {t('trending_on_pinex')}
      </Text>
      <div className='relative mb-[16px] flex flex-col gap-y-[16px] mobile-max:mt-[16px]'>
        <div className='absolute -top-[2px] left-0 h-[5px] w-full bg-[#ffffff] mobile:hidden tablet:block'></div>
        <div className='hidden mobile-max:block'>
          {listNewFeed?.list?.slice(0, 3)?.map((item: IPost) => {
            return <TrendingOnnPinex key={`list-trending-${item.id}`} data={item} />;
          })}
        </div>
        <div className='-mt-[4px] block mobile-max:hidden'>
          {listNewFeed?.list?.slice(0, 3)?.map((item: IPost) => {
            return <TrendingOnnPinex key={`list-trending-${item.id}`} data={item} />;
          })}
        </div>
      </div>
      <ExploreButton onClick={onExplorePost}>
        <Text type='body-14-bold' color='primary-2'>
          {t('explore_hot_topics')}
        </Text>
      </ExploreButton>
    </div>
  );
};
export default Explore;
