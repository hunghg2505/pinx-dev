import React from 'react';

import { useRouter } from 'next/router';
import Slider from 'react-slick';

import { FILTER_TYPE } from '@components/Home/ModalFilter';
import Influencer from '@components/Home/People/Influencer';
import PeopleList from '@components/Home/People/PeopleList';
import { ITheme, useGetListNewFeed, useGetTheme, useSuggestPeople } from '@components/Home/service';
import { optionTab } from '@components/PinexTop20';
import NewsFeed from '@components/Post/NewsFeed';
import { IPost } from '@components/Post/service';
import ThemeExploreItem from '@components/Themes/ThemeExploreItem';
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
  // slidesToShow: 2,
  // slidesToScroll: 1,
  swipeToSlide: true,

  // autoplay: true,
  // autoplaySpeed: 1000,
};
const Explore = () => {
  const [isShowMoreKeyword, setIsShowMoreKeyword] = React.useState<boolean>(false);
  const refClick: any = React.useRef(null);
  const { suggestionPeople, getSuggestFriend, refreshList } = useSuggestPeople();
  const isLogin = !!getAccessToken();
  const router = useRouter();
  const { theme } = useGetTheme();
  const { keyWords } = useGetKeyWordsTop();
  const { run, refresh, listNewFeed } = useGetListNewFeed();
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
    <div className='w-full text-left mobile-max:mt-[24px] desktop:px-[31px] desktop:py-[20px]'>
      <Text type='body-24-semibold' color='cbblack'>
        Discovery
      </Text>
      <Search ref={refClick} />
      {/* key word search */}
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] mt-[36px]'>
        Top keyword search
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
              Hide
            </Text>
            <img src='/static/icons/explore/iconUp.svg' className='h-[24px] w-[24px]' alt='' />
          </div>
        ) : (
          <div className='flex items-center justify-center'>
            <Text type='body-14-bold' color='primary-2'>
              Explore top search
            </Text>
            <img src='/static/icons/explore/iconDown.svg' className='h-[24px] w-[24px]' alt='' />
          </div>
        )}
      </ExploreButton>
      {/* key word search */}
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      {/* Explore influencer */}

      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        People in spotlight
      </Text>
      <div className='mb-[16px]'>
        <Influencer />
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.PEOPLEINSPOTLIGHT)}>
        <Text type='body-14-bold' color='primary-2'>
          Explore influencer
        </Text>
      </ExploreButton>
      {/* Explore influencer */}
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      {/* People you may know */}
      {suggestionPeople && (
        <div className='mr-[16px] mt-[32px] flex-row items-center mobile:flex desktop:hidden'>
          <img
            src='/static/icons/iconPeople.svg'
            alt=''
            width={20}
            height={20}
            className='mr-[8px] h-[20px] w-[20px] object-contain'
          />
          <Text type='body-16-bold' color='neutral-2'>
            People you may know
          </Text>
        </div>
      )}
      {suggestionPeople && (
        <div className='mobile:block desktop:hidden'>
          <div className='mb-[16px] bg-[#ffffff] pt-[15px]'>
            <PeopleList data={suggestionPeople} refresh={refreshList} />
          </div>
          <ModalPeopleYouKnow>
            <ExploreButton>
              <Text type='body-14-bold' color='primary-2'>
                Explore people
              </Text>
            </ExploreButton>
          </ModalPeopleYouKnow>
        </div>
      )}
      {/* People you may know */}
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      {/* theme */}
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px] '>
        Themes
      </Text>
      <div className='mb-[16px] overflow-hidden'>
        <Slider {...settings} variableWidth>
          {theme?.map((theme: ITheme, index: number) => {
            return (
              <div key={index}>
                <div className=' mr-[23px] w-[149px] mobile-max:mr-[16px]'>
                  <ThemeExploreItem data={theme} />
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.THEME)}>
        <Text type='body-14-bold' color='primary-2'>
          Explore themes
        </Text>
      </ExploreButton>
      {/* theme */}

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        Top watching stock
      </Text>
      <Text type='body-14-regular' color='neutral-black' className='mb-[12px]'>
        Top most watching stocks on PineX
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
          Explore top watching stock
        </Text>
      </ExploreButton>

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        Top mention stock
      </Text>
      <Text type='body-14-regular' color='neutral-black' className='mb-[12px]'>
        Top most mention stocks on PineX
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
          Explore top mention stock
        </Text>
      </ExploreButton>

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        PineX top 20
      </Text>
      <div className='mb-[16px] overflow-hidden'>
        <Slider {...settings} variableWidth>
          {optionTab?.map((item: any, index: number) => (
            <PinexTop label={item.label} value={item.value} key={index} />
          ))}
        </Slider>
      </div>
      <ExploreButton onClick={() => router.push(ROUTE_PATH.PINEX_TOP_20)}>
        <Text type='body-14-bold' color='primary-2'>
          Explore more
        </Text>
      </ExploreButton>
      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        New IPO
      </Text>
      {stockIPO ? (
        <>
          <div className='mb-[16px] flex flex-col gap-y-[12px]'>
            {stockIPO?.map((ipo: IStockIPO, index: number) => {
              return <IPO data={ipo} key={index} />;
            })}
          </div>
        </>
      ) : (
        <div className='rounded-[12px] border-[1px] border-dashed border-[#CCC] px-[20px] py-[28px] text-center'>
          <Text type='body-20-semibold' color='neutral-1'>
            New IPO stocks
          </Text>
          <Text type='body-14-regular' color='neutral-4'>
            There is no new IPO stocks
          </Text>
        </div>
      )}

      <div className='my-[20px] block h-[2px] w-full bg-[#EEF5F9]'></div>
      <Text type='body-20-semibold' color='neutral-1' className='mb-[16px]'>
        Trending on PineX
      </Text>
      <div className='relative mb-[16px] flex flex-col gap-y-[16px]'>
        <div className='absolute -top-[2px] left-0 h-[5px] w-full bg-[#ffffff] mobile:hidden tablet:block'></div>
        <div className='hidden mobile-max:block'>
          {listNewFeed?.slice(0, 3)?.map((item: IPost, index: number) => {
            return <TrendingOnnPinex key={index} data={item} id={item.id} refresh={refresh} />;
          })}
        </div>
        <div className='block mobile-max:hidden'>
          {listNewFeed?.slice(0, 3)?.map((item: IPost, index: number) => {
            return <NewsFeed key={index} data={item} id={item.id} refresh={refresh} />;
          })}
        </div>
      </div>
      <ExploreButton onClick={onExplorePost}>
        <Text type='body-14-bold' color='primary-2'>
          Explore hot topics
        </Text>
      </ExploreButton>
    </div>
  );
};
export default Explore;
